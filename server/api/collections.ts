// @ts-ignore
export default defineEventHandler( (event) => {
    return $fetch(process.env.BASE_URL + '/home');
})
