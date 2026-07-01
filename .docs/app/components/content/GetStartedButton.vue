<template>
  <div class="flex flex-col items-center gap-y-2">
    <UiButton
      :icon="$props.icon"
      :variant="$props.variant"
      @click="$props.extra && trollReader"
    >
      {{ $props.label }}
    </UiButton>

    <div class="font-cursive inline-flex items-start gap-x-2 text-sm font-bold">
      <UiIcon name="ph:arrow-bend-left-up" />
      '{{ $props.variant }}' variant
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UiButtonProps } from "../../../../app/components/ui/Button.vue";

withDefaults(
  defineProps<
    {
      label: string;
      extra?: boolean;
    } & Pick<UiButtonProps, "icon" | "variant">
  >(),
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
