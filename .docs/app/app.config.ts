import type { PhosphorIconName } from "#phosphor-icons/types";

export default defineAppConfig({
  pastelDocs: {
    features: [
      "Sensible defaults.",
      "Tailwind v4 ready.",
      "An icon library provided by @phosphor-icons/vue.",
      "Customizable with the use of an app.config.",
      "Extendable through the power of Nuxt layers.",
    ],
    footer: {
      content:
        "Made with :heart: by [oyedejioyewole](https://github.com/oyedejioyewole)",
      iconLinks: {
        "github-logo": "https://github.com/oyedejioyewole/nuxt-pastel-docs",
      } satisfies Partial<Record<PhosphorIconName, string>>,
    },
    headline: "Create beautiful pastel themed docs with Nuxt.",
    repo: "oyedejioyewole/nuxt-pastel-docs",
  },
});
