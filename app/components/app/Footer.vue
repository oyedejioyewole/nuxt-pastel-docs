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
    class="min-lg:py-8 w-9/10 min-xl:w-8/10 @container max-[24.25rem]:justify-center mx-auto flex flex-wrap items-center justify-between gap-4 py-4"
  >
    <ContentRenderer :value="data.content" class="max-lg:text-center" />

    <div class="min-lg:gap-x-8 flex items-center gap-x-4">
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
            v-if="!iconName.startsWith('svgl:')"
            :name="useRemapIcon(iconName as PhosphorIconName)"
            :size="20"
            weight="duotone"
          />

          <UiSvglIcon v-else :name="iconName" />
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
