import type { DeepPartial } from "#app/config";

import type { ThemeConfigFull } from "./config";

declare module "@nuxt/schema" {
  // Input, creates deep partial definition in app.config.ts
  interface AppConfigInput {
    pastelDocs?: DeepPartial<ThemeConfigFull>;
  }

  // Output, enforces strict types on useAppConfig() return
  interface AppConfig {
    pastelDocs: ThemeConfigFull;
  }
}
