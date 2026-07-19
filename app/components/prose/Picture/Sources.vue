<template>
  <template
    v-for="([mediaQuery, source], index) of $props.sources"
    :key="source.src"
  >
    <source :media="mediaQuery" :sizes="source.sizes" :srcset="source.srcset" />

    <img
      v-if="index === $props.sources.length - 1"
      v-bind="source"
      decoding="async"
      :alt="$props.alt"
      :class="imgClass"
    />
  </template>
</template>

<script lang="ts" setup>
import { imgClass } from "./Index.vue";

import type { PictureSources, ProsePictureProps } from "./Index.vue";

defineProps<{ sources: PictureSources[] } & Omit<ProsePictureProps, "media">>();
</script>
