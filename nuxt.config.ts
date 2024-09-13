// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxthub/core", "@nuxt/image"],
  hub: {
    database: true,
    blob: true,
  },
  image: {
    dir: "blob",
  },
  $development: {
    hub: {
      // Force remote storage to preview environment
      remote: "preview",
    },
  },
  css: [
    //"@/assets/scss/fonts/index.scss",
    "@/assets/scss/main.scss",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "~/assets/scss/functions/index.scss";
            @import "~/assets/scss/transitions.scss";
            @import "~/assets/scss/tokens.scss";
          `,
        },
      },
    },
  },
});
