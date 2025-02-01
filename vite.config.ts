import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],

  server: {
    host: "0.0.0.0",
    port: 5173,
  },

  base: process.env.NODE_ENV === "production" ? "/rlt-test-task/" : "/",

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "scss": fileURLToPath(new URL("./src/assets/scss", import.meta.url)),
      "store": fileURLToPath(new URL("./src/store", import.meta.url)),
      "components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "app": fileURLToPath(new URL("./src/components/app", import.meta.url)),
      "ui": fileURLToPath(new URL("./src/components/ui", import.meta.url)),
      "icons": fileURLToPath(new URL("./src/components/icons", import.meta.url)),
      "modules": fileURLToPath(new URL("./src/modules", import.meta.url)),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
        additionalData: `
          @import "scss/variables";
          @import "scss/mixins";
        `,
      },
    },
  },
});
