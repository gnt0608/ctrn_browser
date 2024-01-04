import { defineNuxtConfig } from "nuxt/config";
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ["nuxt-electron", '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  components: {
    global: true,
    dirs: ['~/components/props']
  },
  electron: {
    build: [
      {
        // Main-Process entry file of the Electron App.
        entry: "electron/main.ts",
      },
      {
        entry: "electron/preload.ts",
        onstart(args) {
          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
          // instead of restarting the entire Electron App.
          args.reload();
        },
      },
    ],
    renderer: {},
  },
  build: {
    transpile: ["vuetify"],
  },
  hooks: {
    "vite:extendConfig": (config) => {
      config.plugins!.push(vuetify());
    },
  },
  vite: {
    define: {
      "window.global": {},
    },
    resolve: {
      alias: {
        "./runtimeConfig": "./runtimeConfig.browser",
      },
    },
    ssr: {
      noExternal: ["vuetify"],
    },
    server: {
      proxy: {
        "/api/": {
          target: "http://localhost:8080/",
        },
      },
    },
  },
  css: ["@/assets/main.scss"],
  app: {
    head: {
      title: "Ctrn Browser",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  runtimeConfig: {
    public: {},
  },
});
