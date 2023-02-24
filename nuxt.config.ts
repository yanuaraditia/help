// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt'
    ],
    css: [
        '~/assets/scss/main.scss'
    ],
    runtimeConfig: {
        public: {
            space: process.env.CF_SPACE_ID,
            accessToken: process.env.CF_DELIVERY_KEY,
        }
    },
    app: {
        head: {
            titleTemplate: '%s · Support',
            meta: [
                {
                    name: 'author',
                    content: 'KiriminAja Support'
                },
                {
                    name: 'theme-color',
                    content: '#6f2fab'
                },
                {
                    name: 'publisher',
                    content: 'PT Selalu Siap Solusi'
                },
                {
                    name: 'keywords',
                    content: 'KiriminAja, Kirim Paket ,Multi expedisi ,kirim paket COD, Cara daftar COD ,COD tanpa marketplace, JNE Express, J&T Express, Sicepat, Gratis Ongkir '
                }
            ],
            htmlAttrs: {
                lang: 'id'
            },
            script: [
                {
                    src: '/js/taptalk.js',
                    body: true
                },
                {
                    children: `TapTalkLive.init("e6f7195bd71abaf3154b4706ffb3cc118ca48cd7787517992d9800bbd891beae")`,
                    body: true
                }
            ],
            link: [
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: 'https://kiriminaja.com/favicon.ico'
                },
                {
                    rel: 'shortcut icon',
                    type: 'image/x-icon',
                    href: 'https://kiriminaja.com/favicon.ico'
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
