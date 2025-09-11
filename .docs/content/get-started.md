---
displayToc: true
---

# Get started

This page would get you started on creating your own pastel themed documentation.

## Introduction

Hey :wave:, you might wonder why I made this project?

**The answer:**

I got tired of re-using and sharing files and configurations among documentations I created. So this project is an attempt at creating a **_clean :black_nib: &mdash; performant :rocket: &mdash; and monochromatic :art:_**{.font-cursive} theme utilizing the power of `layers`

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

**Info:** Apparently, `@nuxt/content` wouldn't be recognized in your project if you try and start the development server.

<br>

Perfect, now you can enjoy writing your documentation with my **_highly opinionated_**{.font-cursive} takes on UIs :sparkles:

## Configuration

Now for the fun part, customization :sparkles:.

### Create an `app.config.ts`

This allows you to customize properties like the `features` list &mdash; the `themeColor` &mdash; and the `headline` etc. through the `pastelDocs` object which follows this schema:

```ts
interface AppConfig {
  pastelDocs: {
    features: string[];
    headline: string;
    icons: Record<string, string>;
    repo: string;
    themeColor: string;
  };
}
```

### Overriding components

If you really don't like my design choices and kind of defeats the entire purpose of using this project &mdash; you can decide to roll out your own components and battle with keeping everything in balance.

The structure of the `components` directory is given below:

<!-- Tabs of directory structure -->

<!-- prettier-ignore-start -->
::UiTabs{:tabs='["app/", "content/", "og-image/", "ui/"]'}

<!-- `app/` tab -->
#tab-1
This folder contains components that define sections in the theme.

  <!-- Sub-tabs of app/ -->
  ::UiTabs{:tabs='["Header.vue", "Logo.vue", "Navigation.vue", "TableOfContents.vue"]' :prefix="app-files"}
  #app-files-1
    **Note:** I'm still working on this part of the documentation.

  #app-files-2
    ...

  #app-files-3
    ...

  #app-files-4
    ...
  ::

<!-- `content/` tab -->
#tab-2
  These are overriden components from [@nuxtjs/mdc](https://github.com/nuxt-modules/mdc/tree/main/src/runtime/components/prose)

<!-- `og-image/` tab -->
#tab-3

  This folder contains only the [NuxtSeo](https://nuxtseo.com/docs/og-image/guides/community-templates) community template from [nuxt-og-image](https://nuxtseo.com/docs/og-image/getting-started/introduction) as I enabled the [zeroRuntime](https://nuxtseo.com/docs/og-image/guides/zero-runtime) configuration.

  **Why?** &mdash; It's just for the love of the game.

  **What does this mean?**

  If you don't like the default, you pretty much have to write your own SEO component yourself or pick from the [various templates](https://github.com/nuxt-modules/og-image/tree/main/src/runtime/app/components/Templates/Community)

  If you're extra picky, you can customize the name of the component you use for SEO &mdash; not like that'll help your documentation much :smile:.

  A snippet is provided below:

  ```ts [app.config.ts]
  export default defineAppConfig({
    pastelDocs: {
      components: {
        seo: "MySexyOgComponent",
      },
    },
  });
  ```

<!-- `ui/` tab -->
#tab-4
  This folder contains components that do UI stuff.

  <!-- Sub-tabs of ui/ -->
  ::UiTabs{:tabs='["Button.vue", "Icon.vue", "Tabs.vue"]' :prefix="ui-files"}

  #ui-files-1

  #### Example

  ::GetStartedButton
  Mhmm, click me
  ::

  ::GetStartedButton{:variant="accent" :extra=true}
  You know you want to
  ::

  1. `class` &mdash; extra CSS classes that get merged with the base CSS classes.
  2. `icon` &mdash; choose an icon to render using [nuxt-phosphor-icons](https://nuxt-phosphor-icons.vercel.app)
  3. `to` &mdash; if present, converts the button to a link.
  4. `variant` &mdash; just look above, you'd see it.

  This component also has slots you can utilize, namely:

  1. `#icon` &mdash; specify a custom element in place for the default icon provided.

  #ui-files-2
  This theme uses for [nuxt-phosphor-icons](https://nxut-phosphor-icons.vercel.app) for icon support.
  
  **Note:** Use `UiIcon` component to render icons.

  #ui-files-3

  #### Examples

  ::UiTabs{:tabs='["Tab 1", "Tab 2"]' :prefix="ui-tabs-example"}
  #ui-tabs-example-1
    There's nothing to see, scooch along now

  #ui-tabs-example-2
    You saw the first tab and really thought there'd be something here instead?
  ::

  1. `tabs` &mdash; an array of strings which build up a tab. **(Required)**

  ```vue [YourSexyComponent]
  <UiTabs :tabs="['1', '2', '3']">
    <template #tab-1>
      doh
    </template>
    <template #tab-2>
      reh
    </template>
    <template #tab-3>
      mi
    </template>
  </UiTabs>
  ```

  2. `prefix` &mdash; prefix for the slot used to render content for tabs
  
  ```md [content]
  ::UiTabs{:tabs="['1', '2','3']" :prefix="numbers"}
  #numbers-1
  doh

  #numbers-2
  reh

  #numbers-3
  mi
  ::
  ```
  ::
::

<!--  prettier-ignore-end -->
