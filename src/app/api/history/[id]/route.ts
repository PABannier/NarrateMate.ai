import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getYouTubeVideoTitle } from "@/lib/youtube";
import { convertKeysToCamelCase } from "@/lib/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const { data } = await supabase
    .from("summary")
    .select("*")
    .eq("id", params.id)
    .single();
  const youtubeVideoId = data.youtube_video_id;
  const title = await getYouTubeVideoTitle(youtubeVideoId);
  data.title = title;
  //TODO: get the subtitles for the youtube video
  const camelCaseData = convertKeysToCamelCase(data);
  return NextResponse.json(camelCaseData);
}
