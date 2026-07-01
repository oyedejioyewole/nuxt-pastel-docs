<template>
  <h3 :id="props.id" class="text-balance pt-4 font-serif text-xl font-bold">
    <a
      v-if="props.id && generate"
      :href="`#${props.id}`"
      class="group relative inline-flex items-center decoration-dotted underline-offset-8 hover:underline"
    >
      <UiIcon
        class="absolute -left-8 hidden group-hover:block"
        name="ph:link"
      />

      <div>
        <slot />
      </div>
    </a>
    <slot v-else />
  </h3>
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
      (typeof headings?.anchorLinks === "object" && headings?.anchorLinks?.h3)),
);
</script>
