import { parse } from "@comark/nuxt/parse";
import emoji from "@comark/nuxt/plugins/emoji";

export const parseMarkdown = async (
  markdown: string,
  features: Partial<{ highlight: boolean; tableOfContents: boolean }> = {
    highlight: false,
    tableOfContents: false,
  },
) => {
  const highlight = features.highlight
    ? [
        (await import("@comark/nuxt/plugins/highlight")).default({
          themes: {
            light: (await import("@shikijs/themes/github-dark")).default,
            dark: (await import("@shikijs/themes/github-light")).default,
          },
          registerDefaultThemes: false,
        }),
      ]
    : [];
  const toc = features.tableOfContents
    ? [(await import("@comark/nuxt/plugins/toc")).default()]
    : [];

  return await parse(markdown, { plugins: [emoji(), ...toc, ...highlight] });
};
