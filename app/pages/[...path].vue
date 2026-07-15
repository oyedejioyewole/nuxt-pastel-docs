<template>
  <main class="grid min-h-screen grid-cols-12">
    <AppComark
      :components="{ button: LazyGetStartedButton }"
      :markdown="content!.rawbody"
      class="col-[2/12] space-y-4 py-8 text-pretty lg:col-[2/9]"
      highlight
    />

    <aside
      class="relative border-current/30 max-lg:order-first max-lg:col-span-full max-lg:grid max-lg:grid-cols-12 max-lg:border-dashed has-[#table-of-contents]:max-lg:border-b lg:col-[10/12] lg:border-l"
    >
      <div class="sticky inset-0 space-y-4 max-lg:col-[2/12] lg:translate-y-8">
        <NuxtLink
          class="font-cursive hidden items-center gap-x-2 font-bold underline-offset-4 hover:underline lg:inline-flex lg:px-4"
          to="/"
        >
          <UiIcon name="ph:house-line-duotone" size="1.33em" />
          Go home
        </NuxtLink>

        <LazyAppTableOfContents
          v-if="$route.name !== 'index'"
          id="table-of-contents"
          :data="content!.body.toc!"
          class="border-current/30 lg:space-y-4 lg:border-y lg:py-4"
        />
      </div>
    </aside>
  </main>
</template>

<script lang="ts" setup>
import { LazyGetStartedButton } from "#components";

const $route = useRoute();

const { data: content } = await useAsyncData(
  `content:${$route.path}`,
  () => queryCollection("content").path($route.path).first(),
  { watch: [() => $route.path] },
);

if (!content.value)
  throw createError({
    message: `Couldn't find page for ${$route.path}`,
    status: 404,
  });

useSeoMeta({
  title: content.value.title,
  description: content.value.description,
});
</script>
