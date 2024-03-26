import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";

export function createSupabaseServerClient() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  return supabase;
}

export function readUserSession() {
  const supabase = createSupabaseServerClient();
  return supabase.auth.getSession();
}
