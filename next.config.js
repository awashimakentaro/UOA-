/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // 静的エクスポートを有効化
  basePath: "/UOA-", // リポジトリ名に合わせてベースパスを設定
  images: {
    unoptimized: true, // GitHub Pagesでの画像最適化を無効化
    domains: ["images.unsplash.com", "lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

module.exports = nextConfig

