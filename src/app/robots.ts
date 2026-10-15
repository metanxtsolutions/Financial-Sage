import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { sitemapGroups } from "@/lib/sitemap-urls";

// Replaces next-sitemap's generated public/robots.txt. Lists the per-service
// sitemaps individually as well as the index, because Search Console will
// happily read either and the explicit list makes the split visible in the
// robots file itself.

// The ITR wizard is a multi-step form behind a payment, not a landing page, and
// the API routes are not documents.
const disallow = ["/api/", "/itr-filing/apply"];

// AI crawlers, named so the policy is a decision on the record rather than an
// accident of the wildcard rule.
//
// THE DECISION: allow all of them. The site earns its business by being the
// answer someone is given when they ask an assistant how GST registration
// works, and an assistant cannot cite a page its crawler was turned away from.
// That covers the crawlers that fetch a page live to answer a question, the
// ones that build a search index, and the ones that collect training data.
//
// TO CHANGE IT: a crawler obeys only the most specific group that names it, so
// blocking one means moving it out of this list into its own rule with
// `disallow: "/"`. Blocking the training crawlers (GPTBot, ClaudeBot,
// Google-Extended, Applebot-Extended, CCBot, Bytespider, meta-externalagent)
// does not remove the site from ChatGPT search or Perplexity, which use the
// search and user-triggered agents further down.
//
// The disallow list is repeated on this group for the same reason: a crawler
// matched here never reads the wildcard group.
const aiCrawlers = [
  // OpenAI: training, search index, and fetches triggered by a user's question
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google's and Apple's AI-training controls. Neither is a separate crawler:
  // they are tokens that Googlebot and Applebot honour.
  "Google-Extended",
  "Applebot-Extended",
  // Others that publish a user agent and honour robots.txt
  "Amazonbot",
  "meta-externalagent",
  "DuckAssistBot",
  "MistralAI-User",
  "CCBot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiCrawlers, allow: "/", disallow },
    ],
    sitemap: [
      `${siteConfig.url}/sitemap.xml`,
      ...sitemapGroups.map((g) => `${siteConfig.url}/sitemap/${g.id}.xml`),
    ],
    host: siteConfig.url,
  };
}
