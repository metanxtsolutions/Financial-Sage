import { llmsHeaders, llmsTxt } from "@/lib/llms";

// /llms.txt: a markdown map of the site for language models. Built from the
// same data the pages render from; see src/lib/llms.ts.
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), { headers: llmsHeaders });
}
