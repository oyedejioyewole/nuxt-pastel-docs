<script lang="ts" setup>
import type { PhosphorIconName } from "#phosphor-icons/types";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  class?: string;
  icon?: PhosphorIconName | Partial<Record<PhosphorIconName, boolean>>;
  to?: string;
  variant?: "primary" | "accent";
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
});

const NuxtLink = resolveComponent("NuxtLink");

const classes = computed(() => {
  const baseClasses =
    "inline-flex w-fit select-none items-center gap-x-2 rounded-lg px-4 py-2 text-sm font-bold selection:bg-transparent cursor-pointer";

  switch (props.variant) {
    case "accent":
      return `${baseClasses} bg-primary-200 dark:bg-primary-800 border border-dashed hover:border-solid`;
    case "primary":
      return `${baseClasses} bg-primary-900 dark:bg-primary-100 text-primary-100 dark:text-primary-900 shadow-primary-500/50 hover:shadow-lg`;
    default:
      return baseClasses;
  }
});

const remappedIcon = computed(() => {
  if (!props.icon) return null;
  return useRemapIcon(props.icon);
});
</script>

<template>
  <component
    :is="$props.to ? NuxtLink : 'button'"
    :class="twMerge(classes, $props.class)"
    :to="$props.to"
  >
    <!-- Icon -->
    <slot name="icon">
      <UiIcon
        v-if="icon"
        :name="remappedIcon ?? icon"
        weight="duotone"
        :size="16"
      />
    </slot>

    <!-- Content -->
    <slot />
  </component>
</template>
