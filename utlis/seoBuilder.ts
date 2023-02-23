import {UseHeadInput} from "@unhead/vue";

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
            {
                name: 'robots',
                content: 'index, follow'
            }
        ],
        link: [
            {
                rel: 'canonical',
                href: `https://help.kiriminaja.com/${fullPath}`
            }
        ]
    } as UseHeadInput
}
