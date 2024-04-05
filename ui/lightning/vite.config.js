import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { importChunkUrl } from "@lightningjs/vite-plugin-import-chunk-url";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    importChunkUrl(),
    solidPlugin({
      solid: {
        moduleName: "@lightningjs/solid",
        generate: "universal",
      },
    }),
    legacy({
      targets: ["defaults", "Chrome >= 49"],
      // additionalLegacyPolyfills: ["whatwg-fetch", "es6-proxy-polyfill"],
    }),
  ],
  resolve: {
    alias: {
      theme: "@lightningjs/l3-ui-theme-base",
    },
    dedupe: [
      "solid-js",
      "@lightningjs/solid",
      "@lightningjs/renderer",
      "@lightningjs/solid-primitives",
    ],
  },
  optimizeDeps: {
    include: [],
    // This is important for things to work right in `vite` dev mode! Needs more investigation.
    exclude: [
      "@lightningjs/solid",
      "@lightningjs/solid-ui",
      "@lightningjs/solid-primitives",
      "@lightningjs/renderer",
      "@lightningjs/renderer/core",
      "@lightningjs/renderer/workers/renderer",
    ],
  },
  server: {
    port: 5174,
    hmr: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
});
