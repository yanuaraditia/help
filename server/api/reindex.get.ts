export default defineEventHandler(async (event) => {
  const { serverMeilisearchClient: searchIndex } = event.context

   const addRecordRes = await searchIndex.index('movies').addDocuments(
     {
       id: 999999994234,
       title: 'Batman Unmasked: The Psychology of the Dark Knight',
       poster: 'https://image.tmdb.org/t/p/w1280/jjHu128XLARc2k4cJrblAvZe0HE.jpg',
       overview: 'Delve into the world of Batman and the vigilante justice tha',
       release_date: '2008-07-15'
     }
   )

   return { myCustomResponse: "Document is on the way...." }
})
