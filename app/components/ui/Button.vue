<template>
  <component
    :is="props.to ? NuxtLink : 'button'"
    :class="twMerge(classes, props.class)"
    :to="props.to"
  >
    <!-- Icon -->
    <slot name="icon">
      <UiIcon v-if="resolvedIcon" :name="resolvedIcon" :size="16" />
    </slot>

    <!-- Content -->
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { useIcon } from "#imports";
import { twMerge } from "tailwind-merge";

import type { UiIconProps } from "./Icon.vue";

export type UiButtonProps = Partial<{
  class: string;
  icon: UiIconProps["name"];
  to: string;
  variant: "primary" | "accent";
}>;

const { variant = "primary", ...props } = defineProps<UiButtonProps>();

const NuxtLink = resolveComponent("NuxtLink");

const classes = computed(() => {
  const baseClasses =
    "inline-flex w-fit select-none items-center gap-x-2 rounded-lg px-4 py-2 text-sm font-bold selection:bg-transparent cursor-pointer hover:scale-95 transition duration-300";

  switch (variant) {
    case "accent":
      return twMerge`${baseClasses} bg-primary-200 dark:bg-primary-800 border border-dashed hover:border-solid`;
    case "primary":
      return twMerge`${baseClasses} bg-primary-900 dark:bg-primary-100 text-primary-100 dark:text-primary-900 shadow-primary-500/50 hover:shadow-lg`;
    default:
      return baseClasses;
  }
});

const { pastelDocs } = useAppConfig();
const resolvedIcon = computed(() => {
  return !props.icon ? null : useIcon(props.icon, pastelDocs.iconMap);
});
</script>
