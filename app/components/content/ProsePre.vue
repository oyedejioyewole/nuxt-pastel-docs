<template>
  <div class="space-y-4">
    <div
      class="bg-primary-900/10 dark:bg-primary-100/10 max-w-3/4 space-y-4 rounded-lg px-4 py-2"
    >
      <div
        class="inline-flex w-full items-center justify-between text-sm font-bold"
      >
        <span class="uppercase font-serif">{{ $props.language }}</span>

        <ul class="inline-flex gap-x-2 items-center">
          <li
            v-for="(path, index) in filenameBreadcrumbs"
            :key="path"
            class="inline-flex items-center gap-x-1 font-mono"
          >
            <UiIcon
              :name="{
                'ph:folder-open-duotone':
                  index < filenameBreadcrumbs.length - 1,
                'ph:file-text-fill': index === filenameBreadcrumbs.length - 1,
              }"
            />
            <span
              :class="{
                'text-xs': true,
                'font-light': index < filenameBreadcrumbs.length - 1,
              }"
              >{{ path }}</span
            >
            <UiIcon
              :name="{
                'ph:caret-right': index < filenameBreadcrumbs.length - 1,
              }"
            />
          </li>
        </ul>
      </div>

      <pre
        :class="{
          'text-wrap text-sm after:whitespace-pre-line': true,
          [$props.class]: Boolean($props.class),
        }"
      >
        <slot />
      </pre>
    </div>

    <UiButton
      :icon="{ 'ph:check': copied, 'ph:clipboard-duotone': !copied }"
      variant="accent"
      @click="copy($props.code)"
      >{{ copied ? "Copied" : "Copy" }}
    </UiButton>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
});

const { copied, copy } = useClipboard();

const filenameBreadcrumbs = computed(
  () => props.filename && props.filename.split("/"),
);
</script>

<style>
pre code .line {
  display: block;
}
</style>
