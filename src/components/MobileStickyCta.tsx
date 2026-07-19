import { Button } from "@/components/Button";

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 p-3 backdrop-blur lg:hidden">
      <Button href="/gst-registration" variant="primary" className="w-full">
        Talk to a GST Expert
      </Button>
    </div>
  );
}
