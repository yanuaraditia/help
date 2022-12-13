// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // @ts-ignore
    publicRuntimeConfig: {
        API_BASE_URL: process.env.BASE_URL
    }
})
