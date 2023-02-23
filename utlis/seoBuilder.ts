export const seoBuilder = (title: string, description: string) => {
    const {fullPath} = useRoute()
    return {
        title: title,
        meta: [
            {
                name: 'title',
                content: title
            },
            {
                name: 'description',
                content: description
            },
        ],
        link: [
            {
                rel: 'canonical',
                href: `https://help.kiriminaja.com/${fullPath}`
            }
        ]
    }
}
