"use client";

import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import { supabase } from "@/lib/supabaseClient";

const PRIORITIES = ["low", "medium", "high"];
const STATUSES = ["todo", "in_progress", "done"];

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("due_date", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });
    if (!error) setTasks(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("tasks").insert({
      user_id: user.id,
      title: title.trim(),
      priority,
      due_date: dueDate || null,
      status: "todo",
    });
    if (!error) {
      setTitle("");
      setDueDate("");
      load();
    }
  }

  async function cycleStatus(task) {
    const idx = STATUSES.indexOf(task.status);
    const next = STATUSES[(idx + 1) % STATUSES.length];
    await supabase.from("tasks").update({ status: next }).eq("id", task.id);
    load();
  }

  async function removeTask(id) {
    await supabase.from("tasks").delete().eq("id", id);
    load();
  }

  const visible = tasks.filter((t) => filter === "all" || t.status === filter);

  const priorityColor = { low: "text-olive", medium: "text-brass", high: "text-brick" };
  const statusLabel = { todo: "To do", in_progress: "In progress", done: "Done" };

  return (
    <PageShell title="Tasks" subtitle="Everything you need to get done.">
      <form onSubmit={addTask} className="card p-4 flex flex-col md:flex-row gap-3 mb-6">
        <input
          className="input-field flex-1"
          placeholder="Add a task…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select className="input-field md:w-40" value={priority} onChange={(e) => setPriority(e.target.value)}>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p[0].toUpperCase() + p.slice(1)} priority
            </option>
          ))}
        </select>
        <input
          type="date"
          className="input-field md:w-44"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit" className="btn-primary whitespace-nowrap">
          Add task
        </button>
      </form>

      <div className="flex gap-2 mb-4">
        {["all", ...STATUSES].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-sm font-body px-3 py-1.5 rounded-full border ${
              filter === f
                ? "bg-leather text-surface border-leather"
                : "border-parchmentDark text-inkSoft"
            }`}
          >
            {f === "all" ? "All" : statusLabel[f]}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-inkSoft font-body">Loading tasks…</p>
      ) : visible.length === 0 ? (
        <p className="text-inkSoft font-body">No tasks here yet. Add your first one above.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {visible.map((task) => (
            <div key={task.id} className="card p-4 flex items-center gap-4">
              <button
                onClick={() => cycleStatus(task)}
                className={`text-xs font-body font-semibold px-2 py-1 rounded-md border whitespace-nowrap ${
                  task.status === "done"
                    ? "bg-olive/10 text-olive border-olive/30"
                    : "border-parchmentDark text-inkSoft"
                }`}
              >
                {statusLabel[task.status]}
              </button>
              <div className="flex-1">
                <p className={`font-body text-ink ${task.status === "done" ? "line-through opacity-60" : ""}`}>
                  {task.title}
                </p>
                {task.due_date && (
                  <p className="text-xs font-mono text-inkSoft mt-0.5">Due {task.due_date}</p>
                )}
              </div>
              <span className={`text-xs font-body font-semibold ${priorityColor[task.priority]}`}>
                {task.priority}
              </span>
              <button onClick={() => removeTask(task.id)} className="text-inkSoft hover:text-brick text-sm">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
