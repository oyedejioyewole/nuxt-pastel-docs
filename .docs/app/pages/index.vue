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
      right-slot-classes="lg:h-[400px] h-9/10 grid grid-cols-3 gap-4 rounded-lg"
    >
      <template #aside>
        <AppThemeSwatches />
      </template>
    </AppHeader>
  </main>
</template>
