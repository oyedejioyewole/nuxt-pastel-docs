<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    name: string;
    size?: number;
  }>(),
  {
    size: 20,
  },
);

const { data: svglIcon, error } = await useFetch<string>(
  `/svg/${props.name.replace("svgl:", "")}.svg`,
  {
    baseURL: "https://api.svgl.app",
    onResponse({ response }) {
      if (!response._data || /<!doctype\shtml>/g.test(response._data)) {
        throw new Error(`Couldn't find '${props.name}' in SVGL registry`);
      }
    },
  },
);
</script>

<template>
  <UtilSvgFragment
    v-if="!error && svglIcon"
    :content="svglIcon"
    :width="size"
    :height="size"
  />
</template>
