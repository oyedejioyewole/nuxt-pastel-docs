# Nuxt Pastel Docs

A **_clean :black_nib: &mdash; performant :rocket: &mdash; and monochromatic :art:_** Nuxt layer for creating beautiful documentations.

## Features

- ✨ **Beautiful Design** &mdash; Pastel-themed, monochromatic aesthetic that's easy on the eyes
- 🚀 **Performance First** &mdash; Built with modern web standards and optimized for speed
- 📱 **Responsive Layout** &mdash; Looks great on desktop, tablet, and mobile devices
- 🎨 **Customizable** &mdash; Easy theming through app.config.ts
- 📖 **Content-Driven** &mdash; Powered by @nuxt/content with MDC support
- 🌙 **Dark Mode** &mdash; Built-in theme switching with system preference detection
- 🔍 **SEO Optimized** &mdash; Meta tags, OpenGraph images, and semantic HTML
- 📋 **Table of Contents** &mdash; Auto-generated navigation for long pages
- 🎯 **Zero Config** &mdash; Works out of the box with sensible defaults

## Quick Setup

1. Add it to your `extends` in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: [["github:oyedejioyewole/nuxt-pastel-docs", { install: true }]],
});
```

2. Create a `content.config.ts` file:

```ts
import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**/*.md",
      schema: z.object({
        displayToc: z.boolean().default(false),
      }),
    }),
  },
});
```

3. Add your markdown files in the `content` directory. Example:

```md
---
displayToc: true
---

# A breathe of fresh air

Your content goes here ...
```

That's it! ✨

**Note:**
For a comprehensive guide, see the
**[📖 documentation](https://nuxt-pastel-docs.vercel.app/get-started)**

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Prepare Nuxt for development
pnpm dev:prepare

# Generate static site
pnpm generate

# Preview generated site
pnpm preview

# Lint and fix code
pnpm lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

Built with:

- [Nuxt 3](https://nuxt.com/)
- [@nuxt/content](https://content.nuxt.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Phosphor Icons](https://phosphoricons.com/)

---

Made with ❤️ by [Oyedeji Oyewole](https://github.com/oyedejioyewole)
