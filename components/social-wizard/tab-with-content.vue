<template>
	<form @submit.prevent="submit()">
		<div
			:class="{
				hidden: tabsStore.showContentForm === false,
			}"
		>
			<SocialWizardOptions />
			<div class="mt-4">
				<label for="inputContent" class="uppercase">{{
					urlContent ? ' Content from url:' : 'Input content:'
				}}</label>
				<textarea
					placeholder="For example: GeneratorXYZ is a powerful tool that can help you create high-quality, engaging tweets in just a few simple steps. To get started, simply input the URL of the content you would like to use as the basis for your tweets. Our AI will then analyze the content and generate a series of tweets that are optimized for engagement and visibility on Twitter."
					name="inputContent"
					id="inputContent"
					cols="30"
					rows="5"
					class="rounded-lg w-full py-4 min-h-[250px] leading-loose"
					v-model="tabsStore.content"
				>
 {{ tabsStore.content }}</textarea
				>
			</div>
			<NotEnoughCredits :user="props?.user" />

			<div class="text-red-600 p-4" v-if="error$">
				😢 I'm sorry there is an error: {{ error$ }}
			</div>

			<div class="md:grid md:grid-cols-3 flex flex-col-reverse">
				<div class="self-center pt-4 justify-self-start col-span-2">
					<em v-if="urlContent">
						Adjust the content to influence the generated message.
					</em>
				</div>

				<div class="md:flex md:justify-end">
					<div class="pt-1">
						<Loader v-if="loader$" class="pt-4" />
					</div>
					<button
						v-if="
							props?.user?.id &&
							creditsStore?.credits &&
							creditsStore?.credits > 0
						"
						type="submit"
						:disabled="!canSubmit"
						class="unset md:max-w-min justify-self-end button text-black bg-green-500 hover:bg-green-600 disabled:opacity-50"
					>
						Generate
					</button>
				</div>
			</div>
		</div>
		<div v-if="!tabsStore.showContentForm">
			<SocialWizardOutputText />
		</div>
	</form>
</template>

<script setup lang="ts">
import { store as creditsStore } from '@/store/credits.store'
import { User } from '@supabase/gotrue-js'
import { tabsStore } from '~/store/social-generator.store'

import {
	formatResponseText,
	postGnenerateSocialMediaMessages,
} from '~/lib/api.service'
const client = useSupabaseClient()

const {
	public: { API },
} = useRuntimeConfig()

const props = defineProps<{
	user: User | null
}>()

const loader$ = ref(false)
const error$ = ref('')

const urlContent = tabsStore.urlContent

const canSubmit = computed(() => {
	return (
		tabsStore.selected.platform !== '' &&
		tabsStore.selected.audience !== '' &&
		tabsStore.content !== ''
	)
})

async function submit() {
	if (!props.user && creditsStore.credits) return
	const apiUrl = `${API}/generators/social-generator`
	loader$.value = true
	const data = await postGnenerateSocialMediaMessages(
		apiUrl,
		tabsStore.content,
		tabsStore.selected.platform,
		tabsStore.selected.audience,
		props.user?.id
	)

	console.log('data: ', data)
	tabsStore.showContentForm = false

	if (data?.body?.responseText) {
		tabsStore.output.content = formatResponseText(data?.body?.responseText)
		loader$.value = false

		await creditsStore.getCredits(client, props.user?.id)
	}
	loader$.value = false
}

onMounted(() => {
	if (urlContent?.description) {
		tabsStore.content = urlContent?.description
	}
})
</script>
