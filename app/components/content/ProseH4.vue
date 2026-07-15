<template>
  <h4 :id="props.id" class="font-serif font-bold">
    <a
      v-if="props.id && generate"
      :href="`#${props.id}`"
      class="group relative inline-flex items-center decoration-dotted underline-offset-8 hover:underline"
    >
      <UiIcon
        class="absolute -left-6 hidden group-hover:block"
        name="ph:link"
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
