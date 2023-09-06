// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      base: process.env.BASE_URL || "http://localhost:3000",
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "id",
      },
      title: "VICOLIO: Custom Avatar Maker",
      meta: [
        { charset: "utf-8" },
        { name: "keywords", content: "VICOLIO: Custom Avatar Maker" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
        },
        { name: "format-detection", content: "telephone=no" },
        { name: "googlebot", content: "notranslate" },
        { name: "msapplication-TileColor", content: "#864fef" },
        { name: "theme-color", content: "#ffffff" },
        { hid: "description", name: "description", content: "incarnaxion" },
      ],
      link: [
        {
          rel: "icon",
          href: `${
            process.env.BASE_URL || "http://localhost:3000"
          }/favicon.svg`,
          type: "image/svg+xml",
        },
      ],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/fonts.scss" as *;',
        },
      },
    },
  },
  build: {
    loaders: {
      scss: {
        implementation: require("sass"),
      },
    },
  },
});
