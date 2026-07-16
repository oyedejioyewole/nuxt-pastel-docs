<template>
  <div>
    <h3 class="font-cursive px-4 text-lg font-bold max-lg:hidden">
      On this page:
    </h3>

    <button
      class="font-cursive inline-flex w-full items-center justify-between py-4 font-bold lg:hidden"
      @click="isTableOfContentsToggled = !isTableOfContentsToggled"
    >
      On this page:
      <UiIcon
        :class="[
          'transition duration-300',
          isTableOfContentsToggled && 'rotate-90',
        ]"
        name="ph:caret-down"
      />
    </button>

    <ul
      v-show="isTableOfContentsToggled"
      class="max-h-[75vh] space-y-4 overflow-y-auto max-lg:mb-4 max-lg:border-l lg:block!"
    >
      <li
        v-for="entry of __flattenTableOfContents($props.table.links)"
        :key="entry.id"
        :class="{
          'pl-4': entry.depth === 2,
          'pl-8': entry.depth === 3,
        }"
      >
        <NuxtLink
          :to="`#${entry.id}`"
          class="group inline-flex items-center gap-x-2 text-sm"
          @click="isTableOfContentsToggled = false"
          >{{ entry.text }}
          <UiIcon
            class="invisible shrink-0 group-hover:visible"
            name="ph:caret-left"
          />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { Toc } from "@nuxt/content";

defineProps<{ table: Toc }>();

const isTableOfContentsToggled = shallowRef(false);

const __flattenTableOfContents = (links: Toc["links"]) => {
  const flat: Omit<Toc["links"][0], "children">[] = [];

  for (const { children, ...link } of links) {
    flat.push(link);
    if (children) flat.push(...__flattenTableOfContents(children));
  }

  return flat;
};
</script>
