<template>
  <picture>
    <ClientOnly v-if="hasColorScheme">
      <PictureSources :alt="$props.alt" :sources="filteredSources" />

      <template #fallback>
        <p
          :class="
            cn(imgClass, 'inline-flex items-center justify-center gap-2 p-8')
          "
        >
          <UiIcon
            class="shrink-0 animate-spin"
            name="ph:circle-notch-thin"
            size="4rem"
          />
          <span class="sr-only">Loading image specific to current theme.</span>
        </p>
      </template>
    </ClientOnly>

    <PictureSources v-else :alt="$props.alt" :sources="sources" />
  </picture>
</template>

<script lang="ts">
import { cn } from "tailwind-variants";
import PictureSources from "./Sources.vue";

import type { ImageOptions, ImageSizes } from "@nuxt/image";

export type PictureSources = [string, ImageSizes];
export type ProsePictureProps = {
  alt: string;
  media: { [query: string]: string };
} & ImageOptions;

export const imgClass =
  "mb-4 w-full rounded-md border border-current/30 transition duration-300 hover:border-current/70";
</script>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false });

const { media, ...props } = defineProps<ProsePictureProps>();

const $colorMode = useColorMode();

const hasColorScheme = computed(() => {
  return Object.keys(media).some((query) =>
    query.includes("prefers-color-scheme"),
  );
});

const $img = useImage();

const sources = computed(() => {
  return Object.entries(media).map(([query, imgSources]): PictureSources => {
    return [query, $img.getSizes(imgSources, { ...props })];
  });
});

const isMounted = useMounted();
const isSystemThemeDark = usePreferredDark();

const filteredSources = computed((): PictureSources[] => {
  if (!isMounted.value) return sources.value;

  const FEATURE_RE = /\((prefers-color-scheme:\s*)(\w+)\)/;
  return sources.value
    .filter(([query]) => {
      const match = query.match(FEATURE_RE);

      return !match || match[2] === $colorMode.value;
    })
    .map(([query, source]) => {
      const match = query.match(FEATURE_RE);

      return [
        !match
          ? query
          : query.replace(
              FEATURE_RE,
              `($1${isSystemThemeDark.value ? "dark" : "light"})`,
            ),
        source,
      ];
    });
});
</script>
