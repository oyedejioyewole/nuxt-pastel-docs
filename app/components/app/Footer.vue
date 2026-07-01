<template>
  <footer
    v-if="data"
    class="lg:py-8 @container max-[24.25rem]:justify-center flex flex-wrap items-center justify-between gap-4 py-4 col-[2/12]"
  >
    <ContentRenderer :value="data.content" class="max-lg:text-center" />

    <div class="lg:gap-x-8 flex items-center gap-x-4">
      <div
        v-for="[iconName, link] of Object.entries(data.iconLinks)"
        :key="iconName"
      >
        <NuxtLink
          :to="link"
          :target="link.startsWith('http') ? '_blank' : '_self'"
          class="transition-opacity hover:opacity-70"
        >
          <UiIcon :name="iconName" :size="20" />
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { parseMarkdown } from "@nuxtjs/mdc/runtime";

const { pastelDocs } = useAppConfig();

const { data } = useAsyncData("content:footer", async () => {
  return {
    ...pastelDocs.footer,
    content: await parseMarkdown(pastelDocs.footer.content),
  };
});
</script>
