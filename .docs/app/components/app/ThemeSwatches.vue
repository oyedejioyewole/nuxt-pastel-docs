<script lang="ts" setup>
import randomColor from "randomcolor";

const colorMode = useColorMode();

const { data: themeColors, refresh: refreshThemeColors } = useAsyncData(
  async () =>
    randomColor({
      count: 6,
      luminosity: "bright",
    }),
  { watch: [colorMode] },
);

const currentTheme = useCookie("theme-color");

const changeThemeColor = (color: string) => {
  currentTheme.value = color;
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
      class="relative inline-flex gap-x-1 font-bold opacity-0 transition group-hover:opacity-100 group-focus:opacity-100"
      :class="{
        'inset-y-[calc(50%_+_20px)] items-start': themeIndex > 2,
        '-inset-y-[calc(50%_+_20px)] items-end': !(themeIndex > 2),
      }"
    >
      {{ _themeColor }}

      <UiIcon
        :name="
          useRemapIcon({
            'arrow-bend-right-up': themeIndex > 2,
            'arrow-bend-right-down': !(themeIndex > 2),
          })
        "
        weight="bold"
      />
    </div>
  </button>
</template>
