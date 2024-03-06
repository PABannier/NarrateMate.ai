import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data } = await supabase
    .from("summary")
    .select("*")
    .eq("id", params.id);
  return NextResponse.json(data);
}

// need to check whether it works
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data } = await supabase
    .from("summary")
    .delete()
    .match({ id: params.id });
  return NextResponse.json(data);
}
