<template>
  <section class="py-6 xl:py-16 relative">
    <div class="container mx-auto px-5 lg:w-10/12 mb-20 xl:w-9/12 2xl:w-8/12 relative">
      <div class="text-center">
        <div class="w-96 mx-auto mb-5">
          <img src="/assets/illustration-help-1.png" class="w-full" alt="">
        </div>
        <p v-text="props.error.statusCode" class="text-neutral-material-400"></p>
        <h1 class="text-3xl mb-3 xl:text-4xl font-bold" v-text="HandleTitle(props.error.statusCode)"></h1>
        <p v-text="props.error.statusMessage"></p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "ErrorContent"
}
</script>

<script lang="ts" setup>
import {HandleTitle} from "~/utlis/errorResponse";
interface Error {
  error: {
    statusCode?: any | 404,
    statusMessage?: string
  }
}

const props = defineProps<Error>()

useHead({
  title: `${props.error.statusCode} - ${HandleTitle(props.error.statusCode)}`,
  meta: [
    {
      name: 'robots',
      content: 'noindex'
    },
    {
      name: 'googlebot',
      content: 'noindex'
    },
  ]
})
</script>
