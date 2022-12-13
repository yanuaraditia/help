export default defineEventHandler( (event) => {
    return $fetch(process.env.BASE_URL + `/collection/${event.context.params.tag}`);
})
