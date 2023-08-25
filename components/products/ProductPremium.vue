<template>
	<div class="product">
		<div
			class="bg-yellow-500 w-full lg:max-2xl max-w-lg mx-auto h-full rounded px-16 pb-12 pt-8 text-white"
		>
			<header class="text-center">
				<h2 class="text-3xl uppercase">Premium</h2>
				<div class="price">
					<span class="currency text-3xl">€</span>
					<span class="amount text-6xl font-bold">4,99</span>
					<span class="period text-sm">/mo</span>
				</div>
			</header>
			<hr class="mt-4 pb-8" />
			<ul class="list-outside">
				<li><span class="emoticon">🚀</span> 100 credits a month</li>
				<li>
					<span class="emoticon">🏎️</span> Crafts message in seconds
				</li>
				<li>
					<span class="emoticon">📱</span> Post where-ever you want
				</li>
				<li>
					<span class="emoticon">💻</span> Generate messages based on
					URL or description
				</li>
			</ul>
			<hr class="mb-4" />

			<div v-if="customer.data?.sub_status === 'paid'" class="">
				<p class="text-center uppercase bg-green-500 rounded py-2 text-black">
					You are already subscribed 🎉
				</p>
				<form @submit.prevent="cancelSubscripiton()">
					<button class="bg-red-600 hover:bg-red-700">
						Cancel subscription 😢
					</button>
				</form>
			</div>

			<div v-if="!props.user">
				<p
					class="text-center text-sm uppercase mb-[-40px] text-gray-900"
				>
					Register or login to subscribe.
				</p>
				<AuthForm />
			</div>
			<div v-if="props.user && customer.data?.sub_status !== 'paid'">
				<form
					@submit.prevent="startSubscripiton()"
					class="flex flex-col gap-4"
				>
					<div class="loader pb-4 flex justify-center" v-if="loader$">
						<Loader />
					</div>
					<div class="text-red-600 p-4" v-if="errorMessage">
						{{ errorMessage }}
					</div>
					<button>Subscribe</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { createCustomer, createSession, subscriptionCanceled } from '@/lib/subscription.service'
import { getCustomer } from '@/lib/user.service'
const router = useRouter()
const {
	public: { API },
} = useRuntimeConfig()
export interface Props {
	user: {
		username: string
		full_name: string
		id: string
	} | null
}
const props = withDefaults(defineProps<Props>(), {
	user: null,
})
const client = useSupabaseClient()
const priceId = 'price_1MT5jtBJ25dIBC76qlx2Fiyt'
const customer = reactive({
	data: null,
})

console.log({ API })
const loader$ = ref(false)
const errorMessage = ref('')

const startSubscripiton = async () => {
	loader$.value = true
	console.log({ props: props?.user })
	try {
		const customer = await createCustomer(
			API,
			props?.user?.username,
			props?.user?.full_name,
			props?.user?.id
		)
		const cusomerData = await customer.json()

		console.log({ ...cusomerData })
		// Create a checkout session with the customer and redirect to checkout
		const data = {
			userId: cusomerData?.id,
			priceId: priceId,
			supabaseUserId: props?.user?.id ?? cusomerData?.metadata?.supabaseUserId,
		}
		console.log('data: ', data)

		const session = await createSession(API, data?.priceId, data?.userId, data?.supabaseUserId)
		const sessionData = await session.json()
		console.log('sessionData: ', sessionData)

		if (sessionData?.url) {
			console.log('send to checkout', sessionData?.url)
			window.location.href = sessionData?.url
		} else {
			errorMessage.value = sessionData?.message
		}

	} catch (error) {
		loader$.value = false
		errorMessage.value = error
	}
	loader$.value = false
}

const cancelSubscripiton = async () => {
	loader$.value = true
	console.log({ props: props?.user })
	try {
		const {data, error} = await subscriptionCanceled(
			API,
			client,
			props?.user?.id,
			customer.data?.sub_id,
		)

		if(error) {
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
		if (props.user) {
			const { data } = await getCustomer(client, props.user?.id)
			customer.data = data

			console.log((customer.data))
		}
	})
})
</script>
