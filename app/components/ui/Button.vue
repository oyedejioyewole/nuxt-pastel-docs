<template>
  <component
    :is="props.to ? NuxtLink : 'button'"
    :class="
      buttonVariants({ class: cn($attrs.class), variant: $props.variant })
    "
    :to="props.to"
  >
    <!-- Icon -->
    <slot name="icon">
      <UiIcon v-if="resolvedIcon" :name="resolvedIcon" size="16" />
    </slot>

    <!-- Content -->
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { useIcon } from "#imports";

import { cn, tv, type VariantProps } from "tailwind-variants";

import type { UiIconProps } from "./Icon.vue";

const buttonVariants = tv({
  base: "w-fit cursor-pointer items-center gap-x-2 rounded-lg px-4 py-2 text-sm font-bold transition duration-300 select-none selection:bg-transparent hover:scale-95 has-[svg]:inline-flex",
  variants: {
    variant: {
      primary:
        "bg-primary-900 dark:bg-primary-100 text-primary-100 dark:text-primary-900 shadow-primary-500/50 hover:shadow-lg",
      accent:
        "bg-primary-200 dark:bg-primary-800 border border-dashed hover:border-solid",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
type ButtonVariants = VariantProps<typeof buttonVariants>;

export type Props = Partial<{
  icon: UiIconProps["name"];
  to: string;
}>;

export interface UiButtonProps extends Props {
  variant?: ButtonVariants["variant"];
}
const props = defineProps<UiButtonProps>();

const { pastelDocs } = useAppConfig();
const resolvedIcon = computed(
  () => props.icon && useIcon(props.icon, pastelDocs.iconMap),
);

const NuxtLink = resolveComponent("NuxtLink");
</script>
