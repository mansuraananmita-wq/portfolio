import Link from "next/link";
import { POSTS } from "@/lib/data";

export const metadata = {
  title: "Blog Posts | Mansura Anan Mita",
};

export default function BlogPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 pb-10 pt-32">
      <h1 className="text-4xl font-bold mb-8">📝 Blog Posts</h1>
      <ul className="space-y-10">
        {POSTS.map((post) => (
          <li key={post.slug} className="border-b pb-6">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {post.date} • {post.read}
            </p>
            <p className="mt-3 text-gray-700">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-block mt-3 text-blue-600 hover:underline"
            >
              Read more →
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
