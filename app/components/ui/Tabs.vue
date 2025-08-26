<script lang="ts" setup>
defineProps<{ tabs: string[] }>();

const activeTab = shallowRef(1);
</script>

<template>
  <div class="space-y-4">
    <nav class="flex flex-wrap gap-2">
      <button
        v-for="(tab, index) of $props.tabs"
        :key="tab"
        type="button"
        @click="activeTab = index + 1"
      >
        <ProseCode
          class="border"
          :class="{
            'border-inherit': index === activeTab - 1,
            'not-hover:border-transparent hover:border-dashed':
              index !== activeTab - 1,
          }"
        >
          {{ tab }}
        </ProseCode>
      </button>
    </nav>

    <div
      v-for="index in $props.tabs.length"
      :key="index"
      v-auto-animate
      class="space-y-4"
    >
      <slot v-if="index === activeTab" :name="`tab-${index}`" />
    </div>
  </div>
</template>
