import type { ThemeConfigFull } from "#nuxt-pastel-docs/types/config";
import type { UiIconProps } from "../components/ui/Icon.vue";

export const useIcon = (
  icon: UiIconProps["name"],
  iconMap: ThemeConfigFull["iconMap"],
) => {
  switch (typeof icon) {
    case "object": {
      const matchedIcon = Object.entries(icon)
        .map(([name, condition]) => [iconMap[name] ?? name, condition])
        .find(([_, condition]) => condition);

      if (!matchedIcon) return null;
      else return matchedIcon[0] as string;
    }
    case "string":
      return iconMap[icon] ?? icon;
    default:
      throw createError(`Improper typeof 'name' prop, ${typeof icon}`);
  }
};
