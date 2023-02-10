<template>
  <section class="py-6 xl:py-16 relative">
    <div class="container mx-auto px-5 lg:w-10/12 mb-20 xl:w-9/12 2xl:w-8/12 relative">
      <div class="grid xl:grid-cols-3">
        <div class="xl:col-span-2">
          <div class="xl:w-12/12">
            <div class="text-primary-700 mb-10">
              <Logo class-name="block hover:text-primary-600"/>
            </div>
            <div class="mb-7">
              <h1 class="font-display slider-title xl:leading-tight text-3xl xl:text-5xl font-bold mb-5">Cari solusi untuk sebuah masalah? 🔥</h1>
              <p class="text-lg slider-description dark:text-neutral-material-300 text-neutral-700 xl:w-9/12">Temukan solusi dan bantuan seputar penggunaan layanan KiriminAja. Ada kok solusinya disini. </p>
            </div>
            <div class="xl:w-10/12">
              <Search/>
            </div>
          </div>
        </div>
        <div>
          <img src="/assets/illustration-help-1.png" class="w-full" alt="">
        </div>
      </div>
    </div>
    <div class="container mx-auto px-5 lg:w-10/12 xl:w-9/12 2xl:w-8/12 relative">
      <div class="grid xl:grid-cols-4 gap-3">
        <div v-for="(category, i) in categories" :key="`cat-${i}`" class="p-5 transition-all group transition-all hover:bg-primary-200 relative rounded-2xl bg-primary-100 overflow-hidden hover:rounded-3xl">
          <div class="inline-block mb-3 p-3 bg-primary-200 group-hover:bg-primary-300 text-primary-700 rounded-full" v-html="category.attributes.image_svg"></div>
          <h4 class="text-lg lg:text-xl font-semibold relative" v-text="category.attributes.title"></h4>
          <div class="text-ellipsis overflow-hidden max-h-10">
            <p class="text-sm" v-text="category.attributes.description"></p>
          </div>
          <nuxt-link :to="`/${category.attributes.slug}`" class="absolute top-0 left-0 right-0 bottom-0"/>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import {fetchAll} from "~/repositories/helpCategoryRepository";
const categories = await fetchAll()
</script>
