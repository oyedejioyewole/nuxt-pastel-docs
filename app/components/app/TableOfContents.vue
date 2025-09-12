<script lang="ts" setup>
import type { ContentCollectionItem } from "@nuxt/content";

const route = useRoute();

const content = computed(() =>
  unref(useNuxtData<ContentCollectionItem>(`page-${route.params.path}`).data),
);

const tableOfContents = computed(() => {
  if (!content.value || !content.value.displayToc) return;

  const entries = content.value.body.toc?.links;
  if (!entries || entries.length < 1) return;

  return entries.flatMap((link) => [
    {
      hash: link.id,
      name: link.text,
      level: link.depth,
    },
    ...(link.children ?? []).map((child) => ({
      hash: child.id,
      name: child.text,
      level: child.depth,
    })),
  ]);
});

const isTableOfContentsToggled = shallowRef(false);
</script>

<template>
  <div
    v-if="tableOfContents"
    id="table-of-contents"
    class="border-primary-900/30 dark:border-primary-100/30 min-lg:py-4 min-lg:space-y-4 min-lg:border-y max-lg:border-dashed"
  >
    <h3 class="font-cursive px-4 text-xl font-bold max-lg:hidden">
      On this page:
    </h3>

    <button
      class="min-lg:hidden font-cursive inline-flex w-full items-center justify-between py-4 font-bold"
      @click="isTableOfContentsToggled = !isTableOfContentsToggled"
    >
      On this page:
      <UiIcon
        :name="
          useRemapIcon({
            'caret-down': !isTableOfContentsToggled,
            'caret-up': isTableOfContentsToggled,
          })
        "
      />
    </button>

    <ul
      :class="{
        block: isTableOfContentsToggled,
        hidden: !isTableOfContentsToggled,
      }"
      class="min-lg:block max-h-[75vh] space-y-4 overflow-y-auto max-lg:mb-4 max-lg:border-l"
    >
      <li
        v-for="entry of tableOfContents"
        :key="entry.hash"
        :class="{
          'pl-8': entry.level === 3,
          'pl-4': entry.level === 2,
        }"
        class="group hover:border-l"
      >
        <a
          class="transition-all duration-200 group-hover:font-bold"
          :class="{
            'text-sm': entry.level === 3,
          }"
          :href="`#${entry.hash}`"
          >{{ entry.name }}</a
        >
      </li>
    </ul>
  </div>
</template>
