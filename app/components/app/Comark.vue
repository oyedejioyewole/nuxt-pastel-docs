<script setup lang="ts">
import emoji from "@comark/nuxt/plugins/emoji";
import { Comark } from "#components";

import type { Component } from "vue";
import type { LazyComponent } from "#components";

const props = defineProps<{
  class?: string;
  components?: Record<string, LazyComponent<Component>>;
  highlight?: boolean;
  markdown?: string;
}>();

const highlighter = props.highlight
  ? [
      (await import("@comark/nuxt/plugins/highlight")).default({
        themes: {
          light: (await import("@shikijs/themes/github-dark")).default,
          dark: (await import("@shikijs/themes/github-light")).default,
        },
        registerDefaultThemes: false,
      }),
    ]
  : [];
</script>

<template>
  <Comark
    :class="$props.class"
    :components="$props.components"
    :markdown="$props.markdown"
    :plugins="[emoji(), ...highlighter]"
  />
</template>
