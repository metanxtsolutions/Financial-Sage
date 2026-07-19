import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Container";
import { getAllPosts, blogCategories } from "@/lib/blog";

export const metadata: Metadata = {
  title: "GST Guides: Registration, Filing & Compliance Explained",
  description: "Plain-English guides on GST registration, filing, notices, ITC, and compliance for Indian MSMEs and freelancers.",
  alternates: { canonical: "/gst-guides" },
};

export default function GstGuidesPage() {
  const posts = getAllPosts();

  return (
    <Section>
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">GST Guides</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">
        Plain-English writing on GST registration, filing, notices, and compliance. No jargon, no filler.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {blogCategories.map((cat) => (
          <span key={cat} className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600">
            {cat}
          </span>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/gst-guides/${post.slug}`}
            className="rounded-xl border border-neutral-200 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">{post.category}</span>
            <h2 className="mt-2 font-semibold text-neutral-900">{post.title}</h2>
            <p className="mt-2 text-sm text-neutral-600">{post.excerpt}</p>
            <p className="mt-3 text-xs text-neutral-400">
              {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
