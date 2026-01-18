export default defineNuxtConfig({
  modules: [
    "@formkit/auto-animate/nuxt",
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/eslint",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "nuxt-og-image",
    import.meta.env.ICON_MODULE ?? "nuxt-phosphor-icons",
  ],
  devtools: { enabled: true },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/svg+xml", href: "./favicon.svg" }],
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
  vite: {
    optimizeDeps: {
      include: ["debug", "extend"],
    },
  },
  compatibilityDate: "2025-08-02",
  ogImage: {
    zeroRuntime: true,
  },
  phosphorIcons: {
    componentName: "ui-icon",
  },
});
