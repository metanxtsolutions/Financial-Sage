import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { Section } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MdxContent } from "@/components/MdxContent";
import { Sources } from "@/components/Sources";
import Link from "next/link";
import { JsonLd, articleSchema, breadcrumbSchema, howToSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl, withOpenGraph } from "@/lib/metadata";
import { formatDate } from "@/lib/dates";
import { authorPath } from "@/data/authors";
import {
  getAllPostSlugs,
  getPostAuthor,
  getPostBySlug,
  getPostReview,
  getRelatedPosts,
  readingTimeMinutes,
} from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const author = getPostAuthor(post);
  // withOpenGraph supplies og:image, og:site_name and og:locale, which this
  // page used to lose by declaring its own block to get `type: article`.
  return withOpenGraph(
    {
      title: post.title,
      description: post.description,
      alternates: { canonical: `/gst-guides/${slug}` },
      ...(author ? { authors: [{ name: author.name, url: absoluteUrl(authorPath(author)) }] } : {}),
    },
    {
      type: "article",
      publishedTime: post.date,
      ...(post.updated ? { modifiedTime: post.updated } : {}),
      ...(author ? { authors: [absoluteUrl(authorPath(author))] } : {}),
    },
  );
}

const Dot = () => (
  <span aria-hidden="true" className="text-neutral-300">
    ·
  </span>
);

export default async function GstGuidePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${siteConfig.url}/gst-guides/${slug}`;
  const author = getPostAuthor(post);
  const review = getPostReview(post);
  const related = getRelatedPosts(slug);
  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "GST Guides", url: `${siteConfig.url}/gst-guides` },
    { name: post.title, url },
  ];

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.description,
            url,
            datePublished: post.date,
            dateModified: post.updated,
            author: author ?? undefined,
            reviewedBy: review?.reviewer,
            reviewed: review?.date,
            sources: post.sources,
            speakable: ["#short-answer", "#key-takeaways"],
          }),
          ...(post.howTo ? [howToSchema({ name: post.howTo.name, url, steps: post.howTo.steps })] : []),
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
        <article className="mx-auto mt-4 max-w-2xl">
          <header>
            <Badge tone="brand" variant="outline">{post.category}</Badge>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">{post.title}</h1>
            {/* Attribution, freshness and length. Answer engines weigh these, and
                a reader deciding whether to start wants them too. "Updated" only
                appears when a post was genuinely revised, and a named author or
                reviewer only once one exists in src/data/authors.ts. */}
            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-500">
              <span>
                By{" "}
                {author ? (
                  <Link href={authorPath(author)} className="font-medium text-neutral-700 underline">
                    {author.name}
                  </Link>
                ) : (
                  siteConfig.name
                )}
                {author && `, ${author.jobTitle}`}
              </span>
              <Dot />
              <span>
                Published <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              {post.updated && (
                <>
                  <Dot />
                  <span>
                    Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                  </span>
                </>
              )}
              <Dot />
              <span>{readingTimeMinutes(post.content)} min read</span>
            </div>
            {review && (
              <p className="mt-1 text-sm text-neutral-500">
                Reviewed by{" "}
                <Link href={authorPath(review.reviewer)} className="font-medium text-neutral-700 underline">
                  {review.reviewer.name}
                </Link>
                , {review.reviewer.jobTitle}, on{" "}
                <time dateTime={review.date}>{formatDate(review.date)}</time>
              </p>
            )}
          </header>

          {/* The answer first, then the article. Someone who came with a
              question gets it in the first screen, and an answer engine gets a
              passage that stands on its own. The ids are what the Speakable
              markup above points at. */}
          <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
            <p id="short-answer" className="text-neutral-800">
              <strong className="font-semibold text-neutral-900">Short answer: </strong>
              {post.answer}
            </p>
            <div id="key-takeaways">
              <h2 className="mt-5 text-base font-bold text-neutral-900">Key takeaways</h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-neutral-700">
                {post.takeaways.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          <MdxContent source={post.content} />

          <Sources ids={post.sources} className="mt-12" />

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
        </article>
      </Section>
    </>
  );
}
