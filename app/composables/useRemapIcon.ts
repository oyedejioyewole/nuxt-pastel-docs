import type { PhosphorIconName } from "#phosphor-icons/types";

export default <
  IconWithConditions extends Partial<Record<PhosphorIconName, boolean>>,
>(
  icon: IconWithConditions | PhosphorIconName,
) => {
  const { pastelDocs } = useAppConfig();

  switch (typeof icon) {
    case "object": {
      const entries = Object.entries(icon).map(([name, condition]) => [
        pastelDocs.icons[name] ?? name,
        condition,
      ]);

      return Object.fromEntries(entries) as typeof icon;
    }
    case "string":
      return (pastelDocs.icons[icon] ?? icon) as typeof icon;
  }
};
