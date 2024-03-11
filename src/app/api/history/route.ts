import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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

export async function DELETE(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  const { data } = await supabase.from("summary").delete().eq("id", id);
  if (!data) {
    return NextResponse.json({ message: "No data found" });
  }

  return NextResponse.json(data);
}
