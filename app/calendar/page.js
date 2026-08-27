"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import { supabase } from "@/lib/supabaseClient";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [location, setLocation] = useState("");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("calendar_events")
      .select("*")
      .order("event_date", { ascending: true })
      .order("event_time", { ascending: true });
    if (!error) setEvents(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function addEvent(e) {
    e.preventDefault();
    if (!title.trim() || !eventDate) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("calendar_events").insert({
      user_id: user.id,
      title: title.trim(),
      event_date: eventDate,
      event_time: eventTime || null,
      location: location.trim(),
    });
    if (!error) {
      setTitle("");
      setEventDate("");
      setEventTime("");
      setLocation("");
      load();
    }
  }

  async function removeEvent(id) {
    await supabase.from("calendar_events").delete().eq("id", id);
    load();
  }

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.event_date >= today);
  const past = events.filter((e) => e.event_date < today);

  return (
    <PageShell title="Calendar" subtitle="Appointments and events, all in one place.">
      <form onSubmit={addEvent} className="card p-4 flex flex-col md:flex-row gap-3 mb-6 flex-wrap">
        <input
          className="input-field flex-1"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          required
          className="input-field md:w-44"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <input
          type="time"
          className="input-field md:w-32"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
        />
        <input
          className="input-field md:w-44"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit" className="btn-primary whitespace-nowrap">
          Add event
        </button>
      </form>

      {loading ? (
        <p className="text-inkSoft font-body">Loading events…</p>
      ) : (
        <>
          <h2 className="font-display text-lg text-ink mb-2">Upcoming</h2>
          {upcoming.length === 0 ? (
            <p className="text-inkSoft font-body mb-6">Nothing scheduled yet.</p>
          ) : (
            <div className="flex flex-col gap-2 mb-6">
              {upcoming.map((ev) => (
                <div key={ev.id} className="card p-3 flex items-center gap-4">
                  <div className="font-mono text-sm text-leather w-28 shrink-0">
                    {ev.event_date}
                    {ev.event_time && <div className="text-xs text-inkSoft">{ev.event_time.slice(0, 5)}</div>}
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-ink">{ev.title}</p>
                    {ev.location && <p className="text-xs text-inkSoft font-body">{ev.location}</p>}
                  </div>
                  <button onClick={() => removeEvent(ev.id)} className="text-inkSoft hover:text-brick text-sm">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {past.length > 0 && (
            <>
              <h2 className="font-display text-lg text-ink mb-2 opacity-70">Past</h2>
              <div className="flex flex-col gap-2 opacity-60">
                {past.map((ev) => (
                  <div key={ev.id} className="card p-3 flex items-center gap-4">
                    <div className="font-mono text-sm w-28 shrink-0">{ev.event_date}</div>
                    <p className="font-body flex-1">{ev.title}</p>
                    <button onClick={() => removeEvent(ev.id)} className="text-inkSoft hover:text-brick text-sm">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </PageShell>
  );
}
