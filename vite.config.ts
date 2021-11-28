import { defineConfig } from "vite";
import { resolve } from "path";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        error: resolve(__dirname, "404.html"),
      },
    },
  },
});
