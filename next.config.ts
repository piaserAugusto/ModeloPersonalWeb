import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El proyecto vive dentro del home del usuario, asi que fijamos el root
  // de Turbopack para que no intente incluir el home en el bundle.
  turbopack: {
    root: __dirname,
  },
  images: {
    // Reemplazar por los dominios reales si las imagenes se sirven desde un CDN.
    remotePatterns: [],
  },
};

export default nextConfig;