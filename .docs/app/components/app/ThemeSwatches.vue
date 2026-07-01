<script lang="ts" setup>
import randomColor from "randomcolor";

const colorMode = useColorMode();
const { pastelDocs } = useAppConfig();

const { data: themeColors, refresh: refreshThemeColors } = useAsyncData(
  async () =>
    randomColor({
      count: 6,
      luminosity: "bright",
    }),
  { watch: [colorMode] },
);

const changeThemeColor = (themeColor: string) => {
  updateAppConfig({ pastelDocs: { ...pastelDocs, themeColor } });
  refreshThemeColors();
};

const { pause, resume } = useIntervalFn(refreshThemeColors, 2000);
</script>

<template>
  <button
    v-for="(_themeColor, themeIndex) of themeColors"
    :key="themeIndex"
    :style="`background-color: ${_themeColor}; --tw-ring-color: ${_themeColor}`"
    class="group h-full cursor-pointer rounded-lg ring transition hover:opacity-90 hover:ring-offset-2"
    @click="changeThemeColor(_themeColor)"
    @mouseenter="pause"
    @mouseleave="resume"
  >
    <div
      :class="{
        'relative inline-flex gap-x-1 font-bold opacity-0 transition group-hover:opacity-100 max-lg:group-focus:opacity-100': true,
        'inset-y-[calc(50%+20px)] items-start': themeIndex > 2,
        '-inset-y-[calc(50%+20px)] items-end': !(themeIndex > 2),
      }"
    >
      <span v-if="_themeColor === pastelDocs.themeColor" class="font-cursive"
        >Original:</span
      >
      {{ _themeColor }}

      <UiIcon
        :name="{
          'ph:arrow-bend-right-up': themeIndex > 2,
          'ph:arrow-bend-right-down': !(themeIndex > 2),
        }"
      />
    </div>
  </button>
</template>
