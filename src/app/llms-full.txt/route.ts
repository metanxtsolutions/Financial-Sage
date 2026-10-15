import { llmsFullTxt, llmsHeaders } from "@/lib/llms";

// /llms-full.txt: every guide and every FAQ in full, as one markdown file, for
// a model that would rather read the content than follow links to it.
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt(), { headers: llmsHeaders });
}
