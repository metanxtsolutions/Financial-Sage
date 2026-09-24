import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

// Sitewide Open Graph / Twitter card. The site had none, so every share on
// WhatsApp, LinkedIn or an AI answer surface rendered without an image.
// Generated at build time rather than shipped as a binary, so it stays in step
// with siteConfig instead of going stale in /public.
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0b1020 0%, #1b2e80 55%, #2547e6 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#ffffff",
              color: "#2547e6",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            FS
          </div>
          <div style={{ color: "#ffffff", fontSize: 36, fontWeight: 700 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            GST, tax and company
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            compliance, handled.
          </div>
          <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 30, marginTop: 24 }}>
            {siteConfig.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ color: "#f2b429", fontSize: 26, fontWeight: 700 }}>
            {`Plans from ₹${siteConfig.pricingFrom.gstRegistration}`}
          </div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 26 }}>
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
