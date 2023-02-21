<template>
  <div class="grid xl:grid-cols-5">
    <div class="xl:col-span-4 xl:order-1">
        <div class="mb-3 xl:mb-7 xl:w-8/12 pb-3 xl:pb-7 border-b border-dashed border-b-neutral-material-200">
          <h1 class="font-bold text-xl xl:text-4xl mb-3" v-text="help.fields.title"></h1>
          <p v-text="help.fields.description"></p>
        </div>
    </div>
    <div class="xl:col-span-1 xl:order-2">
<!--      <h4>On This Page</h4>-->
    </div>
    <div class="xl:col-span-3 xl:order-3">
      <div class="prose" v-html="rendered"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {Help} from "~/types";
import 'highlight.js/styles/qtcreator-dark.css'
let md = ref("");
let rendered = ref("");

definePageMeta({
  layout: 'articles'
})
import {fetch} from "~/repositories/helpRepository";

const route = useRoute()
const help = await fetch(route.params.slug) as Help

useHead({
  title: help.fields.title ?? ''
})

rendered = useNuxtApp().$mdit.render(help.fields.content);

</script>
