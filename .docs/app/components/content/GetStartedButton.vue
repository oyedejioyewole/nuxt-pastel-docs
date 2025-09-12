<script lang="ts" setup>
import type { PhosphorIconName } from "#phosphor-icons/types";

const props = withDefaults(
  defineProps<{
    extra?: boolean;
    icon?: PhosphorIconName;
    variant?: "accent" | "primary";
  }>(),
  {
    variant: "primary",
  },
);

const trollReader = () => {
  navigateTo(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1",
    { external: true },
  );
};
</script>

<template>
  <div class="flex flex-col items-center gap-y-2">
    <UiButton
      :icon="$props.icon"
      :variant="$props.variant"
      @click="$props.extra ? trollReader() : null"
    >
      <slot />
    </UiButton>

    <div
      class="font-cursive inline-flex items-center gap-x-2 text-sm font-bold"
    >
      <UiIcon :name="useRemapIcon('arrow-bend-left-up')" size="20" />
      '{{ $props.variant }}' variant
    </div>
  </div>
</template>
