export const runtime = "edge";
import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

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
  res: NextApiResponse
) {
  if (!API_KEY || !CHANNEL_ID) {
    return res.status(500).json({ error: "API Key or Channel ID not set" });
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

    return res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const status = axiosError.response.status;
        const data = axiosError.response.data;

        if (typeof data === "object" && data !== null && "error" in data) {
          const errorMessage = (data as { error: { message: string } }).error
            .message;
          console.error("Error response:", errorMessage);
          return res
            .status(status)
            .json({ error: `Error fetching videos: ${errorMessage}` });
        } else {
          console.error("Error response:", data);
          return res
            .status(status)
            .json({ error: `Error fetching videos: ${JSON.stringify(data)}` });
        }
      } else if (axiosError.request) {
        console.error("Error request:", axiosError.request);
        return res
          .status(500)
          .json({ error: "Error fetching videos: No response received" });
      } else {
        console.error("Error message:", axiosError.message);
        return res
          .status(500)
          .json({ error: `Error fetching videos: ${axiosError.message}` });
      }
    } else {
      console.error("Unexpected error:", error);
      return res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
}
