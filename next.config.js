/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.weatherbit.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@tremor/react"],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

module.exports = nextConfig;
