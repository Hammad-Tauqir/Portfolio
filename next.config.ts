import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig = (phase: string): NextConfig => ({
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  poweredByHeader: false,
  redirects() {
    return [
      {
        source: "/projects/metaviz-landing",
        destination: "/projects/mobile-app-marketing-lead-capture",
        permanent: true,
      },
    ];
  },
  experimental: {
    agentUpgrade: "security",
  },
});

export default nextConfig;
