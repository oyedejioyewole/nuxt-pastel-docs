<script lang="ts" setup>
import { tailwindcssPaletteGenerator } from "@bobthered/tailwindcss-palette-generator";

const { pastelDocsTheme } = useAppConfig();

useSeoMeta({
  titleTemplate: `%s · ${pastelDocsTheme.repo.split("/").at(1)}`,
});

const themePalette = computed(() => {
  const theme = tailwindcssPaletteGenerator(pastelDocsTheme.themeColor) as {
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
  <Html class="scroll-smooth" lang="en">
    <Body
      class="bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100 selection:bg-primary-200 dark:selection:bg-primary-800"
      :style="themePalette"
    >
      <div
        class="bg-primary-100/70 dark:bg-primary-900/70 top-0 z-10 backdrop-blur-lg transition duration-300 max-lg:sticky max-lg:border-b"
      >
        <AppNavigation
          class="min-lg:py-8 w-9/10 mx-auto flex items-center justify-between py-4"
        />
      </div>

      <slot />
    </Body>
  </Html>
</template>
