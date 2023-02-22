// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@nuxtjs/algolia'
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
    algolia: {
        // apiKey: process.env.ALGOLIA_API_KEY,
        // applicationId: process.env.ALGOLIA_APPLICATION_ID,
        docSearch: {
            indexName: process.env.ALGOLIA_INDEX_NAME ?? 'indexName'
        }
    },
    app: {
        head: {
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
