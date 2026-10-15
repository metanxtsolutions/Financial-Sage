import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { defaultAuthorId, getAuthor, type Author } from "@/data/authors";
import { isSourceId, type SourceId } from "@/data/sources";

const CONTENT_DIR = path.join(process.cwd(), "content", "gst-guides");

export const blogCategories = [
  "GST Basics",
  "Registration",
  "Filing",
  "Notices",
  "ITC",
  "GST for E-commerce",
  "GST for Freelancers",
  "Updates",
] as const;

export interface PostHowTo {
  /** What the procedure achieves, phrased as a task. */
  name: string;
  /** The steps exactly as the guide shows them, in the same order. */
  steps: { name: string; text: string }[];
}

export interface PostFrontmatter {
  title: string;
  description: string;
  category: string;
  date: string;
  excerpt: string;
  /**
   * Optional. Set this only when a post is genuinely revised, it drives both
   * the visible "Updated" line and schema.org dateModified, so an unearned
   * value is a false freshness signal.
   */
  updated?: string;

  /**
   * The question in the title, answered in two or three sentences that make
   * sense with nothing around them. This is the passage an answer engine
   * lifts, so it states the rule and the figure rather than promising that the
   * guide will. It must say nothing the body does not.
   */
  answer: string;
  /** Three to five standalone facts from the guide. Same rule: nothing the body does not say. */
  takeaways: string[];
  /** Ids from src/data/sources.ts: where the rules in this guide are officially published. */
  sources: SourceId[];

  /** An id from src/data/authors.ts. Omitted, the byline is `defaultAuthorId`, or the firm. */
  author?: string;
  /**
   * An author id and the date they reviewed this guide. Set both or neither,
   * and only for a guide that person has actually read and approved.
   */
  reviewedBy?: string;
  reviewed?: string;

  /** Present when the guide contains a numbered procedure. Emitted as HowTo schema. */
  howTo?: PostHowTo;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
}

const isDate = (value: unknown): value is string =>
  typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);

// Frontmatter is hand-written YAML, so it is checked once here and every
// caller gets a Post it can trust. A guide with a missing answer or a mistyped
// source id fails the build with the file named, instead of rendering an empty
// box or throwing somewhere inside a component.
function parsePost(filename: string): Post {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const fail = (problem: string): never => {
    throw new Error(`content/gst-guides/${filename}: ${problem}`);
  };

  for (const key of ["title", "description", "category", "excerpt", "answer"] as const) {
    if (typeof data[key] !== "string" || data[key].trim() === "") fail(`frontmatter "${key}" is missing`);
  }
  if (!isDate(data.date)) fail(`frontmatter "date" must be YYYY-MM-DD`);
  if (data.updated !== undefined) {
    if (!isDate(data.updated)) fail(`frontmatter "updated" must be YYYY-MM-DD`);
    if (data.updated < data.date) fail(`"updated" (${data.updated}) is earlier than "date" (${data.date})`);
  }

  if (!Array.isArray(data.takeaways) || data.takeaways.length < 3 || data.takeaways.length > 5) {
    fail(`frontmatter "takeaways" must list three to five points`);
  }
  if (!Array.isArray(data.sources) || data.sources.length === 0) {
    fail(`frontmatter "sources" must name at least one id from src/data/sources.ts`);
  }
  for (const id of data.sources as unknown[]) {
    if (typeof id !== "string" || !isSourceId(id)) fail(`unknown source "${String(id)}" (see src/data/sources.ts)`);
  }

  if (Boolean(data.reviewedBy) !== Boolean(data.reviewed)) {
    fail(`"reviewedBy" and "reviewed" must be set together`);
  }
  if (data.reviewed !== undefined && !isDate(data.reviewed)) fail(`frontmatter "reviewed" must be YYYY-MM-DD`);
  // getAuthor throws on an id that is not in src/data/authors.ts.
  if (data.author) getAuthor(data.author);
  if (data.reviewedBy) getAuthor(data.reviewedBy);

  if (data.howTo !== undefined) {
    const steps = data.howTo?.steps;
    if (typeof data.howTo?.name !== "string" || !Array.isArray(steps) || steps.length < 2) {
      fail(`"howTo" needs a name and at least two steps`);
    }
    for (const step of steps) {
      if (typeof step?.name !== "string" || typeof step?.text !== "string") {
        fail(`every "howTo" step needs a name and text`);
      }
    }
  }

  return { slug, content, ...(data as PostFrontmatter) };
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  return files.map(parsePost).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  const filename = `${slug}.mdx`;
  if (!fs.existsSync(path.join(CONTENT_DIR, filename))) return undefined;
  return parsePost(filename);
}

export function getAllPostSlugs(): string[] {
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

/** The named author of a post, or null when it is attributed to the firm. */
export function getPostAuthor(post: Post): Author | null {
  const id = post.author ?? defaultAuthorId;
  return id ? getAuthor(id) : null;
}

/** The named reviewer and the date of their review, or null. */
export function getPostReview(post: Post): { reviewer: Author; date: string } | null {
  if (!post.reviewedBy || !post.reviewed) return null;
  return { reviewer: getAuthor(post.reviewedBy), date: post.reviewed };
}

/**
 * Posts to show at the foot of an article: same category first, then the most
 * recent of anything else. Without this every guide is a dead end, which wastes
 * both the reader and the crawl budget that got them there.
 */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];

  const others = all.filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);

  return [...sameCategory, ...rest].slice(0, limit);
}

/**
 * Reading time in whole minutes at 220 words per minute. Shown on guides so a
 * reader can judge the commitment before starting, which is what the better
 * finance publishers do.
 */
export function readingTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
