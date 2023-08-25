<template>
	<NuxtLayout name="generator-layout" class="bg-gray-200 dark:bg-gray-900">
		<div class="mx-auto max-w-3xl">
			<header class="text-center pt-8">
				<h1>{{ content?.title }}</h1>
			</header>
			<div class="pt-8">
				<div v-if="user">
					<SocialWizardTabs />

					<div class="pt-4 text-center">
						<p>
							<em
								>You can check the latest
								<nuxt-link :to="`/user/messages`"
									>10 generated messages in the
									archive</nuxt-link
								>.</em
							>
						</p>
					</div>
				</div>
				<div v-if="!user" class="flex justify-center flex-col pt-16">
					<div class="mx-auto">
						<p><em>Login to use the generator</em></p>
					</div>
					<AuthForm />
				</div>

				<div class="px-4 pt-16">
					<ContentDoc>
						<template #not-found>
							<div class="text-center max-w-lg mx-auto">
								<h1>Sorry the content could not be found 🙈</h1>
								<p>
									<nuxt-link to="/">Go to homepage</nuxt-link>
									😉
								</p>
							</div>
						</template>
					</ContentDoc>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { getProfile } from '~/lib/user.service'
const {
	public: { CONFIG },
} = useRuntimeConfig()
const { path } = useRoute()
const pageUrl = ref('')
pageUrl.value = `${CONFIG.domain}${path}`
useHead({
	htmlAttrs: {
		lang: 'en_EN',
	},
})

definePageMeta({
	layout: false,
})
const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const userLoggedIn = ref(false)
const userName = ref('')

const fetchProfile = async () => {
	const { data: profiles, error: profileError } = await getProfile(
		client,
		user.value?.id ?? ''
	)
	if (profiles) {
		userName.value = profiles[0]?.full_name
	}
}
const { data: content } = await useAsyncData(`generator-social-media`, () => {
	return queryContent('generators')
		.where({ _path: '/generators/social-media' })
		.findOne()
})

console.log('content', content)

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

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }
  ]
})

onMounted(() => {
	watchEffect(() => {
		if (user.value) {
			userLoggedIn.value = true
			fetchProfile()
		}
	})
})
</script>

<style>
.wrapper {
	min-height: 100vh;
}
</style>
