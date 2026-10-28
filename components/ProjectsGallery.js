"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const mobileImages = ["2.webp", "5.webp", "6.webp", "7.webp", "9.webp"];

export default function ProjectsGallery() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const { height } = size;
  const y = useTransform(scrollYProgress, [0, 1], [0, 1.5 * height]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 2 * height]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 4 * height]);

  useEffect(() => {
    const onResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <main className="pt-[200vh]  -mx-6 ">
      {size.width < 768 ? (
        <div className="mx-2 ">
          {" "}
          <h2 className="font-semibold lg:text-[4vw] text-2xl mb-5 ml-2">
            Projects
          </h2>
          {mobileImages.map((file) => (
            <div className="mb-8 " key={file}>
              <Image
                src={`/image/websitesImg/${file}`}
                alt="image"
                width={400}
                height={400}
                className="lg:object-cover object-fill object-top  shadow-2xl m-auto"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={ref}
          className="h-[350vh] relative flex py-5 lg:px-14 px-3 gap-8 overflow-hidden"
        >
          <Column images={["1.webp", "2.webp", "3.webp"]} y={{ y, top: "-20%" }} />
          <Column images={["4.webp", "5.webp", "6.webp"]} y={{ y: y2, top: "-50%" }} />
          <Column images={["7.webp", "8.webp", "9.webp"]} y={{ y: y3, top: "-30%" }} />
        </div>
      )}
    </main>
  );
}

function Column({ images, y }) {
  return (
    <motion.div
      className=" w-full relative h-full flex flex-col gap-[2vw]"
      style={y}
    >
      {images.map((file, index) => (
        <div
          className="relative w-full h-full overflow-hidden border "
          key={index}
        >
          <Image
            src={`/image/websitesImg/${file}`}
            alt="image"
            fill
            className="lg:object-cover object-fill object-top shadow-2xl"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ))}
    </motion.div>
  );
}
