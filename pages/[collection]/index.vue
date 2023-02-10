<template>
  <div class="mb-3">
    <h1 class="font-bold text-xl xl:text-3xl mb-2" v-text="category.attributes.title"></h1>
    <p v-text="category.attributes.description"></p>
  </div>
  <div class="grid">
    <div v-for="(help, key) in helps" :key="`help-${key}`" class="relative py-3 px-4 xl:px-6 xl:py-5 rounded-2xl hover:bg-primary-200 hover:rounded-3xl transition-all bg-primary-100">
      <div class="flex items-center mb-2 gap-2">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-book-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
             <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
             <path d="M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z"></path>
             <path d="M19 16h-12a2 2 0 0 0 -2 2"></path>
             <path d="M9 8h6"></path>
          </svg>
        </div>
        <div>
          <h3 v-text="help.attributes.title" class="font-bold text-lg"></h3>
        </div>
      </div>
      <p v-text="help.attributes.description"></p>
      <nuxt-link :to="`/${category.attributes.slug}/${help.attributes.slug}`" class="absolute top-0 left-0 w-full h-full"/>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'articles'
})
import {fetch} from "~/repositories/helpCategoryRepository";
import {fetchAll} from "~/repositories/helpRepository";

const route = useRoute()
const category = await fetch(route.params.collection)
const helps = await fetchAll(route.params.collection)

useHead({
  title: category.attributes.title ?? ''
})
</script>
