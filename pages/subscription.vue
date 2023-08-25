<template>
	<!-- <div class="grid grid-cols-3 mx-auto max-w-5xl"> -->
	<div class="grid grid-cols-4 mx-auto max-w-5xl gap-4 mb-16">
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
		<aside class="col-span-1 pt-8 w-full" v-if="true">
			<TheAccountMenu :showPricing="betaUser" />
		</aside>
		<div
			class="col-span-3 dark:bg-gray-800 bg-gray-200 rounded-md p-8 mt-8"
		>
			<h1 class="mb-8">
				Subscription
				<span v-if="customerDate?.sub_status === 'paid'">🎉</span>
			</h1>
			<div class="loader pb-4 flex justify-center" v-if="loader$">
				<Loader />
			</div>
			<p v-if="customerDate?.sub_status !== 'paid'">
				You have a free account. But you can upgrade to a premium
				account to get access to all the features.
			</p>

			<div v-if="customerDate?.sub_status === 'paid'" class="">
				<p>
					You can manage your
					<a
						href="https://billing.stripe.com/p/login/14k02U7Ksfof4RG9AA"
						target="_blank"
						title="manage your subscription"
						>subscription via Stripe</a
					>. Check this environment for your payment details or
					invoices.
				</p>

				<form
					@submit.prevent="cancelSubscripiton()"
					class="mx-auto max-w-lg"
				>
					<button class="bg-red-600 hover:bg-red-700">
						Cancel subscription 😢
					</button>
				</form>
			</div>

			<div
				class="cards dark:text-white mb-8"
				v-if="customerDate?.sub_status !== 'paid'"
			>
				<div
					class="loader pb-4 flex justify-center w-full"
					v-if="pendingState$"
				>
					<Loader />
				</div>
				<h2>
					{{ prices[0]?.product?.name }}
				</h2>
				<div class="grid grid-cols-2 gap-2">
					<div v-for="(price, index) in prices">
						<ProductsProductOneTime v-if="price?.type === 'one_time'" :user="userProfile" :price="price" />
						<!-- <ProductsProductCard
							v-if="price?.type !== 'one_time'"
							:user="userProfile"
							:price="price"
						/> -->
					</div>
				</div>
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
definePageMeta({
	middleware: ['auth'],
})
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
const { data: profile, error: profileError } = await getProfile(
	client,
	user.value?.id ?? ''
)

const setProfile = () => {
	console.log(profile)
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

async function cancelSubscripiton() {
	loader$.value = true
	try {
		const { data, error } = await subscriptionCanceled(
			API,
			client,
			user?.value?.id,
			customerDate?.value?.sub_id
		)

		if (error) {
			errorMessage.value = error
		} else {
			customer.data = data
		}
		loader$.value = false
	} catch (error) {
		loader$.value = false
		errorMessage.value = error
	}
	loader$.value = false
}

onMounted(() => {
	watchEffect(async () => {
		pendingState$.value = true

		if (!user.value) {
			router.push('/auth')
		} else {
			console.log('got user')
			setProfile()
			if (profile) {
				getCustomerData()
			}
			const products = await getProducts(API)
			const response = await products.json()
			console.log('products: ', response)
			pendingState$.value = false
			const sortedProducts = response?.data?.sort(
				(a, b) => a.unit_amount - b.unit_amount
			)
			prices.value = sortedProducts
		}
	})
})
</script>
