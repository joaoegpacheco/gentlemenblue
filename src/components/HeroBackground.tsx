"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { assets } from "@/lib/assets";

const MEDIA_CLASS =
  "object-cover object-[72%_center] lg:object-[right_center]";

export function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const showVideo = () => setVideoVisible(true);
    const hideVideo = () => setVideoVisible(false);

    video.addEventListener("playing", showVideo);
    video.addEventListener("error", hideVideo);

    if (video.readyState >= 2 && !video.paused) {
      showVideo();
    }

    return () => {
      video.removeEventListener("playing", showVideo);
      video.removeEventListener("error", hideVideo);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <Image
        src={assets.images.heroBg}
        alt=""
        fill
        priority
        sizes="100vw"
        className={MEDIA_CLASS}
        aria-hidden
      />

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={assets.images.heroBg}
        className={`absolute inset-0 h-full w-full ${MEDIA_CLASS} transition-opacity duration-700 ${
          videoVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      >
        <source src={assets.videos.hero} type="video/mp4" />
      </video>
    </div>
  );
}
