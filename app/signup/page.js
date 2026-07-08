"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setDone(true);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="wax-seal mb-3 !w-14 !h-14 !text-lg">F</div>
          <h1 className="font-display text-3xl text-ink">Forje Life</h1>
          <p className="text-inkSoft font-body text-sm mt-1">Start your ledger.</p>
        </div>

        {done ? (
          <div className="card p-6 text-center">
            <p className="font-body text-ink">
              Almost there — check <span className="font-semibold">{email}</span> for a
              confirmation link, then sign in.
            </p>
            <Link href="/login" className="btn-primary inline-block mt-4">
              Go to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card p-6 flex flex-col gap-4">
            <div>
              <label className="text-sm font-body text-inkSoft mb-1 block">Email</label>
              <input
                type="email"
                required
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-body text-inkSoft mb-1 block">Password</label>
              <input
                type="password"
                required
                minLength={6}
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
              />
            </div>

            {error && <p className="text-brick text-sm font-body">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary mt-2 disabled:opacity-60">
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        )}

        <p className="text-center text-inkSoft font-body text-sm mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-leather font-semibold underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
