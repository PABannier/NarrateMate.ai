"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export async function create() {
  // ...
}

export async function update() {
  // ...
}

export async function remove(id: string) {
  try {
    const supabase = createServerActionClient({ cookies });
    const { error } = await supabase.from("summary").delete().match({ id });
    if (error) throw new Error(error.message);
    return { data: { success: true } };
  } catch (error) {
    return {
      error,
    };
  }
}
