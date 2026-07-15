<template>
  <div class="space-y-4">
    <nav class="flex flex-wrap gap-2">
      <button
        v-for="(tab, index) of $props.tabs"
        :key="tab"
        @click="activeTab = index + 1"
      >
        <div
          :class="{
            'border inline-flex items-center gap-x-2 bg-primary-900/10 dark:bg-primary-100/10 px-4 rounded-lg py-1': true,
            'border-inherit': index === activeTab - 1,
            'not-hover:border-transparent hover:border-dashed':
              index !== activeTab - 1,
          }"
        >
          <UiIcon
            :name="{
              [$props.icon.active as string]: index === activeTab - 1,
              [$props.icon.default as string]: index !== activeTab - 1,
            }"
          />

          <code class="text-xs">
            {{ tab }}
          </code>
        </div>
      </button>
    </nav>

    <div
      v-for="index in $props.tabs.length"
      :id="`${$props.prefix}-${index}`"
      :key="`${$props.prefix}-${index}`"
      v-auto-animate
      class="space-y-4"
    >
      <slot v-if="index === activeTab" :name="`${$props.prefix}-${index}`" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UiIconProps } from "./Icon.vue";

withDefaults(
  defineProps<{
    tabs: string[];
    icon?: Partial<{
      default: UiIconProps["name"];
      active: UiIconProps["name"];
    }>;
    prefix?: string;
  }>(),
  {
    prefix: "tab",
    icon: () => ({
      default: "ph:circle-duotone",
      active: "ph:circle-fill",
    }),
  },
);

const activeTab = shallowRef(1);
</script>
