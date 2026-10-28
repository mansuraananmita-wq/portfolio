"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const items = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Download CV", href: SITE.cv, download: SITE.cvDownload },
    { name: "Let's talk", href: "/#footer" },
  ];

  return (
    <nav className="flex justify-between flex-wrap items-center gap-4 py-5 px-5 absolute z-50 lg:left-10 lg:right-10 left-5 right-5 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
      <Link href="/" className="relative flex items-center gap-3">
        <Image
          src="/image/My_img.webp"
          alt={`${SITE.fullName}'s profile picture`}
          width={80}
          height={80}
          priority
        />
        <div className="w-5 h-5 bg-green-400 rounded-full left-[58px] top-[50px] absolute animate-pulse"></div>
        <div className="font-bold text-lg bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          {SITE.name}
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-5 md:gap-8 font-medium">
        {items.map((item) => (
          <Fragment key={item.name}>
            {item.download ? (
              <div className="flex items-center gap-1">
                <a
                  href={item.href}
                  download={item.download}
                  className="hover:text-primary-500 transition-colors duration-300 flex items-center gap-2"
                >
                  {item.name}
                </a>
                <Image
                  src="/image/download.svg"
                  alt="Download Icon"
                  width={15}
                  height={15}
                />
              </div>
            ) : item.name === "Let's talk" ? (
              <Link href={item.href} onClick={close}>
                <div className="py-3 border-2 border-primary-500 rounded-2xl lg:py-4 px-9 bg-primary-500 text-white hover:bg-primary-600 hover:border-primary-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  {item.name}
                </div>
              </Link>
            ) : (
              <Link
                href={item.href}
                className={
                  pathname === item.href
                    ? "text-primary-500 font-bold"
                    : "hover:text-primary-400 transition-colors duration-300"
                }
                onClick={close}
              >
                {item.name}
              </Link>
            )}
          </Fragment>
        ))}
      </div>

      <button
        className="md:hidden z-[1000] relative w-8 h-8 flex flex-col justify-center items-center gap-1 focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
      >
        <span
          className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
            open ? "rotate-45 translate-y-1" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
            open ? "-rotate-45 -translate-y-1" : ""
          }`}
        ></span>
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-90 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={close}
      >
        <div
          className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full pt-20 pb-10">
            <div className="px-6 mb-10">
              <Link href="/" className="flex items-center gap-3" onClick={close}>
                <Image
                  src="/image/My_img.webp"
                  alt={`${SITE.fullName}'s profile picture`}
                  width={60}
                  height={60}
                  priority
                />
                <div className="font-bold text-lg bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                  {SITE.name}
                </div>
              </Link>
            </div>
            <div className="flex flex-col space-y-6 px-6 flex-grow">
              {items.map((item) => (
                <Fragment key={item.name}>
                  {item.download ? (
                    <div className="flex items-center gap-2">
                      <a
                        href={item.href}
                        download={item.download}
                        className="text-xl text-white transition-colors flex items-center gap-2"
                        onClick={close}
                      >
                        {item.name}
                        <Image
                          src="/image/download.svg"
                          alt="Download Icon"
                          width={16}
                          height={16}
                        />
                      </a>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-xl text-white py-2 ${
                        pathname === item.href ? " font-bold" : "hover:text-gray-300"
                      }`}
                      onClick={close}
                    >
                      {item.name}
                    </Link>
                  )}
                </Fragment>
              ))}
            </div>
            <div className="px-6 mt-auto">
              <div className="border-t border-gray-700 pt-6">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} {SITE.fullName}. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
