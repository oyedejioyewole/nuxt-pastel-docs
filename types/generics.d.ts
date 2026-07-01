import type { IconStyle, PhosphorIcon } from "@phosphor-icons/core";

type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

type LooseAutocomplete<T extends string> = T | (string & {});

type GenericIconOrPhosphorIconNameWithWeight = LooseAutocomplete<
  | `ph:${PhosphorIcon["name"]}`
  | `ph:${PhosphorIcon["name"]}-${Exclude<IconStyle, IconStyle.REGULAR>}`
>;
