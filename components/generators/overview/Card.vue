<template>
	<nuxt-link
		:to="props?.link ?? '#'"
		class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg ratio no-underline relative overflow-hidden"
	>
		<div
			class="icon mb-2 h-[100px] flex justify-center items-center rounded-t-lg relative" :class="{ 'bg-green-500': props.new, 'bg-yellow-500': !props.new }"
		>
			<span
				class="absolute pl-4 pr-2 py-2 bottom-[-15px] right-0 text-xs uppercase bg-red-500 text-white rounded-l-lg"
				v-if="!props.active"
				>Coming soon</span
			>
			<div class=" " :class="{ 'opacity-50': !props.active }">
				<IconsShare v-if="props?.icon === 'share'" />
				<IconsSummary v-if="props?.icon === 'summary'" />
				<IconsAutomate v-if="props?.icon === 'automate'" />
				<IconsSearch v-if="props?.icon === 'search'" class="" />
			</div>
		</div>
		<div class="p-4" :class="{ 'opacity-50': !props.active }">
			<h2
			class="title text-base uppercase text-black dark:text-white mt-0"
			>
			{{ props?.title }}
		</h2>
		<p class="text-base">{{ props?.desc }}</p>
		</div>
	</nuxt-link>
</template>

<script setup lang="ts">
const props = defineProps<{
	title: string
	icon: string
	link?: string
	desc: string
	active: boolean
	new?: boolean
}>()
</script>
