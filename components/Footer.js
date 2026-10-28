import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/data";

export default function Footer() {
  const socials = [{ name: "github.svg", url: SITE.github }];

  return (
    <>
      <div
        className="relative lg:h-[480px] h-[600px] bg-gradient-to-br from-slate-100 via-white to-slate-50"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        id="footer"
      >
        <div className="fixed bottom-0  w-full  left-0 right-0 ">
          <div className="flex justify-between flex-col  h-full">
            <div className=" text-center">
              <span className="bg-gradient-to-br from-slate-100 via-white to-slate-50 p-2 lg:text-[3vw] text-xl font-bold gradient-text">
                Contact Me
              </span>
            </div>
            <div className="flex justify-center flex-wrap gap-10 my-[10vh]">
              <a
                href={`mailto:${SITE.email}`}
                className="flex gap-3 items-center shadow-xl p-5 bg-white rounded-2xl border border-slate-200 hover:border-primary-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <Image alt="mail" src="/image/footer/mail.svg" width={30} height={30} />
                <span>{SITE.email}</span>
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                className="flex gap-3 items-center shadow-xl p-5 bg-white rounded-2xl border border-slate-200 hover:border-primary-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <Image
                  alt="github"
                  src="/image/footer/github.svg"
                  width={30}
                  height={30}
                />
                <span>github.com/mansuraananmita-wq</span>
              </a>
            </div>
            <div className="border-b-2 my-2 border-primary-300">
              <div className="flex gap-6 justify-center bg-gradient-to-br from-slate-100 via-white to-slate-50 w-[180px] mx-auto -mb-3 p-2 rounded-full">
                {socials.map((item) => (
                  <Link
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    className="hover:scale-110 transition-transform duration-300"
                  >
                    <Image
                      src={`/image/footer/${item.name}`}
                      width={32}
                      height={32}
                      className="object-contain hover:drop-shadow-lg transition-all duration-300"
                      alt={item.name}
                    />
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <p className="text-center py-10 text-primary-600 font-bold text-[clamp(1.4rem,3.5vw,3.5rem)] animate-pulse-slow">
                &quot;Thanks for Scrolling&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
