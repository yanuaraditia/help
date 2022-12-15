// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        "@nuxtjs/color-mode"
    ],
    app: {
        head: {
            link         : [
                {
                    rel : 'icon',
                    type: 'image/x-icon',
                    href: '/favicon.ico'
                },
                {
                    rel : 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
                },
                {
                    rel : 'preconnect',
                    href: 'https://fonts.gstatic.com'
                },
                {
                    rel : 'preconnect',
                    href: 'https://fonts.googleapis.com'
                },
            ]
        }
    }
})
