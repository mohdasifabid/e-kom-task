/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  serverRuntimeConfig: {
    dbConfig: {
      DB_URL: process.env.DB_URL
    },
    secret: "This is my secrect string. Maaz is a good boy.",
  },
};

export default nextConfig;


