<template>
	<nav class="mx-auto max-w-sm sm:max-w-4xl py-8">
		<div
			class="generator-grid grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 px-4"
		>
			<GeneratorsOverviewCard
				v-for="generator in generators"
				:title="generator.title"
				:icon="generator.icon"
				:link="generator.link"
				:desc="generator.desc"
				:active="generator.active"
				:new="generator.new"
			/>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { generatorsStore } from '@/store/generators.store';
const {generators} = generatorsStore
</script>
