<template>
  <NuxtLoadingIndicator/>
  <div>
    <div style="background: url('/assets/topography-1.svg')" class="absolute top-0 left-0 right-0 h-1/2">
      <span class="bg-gradient-to-t from-primary-50 absolute left-0 bottom-0 right-0 h-1/2"></span>
    </div>
    <slot/>
    <Footer v-if="!isWebView" additional-class="px-5 lg:w-10/12 xl:w-9/12 2xl:w-8/12"/>
  </div>
</template>
<script lang="ts">
export default {
  name: 'defaultLayout'
}

</script>

<script lang="ts" setup>
import {usePlatformStore} from "~/stores/platform";

const {query} = useRoute()
const {isWebView, setWebView} = usePlatformStore()

if (!isWebView && query.platform) {
  setWebView(true)
}
</script>
