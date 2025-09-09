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

const tableOfContents = computed(() => {
  const tableOfContents = data.value?.body.toc;
  if (!tableOfContents) return;

  return tableOfContents.links.map((link) => ({
    hash: link.id,
    name: link.text,
  }));
});

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
          <p class="max-w-[60ch]">{{ data.description }}</p>
        </header>

        <ContentRenderer :value="data" class="space-y-4 text-pretty" />
      </div>

      <!-- Inspect this ... -->
      <aside
        v-if="data.displayToc"
        class="border-primary-900/30 dark:border-primary-100/30 min-lg:border-l bg-blue-200 max-lg:order-first max-lg:border-b"
      >
        <div class="min-lg:translate-y-8 sticky top-0 flex flex-col gap-y-4">
          <NuxtLink
            class="min-lg:px-4 inline-flex items-center gap-x-2 font-bold underline-offset-4 hover:underline"
            to="/"
          >
            <UiIcon
              :name="useRemapIcon('house-line')"
              :size="20"
              weight="duotone"
            />
            Go home
          </NuxtLink>

          <div
            class="border-primary-900/30 dark:border-primary-100/30 w-auto border-t border-dashed"
          >
            <h3 class="font-cursive p-4 text-xl font-bold max-lg:px-0">
              On this page:
            </h3>

            <ul class="max-h-[75vh] space-y-4 overflow-y-auto pb-2">
              <li
                v-for="entry of tableOfContents"
                :key="entry.hash"
                class="min-lg:px-4 group hover:border-l"
              >
                <a class="group-hover:font-bold" :href="`#${entry.hash}`">{{
                  entry.name
                }}</a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  </main>
</template>
