<template>
	<NuxtLayout name="content-layout">
		<Head>
			<Title>{{ CONFIG?.sitename }} | {{ PAGE_META?.title }}</Title>
		</Head>
        <div class="flex justify-center mb-8 py-32 h-[50vh]">

            <div class="max-w-2xl text-center">
                <h1>{{ stripeCustomer?.name }}</h1>
                <img
				src="https://res.cloudinary.com/raymons/image/upload/v1674417554/generator-xyz/subscription/fireworks.gif"
				alt="fireworks"
				class="mx-auto"
                />
                <h2>Thanks for your order 🎉</h2>
                <p class="text-2xl">Enjoy your credits 🤗</p>
                <p class="text-2xl">We will send you to the generators 🤖!</p>
                <div class="w-full flex justify-center">
                    <Loader v-if="loader$" />
                </div>
                <!-- <pre class="text-white text-left">{{ stripeCustomer }}</pre> -->
            </div>
        </div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { store } from '@/store/credits.store'

const {
	public: { CONFIG },
} = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
const sessionId = ref<null | string>(null)
const stripeCustomer = ref<null | any>(null)
const user = useSupabaseUser()
const client = useSupabaseClient()
const loader$ = ref(false)

useHead({
	htmlAttrs: {
		lang: 'en_EN',
	},
})
definePageMeta({
    middleware: ['auth'],
    layout: false,

})
const PAGE_META = {
	title: 'Order success 🎉',
	description:
		'We offer sharp pricing tiers to generate social media messages in seconds 🚀 with our powerful generators!',
}

onMounted(() => {
	watchEffect(async () => {
		console.log('query: ', route.query)
        sessionId.value = `${ route.query.session_id }`
        loader$.value = true
		if (sessionId.value) {
			await store.getCredits(client, user?.value?.id)
            setTimeout(function() {
                router.push({ path: '/generators'})
            }, 5000)
		}
	})
})
</script>

<style scoped>
.emoticon {
	font-size: 1.7rem;
}
</style>
