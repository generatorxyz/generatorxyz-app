<template>
		<footer class="w-full bg-gray-700 px-8" :class="{'absolute bottom-0 left-0': props.contentPage}">
			<TheFooterContent />
		</footer>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps(), {
	contentPage: false,
})
</script>
