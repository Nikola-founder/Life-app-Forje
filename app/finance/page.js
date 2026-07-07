"use client";

import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import { supabase } from "@/lib/supabaseClient";
import { SUPPORTED_CURRENCIES, convertToGBP, formatMoney } from "@/lib/currency";

export default function FinancePage() {
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("GBP");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("finance_transactions")
      .select("*")
      .order("occurred_on", { ascending: false });
    if (!error) setTxns(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function addTxn(e) {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const amountGbp = await convertToGBP(amt, currency);

    const { error } = await supabase.from("finance_transactions").insert({
      user_id: user.id,
      type,
      amount: amt,
      currency,
      amount_gbp: amountGbp,
      category: category.trim() || "General",
      note: note.trim(),
      occurred_on: new Date().toISOString().slice(0, 10),
    });

    if (!error) {
      setAmount("");
      setNote("");
      setCategory("");
      load();
    }
  }

  async function removeTxn(id) {
    await supabase.from("finance_transactions").delete().eq("id", id);
    load();
  }

  const totalIncomeGbp = txns.filter((t) => t.type === "income").reduce((s, t) => s + Number(t.amount_gbp || 0), 0);
  const totalExpenseGbp = txns.filter((t) => t.type === "expense").reduce((s, t) => s + Number(t.amount_gbp || 0), 0);
  const balanceGbp = totalIncomeGbp - totalExpenseGbp;

  return (
    <PageShell title="Finance" subtitle="Every currency converts back to GBP automatically.">
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="card p-4 text-center">
          <p className="text-xs font-body text-inkSoft">Income</p>
          <p className="font-mono text-lg text-olive">{formatMoney(totalIncomeGbp, "GBP")}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs font-body text-inkSoft">Expenses</p>
          <p className="font-mono text-lg text-brick">{formatMoney(totalExpenseGbp, "GBP")}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs font-body text-inkSoft">Balance</p>
          <p className="font-mono text-lg text-leather">{formatMoney(balanceGbp, "GBP")}</p>
        </div>
      </div>

      <form onSubmit={addTxn} className="card p-4 flex flex-col md:flex-row gap-3 mb-6 flex-wrap">
        <select className="input-field md:w-36" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          type="number"
          step="0.01"
          className="input-field md:w-32"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select className="input-field md:w-28" value={currency} onChange={(e) => setCurrency(e.target.value)}>
          {SUPPORTED_CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          className="input-field md:w-40"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          className="input-field flex-1"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button type="submit" className="btn-primary whitespace-nowrap">
          Add
        </button>
      </form>

      {loading ? (
        <p className="text-inkSoft font-body">Loading transactions…</p>
      ) : txns.length === 0 ? (
        <p className="text-inkSoft font-body">No transactions logged yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {txns.map((t) => (
            <div key={t.id} className="card p-3 flex items-center gap-4">
              <span className={`text-sm font-body font-semibold w-16 ${t.type === "income" ? "text-olive" : "text-brick"}`}>
                {t.type === "income" ? "+ Income" : "− Expense"}
              </span>
              <div className="flex-1">
                <p className="font-body text-ink text-sm">
                  {t.category} {t.note && `· ${t.note}`}
                </p>
                <p className="text-xs font-mono text-inkSoft">{t.occurred_on}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-ink">{formatMoney(Number(t.amount), t.currency)}</p>
                {t.currency !== "GBP" && (
                  <p className="text-xs font-mono text-inkSoft">≈ {formatMoney(Number(t.amount_gbp), "GBP")}</p>
                )}
              </div>
              <button onClick={() => removeTxn(t.id)} className="text-inkSoft hover:text-brick text-sm">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
