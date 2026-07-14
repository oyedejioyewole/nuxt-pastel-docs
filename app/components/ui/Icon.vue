<template>
  <template v-if="resolvedName">
    <img
      v-if="resolvedName.startsWith('svgl:')"
      :class="$attrs.class"
      :height="props.size"
      :src="`https://svgl.app/library/${resolvedName.replace('svgl:', '')}.svg`"
      :width="props.size"
    />

    <NuxtIcon
      v-else
      :class="$attrs.class"
      :customize="__customizeIcon"
      :name="resolvedName"
      :size="props.size"
    />
  </template>
</template>

<script lang="ts" setup>
import { useIcon } from "#imports";

import type { GenericIconOrPhosphorIconNameWithWeight } from "#nuxt-pastel-docs/types/generics";

export interface UiIconProps {
  name:
    | GenericIconOrPhosphorIconNameWithWeight
    | Partial<Record<GenericIconOrPhosphorIconNameWithWeight, boolean>>;
  overrides?: Partial<{
    color: string;
  }>;
  size?: number | string;
}

const props = defineProps<UiIconProps>();

defineOptions({ inheritAttrs: false });

const { pastelDocs } = useAppConfig();
const resolvedName = computed(() => useIcon(props.name, pastelDocs.iconMap));

function __customizeIcon(content: string) {
  if (props.overrides?.color) {
    content = content.replace(
      /fill="[^"]*"/g,
      `fill="${props.overrides.color}"`,
    );
  }

  return content;
}
</script>
