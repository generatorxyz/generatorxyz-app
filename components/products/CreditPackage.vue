<template>
	<div class="product h-full relative overflow-hidden text-black">
		<div
			class="h-full rounded px-4 pb-8  text-center"
			:class="{
				'bg-green-500': isDefaultPrice,
				'bg-yellow-500': !isDefaultPrice,
			}"
		>
			<div v-if="props?.price?.images?.length > 0">
				<img
					loading="lazy"
					:src="`https://res.cloudinary.com/raymons/image/upload/w_350,f_auto,q_100/v1678867036/generator-xyz/products/${props?.index}.png`"
					:alt="props?.price?.name"
					class="mx-auto w-64 lg:w-full"
				/>
			</div>
			<p class="text-xl text-black">{{ props?.price?.name }}</p>
			<header class="text-center">
				<div class="price">
					<span class="currency text-2xl lg:text-3xl">€</span>
					<span class="amount text-5xl lg:text-6xl font-bold">{{
						formatPrice(props?.price?.mappedPrice?.unit_amount)
					}}</span>
				</div>
			</header>
			<div
				class="uppercase absolute top-3 right-[-115px] text-sm text-white bg-black px-32 py-2 rotate-[20deg]"
				v-if="isDefaultPrice"
			>
				<strong>Most popular</strong>
			</div>
			<p class="text-base text-black">{{ props?.price?.description }}</p>
			<p class="text-base text-black">
				{{
					formatPricePerCredit(props?.price?.mappedPrice?.unit_amount)
				}}
				per credit
			</p>

			<div v-if="!props.user" class="flex flex-col">
				<div>
					<p class="text-center text-sm uppercase text-gray-900">
						Register or login to subscribe.
					</p>
				</div>
				<AuthForm />
			</div>

			<div v-if="props.user">
				<form
					@submit.prevent="orderProduct()"
					class="flex flex-col gap-4"
				>
					<div class="loader pb-4 flex justify-center" v-if="loader$">
						<Loader />
					</div>
					<div class="text-red-600 p-4" v-if="errorMessage">
						{{ errorMessage }}
					</div>
					<button
						class="w-full mt-4 text-black bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg px-4 py-2 dark:focus:ring-green-800"
					>
						Order
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
export interface Props {
	user?: {
		username: string
		full_name: string
		id: string
	} | null
	price: any | null
	index: string
}

import {
	createCustomer,
	createOrderCheckoutSession,
} from '@/lib/subscription.service'
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
	index: '0',
})

const isDefaultPrice = computed(() => {
	return props?.price?.metadata?.default
})

async function orderProduct() {
	loader$.value = true
	console.log('order product')

	try {
		const customer = await createCustomer(
			API,
			props?.user?.username,
			props?.user?.full_name,
			props?.user?.id
		)
		const cusomerData = await customer.json()

		const data = {
			userId: cusomerData?.id,
			priceId: props?.price?.mappedPrice?.id,
			supabaseUserId:
				props?.user?.id ?? cusomerData?.metadata?.supabaseUserId,
		}
		console.log('data: ', data)

		const session = await createOrderCheckoutSession(
			API,
			data?.priceId,
			data?.userId,
			data?.supabaseUserId
		)
		const sessionData = await session.json()

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

function formatPrice(price: number) {
	return new Intl.NumberFormat('nl-NL').format(price / 100)
}
function formatPricePerCredit(price: number) {
	const calc = price / 100 / parseInt(props?.price?.metadata?.amount)
	return new Intl.NumberFormat('nl-NL', {
		style: 'currency',
		currency: 'EUR',
		maximumSignificantDigits: 3,
	}).format(calc)
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
