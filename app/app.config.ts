export default defineAppConfig({
  pastelDocs: {
    features: [],
    footer: {
      content: "Made with :heart: by your-username",
      iconLinks: {
        "svgl:nuxt": "https://nuxt.com",
      } as Record<string, string>,
    },
    headline: "This is the headline",
    icons: {} as Record<string, string>,
    repo: "your-username/your-repo",
    themeColor: "#D64045",
  },
});
