<template>
  <div class="grid xl:grid-cols-5">
    <div class="xl:col-span-4 xl:order-1">
      <div class="mb-3 xl:mb-7 xl:w-8/12 pb-3 xl:pb-7 border-b border-dashed border-b-neutral-material-200">
        <h1 class="font-bold text-3xl xl:text-4xl mb-3" v-text="help.fields.title"></h1>
        <p v-text="help.fields.description"></p>
      </div>
    </div>
    <div class="xl:col-span-1 xl:order-2">
      <div class="sticky top-24 bg-primary-100 xl:bg-transparent p-3 xl:p-0 rounded-lg">
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
    <div class="xl:col-span-3 xl:order-3">
      <div class="prose" v-html="rendered"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'articles'
})
import {Help} from "~/types";
import {fetch} from "~/repositories/helpRepository";
import {MarkedRenderer} from "~/utlis/markedRenderer";

const route = useRoute()
const help = await fetch(route.params.slug) as Help

useHead({
  title: help.fields.title ?? ''
})

const {rendered, toc: tableOfContents} = MarkedRenderer(help.fields.content ?? '');

</script>
