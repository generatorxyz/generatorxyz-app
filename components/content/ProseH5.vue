<template>
  <h5 :id="id" class="text-black dark:text-white mb-4 font-bold">
    <a :href="`#${id}`">
      <slot />
    </a>
  </h5>
</template>

<script setup lang="ts">
defineProps<{ id: string }>()
</script>