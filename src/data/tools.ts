export interface ToolMeta {
  slug: string;
  title: string;
  description: string;
}

export const tools: ToolMeta[] = [
  { slug: "gst-calculator", title: "GST Calculator", description: "Add or remove GST from any amount, with CGST/SGST split." },
  { slug: "reverse-gst-calculator", title: "Reverse GST Calculator", description: "Find the base price and GST hidden inside a GST-inclusive amount." },
  { slug: "gst-late-fee-calculator", title: "GST Late Fee Calculator", description: "Estimate the late fee for filing GSTR-1/GSTR-3B after the due date." },
  { slug: "gst-interest-calculator", title: "GST Interest Calculator", description: "Estimate interest owed on GST paid after the due date." },
  { slug: "hsn-sac-search", title: "HSN/SAC Code Search", description: "Find the right HSN or SAC code and indicative GST rate for your product or service." },
  { slug: "gstin-validator", title: "GSTIN Format Validator", description: "Check whether a GSTIN follows the correct 15-digit format." },
  { slug: "gst-due-date-checker", title: "GST Due Date Checker", description: "Look up the next GSTR-1, GSTR-3B, and GSTR-9 due dates." },
];

export function getTool(slug: string): ToolMeta | undefined {
  return tools.find((t) => t.slug === slug);
}
