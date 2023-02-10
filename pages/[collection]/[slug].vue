<template>
  <div class="mb-3">
    <h1 class="font-bold text-xl xl:text-3xl mb-2" v-text="help.attributes.title"></h1>
    <p v-text="help.attributes.description"></p>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'articles'
})
import {fetch} from "~/repositories/helpRepository";
const route = useRoute()
const help = await fetch(route.params.slug)
if (!help) {
  createError({
    statusCode: 404,
    statusMessage: "Artikel tidakd ditemukan"
  })
}
useHead({
  title: help.attributes.title ?? ''
})
</script>
