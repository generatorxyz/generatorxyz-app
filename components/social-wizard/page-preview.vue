<template>
	<div
		class="bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 overflow-hidden flex-col"
	>
		<div class="flex justify-center pt-2 bg-gray-900"><em
			class="mb-2 text-sm font-bold tracking-tight text-white"
			>URL CONTENT</em
		></div>
		<img v-if="props?.image" class="mx-auto" :src="props?.image" alt="Image from url" />
		<div class="py-4 px-8 leading-normal">
			<nuxt-link target="_blank" :to="props?.url"
				><h5
					class=" m-0 mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white"
				>
					{{ props?.title ?? 'No title' }}
				</h5></nuxt-link
			>
			<p class="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
				{{ props?.description ?? 'No description' }}
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
export interface Props {
	title: string
	image: string
    description: string
    url: string
}
const props = withDefaults(defineProps<Props>(), {
    title: '',
    image: '',
    description: '',
    url: ''
})
</script>
