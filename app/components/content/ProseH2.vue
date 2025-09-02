<template>
  <h2 :id="props.id" class="pt-8 font-serif text-2xl font-bold">
    <a
      v-if="props.id && generate"
      class="group relative inline-flex items-end decoration-dotted underline-offset-8 hover:underline"
      :href="`#${props.id}`"
    >
      <UiIcon
        :name="useRemapIcon('link')"
        class="absolute -left-10 hidden group-hover:block"
      />

      <slot />
    </a>
    <slot v-else />
  </h2>
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
      (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h2)),
);
</script>
