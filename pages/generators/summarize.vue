<template>
	<NuxtLayout name="generator-layout" class="bg-gray-200 dark:bg-gray-900">
		<div class="mx-auto max-w-3xl">
			<header class="text-center pt-8">
				<h1>{{ content?.title }}</h1>
			</header>
			<div v-if="user">
				<GeneratorsSummaryTabs />
				<div class="pt-4 text-center">
					<p>
						<em
							>You can check the latest
							<nuxt-link :to="`/user/messages`"
								>10 generated messages in the archive</nuxt-link
							>.</em
						>
					</p>
				</div>
			</div>
			<div v-if="!user" class="flex justify-center  flex-col pt-16">
				<div class="mx-auto">
					<p><em>Login to use the generator</em></p>
				</div>
				<AuthForm />
			</div>

			<div class="px-4 mt-16">
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
const {
	public: { CONFIG },
} = useRuntimeConfig()

definePageMeta({
	layout: false,
})
useHead({
	htmlAttrs: {
		lang: 'en_EN',
	},
})
const user = useSupabaseUser()
const { path } = useRoute()
const pageUrl = ref('')
pageUrl.value = `${CONFIG.domain}${path}`

const { data: content } = await useAsyncData(`generator-summarize`, () => {
	return queryContent('generators')
		.where({ _path: '/generators/summarize' })
		.findOne()
})

useSeoMeta({
	title: `${content?.value?.title}`,
	description: content?.value?.description,
	ogTitle: `${ content?.value?.title }`,
	ogDescription: content?.value?.description,
	ogImage: CONFIG?.logoUrl,
	twitterImage: CONFIG?.logoUrl,
	ogUrl: pageUrl.value,
	twitterTitle: `${ content?.value?.title }`,
	twitterDescription: content?.value?.description,
	twitterCard: 'summary_large_image'
})

</script>
