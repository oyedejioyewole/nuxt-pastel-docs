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

const tableOfContentsToggled = shallowRef(false);

useSeoMeta({
  title: data.value.title,
  description: data.value.description,
});
</script>

<template>
  <main v-if="data">
    <AppHeader
      v-if="data.displayToc"
      class="min-lg:grid-cols-[1fr_auto] gap-x-4 max-lg:grid-rows-[auto_1fr]"
      left-slot-classes="justify-center max-lg:grid max-lg:w-full max-lg:flex-1 max-lg:place-content-center max-lg:justify-start"
      right-slot-classes="space-y-4 max-lg:w-full max-lg:pt-4"
    >
      <template #default>
        <ProseH1>{{ data.title }}</ProseH1>
        <p class="max-w-[60ch]">{{ data.description }}</p>

        <UiButton icon="house" to="/">Go Home</UiButton>
      </template>

      <template v-if="tableOfContents" #aside>
        <UiButton
          :icon="{
            'sort-descending': tableOfContentsToggled,
            'sort-ascending': !tableOfContentsToggled,
          }"
          variant="accent"
          @click="tableOfContentsToggled = !tableOfContentsToggled"
          >On this page</UiButton
        >

        <div v-auto-animate class="max-h-[75vh] max-lg:w-full">
          <ul v-if="tableOfContentsToggled">
            <li
              v-for="entry of tableOfContents"
              :key="entry.hash"
              class="group border-l px-4 py-2 hover:border-l-2"
            >
              <a class="group-hover:underline" :href="`#${entry.hash}`">{{
                entry.name
              }}</a>
            </li>
          </ul>
        </div>
      </template>
    </AppHeader>

    <ContentRenderer
      :value="data"
      class="w-9/10 min-xl:max-w-6/10 mx-auto min-h-screen space-y-4"
    />
  </main>
</template>
