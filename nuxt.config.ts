// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      base: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'id'
      },
      title: 'IncarnaXion: ArtXplosion Avatar Make',
      meta: [
        { charset: 'utf-8' },
        { name: 'keywords', content: 'IncarnaXion: ArtXplosion Avatar Make' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'googlebot', content: 'notranslate' },
        { name: 'msapplication-TileColor', content: '#ffa84c' },
        { name: 'theme-color', content: '#ffffff' },
        { hid: 'description', name: 'description', content: 'incarnaxion' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }
      ]
    },
  },
  css: [
    '~/assets/fonts.scss',
  ],
})
