import type { PhosphorIconName } from "#phosphor-icons/types";

export default defineAppConfig({
  pastelDocsTheme: {
    headline: "Create beautiful pastel themed docs with Nuxt.",
    repo: "oyedejioyewole/nuxt-pastel-docs",
    themeColor: "#D64045",

    components: {
      ogImage: "NuxtSeo",
    },

    icons: {} as Record<PhosphorIconName, string>,
  },
});
