<script lang="ts" setup>
const { pastelDocs } = useAppConfig();

useSeoMeta({
  title: "Home",
  description: pastelDocs.headline,
});
</script>

<template>
  <main>
    <AppHeader
      right-slot-classes="min-lg:h-[400px] grid h-3/4 grid-cols-3 gap-4 rounded-lg"
    >
      <template #aside> </template>
    </AppHeader>
  </main>
</template>
