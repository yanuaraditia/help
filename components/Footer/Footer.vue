<template>
  <footer class="py-2 mt-7 xl:py-7 text-neutral-material-600">
    <div class="container mx-auto relative" :class="additionalClass">
      <div class="grid xl:flex text-sm xl:text-base gap-y-1">
        <div class="xl:ml-auto xl:order-2">
          <span>Craft with ❤️ by </span>
          <a class="font-medium text-primary-700" href="mailto:support@kiriminaja.com">support@kiriminaja.com</a>
        </div>
        <div class="xl:order-1">
          <span>© 2023 </span>
          <a href="https://developer.kiriminaja.com" class="font-medium text-primary-700">Tech at KiriminAja</a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
defineProps({
  additionalClass: String
})
</script>
