<template>
	<section class="bg-gray-200 dark:bg-gray-500 w-full p-4 rounded-lg">
		<!-- <pre>{{ selectMessage }}</pre> -->
		<p>
			<strong>Date: </strong>{{ date }}<br />
            <strong>Message: </strong><br />{{ selectMessage?.message }}
		</p>
	</section>
</template>

<script lang="ts" setup>
const props = defineProps<{
    selectedItem: any
}>()
const selectMessage = props.selectedItem
const rtf = new Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short', hour12: false, })
const date = computed(() => {
	return selectMessage?.created_at ? rtf.format(new Date(selectMessage?.created_at)) : 'Unknown'
})
</script>
