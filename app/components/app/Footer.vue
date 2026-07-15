<template>
  <footer
    class="@container col-[2/12] flex flex-wrap items-center justify-between gap-4 py-4 max-[24.25rem]:justify-center lg:py-8"
  >
    <AppComark
      class="max-lg:text-center"
      :markdown="pastelDocs.footer.content"
    />

    <div class="flex items-center gap-x-4 lg:gap-x-8">
      <div
        v-for="[iconName, link] of Object.entries(pastelDocs.footer.iconLinks)"
        :key="iconName"
      >
        <NuxtLink
          :to="link"
          :target="link.startsWith('http') ? '_blank' : '_self'"
          class="transition-opacity hover:opacity-70"
        >
          <UiIcon :name="iconName" :size="20" />
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const { pastelDocs } = useAppConfig();
</script>
