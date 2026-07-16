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

const filteredSources = ref<PictureSources[]>([]);

watch(
  [() => $colorMode.value, isMounted, sources, isSystemThemeDark],
  async ([currentColorMode, isMounted, sources, isSystemThemeDark]) => {
    if (!isMounted) return;

    const { isParserError, parseMediaQuery, stringify } =
      await import("media-query-parser");

    filteredSources.value = sources
      // Convert query string into its AST representation for easier manipulation.
      .map(([query, source]) => {
        const queryResponse = parseMediaQuery(query);
        if (isParserError(queryResponse)) {
          console.error(`Failed to parse media query: ${query}`);
          return null;
        }

        return { query: { value: query, tree: queryResponse }, source };
      })
      // Filter out any entries that failed to parse.
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
      // Traverse the AST to find any "prefers-color-scheme" media queries and define a new property, `scheme` for each entry.
      .map((entry) => ({
        ...entry,
        scheme: findMediaQueryFeature(entry.query.tree, "prefers-color-scheme"),
      }))
      // Filter out any entries that have a "prefers-color-scheme" media query that does not match the `$colorMode.value`.
      .filter(({ scheme }) => !scheme || scheme === currentColorMode)
      // Traverse the AST to find and replace all "prefers-color-scheme" media queries with the current system theme,
      // and return a new array containing the updated media query string and the corresponding image source.
      .map(({ query, scheme, source }): [string, ImageSizes] => {
        if (!scheme) return [stringify(query.tree), source]; // No existing scheme, return as is

        const queryResponse = findAndReplaceMediaQueryFeature(
          structuredClone(query.tree),
          "prefers-color-scheme",
          isSystemThemeDark ? "dark" : "light",
        );

        return [stringify(queryResponse.tree), source];
      });
  },
  { immediate: true },
);
</script>
