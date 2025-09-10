<script lang="ts" setup>
import type { ContentCollectionItem } from "@nuxt/content";
import { tailwindcssPaletteGenerator } from "@bobthered/tailwindcss-palette-generator";

const { pastelDocs } = useAppConfig();
const route = useRoute();

useSeoMeta({
  titleTemplate: `%s · ${pastelDocs.repo.split("/").at(1)}`,
});

const themePalette = computed(() => {
  const theme = tailwindcssPaletteGenerator(pastelDocs.themeColor) as {
    primary: Record<number, string>;
  };

  const [shades, values] = [
    Object.keys(theme.primary),
    Object.values(theme.primary),
  ];

  return values.reduce((accumulator, currentValue, index) => {
    accumulator += `--color-primary-${shades[index]}: ${currentValue}; `;
    return accumulator;
  }, "");
});

const content = computed(() =>
  unref(useNuxtData<ContentCollectionItem>(`page-${route.params.path}`).data),
);
</script>

<template>
  <Html class="scroll-smooth" lang="en" :style="themePalette">
    <Body
      class="bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100 selection:bg-primary-200 dark:selection:bg-primary-800"
    >
      <div
        class="bg-primary-100/70 dark:bg-primary-900/70 top-0 z-10 backdrop-blur-lg max-lg:sticky"
      >
        <div
          class="border-primary-900/30 dark:border-primary-100/30"
          :class="{ 'border-b': content?.displayToc }"
        >
          <AppNavigation />
        </div>

        <div
          class="border-primary-900/30 dark:border-primary-100/30 border-dashed"
          :class="{ 'max-lg:border-b': content?.displayToc }"
        >
          <AppTableOfContents
            class="min-lg:hidden w-9/10 min-xl:w-8/10 mx-auto"
          />
        </div>
      </div>

      <slot />
    </Body>
  </Html>
</template>
