import withNuxt from "./.docs/.nuxt/eslint.config.mjs";
import eslintConfigPrettier from "eslint-config-prettier";

export default withNuxt().append([eslintConfigPrettier]);
