<template>
  <h4 class="font-serif font-bold" :id="props.id">
    <a
      v-if="props.id && generate"
      class="group relative inline-flex items-center decoration-dotted underline-offset-8 hover:underline"
      :href="`#${props.id}`"
    >
      <UiIcon
        :name="useRemapIcon('link')"
        class="absolute -left-6 hidden group-hover:block"
      />

      <slot />
    </a>
    <slot v-else />
  </h4>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from "#imports";

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(
  () =>
    props.id &&
    ((typeof headings?.anchorLinks === "boolean" &&
      headings?.anchorLinks === true) ||
      (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h4)),
);
</script>
