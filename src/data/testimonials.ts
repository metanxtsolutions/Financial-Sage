// Sample MSME testimonials for illustrative purposes only — clearly labelled
// as such in the UI. Replace with real client feedback as it comes in.
// NOTE: We deliberately do NOT emit Review/AggregateRating JSON-LD for these,
// since they are placeholder text rather than verified customer reviews —
// doing so would violate Google's structured data guidelines. Swap in real
// reviews before adding review schema.

export interface Testimonial {
  name: string;
  business: string;
  city: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Ramesh Agarwal",
    business: "Textile Trading Firm",
    city: "Kolkata",
    quote:
      "Our GSTIN came through in under a week and the team explained every document we needed upfront — no back and forth.",
  },
  {
    name: "Priya Nair",
    business: "Freelance UI/UX Designer",
    city: "Bangalore",
    quote:
      "I registered voluntarily to invoice a client properly. The WhatsApp updates meant I never had to chase anyone for status.",
  },
  {
    name: "Arjun Mehta",
    business: "D2C Skincare Brand",
    city: "Ahmedabad",
    quote:
      "Switched to Financial Sage for monthly filing after missing a due date with our old CA. Haven't missed one since.",
  },
];
