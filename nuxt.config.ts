// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
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
  build: {
      transpile: ['@vuepic/vue-datepicker']
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    '@primevue/nuxt-module'
]

})