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

const { data: SvglIcon } = await useAsyncData(async () => {
  const { data: icon } = await useFetch<string>(
    `/svg/${props.name.replace("svgl:", "")}.svg`,
    { baseURL: "https://api.svgl.app" },
  );

  if (/<!doctype\shtml>/g.test(icon.value ?? "")) {
    console.warn(`Couldn't find '${props.name}' in SVGL registry`);
    return null;
  } else return icon.value;
});
</script>

<template>
  <UtilSvgFragment
    v-if="SvglIcon"
    :content="SvglIcon"
    :width="size"
    :height="size"
  />
</template>
