<script lang="ts" setup>
const route = useRoute();

const { data } = await useAsyncData(
  `page-${route.params.path}`,
  () => queryCollection("content").path(route.path).first(),
  { watch: [route] },
);

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Couldn't find page for ${route.path}`,
  });
}

useSeoMeta({
  title: data.value.title,
  description: data.value.description,
});
</script>

<template>
  <main v-if="data">
    <div
      class="min-lg:grid-cols-[80%_20%] min-xl:grid-cols-[85%_15%] w-9/10 min-xl:w-8/10 min-lg:gap-x-8 relative mx-auto grid min-h-screen max-lg:grid-rows-[auto_1fr]"
    >
      <div>
        <header class="flex min-h-screen flex-col justify-center gap-y-4">
          <ProseH1>{{ data.title }}</ProseH1>
          <p>{{ data.description }}</p>
        </header>

        <ContentRenderer :value="data" class="space-y-4 text-pretty" />

        <AppTableOfContents />
      </div>

      <aside
        v-if="data.displayToc"
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
