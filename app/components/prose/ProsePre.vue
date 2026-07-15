<template>
  <div class="space-y-2">
    <div class="space-y-4 rounded-lg bg-current/10 px-4 py-2">
      <div
        class="inline-flex w-full items-center justify-between text-sm font-bold"
      >
        <span class="font-serif uppercase">{{ $props.language }}</span>

        <ul class="inline-flex items-center gap-x-2">
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
              :class="[
                'text-xs',
                index < filenameBreadcrumbs.length - 1 && 'font-light',
              ]"
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
        :class="['text-sm text-wrap', Boolean($props.class) && $props.class]"
      ><slot /></pre>
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

<style scoped>
html.light .shiki :deep(span) {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}
</style>
