<template>
  <section class="py-6 xl:py-16 relative">
    <div class="container mx-auto px-5 lg:w-10/12 xl:w-9/12 2xl:w-8/12 relative">
      <div class="grid grid-cols-8 gap-7">
        <div class="col-span-2">
          <h3 class="px-4 mb-5 font-bold">Kategori</h3>
          <ul>
            <li v-for="(category, i) in categories" :key="`side-${i}`" :class="[
                (`relative text-sm group rounded-full hover:bg-primary-200`),
                (params.collection === category.attributes.slug ? 'bg-primary-100 text-primary-800' : 'hover:text-primary-800')
            ]">
              <nuxt-link :to="`/${category.attributes.slug}`" class="block px-4 py-2.5">
                <span v-text="category.attributes.title"></span>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="col-span-6">
          <div class="container mx-auto">
            <slot/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "articles"
}
</script>
<script setup lang="ts">
import {useStore} from "~/stores/helpCategories";

const {params} = useRoute()
const store = useStore()
await store.fetchCategories()
const categories = store.getCategories
</script>
