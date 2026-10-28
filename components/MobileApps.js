"use client";

import { useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOBILE_APPS } from "@/lib/data";

export default function MobileApps() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const ctx1 = gsap.context(() => {
      mm.add("(min-width: 800px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".trigger_selectedWrk_mobile_one",
            start: " bottom 80%",
            end: "bottom 90%",
            scrub: 2,
            ease: "slow",
          },
        });
        tl.to(".selected_mobile", { right: "67%", duration: 5 });
        tl.to(".selected_mobile_text", {
          translateX: "0",
          opacity: 1,
          duration: 2,
        });
      });
    });
    const ctx2 = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".trigger_selectedWrk_mobile_two",
          start: " bottom 80%",
          end: "bottom 90%",
          scrub: true,
          ease: "slow",
        },
      });
      tl.to(".selected_mobile2", { left: "67%", duration: 5 });
      tl.to(".selected_mobile_text2", {
        translateX: "0",
        opacity: 1,
        duration: 2,
      });
    });
    return () => {
      ctx1.revert();
      ctx2.revert();
      mm.revert();
    };
  }, []);

  const first = MOBILE_APPS[0];
  const second = MOBILE_APPS[1];

  return (
    <div className="mb-16 rounded-2xl ">
      <>
        <p className="font-bold text-[7vw] tracking-wide lg:pb-10 pb-4 lg:mt-0">
          Mobile Applications
        </p>

        <div className="relative flex trigger_selectedWrk_mobile_one flex-col lg:flex-row">
          <div
            className="absolute inset-0 selected_mobile lg:block hidden"
            style={{ background: first.color }}
          >
            <div className="w-[100%] p-3  selected_mobile_text text-white opacity-0 -translate-x-10">
              <h4 className="text-[clamp(1.2rem,2.2vw,3rem)] font-bold">
                {first.name}
              </h4>
              <p className="mt-2 text-xl tracking-wide">{first.desc}</p>
              <div className="mt-6 flex justify-around">
                <button className="bg-white text-black p-2 rounded-lg font-semibold hover:scale-110 transition-all">
                  <a href={first.repo} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </button>
                <button className="bg-white text-black p-2 rounded-lg font-semibold hover:scale-110 transition-all">
                  <a href={first.repo} target="_blank" rel="noreferrer">
                    Repository
                  </a>
                </button>
              </div>
            </div>
          </div>
          <div className="lg:w-[33%]">
            <div className="lg:hidden block">
              <h4 className="text-[clamp(1.2rem,2.2vw,3rem)] font-bold">
                {first.name}
              </h4>
              <p className="mt-2 text-xl tracking-wide">{first.desc}</p>
            </div>
          </div>
          <div className="flex gap-2 [&_img]:shadow-lg lg:w-[67%] justify-between lg:pl-5 overflow-scroll">
            {first.images.map((src, i) => (
              <Image
                key={src}
                src={src}
                width={200}
                height={500}
                alt={`${first.name}${i || ""}`}
              />
            ))}
          </div>
        </div>

        <div className="relative flex mt-20 trigger_selectedWrk_mobile_two lg:flex-row flex-col-reverse">
          <div
            className="absolute inset-0 selected_mobile2 lg:block hidden"
            style={{ background: second.color }}
          >
            <div className="p-3 text-white translate-x-10 opacity-0 selected_mobile_text2">
              <h4 className="text-[clamp(1.2rem,2.2vw,3rem)] font-bold">
                {second.name}
              </h4>
              <p className="mt-2 text-xl tracking-wide">{second.desc}</p>
              <div className="mt-6 flex justify-around">
                <button className="bg-white text-black p-2 rounded-lg font-semibold hover:scale-110 transition-all">
                  <a href={second.repo} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </button>
                <button className="bg-white text-black p-2 rounded-lg font-semibold hover:scale-110 transition-all">
                  <a href={second.repo} target="_blank" rel="noreferrer">
                    Repository
                  </a>
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2 [&_img]:shadow-lg lg:w-[67%] justify-between lg:pr-5 overflow-scroll">
            {second.images.map((src, i) => (
              <Image
                key={src}
                src={src}
                width={200}
                height={500}
                alt={`${second.name}${i + 1}`}
              />
            ))}
          </div>
          <div className="lg:w-[33%]">
            <div className="lg:hidden block">
              <h4 className="text-[clamp(1.2rem,2.2vw,3rem)] font-bold">
                {second.name}
              </h4>
              <p className="mt-2 text-xl tracking-wide">{second.desc}</p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
