<template>
  <h3 :id="id" class="text-black dark:text-white font-bold text-2xl mb-4">
    <a :href="`#${id}`">
      <slot />
    </a>
  </h3>
</template>

<script setup lang="ts">
defineProps<{ id: string }>()
</script>