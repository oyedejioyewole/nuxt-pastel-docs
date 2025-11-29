<script lang="ts" setup>
const props = defineProps<{
  name: string;
}>();

const { data: svglIcon, error } = await useFetch<string>(
  `/svg/${props.name.replace("svgl:", "")}.svg`,
  {
    baseURL: "https://api.svgl.app",
    onResponseError() {
      throw new Error(
        `Couldn't find '${props.name.replace("svgl:", "")}' in SVGL registry`,
      );
    },
    responseType: "text",
  },
);

if (error.value) console.error(error.value.message);
</script>

<template>
  <UtilSvgFragment
    v-if="svglIcon"
    :content="svglIcon"
    height="20px"
    width="20px"
  />
</template>
