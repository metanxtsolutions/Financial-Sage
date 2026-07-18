import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MdxContent } from "@/components/MdxContent";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";

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
  };
}

export default async function GstGuidePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "GST Guides", url: `${siteConfig.url}/gst-guides` },
    { name: post.title, url: `${siteConfig.url}/gst-guides/${slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Section>
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "GST Guides", href: "/gst-guides" },
            { name: post.title, href: `/gst-guides/${slug}` },
          ]}
        />
        <div className="mx-auto mt-4 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">{post.category}</span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-neutral-400">
            {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <MdxContent source={post.content} />
        </div>
      </Section>
    </>
  );
}
