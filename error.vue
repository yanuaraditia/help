<template>
  <Articles v-if="useArticleLayout">
    <error-content :error="props.error"/>
  </Articles>
  <error-content v-else :error="props.error"/>
</template>
<script lang="ts" setup>
import Articles from "~/layouts/articles.vue";

interface Error {
    error: {
        statusCode?: any | 404,
        statusMessage?: string
    }
}

const props = defineProps<Error>()
const {fullPath} = await useRoute()
const useArticleLayout = (fullPath.includes('category') || fullPath.includes('article'))
</script>
