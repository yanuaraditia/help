<template>
  <section class="py-6 xl:py-16 relative">
    <div class="container mx-auto px-5 lg:w-10/12 mb-20 xl:w-9/12 2xl:w-8/12 relative">
      <div class="grid xl:grid-cols-3">
        <div class="xl:col-span-2">
          <div class="xl:w-12/12">
            <div class="text-primary-700 mb-10" v-if="!isWebView">
              <Logo class-name="block hover:text-primary-600"/>
            </div>
            <div class="mb-7">
              <div class="2xl:w-10/12">
                <h1 class="font-display slider-title xl:leading-tight text-3xl xl:text-5xl font-bold mb-5">Cari solusi
                  untuk sebuah masalah? 🔥</h1>
                <p class="text-lg slider-description dark:text-neutral-material-300 text-neutral-700 xl:w-9/12">Temukan
                  solusi dan bantuan seputar penggunaan layanan KiriminAja. Ada kok solusinya disini. </p>
              </div>
            </div>
            <div class="xl:w-10/12">
              <Search/>
            </div>
          </div>
        </div>
        <div class="hidden xl:block" v-if="!isWebView">
          <img src="/assets/illustration-help-1.webp" class="w-full" alt="Help KiriminAja">
        </div>
      </div>
    </div>
    <div class="container mx-auto px-5 lg:w-10/12 xl:w-9/12 2xl:w-8/12 relative">
      <div class="grid xl:grid-cols-3 gap-3 xl:gap-6">
        <div v-for="(category, i) in categories" :key="`cat-${i}`"
             class="p-3.5 xl:p-6 transition-all group transition-all hover:ring-2 hover:ring-primary-500 relative rounded-3xl bg-primary-100 overflow-hidden">
          <div
              class="inline-block mb-3 p-3 bg-primary-200 group-hover:bg-primary-500 text-primary-700 group-hover:text-primary-100 rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.0198 3.5C12.1417 3.5 12.2352 3.60805 12.219 3.72883C11.943 5.79611 11.9772 7.89429 12.3215 9.9538L12.3361 10.0412C12.3531 10.1429 12.4308 10.2238 12.5318 10.2448C12.6328 10.2658 12.7363 10.2226 12.7924 10.1361L14.4161 7.63486C14.4556 7.57413 14.5445 7.57413 14.5839 7.63486L16.2076 10.1361C16.2638 10.2226 16.3672 10.2658 16.4682 10.2448C16.5692 10.2238 16.6469 10.1429 16.6639 10.0412L16.6785 9.9538C17.0228 7.89429 17.057 5.79611 16.781 3.72883C16.7648 3.60805 16.8583 3.5 16.9802 3.5L18.5 3.5C19.3284 3.5 20 4.17157 20 5V20C20 20.5523 19.5523 21 19 21H7.5C5.73676 21 4.27806 19.6961 4.03544 18H4V8C4 5.51472 6.01472 3.5 8.5 3.5L12.0198 3.5ZM7.5 15.5H18.5V19.5H7.5C6.39543 19.5 5.5 18.6046 5.5 17.5C5.5 16.3954 6.39543 15.5 7.5 15.5Z"
                    fill="currentColor"/>
            </svg>
          </div>
          <h4 class="text-lg lg:text-xl mb-3 text-primary-900 font-semibold relative"
              v-text="category.fields.title"></h4>
          <div class="text-ellipsis overflow-hidden max-h-10">
            <p class="text-sm" v-text="category.fields.description"></p>
          </div>
          <nuxt-link :to="`/category/${category.fields.slug}`" class="absolute top-0 left-0 right-0 bottom-0"/>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import {fetchAll} from "~/repositories/helpCategoryRepository";
import {seoBuilder} from "~/utlis/seoBuilder";
import {usePlatformStore} from "~/stores/platform";

const {data: categories} = await useAsyncData('home', () => fetchAll())
const {isWebView} = usePlatformStore()
useHead(
    seoBuilder(
        'Help Center',
        'Temukan solusi dan bantuan seputar penggunaan layanan KiriminAja. Ada kok solusinya disini.'
    )
)
</script>

<style lang="scss">
.DocSearch-Button {
  --tw-bg-opacity: 1;
  --docsearch-searchbox-background: rgb(234 221 255 / var(--tw-bg-opacity));
  margin: 0 !important;
  height: 2.5rem !important;
  width: 100% !important;
}
</style>
