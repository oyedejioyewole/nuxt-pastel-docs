<script lang="ts" setup>
const { pastelDocsTheme } = useAppConfig();

defineOgImageComponent(pastelDocsTheme.components.ogImage, {
  theme: pastelDocsTheme.themeColor,
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtLoadingIndicator :color="pastelDocsTheme.themeColor" />
    <NuxtPage />
  </NuxtLayout>
</template>
