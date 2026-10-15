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

  // A comparison or a set of thresholds is a table, and a table is the form an
  // answer engine can lift a single cell from. Written in a guide as:
  //
  //   <Table caption="What the table shows">
  //     <thead><tr><th>…</th><th>…</th></tr></thead>
  //     <tbody><tr><th scope="row">…</th><td>…</td></tr></tbody>
  //   </Table>
  //
  // Plain HTML rows rather than a `rows={[…]}` prop or markdown pipes: the MDX
  // renderer strips JavaScript expressions by default, and pipe tables need a
  // remark plugin this project does not carry. The cells are styled from the
  // wrapper, because literal tags in MDX bypass the component map above.
  Table: ({ caption, children }: { caption: string; children: React.ReactNode }) => (
    <div className="mt-6 overflow-x-auto rounded-lg border border-neutral-200">
      <table className="w-full text-left text-sm [&_tbody_th]:font-medium [&_tbody_th]:text-neutral-900 [&_tbody_tr]:border-t [&_tbody_tr]:border-neutral-200 [&_td]:px-4 [&_td]:py-3 [&_td]:align-top [&_td]:text-neutral-700 [&_th]:px-4 [&_th]:py-3 [&_th]:align-top [&_thead]:bg-neutral-50 [&_thead_th]:font-semibold [&_thead_th]:text-neutral-900">
        <caption className="sr-only">{caption}</caption>
        {children}
      </table>
    </div>
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div>
      <MDXRemote source={source} components={components} />
    </div>
  );
}
