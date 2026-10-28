import { notFound } from "next/navigation";
import { POSTS, SITE } from "@/lib/data";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = POSTS.find((item) => item.slug === params.slug);
  if (!post) return { title: SITE.title };
  return { title: `${post.title} | ${SITE.fullName}` };
}

export default function BlogPostPage({ params }) {
  const post = POSTS.find((item) => item.slug === params.slug);
  if (!post) notFound();

  const paragraphs = post.body.split("\n\n");

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
      <article>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900  mb-6">
          {post.title}
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-6">
          {post.date} • {post.read}
        </p>
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 32)}
            className="text-lg text-gray-700  mb-6 leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
      </article>
    </main>
  );
}
