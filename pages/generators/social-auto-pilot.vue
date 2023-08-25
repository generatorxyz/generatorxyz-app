<template>
	<NuxtLayout name="generator-layout" class="bg-gray-200 dark:bg-gray-900">
		<div class="mx-auto max-w-3xl">
			<header class="text-center pt-16">
				<h1 class="leading-normal">{{ content?.title }}</h1>
			</header>

			<div v-if="user">
				
			</div>

			<div class="px-4 mt-16 content">
				<ContentDoc>
					<template #not-found>
						<div class="text-center max-w-lg mx-auto">
							<h1>Sorry the content could not be found 🙈</h1>
							<p>
								<nuxt-link to="/">Go to homepage</nuxt-link> 😉
							</p>
						</div>
					</template>
				</ContentDoc>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
	// middleware: ['auth'],
	layout: false,
})
useHead({
	htmlAttrs: {
		lang: 'en_EN',
	},
})
const user = useSupabaseUser()
const router = useRouter()

const { data: content } = await useAsyncData(
	`generator-social-autopilot`,
	() => {
		return queryContent('generators')
			.where({ _path: '/generators/social-auto-pilot' })
			.findOne()
	}
)

const PAGE_META = {
	title: content?.title ?? 'Social Generator',
	description: content?.description ?? 'Social media generator',
}
</script>
