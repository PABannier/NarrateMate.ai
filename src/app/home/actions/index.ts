import { createSupabaseServerClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

interface SummaryData {
  youtubeUrl: string;
  summary: string;
  missingIdeas: string[];
  correctIdeas: string[];
  wrongIdeas: string[];
}

export async function createSummary(data: SummaryData) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.from("summary").insert(data).single();
  revalidatePath("/home");
  return JSON.stringify(result);
}

export async function readSummary() {
  const supabase = await createSupabaseServerClient();
  return await supabase.from("summary").select("*");
}

export async function deleteSummaryById(id: string) {
  const supabase = await createSupabaseServerClient();
  await supabase.from("summary").delete().eq("id", id);
  revalidatePath("/home");
}
