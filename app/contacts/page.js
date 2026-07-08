"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import { supabase } from "@/lib/supabaseClient";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    relation: "",
    phone: "",
    email: "",
    birthday: "",
    boarding_house: "",
    year: "",
    notes: "",
  });

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("name", { ascending: true });
    if (!error) setContacts(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function addContact(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("contacts").insert({
      user_id: user.id,
      name: form.name.trim(),
      relation: form.relation.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      birthday: form.birthday || null,
      boarding_house: form.boarding_house.trim(),
      year: form.year.trim(),
      notes: form.notes.trim(),
    });

    if (!error) {
      setForm({
        name: "",
        relation: "",
        phone: "",
        email: "",
        birthday: "",
        boarding_house: "",
        year: "",
        notes: "",
      });
      load();
    }
  }

  async function removeContact(id) {
    await supabase.from("contacts").delete().eq("id", id);
    load();
  }

  return (
    <PageShell title="Contacts" subtitle="People — including your boarding school circle.">
      <form onSubmit={addContact} className="card p-4 grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <input
          className="input-field"
          placeholder="Name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Relation (e.g. friend, housemaster, tutor)"
          value={form.relation}
          onChange={(e) => update("relation", e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
        <div>
          <label className="text-xs font-body text-inkSoft block mb-1">Birthday</label>
          <input
            type="date"
            className="input-field"
            value={form.birthday}
            onChange={(e) => update("birthday", e.target.value)}
          />
        </div>
        <input
          className="input-field"
          placeholder="Boarding House (e.g. School House)"
          value={form.boarding_house}
          onChange={(e) => update("boarding_house", e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Year (e.g. Year 10, Lower Sixth)"
          value={form.year}
          onChange={(e) => update("year", e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
        <button type="submit" className="btn-primary md:col-span-2">
          Add contact
        </button>
      </form>

      {loading ? (
        <p className="text-inkSoft font-body">Loading contacts…</p>
      ) : contacts.length === 0 ? (
        <p className="text-inkSoft font-body">No contacts yet.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {contacts.map((c) => (
            <div key={c.id} className="card p-4">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="font-display text-lg text-ink">{c.name}</p>
                  {c.relation && <p className="text-xs font-body text-inkSoft">{c.relation}</p>}
                </div>
                <button onClick={() => removeContact(c.id)} className="text-inkSoft hover:text-brick text-sm">
                  ✕
                </button>
              </div>
              <div className="text-sm font-body text-ink space-y-0.5 mt-2">
                {c.phone && <p>📞 {c.phone}</p>}
                {c.email && <p>✉️ {c.email}</p>}
                {c.birthday && <p className="font-mono text-xs text-inkSoft">🎂 {c.birthday}</p>}
                {(c.boarding_house || c.year) && (
                  <p className="text-xs text-brass font-semibold mt-1">
                    {c.boarding_house} {c.boarding_house && c.year && "·"} {c.year}
                  </p>
                )}
                {c.notes && <p className="text-inkSoft text-xs mt-1">{c.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
