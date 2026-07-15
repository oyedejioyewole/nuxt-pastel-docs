<script lang="ts" setup>
import { cn, type ClassValue } from "tailwind-variants";

defineProps<{
  classes?: Partial<{
    aside: ClassValue;
    default: ClassValue;
  }>;
}>();

const { pastelDocs } = useAppConfig();
</script>

<template>
  <header
    :class="
      cn(
        'mx-auto grid h-[calc(100vh-88px)] w-9/10 items-center max-lg:min-h-[calc(100vh-55px)] max-lg:grid-rows-2 lg:grid-cols-2 lg:justify-between lg:gap-x-8 xl:w-8/10 xl:justify-around',
        $attrs.class,
      )
    "
  >
    <!-- 1st column -->
    <div :class="cn('@container basis-1/2 space-y-4', $props.classes?.default)">
      <slot>
        <!-- Tagline -->
        <ProseH1>
          {{ pastelDocs.headline }}
        </ProseH1>

        <!-- Feature list -->
        <ul class="space-y-2">
          <li
            v-for="(feature, index) of pastelDocs.features"
            :key="index"
            class="text-primary-900 dark:text-primary-100 flex items-center gap-x-2"
          >
            <UiIcon name="ph:asterisk-bold" />
            {{ feature }}
          </li>
        </ul>

        <slot name="buttons">
          <div class="flex flex-wrap gap-4 @max-md:mb-4">
            <UiButton to="/getting-started" icon="ph:book-open">
              Get started
            </UiButton>

            <UiButton
              icon="ph:github-logo"
              variant="accent"
              :to="`https://github.com/${pastelDocs.repo}`"
            >
              View project
            </UiButton>
          </div>
        </slot>
      </slot>
    </div>

    <!-- 2nd column -->
    <div
      v-if="$slots['aside']"
      :class="cn('max-lg:order-first', $props.classes?.aside)"
    >
      <slot name="aside" />
    </div>
  </header>
</template>
