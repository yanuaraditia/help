// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/strapi',
        '@pinia/nuxt',

    ],
    strapi: {
        url: 'http://localhost:1337'
    },
    css: [
        '~/assets/scss/main.scss'
    ],
    app: {
        head: {
            script: [
                {
                    src: 'https://kiriminaja-static-js.imgix.net/taptalk-rewrite.min.js',
                    body: true
                },
                {
                    children: `TapTalkLive.init("e6f7195bd71abaf3154b4706ffb3cc118ca48cd7787517992d9800bbd891beae")`,
                    body: true
                },
            ],
            titleTemplate: '%s - KiriminAja Knowledge',
            link: [
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/favicon.ico'
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com'
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com'
                },
            ]
        }
    }
})
