"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Stars from "./components/Stars";
import LionMap from "./components/LionMap";
import Image from "next/image";
import lionBg from "../../public/images/bg-lion.jpeg";

type Video = {
  title: string;
  description: string;
  publishedAt: string;
  videoId: string;
  thumbnail: string;
};

const Main: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const lionMapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get<Video[]>("/api/getVideo");
        setVideos(response.data);
      } catch (error) {
        setError("Error fetching videos");
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleAreaClick = () => {
    if (videos.length > 0) {
      const randomVideo = videos[Math.floor(Math.random() * videos.length)];
      setSelectedVideo(randomVideo);
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      cardRef.current &&
      lionMapRef.current &&
      !cardRef.current.contains(event.target as Node) &&
      !lionMapRef.current.contains(event.target as Node)
    ) {
      setSelectedVideo(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <Stars />
      <section className="w-full flex min-h-screen items-center justify-center">
        <h3 className="absolute top-10 right-6 text-white text-2xl">LION PRINCE</h3>
        <div
          ref={lionMapRef}
          className="relative flex w-[48vw] h-[auto] justify-center items-center lion-map"
        >
          <LionMap lionBg={lionBg.src} handleAreaClick={handleAreaClick} />
          {selectedVideo && (
            <div
              ref={cardRef}
              className="w-[30vw] h-[60vh] text-xs flex flex-col gap-3 px-6 py-5 bg-white z-10"
            >
              <div className="border rounded-lg p-4 shadow-lg">
                <h2 className="text-xl font-bold text-black">
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
        </div>
      </section>
    </>
  );
};

export default Main;
