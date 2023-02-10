<template>
  <form action="" method="get" class="relative">
    <div class="relative">
      <input type="search" v-model="keyword" name="search" class="py-4 bg-primary-100 placeholder-neutral-500 pl-6 pr-12 rounded-full w-full" placeholder="Search for topics or questions...">
      <div class="absolute top-1/2 right-4 pointer-events-none -translate-y-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
           <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
           <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
           <path d="M21 21l-6 -6"></path>
        </svg>
      </div>
    </div>
    <div v-if="keyword.length > 3" class="absolute pt-3 z-50 top-full mt-2 rounded-xl bg-white shadow w-full">
      <div class="mb-3">
        <h3 class="font-bold text-sm px-4 mb-2">Results for: <span v-text="keyword"></span></h3>
        <div class="">
          <div class="relative px-4 hover:bg-neutral-100 py-3">
            <div>
              <span>Apa itu Kiriminaja</span>
            </div>
            <nuxt-link to="/faq/apa-itu-kiriminaja" class="absolute top-0 left-0 w-full h-full"/>
          </div>
          <div class="relative px-4 hover:bg-neutral-100 py-3">
            <div>
              <span>Biaya Kiriman Berapa</span>
            </div>
            <nuxt-link to="/faq/apa-itu-kiriminaja" class="absolute top-0 left-0 w-full h-full"/>
          </div>
        </div>
      </div>
      <div>
        <h3 class="font-bold text-sm px-4 mb-2">Recent Search</h3>
        <div class="">
          <div class="relative px-4 hover:bg-neutral-100 py-3">
            <div>
              <span>Apa itu Kiriminaja</span>
            </div>
            <nuxt-link to="/faq/apa-itu-kiriminaja" class="absolute top-0 left-0 w-full h-full"/>
          </div>
          <div class="relative px-4 hover:bg-neutral-100 py-3">
            <div>
              <span>Biaya Kiriman Berapa</span>
            </div>
            <nuxt-link to="/faq/apa-itu-kiriminaja" class="absolute top-0 left-0 w-full h-full"/>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      keyword: ''
    }
  }
}
</script>

<style scoped>

</style>
