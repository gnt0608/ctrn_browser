import { createVuetify,ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import '@mdi/font/css/materialdesignicons.css'
import * as labsComponents from 'vuetify/labs/components'
import color from '@/assets/theme/exportcolor.module.scss';
const mainTheme: ThemeDefinition = { dark: false ,colors : color }

// FIXME: 可能であればSCSSでの設定にしたいが、こちらのほうが楽なので現時点ではこちら
const default_theme = {
  VBtn: { flat: "true", height: 40},
  VTextField: { bgColor: "surface", variant: "outlined", density: "compact"},
  VSelect: { bgColor: "surface", variant: "outlined", density: "compact" },
  VCheckbox: { color: 'primary'},
  VRadio: { color: 'primary'},
  VRow: { dense: "true"},
  // VCheckboxBtn: {color: "primary"},
}

aliases["original-yen"] = "original-yen";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      ...components,
      ...labsComponents,
    },
    directives,
    defaults: default_theme,
    theme: {
      defaultTheme: "mainTheme",
      themes: {mainTheme},
    },
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
  });

  // Vue.js で Vuetify を使用する
  nuxtApp.vueApp.use(vuetify);
});
