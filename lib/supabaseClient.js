import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // This will show clearly in the browser console / build logs during setup
  // rather than crashing the build. createClient() throws on an empty
  // string, so we fall back to harmless placeholders — the app will still
  // build and deploy, it just won't be able to log in until real values
  // are added as env vars in Vercel (and locally in .env.local), followed
  // by a redeploy.
  console.warn(
    "Forje Life: Supabase env vars are missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel > Project Settings > Environment Variables, then redeploy."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
