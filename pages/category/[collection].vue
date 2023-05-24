<template>
  <ContentTitle :parent-scope="parentScope" :title="category.fields.title" :description="category.fields.description"/>
  <div class="grid gap-3 xl:gap-7 xl:grid-cols-2">
    <client-only>
      <div
          class="p-3 xl:p-5 rounded-xl xl:rounded-3xl line-clamp-2 relative transition-all border shadow-sm hover:shadow-xl"
          v-for="(help, key) in helps" :key="`item-${key}`">
        <h2 class="font-semibold xl:text-2xl text-primary-500 mb-3" v-text="help.fields.title"></h2>
        <p class="text-neutral-material-700 line-clamp-2" v-text="help.fields.description"></p>
        <nuxt-link :to="`/article/${help.fields.slug}`" class="absolute top-0 left-0 w-full h-full"></nuxt-link>
      </div>
    </client-only>
  </div>
</template>
<script setup lang="ts">
import {fetch} from "~/repositories/helpCategoryRepository";
import {fetchAll} from "~/repositories/helpRepository";
import {HelpCategoryRouteInterface, ParentScope} from "~/types";
import {seoBuilder} from "~/utlis/seoBuilder";

const {params} = await useRoute() as HelpCategoryRouteInterface
const category = await fetch(params.collection)
const {data: helps} = await useAsyncData('row', () => fetchAll(category.sys.id))

const parentScope = {
  to: '/',
  label: 'Kategori'
} as ParentScope

definePageMeta({
  layout: 'articles'
})
useHead(
    seoBuilder(
        category.fields.title + ' | Koleksi',
        category.fields.description
    )
)
</script>
