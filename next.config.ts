import type { NextConfig } from "next";

// The template ships `output: "standalone"` for its Dockerfile. On Vercel that
// conflicts with Vercel's own output tracing (the build fails looking for
// .next/next-server.js.nft.json), so only opt into it off-Vercel.
const nextConfig: NextConfig = {
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
};

export default nextConfig;
