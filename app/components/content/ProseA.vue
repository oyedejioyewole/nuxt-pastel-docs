<template>
  <NuxtLink
    :href="props.href"
    :target="
      (props.target ?? props.href.startsWith('https://')) ? '_blank' : ''
    "
  >
    <ProseCode class="border border-dashed hover:border-solid">
      <slot />
    </ProseCode>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
  href: {
    type: String,
    default: "",
  },
  target: {
    type: String as PropType<
      | "_blank"
      | "_parent"
      | "_self"
      | "_top"
      | (string & object)
      | null
      | undefined
    >,
    default: undefined,
    required: false,
  },
});
</script>
