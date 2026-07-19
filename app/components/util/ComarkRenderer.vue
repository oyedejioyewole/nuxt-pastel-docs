<script setup lang="ts">
import { ComarkRenderer } from "#components";
import { parseMarkdown } from "../../utils/comark";

import type { LazyComponent } from "#components";
import type { Component } from "vue";

const props = defineProps<{
  markdown: string;
  class?: string;
  components?: Record<string, LazyComponent<Component>>;
  highlight?: boolean;
}>();

const parsedMarkdownTree = await parseMarkdown(props.markdown, {
  highlight: props.highlight,
});
</script>

<template>
  <ComarkRenderer
    :class="$props.class"
    :components="$props.components"
    :tree="parsedMarkdownTree"
  />
</template>
