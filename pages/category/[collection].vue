<template>
  <div class="mb-3 xl:mb-7">
    <h1 class="font-bold text-xl xl:text-3xl mb-2" v-text="category.fields.title"></h1>
    <p v-text="category.fields.description"></p>
  </div>
  <div class="grid gap-3 xl:gap-7 xl:grid-cols-2">
    <client-only>
    <div
        class="p-3 xl:p-5 rounded-2xl relative transition-all bg-primary-100 border border-primary-200 hover:border-transparent hover:ring-2 hover:ring-primary-300 shadow-sm"
        v-for="(help, key) in helps" :key="`item-${key}`">
      <h2 class="font-semibold xl:text-xl text-primary-500 mb-2" v-text="help.fields.title"></h2>
      <p class="text-sm text-neutral-material-700 h-10 line-clamp-2" v-text="help.fields.description"></p>
      <nuxt-link :to="`/article/${help.fields.slug}`" class="absolute top-0 left-0 w-full h-full"></nuxt-link>
    </div>
    </client-only>
  </div>
</template>
<script setup lang="ts">
import {fetch} from "~/repositories/helpCategoryRepository";
import {fetchAll} from "~/repositories/helpRepository";
import {HelpCategoryRouteInterface} from "~/types";

const {params} = await useRoute() as HelpCategoryRouteInterface
const category = await fetch(params.collection)
const {data: helps} = await useAsyncData('row', () => fetchAll(category.sys.id))

definePageMeta({
  layout: 'articles'
})
useHead({
  title: category.fields.title + ' | Koleksi',
  meta: [
    {
      name: 'description',
      content: category.fields.description
    }
  ]
})
</script>
