<template>
	<div>
		<form @submit.prevent="submit()">
			<div v-if="props?.user?.id">
				<div class="relative w-full mb-2">
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
				<div>
					<input
						v-model="store.keywords"
						type="text"
						placeholder="Tell us the keywords you want us to use to improve your title and meta description"
					/>
				</div>
			</div>

			<div class="text-red-600 p-4 text-center font-bold" v-if="error$">
				😢 I'm sorry there is an error: {{ error$ }}
			</div>
			<NotEnoughCredits :user="props?.user" />
			<div class="flex justify-end">
				<div class="w-half">
					<div class="flex items-center" v-if="loader$">
						<div class="pt-4 pr-4">
							<em
								>Generating suggestions can take more than 10
								seconds</em
							>
							😅
						</div>
						<Loader class="pt-4" />
					</div>
				</div>
				<button
					v-if="
						props?.user?.id &&
						creditsStore.credits > 0 &&
						!store.requestUrl.includes('youtube')
					"
					data-umami-event="seo-title-description-generator:submit"
					type="submit"
					class="unset w-auto button bg-green-500 hover:bg-green-600 disabled:opacity-25"
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

		<div
			v-if="store.output.content"
			class="mt-4 bg-white dark:bg-gray-700 p-4 rounded-lg content dark:text-white text-lg"
		>
			<h3 class="mt-2">Current information</h3>
			<div class="grid grid-cols-3">
				<div class="flex flex-col col-span-1">
					<div>
						<strong>Title:</strong>
					</div>
				</div>
				<div class="flex flex-col col-span-2">
					<div>
						<p>{{ store.output.oldTitle }}</p>
					</div>
				</div>
			</div>
			<div class="grid grid-cols-3">
				<div class="flex flex-col col-span-1">
					<div>
						<strong>Meta description:</strong>
					</div>
				</div>
				<div class="flex flex-col col-span-2">
					<div>
						<p>{{ store.output.oldDescription }}</p>
					</div>
				</div>
			</div>
			<div class="grid grid-cols-3">
				<div class="flex flex-col col-span-1">
					<div>
						<strong>URL:</strong>
					</div>
				</div>
				<div class="flex flex-col col-span-2">
					<div>
						<p>{{ store.output.url }}</p>
					</div>
				</div>
			</div>
		</div>
		<div
			class="mt-4 bg-white dark:bg-gray-700 p-4 rounded-lg content dark:text-white"
			v-if="store.output.content"
		>
			<h3 class="mt-2">SEO suggestions</h3>
			<p>
				These are the suggestions for your SEO title and meta
				description.
			</p>
			<div class="seo-suggestions">
				<div v-html="store.output.content"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { store as creditsStore } from '@/store/credits.store'
import { User } from '@supabase/supabase-js'
import { Ref } from 'vue'
import { seoImproverTabsStore as store } from '@/store/seo-improver-generator.store.ts'

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
	store.output.content = ''
	urlResult.value = {}
	loader$.value = true
	const apiUrl = `${API}/generators/seo-suggestions`

	const urlData = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			url: store.requestUrl,
			id: props?.user?.id,
			keywords: store.keywords,
		}),
	})
	const data = await urlData.json()

	await creditsStore.getCredits(client, props?.user?.id)

	if (!data.error) {
		console.log(data)
		store.output.content = data?.responseText
		store.output.oldTitle = data?.pageTitle
		store.output.oldDescription = data?.pageDescription
		store.output.url = data?.url
		loader$.value = false
	} else {
		console.error(data)
		error$.value = data?.error?.message
		loader$.value = false
	}
}
</script>
<style scoped>
.seo-suggestions {
	@apply text-lg leading-loose;
}
.seo-suggestions strong {
	@apply uppercase;
}
.seo-suggestions li {
	@apply mb-4;
}

.seo-suggestions .amount-characters {
	@apply text-sm bg-gray-800 px-2 py-1 rounded-lg text-white;
}
</style>
