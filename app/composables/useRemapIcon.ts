export default <IconType extends Record<string, boolean>>(
  icon: IconType | string,
) => {
  const { pastelDocs } = useAppConfig();

  switch (typeof icon) {
    case "object": {
      const entries = Object.entries(icon).map(([name, condition]) => [
        pastelDocs.icons[name] ?? name,
        condition,
      ]);

      return Object.fromEntries(entries) as IconType;
    }
    case "string":
      return pastelDocs.icons[icon] ?? icon;
  }
};
