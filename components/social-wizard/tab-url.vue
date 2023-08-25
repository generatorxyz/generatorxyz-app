<template>
	<form @submit.prevent="submit()">
		<div class="relative w-full" v-if="props?.user?.id">
			<div
				class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
			>
				<svg
					aria-hidden="true"
					class="w-5 h-5 text-gray-500 dark:text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					></path>
				</svg>
			</div>
			<input
				v-model="tabsStore.requestUrl"
				type="url"
				pattern="https?://.+"
				class="url-input"
				placeholder="Paste url..."
				v-on:change="clearError()"
				required
			/>
		</div>
		<NotEnoughCredits :user="props?.user" />
		<div class="text-red-600 p-4" v-if="error$">
			😢 I'm sorry there is an error: {{ error$ }}
		</div>
		<div class="flex justify-end">
			<div class="w-half">
				<Loader v-if="loader$" class="pt-4" />
			</div>
			<button
				v-if="
					props?.user?.id &&
					creditsStore?.credits &&
					creditsStore?.credits > 0
				"
				type="submit"
				class="unset w-auto button bg-green-500 hover:bg-green-600"
			>
				<div class="w-4 h-4 button-next">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="w-4 h-4 fill-black"
					>
						<path d="m5 3 3.057-3L20 12 8.057 24 5 21l9-9z" />
					</svg>
				</div>
			</button>
		</div>
	</form>
</template>

<script lang="ts" setup>
import { store as creditsStore } from '@/store/credits.store'
import { User } from '@supabase/supabase-js'
import { Ref } from 'vue'
import { tabsStore, TabType } from '~/store/social-generator.store'

const props = defineProps<{
	user: User | null
}>()
const requestUrl = ref('')
const loader$ = ref(false)
const error$ = ref('')
const urlResult: Ref<any> = ref({})
const {
	public: { API },
} = useRuntimeConfig()

async function submit() {
	console.log('submit: ', tabsStore.requestUrl)
	if (!tabsStore.requestUrl || !tabsStore.requestUrl.startsWith('http')) {
		error$.value = 'Please enter a valid URL'
		return
	}
	clearError()
	urlResult.value = {}
	loader$.value = true
	const apiUrl = `${API}/generators/page-content?url=${tabsStore.requestUrl}`

	const urlData = await fetch(apiUrl)
	const data = await urlData.json()

	if (!data.error) {
		console.log(data)
		urlResult.value = data?.body
		console.log(urlResult.value)
		loader$.value = false
		tabsStore.urlContent = urlResult.value
		tabsStore.changeTab(TabType.CONTENT)
	} else {
		console.error(data)
		error$.value = data?.error?.message
		loader$.value = false
	}
}
</script>
<style scoped>
.button-next svg {
	/* object-fit: contain; */
}
</style>
