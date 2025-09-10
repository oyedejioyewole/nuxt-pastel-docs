<template>
  <div class="space-y-4">
    <div
      class="bg-primary-200 dark:bg-primary-800 max-w-full space-y-4 rounded-lg px-4 py-2"
    >
      <p
        class="inline-flex w-full items-center justify-between text-sm font-bold"
      >
        {{ $props.language }}
        <span class="font-cursive">{{ $props.filename }}</span>
      </p>

      <pre class="text-wrap text-sm" :class="$props.class"><slot /></pre>
    </div>

    <UiButton
      variant="accent"
      :icon="{ check: copied, clipboard: !copied }"
      @click="copy($props.code ?? '')"
      >{{ copied ? "Copied" : "Copy" }}
    </UiButton>
  </div>
</template>

<script setup lang="ts">
defineProps({
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
</script>

<style>
pre code .line {
  display: block;
}
</style>
