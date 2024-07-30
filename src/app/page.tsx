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
import HeadMeta from "./components/HeadMeta/HeadMeta";

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
      <HeadMeta />
      <Stars />
      <section className="w-full flex 2xs:flex-col xs:flex-col 2sm:flex-col sm:flex-col min-h-screen items-center justify-center">
        <div className="absolute 2xs:top-4 2xs:right-4 xs:top-4 xs:right-4 2sm:top-6 2sm:right-6 sm:top-8 sm:right-6 tb:top-6 tb:right-6 lg:top-10 lg:right-8 text-right z-30">
          <a href="/">
            <h3 className="font-brush text-white 2xs:text-lg xs:text-lg text-xl tb:text-2xl lg:text-2xl">
              LION PRINCE
            </h3>
            <h1 className="font-brush text-white 2xs:text-lg xs:text-lg text-xl tb:text-2xl lg:text-4xl">
              사자왕자의 노래 하나
            </h1>
          </a>
        </div>

        <div
          ref={lionMapRef}
          className="relative flex 2xs:flex-col xs:flex-col 2sm:flex-col sm:flex-col 2xs:absolute 2xs:top-28 2xs:w-[84vw] xs:absolute xs:top-32 xs:w-[80vw] 2sm:absolute 2sm:top-36 2sm:w-[72vw] sm:pb-10 sm:w-[68vw] tb:w-[50vw] lg:w-[44vw] h-[auto] justify-center items-center lion-map"
        >
          <LionMap lionBg={lionBg.src} handleAreaClick={handleAreaClick} />

          {selectedVideo && (
            <div
              ref={cardRef}
              className="w-full h-full 2xs:mb-10 xs:mb-10 2sm:mb-10 sm:mb-10 tb:ml-6 lg:ml-8 text-xs flex flex-col gap-3 z-10 border-white border-[1px] rounded-lg justify-center items-center"
            >
              <div className="2xs:w-[236px] xs:w-[280px] 2sm:w-[260px] sm:w-[320px] tb:w-[248px] lg:w-[300px] flex flex-col justify-center items-center rounded-lg p-3 shadow-lg">
                <div className="relative inline-block">
                  <img
                    src={songIcon.src}
                    alt=""
                    className="pt-1 2xs:w-8 2xs:h-8 xs:w-8 xs:h-8 2sm:w-10 2sm:h-10 sm:w-8 sm:h-8 w-10 h-10 lg:w-12 lg:h-12 cursor-pointer"
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
                <h2 className="flex flex-row xs:text-base text-lg lg:text-xl font-bold text-white border-b-[.6px] border-white pb-1">
                  {handleTitle(selectedVideo.title)}
                </h2>

                <p className="mt-3 p-2 xs:text-sm text-base lg:text-lg font-normal text-white font-brush">
                  {handleHashtag(selectedVideo.description)}
                </p>
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="2xs:mt-5 xs:mt-5 2sm:mt-4 sm:mt-4 mt-2 bg-[#73695C] text-white font-medium text-[0.6rem] lg:text-xs rounded py-1 px-2">
                    노래 들으러 가기
                  </p>
                </a>
              </div>
            </div>
          )}
        </div>

        {!selectedVideo && (
          <p className="absolute 2xs:flex 2xs:mt-10 xs:flex xs:mt-56 2sm:flex 2sm:mt-32 sm:bottom-28 tb:bottom-24 lg:bottom-16 font-brush text-white 2xs:text-lg xs:text-lg 2sm:text-xl sm:text-xl text-2xl">
            이미지를 클릭하여 사자왕자의 노래를 추천받아보세요!
          </p>
        )}

        {selectedVideo && (
          <>
            <div className="2xs:relative 2xs:mt-[100vh] xs:relative xs:mt-[128vh] 2sm:relative 2sm:mt-[108vh] sm:relative sm:mt-10 fixed bottom-4 tb:bottom-6 lg:bottom-6 left-0 w-full text-white py-2 flex flex-col gap-3 justify-center items-center z-10">
              <h3 className="font-brush xs:text-base text-lg lg:text-xl">
                사자왕자의 다른 노래 들으러 가기
              </h3>
              <ul className="flex gap-4 tb:gap-8 lg:gap-10">
                <li>
                  <a
                    href="https://www.youtube.com/@lionprince.x"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={youtubeIcon.src}
                      alt=""
                      className="2xs:w-8 2xs:h-8 xs:w-8 xs:h-8 2sm:w-6 2sm:h-6 sm:w-8 sm:h-8 w-10 h-10 lg:w-12 lg:h-12 cursor-pointer"
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
                      className="2xs:w-8 2xs:h-8 xs:w-8 xs:h-8 2sm:w-6 2sm:h-6  sm:w-8 sm:h-8 w-10 h-10 lg:w-12 lg:h-12 cursor-pointer"
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
                    className="2xs:w-8 2xs:h-8 xs:w-8 xs:h-8 2sm:w-6 2sm:h-6  sm:w-8 sm:h-8 w-10 h-10 lg:w-12 lg:h-12 cursor-pointer"
                  />
                </li>
              </ul>
              <p className="text-xs lg:text-base font-brush text-gray-500">
                Made By Mei
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Main;
