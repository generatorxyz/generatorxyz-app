<template>
  <h2 :id="id" class="text-black dark:text-white font-bold text-3xl mb-4">
    <a :href="`#${id}`">
      <slot />
    </a>
  </h2>
</template>

<script setup lang="ts">
defineProps<{ id: string }>()
</script>