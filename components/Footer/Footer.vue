<template>
  <footer class="py-2 xl:py-7 text-neutral-material-600">
    <div class="container mx-auto relative" :class="additionalClass">
      <div class="flex">
        <div>
          <span>Copyright © 2023 KiriminAja Tech Team</span>
        </div>
        <div class="ml-auto">
          <span>Crafted with ❤️ by </span>
          <a class="font-medium text-primary-700" href="mailto:support@kiriminaja.com">support@kiriminaja.com</a>
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
