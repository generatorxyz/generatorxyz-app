<template>
	<div class="flex justify-center items-center mb-8 pt-8 h-[50vh]">
		<Head>
			<Title>{{ CONFIG?.sitename }} | {{ PAGE_META?.title }}</Title>
		</Head>
		<div class="max-w-2xl h-[200px] text-center">
			<h1>{{ stripeCustomer?.name }}</h1>
			<img
				src="https://res.cloudinary.com/raymons/image/upload/v1674417554/generator-xyz/subscription/fireworks.gif"
				alt="fireworks"
				class="mx-auto"
			/>
			<h2>Thanks for your subscription 🎉</h2>
			<p><em>We will send you to the subscription page!</em></p>
			<!-- <pre class="text-white text-left">{{ stripeCustomer }}</pre> -->
		</div>
	</div>
</template>

<script setup lang="ts">
import { sessionSuccess } from '@/lib/subscription.service'

const {
	public: { API, CONFIG },
} = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
const sessionId = ref<null | string>(null)
const stripeCustomer = ref<null | any>(null)
const user = useSupabaseUser()

console.log('user: ', user?.value)

useHead({
	htmlAttrs: {
		lang: 'en_EN',
	},
})
definePageMeta({
	middleware: ['auth'],
})
const PAGE_META = {
	title: 'Pricing',
	description:
		'We offer sharp pricing tiers to generate social media messages in seconds 🚀 with our powerful generators!',
}

onMounted(() => {
	watchEffect(async () => {
		console.log('query: ', route.query)
		sessionId.value = `${route.query.session_id}`
		if (sessionId.value) {
			await sessionSuccess(API, sessionId.value, user?.value?.id)
				.then((response) => response.json())
				.then((res) => {
					stripeCustomer.value = res.customer
					setTimeout((handler) => {
						router.push('/subscription')
					}, 5000)
				})
				.catch((err) => {
					console.error('err: ', err)
				})
		}
	})
})
</script>

<style scoped>
.emoticon {
	font-size: 1.7rem;
}
</style>
