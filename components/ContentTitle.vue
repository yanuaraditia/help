<template>
  <div class="xl:w-3/4 xl:mt-10">
    <nav class="flex mb-3 xl:mb-7" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <nuxt-link :to="props.parentScope.to"
                     v-text="props.parentScope.label"
             class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
          </nuxt-link>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"></path>
            </svg>
            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400" v-text="title"></span>
          </div>
        </li>
      </ol>
    </nav>
    <div class="mb-3 xl:mb-7">
      <h1 class="font-bold text-3xl xl:text-4xl mb-2 xl:mb-5" v-text="title"></h1>
      <p v-text="description"></p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ContentTitle"
}
</script>
<script setup lang="ts">
import {ParentScope} from "~/types";

interface ContentTitle {
  title: string,
  description: string,
  parentScope: ParentScope
}

const props = defineProps<ContentTitle>()
</script>
