import { addTemplate, createResolver, defineNuxtModule } from "nuxt/kit";
import { name as packageName } from "../package.json";

export default defineNuxtModule({
  meta: {
    name: packageName,
  },
  setup: (_, nuxt) => {
    const { resolve } = createResolver(import.meta.url);

    const themeCSSTemplate = addTemplate({
      filename: `${packageName}.css`,
      src: resolve("../app/assets/css/main.css"),
      write: true,
    });

    nuxt.options.alias[`#${packageName}`] = themeCSSTemplate.dst;
  },
});
