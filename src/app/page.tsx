"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

type Video = {
  title: string;
  description: string;
  publishedAt: string;
  videoId: string;
  thumbnail: string;
};

const Main: React.FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get<Video[]>("/api/getVideo");
        console.log('데이터 정보', response)
        setVideos(response.data);
      } catch (error) {
        setError("Error fetching videos");
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      <section className="w-full flex min-h-screen flex-col lg:px-28 xs:gap-10 gap-12 tb:gap-16 lg:gap-20 items-center 2xs:pt-20 xs:pt-24 2sm:pt-28 sm:pt-28 tb:pt-32 pt-40 overflow-hidden bg-gradient-to-b from-pink-200 to-pink-400 backdrop-blur-2xl">
        <div className="w-full">
          <h3 className="pl-8 mb-2 font-bold 2xs:text-sm xs:text-lg text-xl">
            사자왕자
          </h3>
          <div className="w-full text-xs 2sm:text-sm sm:text-sm tb:text-sm lg:text-xl flex flex-col gap-3 px-6 py-5 bg-white">
            <ul>
              {videos.map((video) => (
                <li key={video.videoId}>
                  <h2>{video.title}</h2>
                  <p>{video.description}</p>
                  <img src={video.thumbnail} alt={video.title} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
