import { Lato } from "next/font/google";
import Navbar from "@/components/Navbar";
import { SITE } from "@/lib/data";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata = {
  title: SITE.title,
  description: SITE.description,
  authors: [{ name: SITE.fullName }],
  keywords: [
    "Full Stack Developer",
    "Web Applications",
    "Mobile Applications",
    "Portfolio",
    "React",
    "Flutter",
    "Next.js",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
