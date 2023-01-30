const path = require("path"); // 1. path 선언

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [
      path.join(__dirname, "components"),
      path.join(__dirname, "pages"),
    ], // 2. sassOptions 옵션 추가
  },
};

module.exports = nextConfig;
