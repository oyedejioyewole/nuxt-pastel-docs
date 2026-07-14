<script lang="ts" setup>
import { tailwindcssPaletteGenerator } from "@bobthered/tailwindcss-palette-generator";

const { pastelDocs } = useAppConfig();

useSeoMeta({
  titleTemplate: `%s · ${pastelDocs.projectName ?? pastelDocs.repo.split("/").at(1) ?? "Unnamed"}`,
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
  <Html lang="en" :style="themePalette">
    <Body
      class="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 selection:bg-primary-900/20 dark:selection:bg-primary-100/20"
    >
      <div
        class="bg-primary-100/70 dark:bg-primary-900/70 top-0 z-10 backdrop-blur-lg max-lg:sticky"
      >
        <div
          class="grid grid-cols-12 border-b border-current/30 transition duration-300 hover:border-current/70"
        >
          <AppNavigation
            class="lg:py-8 flex items-center justify-between py-4 col-[2/12]"
          />
        </div>

        <div
          class="border-current/30 border-dashed has-[#table-of-contents]:max-lg:border-b"
        >
          <AppTableOfContents
            v-if="$route.name !== 'index'"
            class="lg:hidden w-9/10 xl:w-8/10 mx-auto"
          />
        </div>
      </div>

      <slot />

      <div
        class="grid grid-cols-12 border-t border-current/30 transition duration-300 hover:border-current/70"
      >
        <AppFooter />
      </div>
    </Body>
  </Html>
</template>
