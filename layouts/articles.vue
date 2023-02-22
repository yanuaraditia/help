<template>
  <NuxtLoadingIndicator/>
  <div>
    <header-article/>
    <section class="py-6 xl:py-8 relative">
      <div class="container mx-auto px-5 relative">
        <div class="grid xl:grid-cols-8 gap-7">
          <div class="xl:col-span-2">
            <div class="xl:sticky xl:top-24">
              <h3 class="mb-5 font-bold">Kategori</h3>
              <div class="grid gap-y-3">
                <div v-for="(category, i) in categories" :key="`sidebar-${i}`" :class="[
                (`relative py-0.5 gap-3 group rounded-full font-medium flex items-center hover:text-primary-500`),
                ($route.params.collection === category.fields.slug ? 'text-primary-700' : '')
            ]">
                  <div :class="[
                  (`p-1 rounded-lg group-hover:shadow-lg transition-all`),
                  ($route.params.collection === category.fields.slug ? 'bg-gradient-to-t from-primary-300 to-primary-200 group-hover:text-primary-700' : 'bg-primary-100 text-primary-500')
                ]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M4 8C4 5.51472 6.01472 3.5 8.5 3.5H18.5C19.3284 3.5 20 4.17157 20 5V20C20 20.5523 19.5523 21 19 21H7.5C5.73676 21 4.27806 19.6961 4.03544 18H4V8ZM18.5 15.5H7.5C6.39543 15.5 5.5 16.3954 5.5 17.5C5.5 18.6046 6.39543 19.5 7.5 19.5H18.5V15.5ZM8.25 8C8.25 7.58579 8.58579 7.25 9 7.25H16C16.4142 7.25 16.75 7.58579 16.75 8C16.75 8.41421 16.4142 8.75 16 8.75H9C8.58579 8.75 8.25 8.41421 8.25 8ZM9 10.25C8.58579 10.25 8.25 10.5858 8.25 11C8.25 11.4142 8.58579 11.75 9 11.75H14C14.4142 11.75 14.75 11.4142 14.75 11C14.75 10.5858 14.4142 10.25 14 10.25H9Z"
                            fill="currentColor"/>
                    </svg>
                  </div>
                  <span v-text="category.fields.title"></span>
                  <nuxt-link :to="`/category/${category.fields.slug}`"
                             class="absolute top-0 left-0 right-0 bottom-0"/>
                </div>
              </div>
            </div>
          </div>
          <div class="xl:col-span-6">
            <div class="container mx-auto">
              <slot/>
            </div>
            <Footer/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">

export default {
  name: "articles",
  extends: 'default'
}
</script>
<script setup lang="ts">
import {fetchAll} from "~/repositories/helpCategoryRepository";

const categories = await fetchAll()
</script>
