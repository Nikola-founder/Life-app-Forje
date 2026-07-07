"use client";

import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import { supabase } from "@/lib/supabaseClient";

const MOODS = ["😊", "😌", "😐", "😔", "😤", "😴"];

export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("😊");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .order("entry_date", { ascending: false });
    if (!error) setEntries(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function addEntry(e) {
    e.preventDefault();
    if (!content.trim()) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("journal_entries").insert({
      user_id: user.id,
      entry_date: new Date().toISOString().slice(0, 10),
      mood,
      content: content.trim(),
    });
    if (!error) {
      setContent("");
      load();
    }
  }

  async function removeEntry(id) {
    await supabase.from("journal_entries").delete().eq("id", id);
    load();
  }

  return (
    <PageShell title="Journal" subtitle="A private page for today.">
      <form onSubmit={addEntry} className="card p-4 mb-6 flex flex-col gap-3">
        <div className="flex gap-2">
          {MOODS.map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => setMood(m)}
              className={`text-xl w-10 h-10 rounded-full border ${
                mood === m ? "border-leather bg-brassLight/30" : "border-parchmentDark"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <textarea
          className="input-field min-h-[100px]"
          placeholder="What's on your mind today?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="btn-primary self-end">
          Save entry
        </button>
      </form>

      {loading ? (
        <p className="text-inkSoft font-body">Loading journal…</p>
      ) : entries.length === 0 ? (
        <p className="text-inkSoft font-body">Nothing written yet. Today is a good day to start.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {entries.map((entry) => (
            <div key={entry.id} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{entry.mood}</span>
                  <span className="text-xs font-mono text-inkSoft">{entry.entry_date}</span>
                </div>
                <button onClick={() => removeEntry(entry.id)} className="text-inkSoft hover:text-brick text-sm">
                  ✕
                </button>
              </div>
              <p className="font-body text-ink whitespace-pre-wrap">{entry.content}</p>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
