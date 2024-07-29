"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Stars from "./components/Stars";
import LionMap from "./components/LionMap";
import lionBg from "../../public/images/bg-lion.jpeg";

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
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [areas, setAreas] = useState<number[][]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get<Video[]>("/api/getVideo");
        setVideos(response.data);
        generateRandomAreas(10); // 10개의 랜덤 영역을 생성
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

  const handleAreaClick = () => {
    if (videos.length > 0) {
      const randomVideo = videos[Math.floor(Math.random() * videos.length)];
      setSelectedVideo(randomVideo);
      console.log("선택비디오", selectedVideo);
    }
  };

  const handleAreaHover = (index: number) => {
    console.log(`Hovering over area ${index}`);
  };

  const handleAreaHoverExit = () => {
    console.log("Hover exit");
  };

  const generateRandomAreas = (numAreas: number) => {
    const newAreas = [];
    for (let i = 0; i < numAreas; i++) {
      const x1 = Math.floor(Math.random() * 400); // 예시로 400x400 영역을 사용
      const y1 = Math.floor(Math.random() * 400);
      const x2 = x1 + Math.floor(Math.random() * 100);
      const y2 = y1 + Math.floor(Math.random() * 100);
      newAreas.push([x1, y1, x2, y2]);
    }
    setAreas(newAreas);
  };

  return (
    <>
      <Stars />
      <section className="w-full flex min-h-screen items-center justify-center">
        <div className="w-full">
          <div className="text-white text-2xl absolute top-10 right-8">
            LION PRINCE
          </div>
          <div className="relative flex w-3/5 justify-center items-center">
            {selectedVideo && (
              <div className="w-full text-xs flex flex-col gap-3 px-6 py-5 bg-white z-0">
                <div className="border rounded-lg p-4 shadow-lg">
                  <h2 className="text-xl font-bold text-white">
                    {selectedVideo.title}
                  </h2>
                  <p>{selectedVideo.description}</p>
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    className="w-full h-auto mt-2"
                  />
                </div>
              </div>
            )}
            <LionMap
              lionBg={lionBg.src}
              areas={areas}
              handleAreaClick={handleAreaClick}
              handleAreaHover={handleAreaHover}
              handleAreaHoverExit={handleAreaHoverExit}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
