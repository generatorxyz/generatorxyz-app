<template>
	<div
		class="bordered adaptive horizontal"
		data-ea-publisher="byrayraydev"
		:data-ea-type="type"
		:id="id"
		:data-ea-keywords="tags"
        :data-ea-style="style"
	></div>
</template>

<script setup>
const props = withDefaults(defineProps(), {
	type: undefined,
	id: 'default',
    topics: undefined,
    style: undefined,
})

const id = props?.id ?? 'default'
const type = props?.type ?? 'image'

useHead({
	script: [
		{
			src: 'https://media.ethicalads.io/media/client/ethicalads.min.js',
			async: true,
		},
	],
})
</script>
