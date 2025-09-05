<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

defineProps<{
  class?: string;
  leftSlotClasses?: string;
  rightSlotClasses?: string;
}>();

const { pastelDocs } = useAppConfig();
</script>

<template>
  <header
    :class="
      twMerge(
        `min-lg:h-[calc(100vh_-_102px)] w-9/10 min-lg:justify-between min-xl:justify-around min-lg:grid-cols-2 mx-auto grid items-center max-lg:min-h-[calc(100vh_-_70px)] max-lg:grid-rows-2`,
        $props.class,
      )
    "
  >
    <!-- 1st column -->
    <div
      :class="twMerge('@container basis-1/2 space-y-4', $props.leftSlotClasses)"
    >
      <slot>
        <!-- Tagline -->
        <ProseH1>
          {{ pastelDocs.headline }}
        </ProseH1>

        <!-- Feature list -->
        <ul class="space-y-2">
          <li
            v-for="(feature, _index) of pastelDocs.features"
            :key="_index"
            class="flex gap-x-2"
          >
            <UiIcon :name="useRemapIcon('check')" />
            {{ feature }}
          </li>
        </ul>

        <div class="@max-[22.5rem]:mb-4 flex flex-wrap gap-4">
          <UiButton to="/get-started" icon="book-open"> Get started </UiButton>

          <UiButton
            icon="github-logo"
            variant="accent"
            :to="`https://github.com/${pastelDocs.repo}`"
          >
            View project
          </UiButton>
        </div>
      </slot>
    </div>

    <!-- 2nd column -->
    <div
      v-if="$slots['aside']"
      :class="twMerge('max-lg:order-first', $props.rightSlotClasses)"
    >
      <slot name="aside" />
    </div>
  </header>
</template>
