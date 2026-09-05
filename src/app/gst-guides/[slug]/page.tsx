import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { Section } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MdxContent } from "@/components/MdxContent";
import Link from "next/link";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/gst-guides/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/gst-guides/${slug}`,
      publishedTime: post.date,
    },
  };
}

export default async function GstGuidePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);
  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "GST Guides", url: `${siteConfig.url}/gst-guides` },
    { name: post.title, url: `${siteConfig.url}/gst-guides/${slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.description,
            url: `${siteConfig.url}/gst-guides/${slug}`,
            datePublished: post.date,
          }),
          breadcrumbSchema(breadcrumbs),
        ]}
      />
      <Section>
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "GST Guides", href: "/gst-guides" },
            { name: post.title, href: `/gst-guides/${slug}` },
          ]}
        />
        <div className="mx-auto mt-4 max-w-2xl">
          <Badge tone="brand" variant="outline">{post.category}</Badge>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-neutral-400">
            {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <MdxContent source={post.content} />

          {related.length > 0 && (
            <div className="mt-14 border-t border-neutral-200 pt-8">
              <h2 className="text-xl font-bold text-neutral-900">Keep reading</h2>
              <ul className="mt-4 space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/gst-guides/${r.slug}`}
                      className="group block rounded-xl border border-neutral-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover"
                    >
                      <span className="text-xs font-semibold tracking-wide text-brand-700 uppercase">
                        {r.category}
                      </span>
                      <span className="mt-1 block font-semibold text-neutral-900 group-hover:text-brand-700">
                        {r.title}
                      </span>
                      <span className="mt-1 block text-sm text-neutral-600">{r.excerpt}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/gst-guides"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"
              >
                All GST guides <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
