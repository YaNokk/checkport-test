import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_BASE,
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: "default",
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: "**/*.svg",
      }),
    ],
    server: {
      host: true,
      port: 8000,
      watch: {
        usePolling: true,
      },
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});
