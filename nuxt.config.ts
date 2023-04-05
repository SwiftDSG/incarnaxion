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
        { name: 'msapplication-TileColor', content: '#864fef' },
        { name: 'theme-color', content: '#ffffff' },
        { hid: 'description', name: 'description', content: 'incarnaxion' }
      ],
      link: [
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#050724' },
        { rel: 'icon', href: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
        { rel: 'icon', href: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ]
    },
  },
  css: [
    '~/assets/fonts.scss',
  ],
  build: {
    loaders: {
      scss: {
        implementation: require('sass')
      }
    },
  },
})
