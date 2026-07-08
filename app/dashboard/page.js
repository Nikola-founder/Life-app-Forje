"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { supabase } from "@/lib/supabaseClient";
import { formatMoney } from "@/lib/currency";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [tasksToday, setTasksToday] = useState([]);
  const [habits, setHabits] = useState([]);
  const [nextEvent, setNextEvent] = useState(null);
  const [goalsProgress, setGoalsProgress] = useState([]);
  const [balanceGbp, setBalanceGbp] = useState(0);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserEmail(user?.email || "");

      const today = todayISO();

      const [{ data: tasks }, { data: habitRows }, { data: events }, { data: goals }, { data: txns }] =
        await Promise.all([
          supabase.from("tasks").select("*").neq("status", "done").order("due_date", { ascending: true }).limit(5),
          supabase.from("habits").select("*"),
          supabase
            .from("calendar_events")
            .select("*")
            .gte("event_date", today)
            .order("event_date", { ascending: true })
            .limit(1),
          supabase.from("goals").select("*").order("target_date", { ascending: true }).limit(3),
          supabase.from("finance_transactions").select("amount_gbp, type"),
        ]);

      setTasksToday(tasks || []);
      setHabits(habitRows || []);
      setNextEvent(events?.[0] || null);

      if (goals && goals.length > 0) {
        const { data: milestones } = await supabase
          .from("goal_milestones")
          .select("*")
          .in("goal_id", goals.map((g) => g.id));
        const progress = goals.map((g) => {
          const ms = (milestones || []).filter((m) => m.goal_id === g.id);
          const done = ms.filter((m) => m.is_done).length;
          const pct = ms.length ? Math.round((done / ms.length) * 100) : 0;
          return { ...g, pct };
        });
        setGoalsProgress(progress);
      }

      const income = (txns || []).filter((t) => t.type === "income").reduce((s, t) => s + Number(t.amount_gbp || 0), 0);
      const expense = (txns || []).filter((t) => t.type === "expense").reduce((s, t) => s + Number(t.amount_gbp || 0), 0);
      setBalanceGbp(income - expense);

      setLoading(false);
    }
    load();
  }, []);

  return (
    <PageShell title="Dashboard" subtitle={userEmail ? `Welcome back, ${userEmail}` : "Your day, at a glance."}>
      {loading ? (
        <p className="text-inkSoft font-body">Gathering your day…</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card p-5">
            <h2 className="font-display text-lg text-ink mb-3">Open tasks</h2>
            {tasksToday.length === 0 ? (
              <p className="text-inkSoft font-body text-sm">Nothing pending. Well done.</p>
            ) : (
              <ul className="space-y-1.5">
                {tasksToday.map((t) => (
                  <li key={t.id} className="text-sm font-body text-ink flex justify-between">
                    <span>{t.title}</span>
                    {t.due_date && <span className="text-xs font-mono text-inkSoft">{t.due_date}</span>}
                  </li>
                ))}
              </ul>
            )}
            <Link href="/tasks" className="text-xs text-leather font-semibold mt-3 inline-block">
              View all tasks →
            </Link>
          </div>

          <div className="card p-5">
            <h2 className="font-display text-lg text-ink mb-3">Habit streaks</h2>
            {habits.length === 0 ? (
              <p className="text-inkSoft font-body text-sm">No habits set up yet.</p>
            ) : (
              <ul className="space-y-1.5">
                {habits.map((h) => (
                  <li key={h.id} className="text-sm font-body text-ink flex justify-between">
                    <span>{h.name}</span>
                    <span className="font-mono text-leather">{h.streak || 0}d</span>
                  </li>
                ))}
              </ul>
            )}
            <Link href="/habits" className="text-xs text-leather font-semibold mt-3 inline-block">
              View all habits →
            </Link>
          </div>

          <div className="card p-5">
            <h2 className="font-display text-lg text-ink mb-3">Next on the calendar</h2>
            {nextEvent ? (
              <div>
                <p className="font-body text-ink">{nextEvent.title}</p>
                <p className="text-xs font-mono text-inkSoft mt-1">
                  {nextEvent.event_date} {nextEvent.event_time?.slice(0, 5)}
                </p>
              </div>
            ) : (
              <p className="text-inkSoft font-body text-sm">Nothing scheduled.</p>
            )}
            <Link href="/calendar" className="text-xs text-leather font-semibold mt-3 inline-block">
              View calendar →
            </Link>
          </div>

          <div className="card p-5">
            <h2 className="font-display text-lg text-ink mb-3">Finance balance</h2>
            <p className="font-mono text-2xl text-leather">{formatMoney(balanceGbp, "GBP")}</p>
            <Link href="/finance" className="text-xs text-leather font-semibold mt-3 inline-block">
              View finance →
            </Link>
          </div>

          <div className="card p-5 md:col-span-2">
            <h2 className="font-display text-lg text-ink mb-3">Goals in progress</h2>
            {goalsProgress.length === 0 ? (
              <p className="text-inkSoft font-body text-sm">No active goals yet.</p>
            ) : (
              <div className="space-y-3">
                {goalsProgress.map((g) => (
                  <div key={g.id}>
                    <div className="flex justify-between text-sm font-body text-ink mb-1">
                      <span>{g.title}</span>
                      <span className="text-inkSoft">{g.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-parchmentDark overflow-hidden">
                      <div className="h-full bg-leather" style={{ width: `${g.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Link href="/goals" className="text-xs text-leather font-semibold mt-3 inline-block">
              View all goals →
            </Link>
          </div>
        </div>
      )}
    </PageShell>
  );
}
