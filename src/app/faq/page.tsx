import type { Metadata } from "next";
import { Section } from "@/components/Container";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd, faqPageSchema } from "@/lib/schema";
import { faqs, faqCategoryLabels, getFaqsByCategory, type FaqCategory } from "@/data/faqs";

export const metadata: Metadata = {
  title: "GST FAQs: Registration, Filing, Compliance & ITC",
  description:
    "Answers to 60+ common questions on GST registration, return filing, compliance, penalties, ITC, and GST for e-commerce and freelancers.",
  alternates: { canonical: "/faq" },
};

const categoryOrder = Object.keys(faqCategoryLabels) as FaqCategory[];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqs)} />
      <Section>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">Frequently Asked Questions</h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-600">
          {faqs.length}+ answers on GST registration, filing, compliance, and more, organised by topic.
        </p>

        <div className="mt-10 space-y-12">
          {categoryOrder.map((category) => {
            const categoryFaqs = getFaqsByCategory(category);
            if (categoryFaqs.length === 0) return null;
            return (
              <div key={category} id={category}>
                <h2 className="text-xl font-bold text-neutral-900">{faqCategoryLabels[category]}</h2>
                <div className="mt-4 max-w-3xl">
                  <FaqAccordion faqs={categoryFaqs} />
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
