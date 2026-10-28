"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TOOLS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

function ToolGrid() {
  const refs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".toolsTrigger",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });
      refs.current.forEach((el) => {
        tl.fromTo(
          el,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, ease: "ease", duration: 1 }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 lg:gap-10 toolsTrigger max-w-6xl mx-auto">
      {TOOLS.map((tool, index) => (
        <div
          key={tool.name}
          className="tool group relative p-8 lg:p-10 m-2 text-center rounded-2xl bg-gradient-to-br from-white to-slate-50 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-3 border border-slate-100 hover:border-primary-200"
          ref={(el) => (refs.current[index] = el)}
        >
          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 group-hover:from-primary-200 group-hover:to-accent-200 transition-all duration-300 group-hover:scale-110">
              <Image
                src={`/image/tools/${tool.image}`}
                alt={tool.name}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="font-semibold text-lg text-slate-700 capitalize group-hover:text-primary-600 transition-colors duration-300">
              {tool.name}
            </p>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-50/50 to-accent-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      ))}
    </div>
  );
}

export default function Tools() {
  return (
    <div className="mb-16">
      <p className="font-bold text-[7vw] tracking-wide lg:py-[8vh] py-4 gradient-text">
        TOOLS
      </p>
      <ToolGrid />
    </div>
  );
}
