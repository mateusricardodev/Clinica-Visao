/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // As fotos já são servidas em WebP com srcset próprio (components/Foto.tsx),
  // então o projeto funciona em qualquer host, inclusive export estático.
  images: { unoptimized: true },
};

export default nextConfig;
