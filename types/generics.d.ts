import type { IconStyle, PhosphorIcon } from "@phosphor-icons/core";

type LooseAutocomplete<T extends string> = T | (string & {});

type GenericIconOrPhosphorIconNameWithWeight = LooseAutocomplete<
  | `ph:${PhosphorIcon["name"]}`
  | `ph:${PhosphorIcon["name"]}-${Exclude<IconStyle, IconStyle.REGULAR>}`
>;
