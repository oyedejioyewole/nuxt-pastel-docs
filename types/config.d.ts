import type { GenericIconOrPhosphorIconNameWithWeight } from "./generics";

interface ThemeConfigFull {
  features: string[];
  footer: {
    content: string;
    iconLinks: Record<GenericIconOrPhosphorIconNameWithWeight, string>;
  };
  headline: string;
  iconMap: Record<GenericIconOrPhosphorIconNameWithWeight, string>;
  projectName?: string;
  repo: string;
  themeColor: string;
}
