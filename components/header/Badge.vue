<template>
	<span
		class="block absolute bottom-[-2px] left-[-20px] rounded-full w-7 h-7 flex justify-center items-center text-xs p-2"
		:class="{
			'bg-red-500': props?.credits === 0,
			'bg-orange-500': props?.credits <= 5,
			'bg-green-500': props?.credits > 5,
			'text-black': props?.credits > 5,
		}"
		>{{ props?.credits }}</span
	>
</template>

<script setup lang="ts">
const props = defineProps<{
	credits: number
} > ()
</script>
