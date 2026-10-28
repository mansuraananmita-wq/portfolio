"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

const ProjectsGallery = dynamic(() => import("@/components/ProjectsGallery"), {
  ssr: false,
});
const SelectedWorks = dynamic(() => import("@/components/SelectedWorks"), {
  ssr: false,
});
const MobileApps = dynamic(() => import("@/components/MobileApps"), {
  ssr: false,
});
const Tools = dynamic(() => import("@/components/Tools"), { ssr: false });
const KeyFeatures = dynamic(() => import("@/components/KeyFeatures"), {
  ssr: false,
});

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    document.documentElement.classList.add("lenis");
    return () => {
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return (
    <div className="relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-3/4 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-4000"></div>
      </div>
      <Banner />
      <div className="mx-7 relative z-[1]">
        <ProjectsGallery />
        <SelectedWorks />
        <MobileApps />
        <KeyFeatures />
        <Tools />
      </div>
      <Footer />
    </div>
  );
}
