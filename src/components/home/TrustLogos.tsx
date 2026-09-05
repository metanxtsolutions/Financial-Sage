import Image from "next/image";
import { Section } from "@/components/Container";
import { trustLogos, trustLogosHeading } from "@/data/trust";

// Renders nothing until real logo files are listed in src/data/trust.ts.
export function TrustLogos() {
  if (trustLogos.length === 0) return null;

  return (
    <Section className="py-12 sm:py-14">
      <p className="text-center text-xs font-semibold tracking-wide text-neutral-400 uppercase">
        {trustLogosHeading}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {trustLogos.map((logo) => (
          <Image
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className="h-8 w-auto opacity-60 transition-opacity hover:opacity-100"
          />
        ))}
      </div>
    </Section>
  );
}
