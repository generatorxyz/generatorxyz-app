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
				v-model="store.requestUrl"
				type="url"
				pattern="https?://.+"
				class="url-input"
				placeholder="Paste url..."
				v-on:change="clearError()"
				required
			/>
		</div>
		<div
			class="text-red-600 p-4 text-center font-bold"
			v-if="store.requestUrl.includes('youtube')"
		>
			😢 We are not able to generate a summary from a YouTube video.
		</div>
		<div class="text-red-600 p-4 text-center font-bold" v-if="error$">
			😢 I'm sorry there is an error: {{ error$ }}
		</div>
		<NotEnoughCredits :user="props?.user" />
		<div class="flex justify-end">
			<div class="w-half">
				<Loader v-if="loader$" class="pt-4" />
			</div>
			<button
				data-umami-event="summary-generator:submit"
				v-if="
					props?.user?.id &&
					creditsStore?.credits &&
					creditsStore?.credits > 0 &&
					!store.requestUrl.includes('youtube')
				"
				type="submit"
				class="unset w-auto button bg-green-500 hover:bg-green-600 disabled:opacity-25 text-black"
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
		<div class="mt-4" v-if="store.output.content">
			<label for="inputContent" class="uppercase">Summary</label>
			<textarea
				placeholder=""
				name="inputContent"
				id="inputContent"
				cols="30"
				rows="5"
				class="rounded-lg w-full py-4 min-h-[250px] leading-loose"
				>{{ store.output.content }}</textarea
			>
		</div>
	</form>
</template>

<script lang="ts" setup>
import { store as creditsStore } from '@/store/credits.store'
import { User } from '@supabase/supabase-js'
import { Ref } from 'vue'
import { summaryTabsStore as store } from '~/store/summary-generator.store'

const client = useSupabaseClient()

const props = defineProps<{
	user: User | null
}>()
const loader$ = ref(false)
const error$ = ref('')
const urlResult: Ref<any> = ref({})
const {
	public: { API },
} = useRuntimeConfig()

async function submit() {
	console.log('submit: ', store.requestUrl)
	if (!store.requestUrl || !store.requestUrl.startsWith('http')) {
		error$.value = 'Please enter a valid URL'
		return
	}
	clearError()
	urlResult.value = {}
	loader$.value = true
	const apiUrl = `${API}/generators/summarize`

	const urlData = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			url: store.requestUrl,
			id: props?.user?.id,
		}),
	})
	const data = await urlData.json()

	await creditsStore.getCredits(client, props?.user?.id)

	if (!data.error) {
		console.log(data)
		store.output.content = data?.responseText
		loader$.value = false
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
