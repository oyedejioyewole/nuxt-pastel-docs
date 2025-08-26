<script lang="ts" setup>
const { pastelDocsTheme } = useAppConfig();

useSeoMeta({
  title: "Home",
  description: pastelDocsTheme.headline,
});
</script>

<template>
  <main>
    <AppHeader />
  </main>
</template>
