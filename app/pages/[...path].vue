<script lang="ts" setup>
const route = useRoute();

const { data: content } = await useAsyncData(
  `page-${route.params.path}`,
  () => queryCollection("content").path(route.path).first(),
  { watch: [route] },
);

if (!content.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Couldn't find page for ${route.path}`,
  });
}

useSeoMeta({
  title: content.value.title,
  description: content.value.description,
});
</script>

<template>
  <main v-if="content">
    <div
      class="min-lg:grid-cols-[80%_20%] min-xl:grid-cols-[85%_15%] w-9/10 min-xl:w-8/10 min-lg:gap-x-8 relative mx-auto grid min-h-screen max-lg:grid-rows-[auto_1fr]"
    >
      <ContentRenderer :value="content" class="space-y-4 text-pretty" />

      <aside
        v-if="content.displayToc"
        class="border-primary-900/30 dark:border-primary-100/30 min-lg:border-l max-lg:order-first"
      >
        <div class="min-lg:translate-y-8 sticky inset-0 flex flex-col gap-y-4">
          <NuxtLink
            class="min-lg:px-4 min-lg:inline-flex hidden items-center gap-x-2 font-bold underline-offset-4 hover:underline"
            to="/"
          >
            <UiIcon
              :name="useRemapIcon('house-line')"
              :size="20"
              weight="duotone"
            />
            Go home
          </NuxtLink>

          <AppTableOfContents class="max-lg:hidden" />
        </div>
      </aside>
    </div>
  </main>
</template>
