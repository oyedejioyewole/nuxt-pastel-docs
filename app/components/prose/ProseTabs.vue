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
            'bg-primary-900/10 dark:bg-primary-100/10 inline-flex items-center gap-x-2 rounded-lg border px-4 py-1': true,
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
      :id="$props.prefix + '-' + activeTab"
      :key="$props.prefix + '-' + activeTab"
      class="space-y-4"
    >
      <slot :name="$props.prefix + '-' + activeTab" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UiIconProps } from "../ui/Icon.vue";

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
      default: "ph:folder-duotone",
      active: "ph:folder-open-fill",
    }),
  },
);

const activeTab = shallowRef(1);
</script>
