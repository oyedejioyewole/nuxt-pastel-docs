<template>
  <h3 class="text-balance pt-4 font-serif text-xl font-bold" :id="props.id">
    <a
      v-if="props.id && generate"
      class="group relative inline-flex items-center decoration-dotted underline-offset-8 hover:underline"
      :href="`#${props.id}`"
    >
      <UiIcon
        :name="useRemapIcon('link')"
        class="absolute -left-8 hidden group-hover:block"
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
