"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import { supabase } from "@/lib/supabaseClient";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("habits")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setHabits(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function addHabit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("habits").insert({
      user_id: user.id,
      name: name.trim(),
      streak: 0,
      best_streak: 0,
    });
    if (!error) {
      setName("");
      load();
    }
  }

  async function checkInToday(habit) {
    const today = todayISO();
    if (habit.last_completed_date === today) return; // already done today

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const continuesStreak = habit.last_completed_date === yesterday;
    const newStreak = continuesStreak ? habit.streak + 1 : 1;
    const newBest = Math.max(newStreak, habit.best_streak || 0);

    await supabase
      .from("habits")
      .update({ streak: newStreak, best_streak: newBest, last_completed_date: today })
      .eq("id", habit.id);

    await supabase.from("habit_logs").insert({
      habit_id: habit.id,
      user_id: habit.user_id,
      completed_on: today,
    });

    load();
  }

  async function removeHabit(id) {
    await supabase.from("habits").delete().eq("id", id);
    load();
  }

  const today = todayISO();

  return (
    <PageShell title="Habits" subtitle="Small things, done consistently.">
      <form onSubmit={addHabit} className="card p-4 flex gap-3 mb-6">
        <input
          className="input-field flex-1"
          placeholder="New habit, e.g. Drink 2L water"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn-primary whitespace-nowrap">
          Add habit
        </button>
      </form>

      {loading ? (
        <p className="text-inkSoft font-body">Loading habits…</p>
      ) : habits.length === 0 ? (
        <p className="text-inkSoft font-body">No habits yet. Start with one small thing.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {habits.map((h) => {
            const doneToday = h.last_completed_date === today;
            return (
              <div key={h.id} className="card p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <p className="font-body font-semibold text-ink">{h.name}</p>
                  <button onClick={() => removeHabit(h.id)} className="text-inkSoft hover:text-brick text-sm">
                    ✕
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-mono text-2xl text-leather">{h.streak || 0}</div>
                  <div className="text-xs text-inkSoft font-body leading-tight">
                    day streak
                    <br />
                    best: {h.best_streak || 0}
                  </div>
                </div>
                <button
                  onClick={() => checkInToday(h)}
                  disabled={doneToday}
                  className={doneToday ? "btn-ghost opacity-60" : "btn-primary"}
                >
                  {doneToday ? "Checked in today ✓" : "Check in today"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
