<template>
	<div v-if="store.credits !== null">
		<footer
			class="text-base w-full mt-4 text-center text-white py-1 px-4 rounded-lg mr-4"
			v-if="store.credits <= 5"
			:class="{
				'bg-red-600': store.credits === 0,
				'bg-orange-500': store.credits <= 5,
				'bg-green-500': store.credits < 5,
			}"
		>
			You have <strong>{{ store.credits }}</strong> left.
			<span v-if="store.credits <= 5">
				You can order more credits on the
				<nuxt-link to="/pricing">pricing page</nuxt-link>
			</span>
			<span v-if="!(store.credits <= 5) && store.credits === 0">
				To continue order credits on the
				<nuxt-link to="/pricing">pricing page</nuxt-link>
			</span>
		</footer>
	</div>
</template>

<script setup lang="ts">
import { User } from '@supabase/supabase-js'
import { store } from '@/store/credits.store'

const props = defineProps<{
	user: User | null
}>()
const {
	public: { CONFIG },
} = useRuntimeConfig()
</script>
