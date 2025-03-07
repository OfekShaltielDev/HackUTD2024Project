// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  runtimeConfig: {
      PINIA_API_KEY: '',
      PINATA_API_SECRET: '',
      PINIA_JWT: '',
      PINIA_GATEWAY: '',
      AUTH0_CLIENTID: '',
      AUTH0_SECRET: '',
      BASEURL: '',
      ISSUER: '',
    },

  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@primevue/nuxt-module'
]

})