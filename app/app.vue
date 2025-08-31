<script lang="ts" setup>
const { pastelDocs } = useAppConfig();

defineOgImageComponent(pastelDocs.components.ogImage, {
  theme: pastelDocs.themeColor,
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtLoadingIndicator :color="pastelDocs.themeColor" />
    <NuxtPage />
  </NuxtLayout>
</template>
