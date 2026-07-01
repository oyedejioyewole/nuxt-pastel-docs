import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  extends: [".."],
  modules: ["@nuxt/eslint"],
  eslint: {
    config: {
      // Use the generated ESLint config for lint root project as well
      rootDir: fileURLToPath(new URL("..", import.meta.url)),
    },
  },
  site: {
    url: "https://nuxt-pastel-docs.vercel.app",
  },
  vite: {
    optimizeDeps: {
      include: [
        "@bobthered/tailwindcss-palette-generator",
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "randomcolor", // Commonjs library
        "tailwind-merge",
      ],
    },
  },
});
