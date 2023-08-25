<template>
	<NuxtLayout name="generator-overview-layout">
		<div class="mx-auto max-w-sm sm:max-w-2xl py-8 mb-16">
			<h1 class="mb-16 text-center">{{ content?.title }}</h1>
			<ContentDoc>
				<template #not-found>
					<div class="text-center max-w-lg mx-auto">
						<h1>Sorry the content could not be found 🙈</h1>
						<p><nuxt-link to="/">Go to homepage</nuxt-link> 😉</p>
					</div>
				</template>
			</ContentDoc>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
	// middleware: ['auth'],
	layout: false,
})

const { data: content } = await useAsyncData(`generators-overview`, () => {
	return queryContent('generators').findOne()
})

console.log('content', content)
</script>
