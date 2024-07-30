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

// const API_KEY = process.env.YOUTUBE_API_KEY;
// const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

const API_KEY = 'AIzaSyCmgJRbQ9pVis0Wyw-dnjnQPAev0ijr0Yg'
const CHANNEL_ID = 'UCotHswCIyQrBZjNOYEVg7CA'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Video[] | { error: string }>
): Promise<void> {
  try {
    if (!API_KEY || !CHANNEL_ID) {
      throw new Error("Missing API_KEY or CHANNEL_ID");
    }

    console.log("API_KEY:", API_KEY); 
    console.log("CHANNEL_ID:", CHANNEL_ID);

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

    console.log("YouTube API response:", response.data);

    const videos: Video[] = response.data.items.map((item: any) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.high.url,
    }));

    res.status(200).json(videos);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
    } else {
      console.error("Error fetching videos:", error);
    }
    res.status(500).json({ error: "Error fetching videos" });
  }
}
