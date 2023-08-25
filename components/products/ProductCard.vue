<template>
	<div class="product">
		<div
			class="bg-yellow-500 h-full rounded px-16 pb-12 pt-8 text-white"
		>
			<header class="text-center">
				<h2 class="text-3xl uppercase">{{ props?.price?.product?.name }}</h2>
				<div class="price">
					<span class="currency text-3xl">€</span>
					<span class="amount text-6xl font-bold">{{ formatPrice(price?.unit_amount) }}</span>
					<span class="period text-sm">/{{ price?.recurring?.interval }}</span>
				</div>
			</header>
			<hr class="mt-4 pb-2" />
            <p>
                {{ props?.price?.product?.description }}
            </p>
            <hr class="mt-4 pb-8" />
			<ul class="list-inside">
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
			</div>

			<div v-if="!props.user" class="flex flex-col">
				<div>
					<p
					class="text-center text-sm uppercase text-gray-900"
				>
					Register or login to subscribe.
				</p>
				</div>
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
					<button
                    class="w-full mt-4 bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg px-4 py-2 dark:focus:ring-green-800 text-black"
                    >Subscribe</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
export interface Props {
	user: {
		username: string
		full_name: string
		id: string
    } | null
    price: any| null
}

import { createCustomer, createSession, subscriptionCanceled } from '@/lib/subscription.service'
import { getCustomer } from '@/lib/user.service'

const {
	public: { API },
} = useRuntimeConfig()
const client = useSupabaseClient()
const customer = reactive({
	data: null,
})

console.log({ API })
const loader$ = ref(false)
const errorMessage = ref('')

const props = withDefaults(defineProps<Props>(), {
	user: null,
	price: null,
})

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
			priceId: props?.price?.id,
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

function formatPrice(price: number) {
    return new Intl.NumberFormat('nl-NL').format(price / 100)
}

onMounted(() => {
	watchEffect(async () => {
		if (props.user) {
			const { data } = await getCustomer(client, props.user?.id)
			customer.data = data

			console.log('customer: ', JSON.stringify(customer.data, null, 2))
			console.log('props: ', props)
		}
	})
})
</script>
