import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // /company-registration exists only as a parent of the city pages
        // below it, so send the bare path to the actual service page.
        source: "/company-registration",
        destination: "/other-services/company-registration",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
