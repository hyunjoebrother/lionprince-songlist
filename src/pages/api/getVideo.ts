export const runtime = "edge";
import type { NextApiRequest, NextApiResponse } from "next";

type Video = {
  title: string;
  description: string;
  publishedAt: string;
  videoId: string;
  thumbnail: string;
};

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Video[] | { error: string }>
): Promise<void> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=20`
    );

    if (!response.ok) {
      throw new Error(`YouTube API responded with status ${response.status}`);
    }

    const data = await response.json();

    const videos: Video[] = data.items.map((item: any) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.high.url,
    }));

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Error fetching videos" });
  }
}
