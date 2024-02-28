export function extractYouTubeVideoId(youtubeUrl: string) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = youtubeUrl.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}
