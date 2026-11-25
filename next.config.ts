import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pg and bcryptjs run only on the Node.js server side
  serverExternalPackages: ["pg"],
};

export default nextConfig;
