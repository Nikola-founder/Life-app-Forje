"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import { supabase } from "@/lib/supabaseClient";
import { GOAL_CATEGORIES, generateMilestones } from "@/lib/milestones";

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [milestonesByGoal, setMilestonesByGoal] = useState({});
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(GOAL_CATEGORIES[0]);
  const [targetDate, setTargetDate] = useState("");

  async function load() {
    setLoading(true);
    const { data: goalRows } = await supabase
      .from("goals")
      .select("*")
      .order("target_date", { ascending: true });
    setGoals(goalRows || []);

    if (goalRows && goalRows.length > 0) {
      const { data: milestoneRows } = await supabase
        .from("goal_milestones")
        .select("*")
        .in("goal_id", goalRows.map((g) => g.id))
        .order("order_index", { ascending: true });

      const grouped = {};
      (milestoneRows || []).forEach((m) => {
        grouped[m.goal_id] = grouped[m.goal_id] || [];
        grouped[m.goal_id].push(m);
      });
      setMilestonesByGoal(grouped);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function addGoal(e) {
    e.preventDefault();
    if (!title.trim() || !targetDate) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: goal, error } = await supabase
      .from("goals")
      .insert({
        user_id: user.id,
        title: title.trim(),
        category,
        target_date: targetDate,
        status: "active",
      })
      .select()
      .single();

    if (!error && goal) {
      // This is the automatic milestone breakdown in action.
      const generated = generateMilestones(category, null, targetDate);
      const rows = generated.map((m) => ({ ...m, goal_id: goal.id, user_id: user.id }));
      await supabase.from("goal_milestones").insert(rows);

      setTitle("");
      setTargetDate("");
      load();
    }
  }

  async function toggleMilestone(milestone) {
    await supabase
      .from("goal_milestones")
      .update({ is_done: !milestone.is_done })
      .eq("id", milestone.id);
    load();
  }

  async function removeGoal(id) {
    await supabase.from("goal_milestones").delete().eq("goal_id", id);
    await supabase.from("goals").delete().eq("id", id);
    load();
  }

  return (
    <PageShell
      title="Goals"
      subtitle="Set the destination — Forje breaks the road into milestones for you."
    >
      <form onSubmit={addGoal} className="card p-4 flex flex-col md:flex-row gap-3 mb-6">
        <input
          className="input-field flex-1"
          placeholder="What do you want to achieve?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select className="input-field md:w-48" value={category} onChange={(e) => setCategory(e.target.value)}>
          {GOAL_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c[0].toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
        <input
          type="date"
          required
          className="input-field md:w-44"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />
        <button type="submit" className="btn-primary whitespace-nowrap">
          Create goal
        </button>
      </form>

      {loading ? (
        <p className="text-inkSoft font-body">Loading goals…</p>
      ) : goals.length === 0 ? (
        <p className="text-inkSoft font-body">No goals yet. Set your first destination above.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {goals.map((goal) => {
            const milestones = milestonesByGoal[goal.id] || [];
            const doneCount = milestones.filter((m) => m.is_done).length;
            const pct = milestones.length ? Math.round((doneCount / milestones.length) * 100) : 0;
            return (
              <div key={goal.id} className="card p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-display text-xl text-ink">{goal.title}</p>
                    <p className="text-xs font-body text-inkSoft mt-0.5">
                      {goal.category} · target {goal.target_date}
                    </p>
                  </div>
                  <button onClick={() => removeGoal(goal.id)} className="text-inkSoft hover:text-brick text-sm">
                    ✕
                  </button>
                </div>

                <div className="h-2 rounded-full bg-parchmentDark overflow-hidden mb-3">
                  <div className="h-full bg-leather" style={{ width: `${pct}%` }} />
                </div>

                <div className="flex flex-col gap-1.5">
                  {milestones.map((m) => (
                    <label
                      key={m.id}
                      className="flex items-center gap-2 text-sm font-body cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={m.is_done}
                        onChange={() => toggleMilestone(m)}
                        className="accent-leather"
                      />
                      <span className={m.is_done ? "line-through text-inkSoft" : "text-ink"}>
                        {m.title}
                      </span>
                      <span className="text-xs font-mono text-inkSoft ml-auto">{m.target_date}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
