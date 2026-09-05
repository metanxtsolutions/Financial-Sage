// Income tax calculators. These live at /tax-tools rather than /gst-tools so
// the established GST tool URLs keep their rankings and the two intents stay
// cleanly separated.

export interface TaxToolMeta {
  slug: string;
  title: string;
  description: string;
}

export const taxTools: TaxToolMeta[] = [
  {
    slug: "income-tax-calculator",
    title: "Income Tax Calculator",
    description: "Compare your tax under the old and new regimes side by side, and see which one leaves you better off.",
  },
  {
    slug: "hra-calculator",
    title: "HRA Exemption Calculator",
    description: "Work out how much of your house rent allowance is exempt under Section 10(13A).",
  },
];

export function getTaxTool(slug: string): TaxToolMeta | undefined {
  return taxTools.find((t) => t.slug === slug);
}
