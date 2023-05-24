<template>
  <ContentTitle :parent-scope="parentScope" :title="help.fields.title" :description="help.fields.description"/>
  <div class="grid xl:grid-cols-5 xl:gap-10">
    <div class="xl:col-span-1 xl:order-2">
      <div class="xl:sticky top-24">
        <div class="hidden xl:block bg-primary-100 xl:bg-transparent p-3 xl:p-0 rounded-lg">
          <h4 class="font-medium text-sm text-neutral-material-500 mb-3">On This Page</h4>
          <ul>
            <li v-for="(toc, key) in tableOfContents" :key="`toc-${key}`">
              <a :href="`#${toc.anchor}`" class="block hover:text-primary-600 py-1">
                <span v-text="toc.text"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="xl:col-span-4 xl:order-1">
      <div class="prose max-w-full" v-html="rendered"></div>
      <div class="flex mt-5 gap-3 flex-wrap">
        <div
            class="relative font-medium pl-16 pr-7 dark:bg-neutral-material-800 dark:hover:bg-neutral-material-700 hover:bg-primary-200 py-3.5 bg-primary-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.3 15.4"
               class="absolute top-1/2 left-7 -translate-y-1/2" height="20">
            <path
                d="M14.5 0H.8a.88.88 0 0 0-.8.9v13.6a.88.88 0 0 0 .8.9h7.3v-6h-2V7.1h2V5.4a2.87 2.87 0 0 1 2.5-3.1h.5a10.87 10.87 0 0 1 1.8.1v2.1h-1.3c-1 0-1.1.5-1.1 1.1v1.5h2.3l-.3 2.3h-2v5.9h3.9a.88.88 0 0 0 .9-.8V.8a.86.86 0 0 0-.8-.8z"
                fill="currentColor"></path>
          </svg>
          <span>Bagikan</span>
          <a target="_blank" class="absolute left-0 top-0 w-full h-full"
             :href="`https://www.facebook.com/sharer.php?u=${sharedUrl}`"></a>
        </div>
        <div
            class="relative font-medium pl-16 pr-7 dark:bg-neutral-material-800 dark:hover:bg-neutral-material-700 hover:bg-primary-200 py-3.5 bg-primary-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 273.5 222.3"
               class="absolute top-1/2 left-7 -translate-y-1/2" height="20">
            <path
                d="M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1"
                fill="currentColor"></path>
          </svg>
          <span>Tweet</span>
          <a target="_blank" class="absolute left-0 top-0 w-full h-full"
             :href="`https://twitter.com/intent/tweet?url=${sharedUrl}`"></a>
        </div>
        <div
            class="relative font-medium pl-16 pr-7 dark:bg-neutral-material-800 dark:hover:bg-neutral-material-700 hover:bg-primary-200 py-3.5 bg-primary-100 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="absolute top-1/2 left-7 -translate-y-1/2" width="24"
               height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
               stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
            <path
                d="M9 10a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1"></path>
          </svg>
          <span>Undang</span>
          <a target="_blank" class="absolute left-0 top-0 w-full h-full"
             :href="`https://api.whatsapp.com/send?text=${sharedUrl}`"></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ContentTitle from "~/components/ContentTitle.vue";

definePageMeta({
  layout: 'articles'
})
import {Help, ParentScope} from "~/types";
import {fetch} from "~/repositories/helpRepository";
import {MarkedRenderer} from "~/utlis/markedRenderer";
import {seoBuilder} from "~/utlis/seoBuilder";

const sharedUrl = ref('')

onMounted(() => {
  sharedUrl.value = window.location.href
})
const route = useRoute()
const help = await fetch(route.params.slug) as Help
const parentScope = ref({
  to: `/category/${help.fields.category?.fields.slug}`,
  label: help.fields.category?.fields.title
} as ParentScope)

useHead(
    seoBuilder(
        help.fields.title,
        help.fields.description
    )
)

const {rendered, toc: tableOfContents} = MarkedRenderer(help.fields.content ?? '');

</script>
