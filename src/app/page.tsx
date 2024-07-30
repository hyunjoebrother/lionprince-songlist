"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Stars from "./components/Stars";
import LionMap from "./components/LionMap";
import lionBg from "../../public/images/bg-lion.jpeg";
import songIcon from "../../public/images/icon-song.png";
import youtubeIcon from "../../public/images/icon-youtube.png";
import instaIcon from "../../public/images/icon-insta.png";
import mailIcon from "../../public/images/icon-mail.png";

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
  const [randomVideo, setRandomVideo] = useState<Video | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const lionMapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/getVideo");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('ddd', response)
        const data: Video[] = await response.json();
        setVideos(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setError(`Error fetching videos: ${errorMessage}`);
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleAreaClick = () => {
    if (videos.length > 0) {
      const video = videos[Math.floor(Math.random() * videos.length)];
      setSelectedVideo(video);
      setRandomVideo(video);
    }
  };

  function handleTitle(title: string): string {
    const prefix = "[사자왕자의 노래방]";
    const suffix = "(cover)";

    if (title.startsWith(prefix) && title.endsWith(suffix)) {
      const start = prefix.length;
      const end = title.length - suffix.length;
      return title.substring(start, end).trim();
    }

    return title;
  }

  function handleHashtag(text: string): string {
    const hashTagPattern = /#[^\s#]+/g;
    let lastHashTagIndex = -1;

    let match;
    while ((match = hashTagPattern.exec(text)) !== null) {
      lastHashTagIndex = match.index + match[0].length;
    }

    if (lastHashTagIndex !== -1) {
      return text.substring(lastHashTagIndex).trim();
    }

    return text;
  }

  const handleCopyClipBoard = (text: string) => {
    try {
      navigator.clipboard.writeText(text).then((res) => {
        alert("메일 복사 완료!");
      });
    } catch (error) {
      alert("복사 실패!");
    }
  };

  return (
    <>
      <Stars />
      <section className="w-full flex min-h-screen items-center justify-center">
        <div className="absolute top-10 right-8 text-right">
          <a href="/">
            <h3 className="font-brush text-white text-2xl">LION PRINCE</h3>
            <h1 className="font-brush text-white text-4xl">
              사자왕자의 노래 하나
            </h1>
          </a>
        </div>

        <div
          ref={lionMapRef}
          className="relative flex w-[44vw] h-[auto] justify-center items-center lion-map"
        >
          <LionMap lionBg={lionBg.src} handleAreaClick={handleAreaClick} />

          {selectedVideo && (
            <div
              ref={cardRef}
              className="w-full h-full ml-8 text-xs flex flex-col gap-3 z-10 border-white border-[1px] rounded-lg justify-center items-center"
            >
              <div className="w-[300px] flex flex-col justify-center items-center rounded-lg p-3 shadow-lg">
                <div className="relative inline-block">
                  <img
                    src={songIcon.src}
                    alt=""
                    className="pt-1 w-12 h-12 cursor-pointer"
                  />
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    className="w-full h-auto rounded-lg"
                  />
                </a>
                <h2 className="flex flex-row text-xl font-bold text-white border-b-[.6px] border-white pb-1">
                  {handleTitle(selectedVideo.title)}
                </h2>

                <p className="mt-3 p-2 text-lg font-normal text-white font-brush">
                  {handleHashtag(selectedVideo.description)}
                </p>
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="mt-2 bg-[#73695C] text-white text-xs rounded py-1 px-2">
                    노래 들으러 가기
                  </p>
                </a>
              </div>
            </div>
          )}
        </div>

        {!selectedVideo && (
          <p className="absolute bottom-16 font-brush text-white text-2xl">
            이미지를 클릭하여 사자왕자의 노래를 추천받아보세요!
          </p>
        )}

        {selectedVideo && (
          <>
            <div className="fixed bottom-6 left-0 w-full text-white py-2 flex flex-col gap-4 justify-center items-center z-10">
              <h3 className="font-brush text-lg">
                사자왕자의 다른 노래 들으러 가기
              </h3>
              <ul className="flex gap-8">
                <li>
                  <a
                    href="https://www.youtube.com/@lionprince.x"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={youtubeIcon.src}
                      alt=""
                      className="w-10 h-10 cursor-pointer"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/lionprince.x"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={instaIcon.src}
                      alt=""
                      className="w-10 h-10 cursor-pointer"
                    />
                  </a>
                </li>
                <li
                  onClick={() =>
                    handleCopyClipBoard("lionprince.official@gmail.com")
                  }
                >
                  <img
                    src={mailIcon.src}
                    alt=""
                    className="w-10 h-10 cursor-pointer"
                  />
                </li>
              </ul>
              <p className="text-xs font-brush text-gray-500">Made By Mei</p>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Main;
