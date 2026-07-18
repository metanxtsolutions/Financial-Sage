import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

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

export interface PostFrontmatter {
  title: string;
  description: string;
  category: string;
  date: string;
  excerpt: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    return { slug, content, ...(data as PostFrontmatter) };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, content, ...(data as PostFrontmatter) };
}

export function getAllPostSlugs(): string[] {
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}
