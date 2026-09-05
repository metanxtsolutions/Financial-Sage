import { Button } from "@/components/Button";

// Label and destination are decided by ConditionalChrome from the path, so
// this stays a plain server component. Defaults are the GST wording it has
// always used.
export function MobileStickyCta({
  label = "Talk to a GST Expert",
  href = "/gst-registration",
}: {
  label?: string;
  href?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 p-3 backdrop-blur lg:hidden">
      <Button href={href} variant="primary" className="w-full">
        {label}
      </Button>
    </div>
  );
}
