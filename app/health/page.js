"use client";

import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import { supabase } from "@/lib/supabaseClient";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function HealthPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sleepHours, setSleepHours] = useState("");
  const [waterMl, setWaterMl] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [exerciseMinutes, setExerciseMinutes] = useState("");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("health_logs")
      .select("*")
      .order("log_date", { ascending: false })
      .limit(30);
    if (!error) setLogs(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function saveToday(e) {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const row = {
      user_id: user.id,
      log_date: todayISO(),
      sleep_hours: sleepHours ? parseFloat(sleepHours) : null,
      water_ml: waterMl ? parseInt(waterMl, 10) : null,
      weight_kg: weightKg ? parseFloat(weightKg) : null,
      exercise_minutes: exerciseMinutes ? parseInt(exerciseMinutes, 10) : null,
    };

    // one entry per day - upsert on (user_id, log_date)
    const { error } = await supabase
      .from("health_logs")
      .upsert(row, { onConflict: "user_id,log_date" });

    if (!error) {
      setSleepHours("");
      setWaterMl("");
      setWeightKg("");
      setExerciseMinutes("");
      load();
    }
  }

  return (
    <PageShell title="Health" subtitle="Sleep, water, movement, weight — tracked daily.">
      <form onSubmit={saveToday} className="card p-4 grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div>
          <label className="text-xs font-body text-inkSoft block mb-1">Sleep (hrs)</label>
          <input
            type="number"
            step="0.1"
            className="input-field"
            value={sleepHours}
            onChange={(e) => setSleepHours(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-body text-inkSoft block mb-1">Water (ml)</label>
          <input
            type="number"
            className="input-field"
            value={waterMl}
            onChange={(e) => setWaterMl(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-body text-inkSoft block mb-1">Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            className="input-field"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-body text-inkSoft block mb-1">Exercise (min)</label>
          <input
            type="number"
            className="input-field"
            value={exerciseMinutes}
            onChange={(e) => setExerciseMinutes(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary col-span-2 md:col-span-4">
          Save today's log
        </button>
      </form>

      {loading ? (
        <p className="text-inkSoft font-body">Loading history…</p>
      ) : logs.length === 0 ? (
        <p className="text-inkSoft font-body">No health data logged yet.</p>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="text-left text-inkSoft border-b border-parchmentDark">
                <th className="p-3">Date</th>
                <th className="p-3">Sleep</th>
                <th className="p-3">Water</th>
                <th className="p-3">Weight</th>
                <th className="p-3">Exercise</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-parchmentDark/60 last:border-0">
                  <td className="p-3 font-mono">{log.log_date}</td>
                  <td className="p-3">{log.sleep_hours ? `${log.sleep_hours}h` : "—"}</td>
                  <td className="p-3">{log.water_ml ? `${log.water_ml}ml` : "—"}</td>
                  <td className="p-3">{log.weight_kg ? `${log.weight_kg}kg` : "—"}</td>
                  <td className="p-3">{log.exercise_minutes ? `${log.exercise_minutes}min` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageShell>
  );
}
