<script lang="ts" setup>
const { algolia: { docSearch } } = useRuntimeConfig()

const asyncResult = await useAsyncAlgoliaSearch({ query: 'Samsung', indexName: indexName.value })
const { result, search } = useAlgoliaSearch(indexName.value)
const { result: searchForFacetValuesResult, search: searchForFacetValues } = useAlgoliaFacetedSearch(indexName.value)
const algolia = useAlgoliaRef()
const { result: recommendResult, get } = useAlgoliaRecommend()
</script>
