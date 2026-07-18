import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { ComponentProps } from "react";

const components = {
  h2: (props: ComponentProps<"h2">) => <h2 className="mt-10 text-2xl font-bold text-neutral-900" {...props} />,
  h3: (props: ComponentProps<"h3">) => <h3 className="mt-6 text-xl font-semibold text-neutral-900" {...props} />,
  p: (props: ComponentProps<"p">) => <p className="mt-4 text-neutral-700" {...props} />,
  ul: (props: ComponentProps<"ul">) => <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-700" {...props} />,
  ol: (props: ComponentProps<"ol">) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-neutral-700" {...props} />,
  li: (props: ComponentProps<"li">) => <li {...props} />,
  a: ({ href, ...props }: ComponentProps<"a">) =>
    href ? (
      <Link href={href} className="font-medium text-brand-700 underline" {...props} />
    ) : (
      <a {...props} />
    ),
  strong: (props: ComponentProps<"strong">) => <strong className="font-semibold text-neutral-900" {...props} />,
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div>
      <MDXRemote source={source} components={components} />
    </div>
  );
}
