<template>
  <div class="relative w-full group hover:bg-white hover:ring-2 hover:ring-primary-700 bg-primary-50 rounded-full">
    <div class="flex p-3 gap-3 items-center">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24"
             viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
             stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
          <path d="M21 21l-6 -6"></path>
        </svg>
      </div>
      <div class="text-neutral-material-500 group-hover:text-black">
        <span>Cari </span>
      </div>
      <div class="ml-auto flex gap-1">
        <div class="bg-white text-center shadow-lg text-xs font-medium flex items-center px-2 py-0.5 rounded-lg border">
          <span>Ctrl</span>
        </div>
        <div class="bg-white text-center shadow-lg text-xs font-medium flex items-center px-2 py-0.5 rounded-lg border">
          <span>K</span>
        </div>
      </div>
    </div>
    <button @click="handleButton()" class="absolute top-0 outline-none right-0 w-full h-full"></button>
  </div>
  <div v-if="isModalShow"
       class="fixed bg-black backdrop-blur xl:py-10 bg-opacity-70 z-70 top-0 left-0 right-0 bottom-0">
    <span class="absolute top-0 left-0 right-0 bottom-0" id="backdrop" @click="handleButton(true, false)"></span>
    <div class="xl:w-1/3 shadow-lg min-h-screen xl:min-h-0 xl:rounded-lg bg-primary-50 mx-auto my-auto relative">
      <div class="p-3 xl:p-4">
        <div class="w-full mb-5 relative">
          <div class="absolute left-2.5 top-1/2 -translate-y-1/2">
            <svg v-if="isLoading" xmlns="http://www.w3.org/2000/svg" class="icon animate-spin icon-tabler icon-tabler-refresh-dot" width="24"
                 height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                 stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
              <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
              <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24"
                 viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                 stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
              <path d="M21 21l-6 -6"></path>
            </svg>
          </div>
          <input minlength="3" v-model="keyword" autofocus type="text"
                 placeholder="Search Docs"
                 class="w-full bg-white rounded outline-none focus:ring-2 focus:ring-primary-600 pl-10 py-3">
        </div>
        <div class="max-h-96 overflow-auto">
          <div v-if="results.length === 0" class="text-neutral-material-700 py-7 px-5 text-center">
            <p>Belum ada hasil ditemukan, silahkan masukan keyword</p>
          </div>
          <div v-else class="grid gap-2">
            <div class="bg-white p-3 hover:bg-primary-700 hover:text-white rounded-lg relative shadow-sm"
                 v-for="(result, key) in results"
                 :key="`result-${key}`">
              <span v-text="result.label"></span>
              <nuxt-link @click="handleButton(true, false)" :to="result.to"
                         class="absolute top-0 left-0 w-full h-full"></nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {showModal, useMount} from "~/utlis/searchHandler";
import {useSearchStore} from "~/stores/search";

const {getResults} = useSearchStore()
const keyword = ref('')

const results = ref(getResults)
const isLoading = ref(false)
const isModalShow = ref(false)

const handleButton = (forceModal?: boolean, forceModalValue?: boolean) => showModal(isModalShow, forceModal, forceModalValue)

useMount(keyword, results, isModalShow, isLoading)
</script>
