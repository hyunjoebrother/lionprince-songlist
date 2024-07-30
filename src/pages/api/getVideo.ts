export const runtime = "edge";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

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
  if (!API_KEY || !CHANNEL_ID) {
    res.status(500).json({ error: "API Key or Channel ID not set" });
    return;
  }

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          key: API_KEY,
          channelId: CHANNEL_ID,
          part: "snippet",
          order: "date",
          maxResults: 20,
        },
      }
    );

    const videos: Video[] = response.data.items.map((item: any) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.high.url,
    }));

    res.status(200).json(videos);
  } catch (error: any) {
    console.error("Error fetching videos:", error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        res
          .status(500)
          .json({
            error: `Error fetching videos: ${error.response.data.error.message}`,
          });
      } else if (error.request) {
        console.error("Error request:", error.request);
        res
          .status(500)
          .json({ error: "Error fetching videos: No response received" });
      } else {
        console.error("Error message:", error.message);
        res
          .status(500)
          .json({ error: `Error fetching videos: ${error.message}` });
      }
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
}
