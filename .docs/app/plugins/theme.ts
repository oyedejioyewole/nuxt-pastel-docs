export default defineNuxtPlugin(() => {
  const { pastelDocs } = useAppConfig();
  const themeColor = useCookie("theme-color", {
    default: () => pastelDocs.themeColor,
  });

  watchEffect(() => {
    updateAppConfig({
      pastelDocs: { ...pastelDocs, themeColor: themeColor.value },
    });
  });
});
