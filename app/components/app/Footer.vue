<script lang="ts" setup>
import type { PhosphorIconName } from "#phosphor-icons/types";
import { parseMarkdown } from "@nuxtjs/mdc/runtime";

const { data } = useAsyncData(async () => {
  const { pastelDocs } = useAppConfig();
  return {
    ...pastelDocs.footer,
    content: await parseMarkdown(pastelDocs.footer.content),
  };
});
</script>

<template>
  <footer
    v-if="data"
    class="min-lg:py-8 w-9/10 min-xl:w-8/10 @container mx-auto flex flex-wrap items-center justify-between gap-4 py-4 max-[348px]:justify-center"
  >
    <ContentRenderer :value="data.content" class="max-lg:text-center" />

    <div
      v-for="[iconName, link] of Object.entries(data.iconLinks)"
      :key="iconName"
    >
      <NuxtLink
        :to="link"
        :target="link.startsWith('http') ? '_blank' : '_self'"
        class="transition-opacity hover:opacity-70"
      >
        <UiIcon
          :name="useRemapIcon(iconName as PhosphorIconName)"
          :size="20"
          weight="duotone"
        />
      </NuxtLink>
    </div>
  </footer>
</template>
