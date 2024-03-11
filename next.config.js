/** @type {import('next').NextConfig} */
// require("dotenv").config();
const nextConfig = {
  env: {
    NEXT_APP_GOOGLE_API_KEY: process.env.NEXT_APP_GOOGLE_API_KEY,
    NEXT_APP_GRAPHQL_URI: process.env.NEXT_APP_GRAPHQL_URI,
  },
  images: {
    domains: ['ycp-test-bucket.s3.ap-southeast-2.amazonaws.com', 'youchoosepets-stage-bucket.s3.ap-southeast-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
