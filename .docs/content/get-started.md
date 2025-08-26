---
title: Get started
description: This page would get you started on creating your own pastel themed documentation.
displayToc: true
---

## Introduction

Hey :wave:, you might be wondering why I made this project?

**My answer:**

I got tired of re-using and sharing files and configurations among documentations I created.

During a scrolling montage on **YouTube Shorts** I discovered `layers` in `Nuxt` and to be honest, my life hasn't been the same.

This project is an attempt at utilizing the power of `layers` to  share opinionated design patterns and configurations among all my documentations.

My attempt at giving the community a **_clean :black_nib:, performant :rocket: and monochromatic :art:_**{.font-cursive} documentation theme.

## Quick start

To use a `layer` in your project, I suggest you checkout [this page from the Nuxt team](https://nuxt.com/docs/4.x/getting-started/layers) which explains a lot about what  `layers` are and how to use them.

But the general gist is:

1. Create a new project &mdash; obviously.
2. Append the following to the `nuxt.config`

  ```ts [nuxt.config]
  export default defineNuxtConfig({
    extends: ['github:oyedejioyewole/nuxt-pastel-docs']
  })
  ```
  This should add this project as a base layer which you can then build on top.

3. Create a `content.config.ts` with the contents below:

  ```ts [content.config]
  import { defineContentConfig, defineCollection, z } from '@nuxt/content'
  
  export default defineContentConfig({
    collections: {
      content: defineCollection({
        type: 'page',
        source: '**/*.md',
        schema: z.object({
          displayToc: z.boolean().default(false)
        })
      })
    }
  })
  ```
  
  **Summary:**
  
  This tells [@nuxt/content](https://content.nuxt.com) to look for `.md` files and also expect a custom schema object: `{ displayToc: boolean }`
  
  This custom schema toggles whether to display a big *** header containing the title and description of the page, and a table of contents on all pages (apart from the `'/'` route).
  
  Perfect, now you can enjoy writing your documentation with my **_highly opinionated_**{.font-cursive} takes on UI design :sparkles:


## Configuration

Now let's head into customizing this theme to truly make it yours.

### Create an `app.config.ts`

If you want to tweak app-level configurations, provide a `pastelDocsTheme` object.

**Note:** I suggest you tweak them else you'd end up with the values used to build this site.

The `pastelDocsTheme` follows this schema:

```ts
interface AppConfig {
  pastelDocsTheme: {
    headline: string,
    repo: string,
    themeColor: string,
    features: string[],
    components: {
      seo: string
    }
  }
}
```

See, I did not pollute your entire `app.config` with properties, so there won't be conflicts with your options.

Pretty considerate? Yes I know.

### Overriding components

If you're really salty about my design choices &mdash; particularly my brain's love for simplicity, you can decide to roll out your own version of components to truly bring your stroke-inducing design choices to life.

The structure of the `components` directory is given below:

::UiTabs{:tabs='["app/", "content/", "og-image/", "ui/"]'}
#tab-1

This folder contains components that define sections in the theme.

  ::UiTabs{:tabs='["Header.vue", "Navigation.vue"]'}
  
  #tab-1
  
  This component creates a big *ss header section for you to gaze in awe at never since before simplicity.
  
  Just as everything in life, this component has properties you can pass, namely:
  
  #tab-2
  ...
  ::

#tab-2

This folder contains components from [@nuxtjs/mdc](https://github.com/nuxt-modules/mdc/tree/main/src/runtime/components/prose), I felt needed the touch of my design fingers.

#tab-3

This folder contains only the [NuxtSeo](https://nuxtseo.com/docs/og-image/guides/community-templates) community template from [nuxt-og-image](https://nuxtseo.com/docs/og-image/getting-started/introduction) as I enabled the [zeroRuntime](https://nuxtseo.com/docs/og-image/guides/zero-runtime) configuration.

**Why, you may ask?** 

It's just for the love of the game.

**What does this mean?**

If you don't like the default, you pretty much have to write your own SEO component yourself or pick from the [various templates](https://github.com/nuxt-modules/og-image/tree/main/src/runtime/app/components/Templates/Community)

If you're extra picky, you can customize the name of the component you use for SEO &mdash; not like that'll help your documentation much :smile:.

A snippet is provided below:

```ts [app.config.ts]
export default defineAppConfig({
  pastelDocsTheme: {
    components: {
      seo: 'MySexyComponent'
    }
  }
})
```

#tab-4

This folder contains components that do UI stuff.

::UiTabs{:tabs='["Button.vue", "Icon.vue", "Tabs.vue"]'}

#tab-1

#### Examples

This section should be self-explanatory

  ::GetStartedButton
  Mhmm, click me
  ::

  ::GetStartedButton{:variant="accent" :extra=true}
  You know you want to
  ::
  
Just as everything in life, this component has properties you can pass, namely:

1. `class` &mdash; custom CSS classes that'll get merged with the base CSS classes, courtesy of [tailwind-merge](https://www.npmjs.com/package/tailwind-merge)
2. `icon` &mdash; choose an icon to render from the [phosphor-icons](https://phosphoricons.com) library. Courtesy of [nuxt-phosphor-icons](https://nuxt-phosphor-icons.vercel.app)
3. `to` &mdash; determines whether the button should be a link (which resolves to [NuxtLink](https://nuxt.com/docs/4.x/api/components/nuxt-link)) or not.
4. `variant` &mdash; need I talk?

This component also has slots you can utilize, namely:

1. `#icon` &mdash; specify a custom element in place for the default icon provided.

#tab-2
Due to the use of [nuxt-phosphor-icons](https://nxut-phosphor-icons.vercel.app) (cause I'm genuinely lazy), we have icon support, yay :confetti_ball:.

**Note:** In the wild, you use the component as `UiIcon` &mdash; I changed the prefix just cause I can :upside_down_face:.

For more information on how to use this component, I won't provide you with the details, you have to figure that out yourself, [here](https://nuxt-phosphor-icons.vercel.app/guide)

#tab-3

This section should be self-explanatory, as that's what you used to reach this point &mdash; duhhhh :roll_eyes:

#### Examples

  ::UiTabs{:tabs='["Tab 1", "Tab 2"]'}
  #tab-1
  There's nothing to see, scooch along now
  
  #tab-2
  You saw the first tab and really thought there'd be something here instead? Insanity mehn 🥴
  ::
  
Just as everything in life, this component has properties you can pass, namely:

`tabs` &mdash; an array of strings which build up a tab.

An example for the practical readers:

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

or for the `markdown` freaks

```md [content]
::UiTabs{:tabs="['1', '2','3']"}
#tab-1
doh

#tab-2
reh

#tab-3
mi
::
```

::

::
