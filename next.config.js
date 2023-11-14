/** @type {import('next').NextConfig} */
const nextConfig = {
  // styledComponentsを使う際に、サーバ側とクライアント側でclassnameを一致させるための設定
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
};

module.exports = nextConfig;
