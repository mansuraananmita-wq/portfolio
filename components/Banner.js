"use client";

import { useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ABOUT_LEAD, ABOUT_REST, ABOUT_SECOND, SITE } from "@/lib/data";

const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

export default function Banner() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const { chars } = new SplitType("p.aboutme", { types: "words, chars" });
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".trigger",
            start: "top top",
            scrub: 1,
            pin: ".trigger",
          },
        })
        .to(".threedcompnets", { opacity: 0 })
        .to(".anim_text", {
          smoothOrigin: true,
          scale: 30,
          duration: 5,
          ease: "power2.inOut",
        })
        .from(
          ".extraBox",
          { scaleX: 0, ease: "power2.inOut", duration: 1, zIndex: -1 },
          "-=1"
        )
        .to(
          ".secondScreen",
          { ease: "power2.inOut", duration: 2, zIndex: 30, opacity: 1 },
          "-=1"
        )
        .to(".text-animation", { translateY: 1, duration: 10 }, 0)
        .fromTo(
          chars,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 3, ease: "ease" }
        );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative ">
      <main className="items-center justify-between bannerHome  absolute inset-0  h-screen w-screen trigger overflow-hidden">
        <div className="cursor-pointer h-full  absolute z-50  w-full threedcompnets">
          <ThreeScene />
        </div>
        <p className="text-[clamp(2.2rem,8vw,5rem)] font-bold anim_text frontend text-center gradient-text">
          {SITE.role}
        </p>
        <div className="w-full absolute inset-0 secondScreen opacity-0 h-screen z-20 bg-white shadow-2xl border-b-2 border-slate-200 overflow-hidden">
          <div className="text-animation translate-y-full h-full flex flex-col justify-center">
            <h1 className="text-[clamp(1.25rem,2.4vw,2.75rem)] font-bold flex justify-center mt-2 px-5 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Hi, I&apos;m {SITE.fullName}
            </h1>
            <p className="text-[clamp(1rem,1.55vw,1.65rem)] px-5 py-5 leading-relaxed aboutme overflow-hidden max-w-5xl mx-auto">
              <span className="font-semibold text-slate-700">{ABOUT_LEAD}</span>
              {ABOUT_REST}
              <br />
              <br />
              {ABOUT_SECOND}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
