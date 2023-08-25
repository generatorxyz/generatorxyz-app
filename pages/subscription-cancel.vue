<template>
	<div class="flex justify-center items-center mb-8 pt-8 min-h-[50vh]">
		<Head>
			<Title>{{ CONFIG?.sitename }} | {{ PAGE_META?.title }}</Title>
		</Head>
		<div class="max-w-2xl text-center">
			<h1>{{ stripeCustomer?.name }}</h1>
			<img
				src="https://res.cloudinary.com/raymons/image/upload/v1675258633/generator-xyz/virtual-hug.gif"
				alt="Virtual hug"
				class="mx-auto"
			/>
			<h2>It's sad to see you go 😢</h2>
			<p><em>But you are always welcome to come back</em> 🤗</p>
			<p>We send you back to the subscription page.</p>
			<!-- <pre class="text-white text-left">{{ stripeCustomer }}</pre> -->
		</div>
	</div>
</template>

<script setup lang="ts">
import { getSession, sessionSuccess } from '@/lib/subscription.service'

const {
	public: { API, CONFIG },
} = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
const sessionId = ref<null | string>(null)
const stripeCustomer = ref<null | any>(null)
const user = useSupabaseUser()

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
			// await sessionSuccess(API, sessionId.value, user?.value?.id)
			// 	.then((response) => response.json())
			// 	.then((res) => {
			// 		stripeCustomer.value = res.customer
					setTimeout((handler) => {
						router.push('/subscription')
					}, 5000)
			// 	})
			// 	.catch((err) => {
			// 		console.error('err: ', err)
			// 	})
		}
	})
})
</script>

<style scoped>
.emoticon {
	font-size: 1.7rem;
}
</style>
