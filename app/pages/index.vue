<script lang="ts" setup>
const { pastelDocs } = useAppConfig();

useSeoMeta({
  title: "Home",
  description: pastelDocs.headline,
});
</script>

<template>
  <main>
    <AppHeader />
  </main>
</template>
