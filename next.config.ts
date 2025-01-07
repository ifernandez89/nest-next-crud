import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.frandroid.com','servicelshop.com.mx','images.fravega.com','http2.mlstatic.com','www.megatone.net','medias.musimundo.com'], // Agrega el dominio aquí
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Aumenta el límite del tamaño del cuerpo a 10 MB
    },
  },
};

export default nextConfig;

module.exports = nextConfig;