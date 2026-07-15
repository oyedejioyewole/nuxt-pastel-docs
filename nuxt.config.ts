import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  modules: [
    "@formkit/auto-animate/nuxt",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    // "nuxt-og-image",
  ],
  devtools: { enabled: true },
  alias: {
    "#nuxt-pastel-docs/types": fileURLToPath(
      new URL("./types/", import.meta.url),
    ),
  },
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
    },
  },
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3,
        },
      },
    },
    experimental: {
      sqliteConnector: "native",
    },
  },
  compatibilityDate: "2025-08-02",
  // ogImage: {
  //   zeroRuntime: true,
  // },
  icon: {
    clientBundle: {
      scan: true,
    },
    componentName: "nuxt-icon",
    mode: "svg",
  },
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
});
