---
displayToc: true
---

# Get started

This page would get you started on creating your own pastel themed documentation.

## Introduction

Hey. :wave: I decided to create a documentation theme, because I got tired of manually recreating the same files everytime I wanted to create documentation or technical content.

Hence this project is my attempt at creating an **_:broom: optimized, :rocket: performant, and :art: beautiful_**{.font-cursive} theme utilizing the power of `layers` in Nuxt.

## Quick start

For more information about `layers` I suggest you checkout this page &mdash; [Authoring Nuxt Layers](https://nuxt.com/docs/4.x/guide/going-further/layers)

Follow the steps below to have the base setup for your pastel themed documentation:

1. Create a new project &mdash; obviously.
2. Add the following to the `nuxt.config.ts`

**Info:** This command adds `nuxt-pastel-docs` as a remote layer and its installs dependencies.

```ts [nuxt.config]
export default defineNuxtConfig({
  extends: [["github:oyedejioyewole/nuxt-pastel-docs", { install: true }]],
});
```

3. Create a `content.config.ts` with the following content:

**Info:** This defines a schema where `displayToc` determines whether the table of contents would be shown for content pages.

```ts [content.config]
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

4. Install [@nuxt/content](https://content.nuxt.com) as a `dependency`

**Info:** Apparently, if you don't install `@nuxt/content` it wouldn't be recognized in your project.

Perfect, now you can enjoy writing your documentation :slightly_smiling_face:

## Configuration

Now for the fun part, customization :sparkles:

### Create an `app.config.ts`

Through the `pastelDocs` object, you can customize properties like the `features` list, the `themeColor`, the `headline`, the `iconMap`, and the footer `iconLinks`.

I overrode the type inference for `defineAppConfig` and `useAppConfig` to include the `pastelDocs` object, so you can get type hints and auto-completion in your IDE.

To view the full list of properties you can customize, check out the [types/config.d.ts](../../types/config.d.ts) file.

### Extending theme styles

In cases you don't want to completely override components, you **_extend the existing styles_**{.font-cursive} with your own CSS classes or custom properties. This is where the locally registered theme module comes in handy.

The layer automatically registers a Nuxt module that creates a CSS template accessible via the `#nuxt-pastel-docs` alias.

#### Usage

1. Import the base theme styles in your own CSS file:

```css [assets/css/main]
@import "#nuxt-pastel-docs";
```

2. Register your CSS in your `nuxt.config.ts`

```ts [nuxt.config]
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
});
```

### Overriding components

If you really don't like my design choices (kind of defeats the entire purpose of using this project) &mdash; you can decide to roll out your own components and battle with keeping everything in balance.

The structure of the `components` directory is given below:

::UiTabs{:icon='{ "default": "ph:folder-duotone", "active": "ph:folder-open-fill" }' :tabs='["app/", "content/", "og-image/", "ui/", "util/"]' }

<!-- `app/` tab -->

#tab-1
This folder contains components that define sections in the theme.

<!-- Sub-tabs of app/ -->

::UiTabs{:icon='{"default": "ph:file-duotone", "active": "ph:file-text-fill"}' :tabs='["Footer.vue", "Header.vue", "Navigation.vue", "TableOfContents.vue"]' prefix="app-files"}
#app-files-1
**Features**

1. **Markdown support** &mdash; you can write Markdown for its contents, we'd parse it.
2. **Dynamic linked icons** &mdash; external links are rendered through, `ui/Icon.vue` so you can use icons from currently supported providers: [Iconify](https://icones.js.org) and [SVGL](https://svgl.app)

**Defaults**

```ts[app.config]
export default defineAppConfig({
  pastelDocs: {
    footer: {
      content: "Made with ❤️ by [Your Name](https://yoursite.com)",
      iconLinks: {
        "devicon:nuxt": "https://nuxt.com",
        "ph:github-logo": "https://github.com/yourusername"
      }
    }
  }
})
```

#app-files-2
**Features**

1. **Hero layout** &mdash; displays your documentation headline and supporting content in a two-column grid
2. **Feature list** &mdash; renders the `features` array from your app config with a consistent icon marker
3. **Primary actions** &mdash; includes a “Get started” button and a project link button by default
4. **Flexible content** &mdash; exposes `default` and `aside` slots so you can replace either column

**Defaults**

```ts[app.config]
export default defineAppConfig({
  pastelDocs: {
    headline: "This is a headline",
    features: [
      // ...
    ],
    repo: "your-username/your-repo",
  },
})
```

#app-files-3
The top navigation bar that includes your project logo, name, latest release badge, and theme toggle. It's clean and stays out of your way.

**Features:**

1. **Project branding** &mdash; displays logo and repo name from your config
2. **Release badge** &mdash; automatically fetches and displays your latest GitHub release
3. **Theme toggle** &mdash; lets users switch between light, dark, and system themes
4. **Responsive design** &mdash; logo text hidden on mobile to save space

The component automatically reads your `repo` configuration and fetches release data from GitHub's API.

#app-files-4
An intelligent table of contents that automatically generates from your markdown headings. It's **_context-aware_**{.font-cursive} and only shows when needed.

**Behavior:**

1. Only appears if `displayToc: true` is set in your page frontmatter
2. Only shows if there are actual headings in your content
3. Collapsible on mobile devices to save screen space
4. Scrollable when content overflows

**Requirements:**
Make sure to add `displayToc: true` to your markdown frontmatter:

```yaml
---
displayToc: true
---
```

::

<!-- `content/` tab -->

#tab-2
These are overridden components from [@nuxtjs/mdc](https://github.com/nuxt-modules/mdc/tree/main/src/runtime/components/prose) that provide enhanced styling for your markdown content.

**What's included:**

The theme customizes prose components to match the **_pastel aesthetic_**{.font-cursive} &mdash; think better typography, consistent spacing, and subtle color variations that don't hurt your eyes during those late-night documentation sessions.

**Components that are overridden:**

`ProseH1` `ProseH2` `ProseH3` `ProseH4` `ProseA` `ProseCode` `ProsePre` `ProseOl` `ProseLi`

<!-- `og-image/` tab -->

#tab-3

This folder contains only the [NuxtSeo](https://nuxtseo.com/docs/og-image/guides/community-templates) community template from [nuxt-og-image](https://nuxtseo.com/docs/og-image/getting-started/introduction) as I enabled the [zeroRuntime](https://nuxtseo.com/docs/og-image/guides/zero-runtime) configuration.

**Why?** &mdash; It's just for the love of the game.

**What does this mean?**

If you don't like the default, you pretty much have to write your own SEO component yourself or pick from the [various templates](https://github.com/nuxt-modules/og-image/tree/main/src/runtime/app/components/Templates/Community)

<!-- `ui/` tab -->

#tab-4
This folder contains components that do UI stuff.

<!-- Sub-tabs of ui/ -->

::UiTabs{:icon='{"default": "ph:file-duotone", "active": "ph:file-text-fill"}' :tabs='["Button.vue", "Icon.vue", "SvglIcon.vue", "Tabs.vue"]' prefix="ui-files"}

#ui-files-1
A versatile button component that can transform into a link when needed. The current variants supported are:

:GetStartedButton{icon="ph:target" label="I'm a target"}
:GetStartedButton{ extra icon="ph:eyes" label="Do you trust me?" variant="accent"}

#### Usage

```vue
<UiButton to="/docs" icon="ph:book-open" variant="accent">
Read the docs
</UiButton>
```

**Props:**

1. `class` &mdash; extra CSS classes that get merged with the base styling
2. `icon` &mdash; choose an icon name supported by `UiIcon` (`@nuxt/icon` or `svgl:`)
3. `to` &mdash; if present, converts the button to a `NuxtLink`
4. `variant` &mdash; styling variant (default or accent)

**Slots:**

1. `default` &mdash; the button text content
2. `icon` &mdash; custom icon element to replace the default icon

#ui-files-2
A shortcut to the component provided by `@nuxt/icon` that provides icons throughout your documentation. It also respects the `iconMap` remapping from `app.config.ts`.

#ui-files-3
A specialized icon component for rendering SVG icons from the [SVGL](https://svgl.app) registry. Perfect for displaying popular brand logos and icons that aren't available as regular Iconify icons.

**Features:**

1. **Remote icon fetching** &mdash; automatically downloads SVG content from the SVGL API
2. **Error handling** &mdash; gracefully handles missing icons with console warnings
3. **Consistent sizing** &mdash; accepts a size prop to maintain visual consistency
4. **Smart fragment rendering** &mdash; uses the `UtilSvgFragment` component for proper SVG display

**Props:**

1. `name` &mdash; the SVGL icon name (e.g., "svgl:react", "svgl:vue") **(Required)**
2. `size` &mdash; icon dimensions in pixels (default: 20)

#### Usage

```vue
<UiSvglIcon name="svgl:react" :size="24" />
<UiSvglIcon name="svgl:github" />
```

Icons that start with `svgl:` in `footer.iconLinks` will automatically use this component instead of `NuxtIcon`.

#ui-files-4
An interactive tabbed interface component that makes organizing content **_effortless_**{.font-cursive}. Perfect for showing code examples, configuration options, or any grouped content.

**Props:**

1. `tabs` &mdash; array of tab names **(Required)**
2. `prefix` &mdash; optional prefix for slot names (useful for multiple tab components on the same page)

**Slots:**
The component generates slots based on your tabs array. For tabs `["One", "Two"]`, you get:

- `#tab-1` for "One"
- `#tab-2` for "Two"

#### Usage

```vue
<UiTabs :tabs="['Setup', 'Usage', 'Advanced']">
<template #tab-1>
  Initial setup instructions...
</template>
<template #tab-2>
  Basic usage examples...
</template>
<template #tab-3>
  Advanced configuration...
</template>
</UiTabs>
```

**With prefix (for markdown):**

```md
::UiTabs{:tabs="['Config', 'Code']" prefix="example"}
#example-1
Configuration details...

#example-2
Code examples...
::
```

::

<!-- `util/` tab -->

#tab-5
This folder contains utility components that support the functionality of other components.

<!-- Sub-tabs of util/ -->

::UiTabs{:icon='{"default": "ph:file-duotone", "active": "ph:file-text-fill"}' :tabs='["SvgFragment.ts"]' prefix="util-files"}

#util-files-1
A component that intelligently renders SVG content by parsing SVG strings and converting them to Vue virtual nodes. It's used internally by the `SvglIcon` component but can be handy for custom SVG rendering needs.

**Features:**

1. **SVG parsing** &mdash; converts raw SVG strings into proper Vue components
2. **Virtual node traversal** &mdash; recursively processes SVG elements and text nodes
3. **Error handling** &mdash; gracefully handles malformed SVG content with warnings
4. **Prop inheritance** &mdash; seamlessly passes through width, height, and other SVG attributes

**Props:**

1. `content` &mdash; the raw SVG string to parse and render **(Required)**

#### Usage

```vue
<UtilSvgFragment
  content="<svg><circle cx='10' cy='10' r='10' fill='blue' /></svg>"
  :width="24"
  :height="24"
/>
```

**Note:** This component is primarily used internally by `SvglIcon` but can be useful for rendering dynamic SVG content from APIs or user input.
::

::
