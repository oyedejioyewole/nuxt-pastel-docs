<template>
  <nav>
    <slot>
      <div class="inline-flex items-center gap-x-4">
        <!-- Logo and project name -->
        <NuxtLink
          class="font-cursive inline-flex items-center gap-x-2 font-bold transition-opacity hover:opacity-70"
          to="/"
        >
          <slot name="logo">
            <UiIcon
              :overrides="{ color: 'currentcolor' }"
              size="1.33em"
              name="devicon:nuxt"
            />
          </slot>

          <span class="max-lg:sr-only lg:inline-block">{{
            pastelDocs.projectName ?? pastelDocs.repo.split("/")[1]
          }}</span>
        </NuxtLink>

        <!-- Latest release badge -->
        <ProseA
          v-if="latestRelease"
          :href="latestRelease.html_url"
          target="_blank"
        >
          {{ latestRelease.name }}
        </ProseA>
      </div>
    </slot>

    <slot name="buttons">
      <!-- Navigation items -->
      <button
        class="cursor-pointer transition-opacity hover:opacity-70"
        @click="
          $colorMode.value === 'light'
            ? ($colorMode.preference = 'dark')
            : ($colorMode.preference = 'light')
        "
      >
        <ColorScheme>
          <UiIcon
            :name="{
              'ph:moon-stars-duotone': $colorMode.value === 'light',
              'ph:sun-duotone': $colorMode.value === 'dark',
            }"
            size="1.33em"
          />

          <template #placeholder>
            <UiIcon name="ph:desktop-duotone" size="1.33em" />
          </template>
        </ColorScheme>

        <span class="sr-only">Toggle between light and dark mode</span>
      </button>
    </slot>
  </nav>
</template>

<script lang="ts" setup>
const { pastelDocs } = useAppConfig();
const $colorMode = useColorMode();

const { data: latestRelease } = await useFetch<{
  name: string;
  html_url: string;
}>(`https://api.github.com/repos/${pastelDocs.repo}/releases/latest`, {
  pick: ["name", "html_url"],
});
</script>
