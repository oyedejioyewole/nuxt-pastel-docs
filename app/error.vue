<script lang="ts" setup>
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
useHead({ title: props.error?.statusCode });

const handleError = async () => await clearError({ redirect: "/" });
</script>

<template>
  <NuxtLayout>
    <section
      class="lg:h-[calc(100vh-102px)] grid place-items-center max-lg:h-[calc(100vh-70px)]"
    >
      <div class="space-y-4 text-center">
        <h1 class="xl:text-4xl font-serif text-2xl font-bold">
          Uh oh, a {{ error?.statusCode }}!
        </h1>
        <p class="max-sm:text-sm">
          {{ error?.message }}
        </p>
        <UiButton icon="arrow-left" @click="handleError"> Go home </UiButton>
      </div>
    </section>
  </NuxtLayout>
</template>
