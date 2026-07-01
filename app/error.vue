<template>
  <NuxtLayout>
    <section
      class="lg:h-[calc(100vh-102px)] grid place-items-center max-lg:h-[calc(100vh-70px)]"
    >
      <div class="space-y-4 text-center">
        <h1 class="xl:text-4xl font-serif text-2xl font-bold">
          Uh oh, a {{ error.status }}!
        </h1>
        <p class="max-sm:text-sm">
          {{ error.message }}
        </p>
        <UiButton icon="ph:arrow-left" @click="handleError"> Go home </UiButton>
      </div>
    </section>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();
useHead({ title: props.error.status });

const handleError = async () => await clearError({ redirect: "/" });
</script>
