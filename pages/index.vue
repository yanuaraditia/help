<template>
  <Search/>
  <section class="mt-5 xl:mt-10">
    <div class="container mx-auto px-4 xl:w-9/12">
      <div class="grid xl:grid-cols-2 gap-6">
        <div class="bg-white hover:shadow-sm transition-all py-7 px-8 rounded-3xl" v-for="key in 10" :key="`sample-${key}`">
          <h3 class="font-semibold text-lg mb-5">Storefront</h3>
          <ul class="grid gap-3 mb-5 text-neutral-material-500 text-sm font-medium">
            <li v-for="keyi in 5" :key="`keyi-${keyi}`">
              <nuxt-link to="#">
                <span>Load More</span>
              </nuxt-link>
            </li>
          </ul>
          <nuxt-link class="text-primary-700 font-medium" to="/">
            <span>See all</span>
            <span> 15 </span>
            <span>article</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import Search from "~/components/Search.vue";
</script>
