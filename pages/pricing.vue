<template>
	<!-- <div class="grid grid-cols-3 mx-auto max-w-5xl"> -->
	<div>
		<div class="grid mx-auto max-w-4xl gap-4 mb-8 p-4">
			<Head>
				<Title>{{ CONFIG?.sitename }} | {{ PAGE_META?.title }}</Title>
				<Link rel="canonical" :href="pageUrl" />
				<Meta
					hid="og:title"
					property="og:title"
					:content="PAGE_META?.title"
				/>
				<Meta
					name="description"
					:content="PAGE_META?.description ?? CONFIG?.sitedesc"
				/>
			</Head>
			<div class="rounded-md p-8 mt-8 text-center">
				<h1 class="mb-8">Pricing</h1>
				<div class="loader pb-4 flex justify-center" v-if="loader$">
					<Loader />
				</div>
				<p class="text-lg">
					Are you out of credits? Or want to upgrade your credits?
					<br />Pick the credit package you like and order them here.
				</p>
			</div>
		</div>
		<div
			class="cards dark:text-white mb-32 text-center mx-auto lg:max-w-6xl"
		>
			
			<h2 class="text-3xl">One time packages</h2>
			<p>With one credit you can generate one social media message of summary.</p>
			<div
				class="grid md:grid-cols-3 gap-4 max-w-sm md:max-w-full mx-auto"
			>
				<div v-for="(price, index) in prices" class="h-full">
					<ProductsCreditPackage :user="userProfile" :price="price" :index="index + 1" />
					<!-- <ProductsProductOneTime :user="userProfile" :price="price" /> -->
				</div>
			</div>
			<div
				class="loader pb-4 flex justify-center w-full"
				v-if="pendingState$"
			>
				<Loader />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { getProfile, getCustomer } from '@/lib/user.service'
import { getProducts } from '~/lib/products.service'
import { subscriptionCanceled } from '~/lib/subscription.service'
const {
	public: { CONFIG, API },
} = useRuntimeConfig()
const { path } = useRoute()
const pageUrl = ref('')

pageUrl.value = `${CONFIG.domain}${path}`
useHead({
	htmlAttrs: {
		lang: 'en_EN',
	},
})
// definePageMeta({
// 	middleware: ['auth'],
// })
const PAGE_META = {
	title: 'Subscription',
	description: 'Subscription page',
}

const loader$ = ref(false)
const user = useSupabaseUser()
const client = useSupabaseClient()
const router = useRouter()
const userProfile = ref(null)
const customerDate = ref(null)
const prices = ref<null | Response>(null)
const betaUser = ref(false)
const pendingState$ = ref(false)

// User profile
async function getUserProfile() {
	return await getProfile(client, user.value?.id ?? '')
}

const setProfile = (profile) => {
	userProfile.value = profile
	betaUser.value = userProfile?.value?.beta_user
}

async function getCustomerData() {
	console.log('user id: ', user.value?.id)
	const { data, error } = await getCustomer(client, user.value?.id)
	if (error || data === null) {
		console.log('no customer:', error)
	} else {
		console.log('customer: ', data)
		customerDate.value = data
	}
}

onMounted(() => {
	watchEffect(async () => {
		pendingState$.value = true

		if (user.value) {
			console.log('got user')
			const { data: profile, error: profileError } =
				await getUserProfile()
			if (profile) {
				setProfile(profile)
				getCustomerData()
			}
		}
		const products = await getProducts(API)
		const response = await products.json()
		console.log('products: ', response)
		pendingState$.value = false
		const sortedProducts = response?.products?.sort(
			(a, b) => a?.mappedPrice?.unit_amount - b?.mappedPrice?.unit_amount
		)
		prices.value = sortedProducts
	})
})
</script>
