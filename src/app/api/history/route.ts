import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getYouTubeVideoTitle } from "@/lib/youtube";
// import type { Database } from '@/lib/database.types'

export async function GET() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data } = await supabase.from("summary").select("*");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  if (!data) {
    return NextResponse.json([]);
  }

  return NextResponse.json(data);
}
