<script lang="ts" setup>
import { tailwindcssPaletteGenerator } from "@bobthered/tailwindcss-palette-generator";

const { pastelDocs } = useAppConfig();

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
</script>

<template>
  <Html class="scroll-smooth" lang="en" :style="themePalette">
    <Body
      class="bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100 selection:bg-primary-900/20 dark:selection:bg-primary-100/20"
    >
      <div
        class="bg-primary-100/70 dark:bg-primary-900/70 top-0 z-10 backdrop-blur-lg max-lg:sticky"
      >
        <div class="border-primary-900/30 dark:border-primary-100/30 border-b">
          <AppNavigation
            class="lg:py-8 w-9/10 xl:w-8/10 mx-auto flex items-center justify-between py-4"
          />
        </div>

        <div
          class="border-primary-900/30 dark:border-primary-100/30 border-dashed has-[#table-of-contents]:max-lg:border-b"
          data-allow-mismatch="children"
        >
          <AppTableOfContents class="lg:hidden w-9/10 xl:w-8/10 mx-auto" />
        </div>
      </div>

      <slot />

      <div class="border-primary-900/30 dark:border-primary-100/30 border-t">
        <AppFooter />
      </div>
    </Body>
  </Html>
</template>
