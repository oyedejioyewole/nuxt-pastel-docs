<script lang="ts" setup>
const props = defineProps<{
  name: string;
}>();

const { data: svglIcon, error } = await useFetch<string>(
  `/svg/${props.name.replace("svgl:", "")}.svg`,
  {
    baseURL: "https://api.svgl.app",
    onResponse({ response }) {
      if (!response._data || /<!doctype\shtml>/g.test(response._data)) {
        throw new Error(
          `Couldn't find '${props.name.replace("svgl:", "")}' in SVGL registry`,
        );
      }
    },
  },
);

if (error.value) console.error(error.value.message);
</script>

<template>
  <UtilSvgFragment
    v-if="!error && svglIcon"
    :content="svglIcon"
    height="20px"
    width="20px"
  />
</template>
