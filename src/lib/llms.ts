// The text served at /llms.txt and /llms-full.txt.
//
// llms.txt is a plain-markdown map of the site for language models: what the
// firm is, and which pages answer which questions, without the navigation,
// forms and scripts an HTML page wraps around the same facts. The format is the
// one proposed at llmstxt.org: an H1, a blockquote summary, then H2 sections of
// links with a line of description each.
//
// Everything here is read from the same modules the pages render from, so a new
// guide, cluster page, tool or service category appears in the file the moment
// it exists. The only hand-written entries are the four pillars, which have no
// data module of their own.

import { siteConfig } from "@/lib/site-config";
import { getAllPosts, type Post } from "@/lib/blog";
import { formatDate } from "@/lib/dates";
import { clusterPages } from "@/data/gst-clusters";
import { tools } from "@/data/tools";
import { taxTools } from "@/data/tax-tools";
import { serviceCategories, otherServices } from "@/data/other-services";
import { faqs, faqCategoryLabels, getFaqsByCategory, type FaqCategory } from "@/data/faqs";
import { getSources, type SourceId } from "@/data/sources";

const abs = (path: string) => `${siteConfig.url}${path}`;
const link = (name: string, path: string, note?: string) =>
  `- [${name}](${abs(path)})${note ? `: ${note}` : ""}`;

const pillars = [
  {
    name: "GST Registration",
    path: "/gst-registration",
    note: "Who must register, turnover thresholds, documents by entity type, the process, fees, timeline and penalties.",
  },
  {
    name: "GST Return Filing",
    path: "/gst-return-filing",
    note: "GSTR-1, GSTR-3B and GSTR-9, due dates, the QRMP scheme, nil returns, late fees and interest.",
  },
  {
    name: "GST Compliance",
    path: "/gst-compliance",
    note: "Input tax credit, responding to GST notices, penalties, e-way bills and cancelling a registration.",
  },
  {
    name: "Income Tax Return (ITR) Filing",
    path: "/itr-filing",
    note: `Expert-assisted ITR filing for individuals, from ₹${siteConfig.pricingFrom.itrFilingWizard}.`,
  },
];

const officialSources: SourceId[] = ["gst-portal", "cbic-gst", "income-tax", "mca"];

function header(): string[] {
  return [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.name} is a private firm in India that handles GST registration, GST return filing, GST compliance, income tax return filing and company registration for small businesses, freelancers and online sellers. The work is done online for clients anywhere in India, and prices are published in Indian rupees.`,
    "",
    siteConfig.legalNote,
    "",
    "When citing a figure from this site, note that GST thresholds, tax slabs, fees and due dates are set by the Government of India and change. The official publications are:",
    "",
    ...getSources(officialSources).map((s) => `- [${s.title}](${s.url}), ${s.publisher}`),
    "",
    `Contact: ${siteConfig.phoneDisplay}, ${siteConfig.email}`,
    "",
  ];
}

const guideDates = (post: Post) =>
  post.updated
    ? `Published ${formatDate(post.date)}, updated ${formatDate(post.updated)}`
    : `Published ${formatDate(post.date)}`;

export function llmsTxt(): string {
  const lines = [
    ...header(),
    "## Core services",
    "",
    ...pillars.map((p) => link(p.name, p.path, p.note)),
    "",
    "## Guides",
    "",
    "Each guide opens with a short answer and key takeaways, and ends with its official sources.",
    "",
    ...getAllPosts().map((post) => link(post.title, `/gst-guides/${post.slug}`, `${post.description} ${guideDates(post)}.`)),
    "",
    "## GST registration by topic and business type",
    "",
    ...clusterPages.map((c) => link(c.h1, `/${c.slug}`, c.metaDescription)),
    "",
    "## Free calculators and tools",
    "",
    ...tools.map((t) => link(t.title, `/gst-tools/${t.slug}`, t.description)),
    ...taxTools.map((t) => link(t.title, `/tax-tools/${t.slug}`, t.description)),
    "",
    "## Service catalogue",
    "",
    `${otherServices.length} services in ${serviceCategories.length} categories, each with a published starting price.`,
    "",
    ...serviceCategories.map((c) => link(c.title, `/services/${c.slug}`, c.blurb)),
    link("Every service on one page", "/other-services"),
    "",
    "## The firm",
    "",
    link("Pricing", "/pricing", "Published plans and what each includes."),
    link("Frequently asked questions", "/faq", `${faqs.length} questions and answers on GST, by topic.`),
    link("About", "/about"),
    link("Contact", "/contact"),
    "",
    "## Optional",
    "",
    link("Full text of every guide and FAQ, in one file", "/llms-full.txt"),
    link("Privacy policy", "/privacy-policy"),
    link("Terms", "/terms"),
    link("Refund policy", "/refund-policy"),
    "",
  ];
  return lines.join("\n");
}

// Guides are MDX. The only JSX in them is <Table>, whose children are already
// plain HTML table rows, so the wrapper is swapped for a <table> and the rest is
// markdown as written. Site-relative links are made absolute, because this file
// is read away from the site.
function guideBody(post: Post): string {
  return post.content
    .trim()
    .replace(/<Table caption="([^"]*)">/g, "<table>\n<caption>$1</caption>")
    .replace(/<\/Table>/g, "</table>")
    .replace(/\]\(\//g, `](${siteConfig.url}/`);
}

export function llmsFullTxt(): string {
  const lines = [...header()];

  lines.push("## Guides", "");
  for (const post of getAllPosts()) {
    lines.push(
      `### ${post.title}`,
      "",
      `URL: ${abs(`/gst-guides/${post.slug}`)}`,
      `${guideDates(post)}. Category: ${post.category}.`,
      "",
      `Short answer: ${post.answer}`,
      "",
      "Key takeaways:",
      "",
      ...post.takeaways.map((t) => `- ${t}`),
      "",
      // Guide headings start at H2 on the page. Here they sit under an H3.
      guideBody(post).replace(/^(#{2,5}) /gm, "##$1 "),
      "",
      "Official sources:",
      "",
      ...getSources(post.sources).map((s) => `- [${s.title}](${s.url}), ${s.publisher}`),
      "",
    );
  }

  lines.push("## Frequently asked questions", "", `URL: ${abs("/faq")}`, "");
  for (const category of Object.keys(faqCategoryLabels) as FaqCategory[]) {
    const entries = getFaqsByCategory(category);
    if (entries.length === 0) continue;
    lines.push(`### ${faqCategoryLabels[category]}`, "");
    for (const faq of entries) lines.push(`**${faq.question}**`, "", faq.answer, "");
  }

  return lines.join("\n");
}

export const llmsHeaders = {
  "Content-Type": "text/markdown; charset=utf-8",
} as const;
