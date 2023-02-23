<template>
  <header class="border-b border-b-neutral-material-100 bg-primary-25 bg-opacity-50 backdrop-blur-lg py-3 xl:py-3 sticky top-0 z-50">
    <div class="container mx-auto px-5 relative">
      <div class="flex items-center">
        <Logo class-name="block hover:text-primary-600 text-primary-700"/>
        <div class="ml-auto flex gap-3">
          <div>
            <div>
              <a href="https://kiriminaja.com/about" class="block px-4 py-1.5 rounded-full bg-primary-700 text-white">
                Homepage
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderArticle"
}
</script>

<style scoped>

</style>
