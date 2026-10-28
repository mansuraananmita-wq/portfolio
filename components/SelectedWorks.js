"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { WORKS } from "@/lib/data";

function playVideo(el) {
  if (!el) return;
  el.muted = true;
  const play = el.play();
  if (play && typeof play.catch === "function") {
    play.catch(() => {});
  }
}

function ProjectMedia({ src, poster, contain }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !src) return;

    const tryPlay = () => playVideo(el);
    tryPlay();
    el.addEventListener("canplay", tryPlay);
    el.addEventListener("loadeddata", tryPlay);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) tryPlay();
        });
      },
      { threshold: 0.2, rootMargin: "120px" }
    );
    io.observe(el);

    return () => {
      el.removeEventListener("canplay", tryPlay);
      el.removeEventListener("loadeddata", tryPlay);
      io.disconnect();
    };
  }, [src]);

  return (
    <div
      className={`w-full h-full threedtransform ${
        contain ? "aspect-video" : "aspect-auto"
      }`}
    >
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        perspective={1500}
        scale={1}
        glareEnable
        glareMaxOpacity={0.3}
        glareColor="#ffffff"
        glarePosition="all"
        className="w-full h-full will-change-transform"
      >
        <div className="w-full h-full overflow-hidden border videodivclass rounded-3xl border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300">
          {src ? (
            <video
              src={src}
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className={
                contain
                  ? "object-contain w-full h-full bg-slate-100"
                  : "object-cover w-full h-full"
              }
              id="Video"
              poster={poster}
            />
          ) : (
            <Image
              src={poster}
              alt="project"
              width={1440}
              height={900}
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </Tilt>
    </div>
  );
}

function ProjectCopy({ name, desc, url }) {
  return (
    <div className="lg:w-1/3 flex flex-col justify-center">
      <h3 className="font-bold lg:text-[4vw] text-2xl leading-tight text-slate-800 mb-4">
        {name}
      </h3>
      <p className="text-[clamp(1.1rem,1.8vw,2.5rem)] font-normal text-slate-600 leading-relaxed mb-8">
        {desc}
      </p>
      <Link
        href={`https://${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-fit"
      >
        <span className="font-medium tracking-wide text-lg">Live Site</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  );
}

export default function SelectedWorks() {
  return (
    <div className="lg:mb-16 mb-10 rounded-3xl bg-gradient-to-br from-slate-50 to-white -mx-7 px-6 pb-16 border border-slate-100">
      <p className="font-bold text-[7vw] tracking-wide lg:pb-[15vh] pb-6 lg:mt-0 mt-6 gradient-text">
        Selected works
      </p>
      {WORKS.map((work, i) => (
        <div
          key={work.name}
          className={`flex lg:flex-row  lg:gap-10 gap-5 ${
            i % 2 === 0 ? "flex-col-reverse " : "flex-col"
          }  ${i !== 0 ? "lg:mt-[30vh] mt-8" : ""}`}
        >
          {i % 2 === 0 ? (
            <>
              <ProjectCopy name={work.name} desc={work.desc} url={work.url} />
              <ProjectMedia
                src={work.video}
                poster={work.poster}
                contain={work.contain}
              />
            </>
          ) : (
            <>
              <ProjectMedia
                src={work.video}
                poster={work.poster}
                contain={work.contain}
              />
              <ProjectCopy name={work.name} desc={work.desc} url={work.url} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
