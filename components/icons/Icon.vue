<script lang="ts" setup>
const props = defineProps<{
  name: 'google' | 'twitter'
}>()
</script>

<template>
  <div>
   <IconsGoogle v-if="name === 'google'" />
   <IconsTwitter v-if="name === 'twitter'" />
  </div>
</template>

<style scoped></style>
