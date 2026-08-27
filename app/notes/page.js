"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import { supabase } from "@/lib/supabaseClient";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false });
    if (!error) setNotes(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function addNote(e) {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("notes").insert({
      user_id: user.id,
      title: title.trim() || "Untitled",
      content: content.trim(),
      pinned: false,
    });
    if (!error) {
      setTitle("");
      setContent("");
      load();
    }
  }

  async function togglePin(note) {
    await supabase.from("notes").update({ pinned: !note.pinned }).eq("id", note.id);
    load();
  }

  async function removeNote(id) {
    await supabase.from("notes").delete().eq("id", id);
    load();
  }

  return (
    <PageShell title="Notes" subtitle="Quick thoughts, ideas, and reminders.">
      <form onSubmit={addNote} className="card p-4 flex flex-col gap-3 mb-6">
        <input
          className="input-field"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="input-field min-h-[80px]"
          placeholder="Note content…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="btn-primary self-end">
          Add note
        </button>
      </form>

      {loading ? (
        <p className="text-inkSoft font-body">Loading notes…</p>
      ) : notes.length === 0 ? (
        <p className="text-inkSoft font-body">No notes yet.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {notes.map((n) => (
            <div key={n.id} className="card p-4">
              <div className="flex items-start justify-between mb-1">
                <p className="font-display text-ink text-lg">{n.title}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => togglePin(n)}
                    className={n.pinned ? "text-brass" : "text-inkSoft"}
                    title="Pin"
                  >
                    📌
                  </button>
                  <button onClick={() => removeNote(n.id)} className="text-inkSoft hover:text-brick text-sm">
                    ✕
                  </button>
                </div>
              </div>
              <p className="font-body text-inkSoft whitespace-pre-wrap text-sm">{n.content}</p>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
