# Get started

I intend to run through through what I've created so you can start writing your own pastel themed documentation.

## Quick start

For more information about `layers` I suggest you checkout this page &mdash; [Authoring Nuxt Layers](https://nuxt.com/docs/4.x/guide/going-further/layers)

Follow the steps below to have the base setup for your pastel themed documentation:

- Create a new project &mdash; obviously.
- Add the following to the `nuxt.config.ts`

```ts [nuxt.config]
export default defineNuxtConfig({
  extends: [["github:oyedejioyewole/nuxt-pastel-docs", { install: true }]],
});
```

**Info:** This command adds `nuxt-pastel-docs` as a remote layer and its installs dependencies.

- Install [@nuxt/content](https://content.nuxt.com) as a `dependency`

**Info:** Apparently, if you don't install `@nuxt/content` it wouldn't be recognized in your project.

- Create a `content.config.ts` with the following content:

```ts [content.config]
import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**/*.md",
      schema: z.object({
        rawbody: z.string(),
      }),
    }),
  },
});
```

**Info:** This defines a schema where `rawbody` contains the raw Markdown content for each page.

Perfect, now you can enjoy writing your documentation.

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

- Import the base theme styles in your own CSS file:

```css [assets/css/main]
@import "#nuxt-pastel-docs";
```

- Register your CSS in your `nuxt.config.ts`

```ts [nuxt.config]
export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
});
```

### Overriding components

If you really don't like my design choices (kind of defeats the entire purpose of using this project) &mdash; you can decide to roll out your own components and battle with keeping everything in balance.

The structure of the `components` directory is given below:

::tabs{:tabs='["app/", "content/", "og-image/", "ui/", "util/"]' }

<!-- `app/` tab -->

#tab-1
This folder contains components that define sections in the theme.

<!-- Sub-tabs of app/ -->

::tabs{:icon='{"default": "ph:file-duotone", "active": "ph:file-text-fill"}' :tabs='["Footer.vue", "Header.vue", "Navigation.vue", "TableOfContents.vue"]' prefix="app-files"}
#app-files-1

:picture{alt="Visualization of the footer component" :media='{ "(width >= 48rem) and (prefers-color-scheme: dark)": "/images/getting-started/visualization-footer-vue.dark.png", "(width >= 48rem) and (prefers-color-scheme: light)": "/images/getting-started/visualization-footer-vue.png", "(width < 48rem) and (prefers-color-scheme: dark) ": "/images/getting-started/small/visualization-footer-vue.dark.png", "(width < 48rem) and (prefers-color-scheme: light) ": "/images/getting-started/small/visualization-footer-vue.png" }'}

**Values** used from `app.config.ts`

|                    | Description                                             | Type                                                                                                   |
| :----------------- | :------------------------------------------------------ | :----------------------------------------------------------------------------------------------------- |
| `footer.content`   | This main content displayed in the `<footer>`           | `string`                                                                                               |
| `footer.iconLinks` | These are the icon links are rendered in the `<footer>` | `GenericIconOrPhosphorIconNameWithWeight` or `Record<GenericIconOrPhosphorIconNameWithWeight, string>` |

#app-files-2

:picture{alt="Visualization of the header component" :media='{ "(width >= 48rem) and (prefers-color-scheme: dark)": "/images/getting-started/visualization-header-vue.dark.png", "(width >= 48rem) and (prefers-color-scheme: light)": "/images/getting-started/visualization-header-vue.png", "(width < 48rem) and (prefers-color-scheme: dark) ": "/images/getting-started/small/visualization-header-vue.dark.png", "(width < 48rem) and (prefers-color-scheme: light) ": "/images/getting-started/small/visualization-header-vue.png" }'}

> Incase the picture didn't load

| Slots               | Description                                                                                                                   |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------- |
| `#buttons`          | Use this to override the buttons rendered after the feature list.                                                             |
| `#default`          | Use this to override both the headline and feature list.                                                                      |
| `#aside` (Optional) | By default, it doesn't have default content, so the layout collapses to a single-column layout, else the layout is 2-columns. |

**Values** used from `app.config.ts`

|            | Description                                                                                 | Type       |
| ---------- | :------------------------------------------------------------------------------------------ | :--------- |
| `headline` | A headline/tagline.                                                                         | `string`   |
| `features` | A feature list.                                                                             | `string[]` |
| `repo`     | A string in the format, `username/repo-name` that's used for constructing repository links. | `string`   |

**Props** provided by the component:

|           | Description                                                       | Type                                                   |
| :-------- | :---------------------------------------------------------------- | :----------------------------------------------------- |
| `classes` | A property to override and merge CSS classes with the base styles | `Partial<{ aside: ClassValue; default: ClassValue; }>` |

#app-files-3
:picture{alt="Visualization of the navigation component" :media='{ "(width >= 48rem) and (prefers-color-scheme: dark)": "/images/getting-started/visualization-navigation-vue.dark.png", "(width >= 48rem) and (prefers-color-scheme: light)": "/images/getting-started/visualization-navigation-vue.png", "(width < 48rem) and (prefers-color-scheme: dark) ": "/images/getting-started/small/visualization-navigation-vue.dark.png", "(width < 48rem) and (prefers-color-scheme: light) ": "/images/getting-started/small/visualization-navigation-vue.png" }'}

> Incase the picture didn't load

| Slots      | Description                                                                               |
| :--------- | :---------------------------------------------------------------------------------------- |
| `#buttons` | Use this to override the actions shown in the navigation bar                              |
| `#default` | Use this to override contents of the navigation bar excluding that of the `#buttons` slot |
| `#logo`    | Use this to override the branding shown in the navigation bar                             |

**Values** used from `app.config.ts`

|        | Description                                                                                       | Type     |
| :----- | :------------------------------------------------------------------------------------------------ | :------- |
| `repo` | A string in the format, `username/repo-name` that's used for in a request for the latest release. | `string` |

#app-files-4
An intelligent table of contents that automatically generates from your markdown headings. It's **_context-aware_**{.font-cursive} and only shows when needed.

**Behavior:**

- Only appears if `displayToc: true` is set in your page frontmatter
- Only shows if there are actual headings in your content
- Collapsible on mobile devices to save screen space
- Scrollable when content overflows

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

::tabs{:icon='{"default": "ph:file-duotone", "active": "ph:file-text-fill"}' :tabs='["Button.vue", "Icon.vue", "SvglIcon.vue", "Tabs.vue"]' prefix="ui-files"}

#ui-files-1
A versatile button component that can transform into a link when needed. The current variants supported are:

:button{icon="ph:target" label="I'm a target"}
:button{ extra icon="ph:eyes" label="Do you trust me?" variant="accent"}

#### Usage

```vue
<UiButton to="/docs" icon="ph:book-open" variant="accent">
Read the docs
</UiButton>
```

**Props:**

- `class` &mdash; extra CSS classes that get merged with the base styling
- `icon` &mdash; choose an icon name supported by `UiIcon` (`@nuxt/icon` or `svgl:`)
- `to` &mdash; if present, converts the button to a `NuxtLink`
- `variant` &mdash; styling variant (default or accent)

**Slots:**

- `default` &mdash; the button text content
- `icon` &mdash; custom icon element to replace the default icon

#ui-files-2
A shortcut to the component provided by `@nuxt/icon` that provides icons throughout your documentation. It also respects the `iconMap` remapping from `app.config.ts`.

#ui-files-3
A specialized icon component for rendering SVG icons from the [SVGL](https://svgl.app) registry. Perfect for displaying popular brand logos and icons that aren't available as regular Iconify icons.

**Features:**

- **Remote icon fetching** &mdash; automatically downloads SVG content from the SVGL API
- **Error handling** &mdash; gracefully handles missing icons with console warnings
- **Consistent sizing** &mdash; accepts a size prop to maintain visual consistency
- **Smart fragment rendering** &mdash; uses the `UtilSvgFragment` component for proper SVG display

**Props:**

- `name` &mdash; the SVGL icon name (e.g., "svgl:react", "svgl:vue") **(Required)**
- `size` &mdash; icon dimensions in pixels (default: 20)

#### Usage

```vue
<UiSvglIcon name="svgl:react" :size="24" />
<UiSvglIcon name="svgl:github" />
```

Icons that start with `svgl:` in `footer.iconLinks` will automatically use this component instead of `NuxtIcon`.

#ui-files-4
An interactive tabbed interface component that makes organizing content **_effortless_**{.font-cursive}. Perfect for showing code examples, configuration options, or any grouped content.

**Props:**

- `tabs` &mdash; array of tab names **(Required)**
- `prefix` &mdash; optional prefix for slot names (useful for multiple tab components on the same page)

**Slots:**
The component generates slots based on your tabs array. For tabs `["One", "Two"]`, you get:

- `#tab-1` for "One"
- `#tab-2` for "Two"

#### Usage

```vue
<tabs :tabs="['Setup', 'Usage', 'Advanced']">
<template #tab-1>
  Initial setup instructions...
</template>
<template #tab-2>
  Basic usage examples...
</template>
<template #tab-3>
  Advanced configuration...
</template>
</tabs>
```

**With prefix (for markdown):**

```md
::tabs{:tabs="['Config', 'Code']" prefix="example"}
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

::tabs{:icon='{"default": "ph:file-duotone", "active": "ph:file-text-fill"}' :tabs='["SvgFragment.ts"]' prefix="util-files"}

#util-files-1
A component that intelligently renders SVG content by parsing SVG strings and converting them to Vue virtual nodes. It's used internally by the `SvglIcon` component but can be handy for custom SVG rendering needs.

**Features:**

- **SVG parsing** &mdash; converts raw SVG strings into proper Vue components
- **Virtual node traversal** &mdash; recursively processes SVG elements and text nodes
- **Error handling** &mdash; gracefully handles malformed SVG content with warnings
- **Prop inheritance** &mdash; seamlessly passes through width, height, and other SVG attributes

**Props:**

- `content` &mdash; the raw SVG string to parse and render **(Required)**

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
