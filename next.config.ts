import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              exportType: "named",
            },
          },
        ],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
