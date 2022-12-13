export default defineEventHandler( (event) => {
    return $fetch(process.env.BASE_URL + `/${event.context.params.tag}/${event.context.params.help}`);
})
