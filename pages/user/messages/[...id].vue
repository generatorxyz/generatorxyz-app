<template>
	<NuxtLayout name="content-layout">
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
		<div class="mx-auto max-w-4xl py-8 mb-16">
			<h1 class="text-center">Your messages</h1>
			<div class="flex gap-4 flex-col md:flex-row px-4 lg:px-0">
				<UserMessagesList :list="messages" class="md:max-w-[300px]" />
				<div class="flex-1">
					<h2 class="text-2xl font-bold">Message</h2>
					<section class="dark:bg-gray-800 bg-gray-200 w-full p-4 rounded-lg">
						<p>
							<strong>Type:</strong> {{ message?.type === 'default' ? 'Social media' : message?.type  }}
						</p>
						<p>
							<strong>Date: </strong>{{ message?.created_at ? rtf.format(new Date(message?.created_at)) : 'Unkown' }}<br />
						</p>
                        <p v-if="message?.source_content && message?.url === null">
							<strong>Source content: </strong><br /><textarea class="w-full py-3 h-[380px]" readonly>{{ message?.source_content }}</textarea>
                        </p>
                        <p v-if="message?.message && message?.type !== 'seo'">
							<strong>Message: </strong><br /><textarea class="w-full py-3 h-[380px]" readonly>{{ message?.message }}</textarea>
                        </p>
                        <p v-if="message?.message && message?.type === 'seo'">
							<strong>Message: </strong><br />
							<div v-html="message?.message" class="w-full py-3 bg-white dark:bg-gray-500 px-4"></div>
                        </p>
                        <p v-if="message?.message === null || message?.message.length === 0" class="bg-red-500 px-2 rounded-lg">
							Oops something went wrong with saving this message. Please <a :href="reimburseEmail()">send an email to</a> and we will reimburse the credit it as soon as possible.
                        </p>
                        <p v-if="message?.url">
							<strong>URL: </strong><br /><a :href="message?.url" target="_blank">{{
								message?.url
							}}</a>
                        </p>
					</section>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { store, MessageItem } from '~/store/messages.store'
const {
	public: { CONFIG },
} = useRuntimeConfig()
const { path } = useRoute()
const pageUrl = ref('')
const PAGE_META = {
	title: 'Messages',
	description: 'Messages page',
}

const client = useSupabaseClient()
const user = useSupabaseUser()
const message = ref<MessageItem | null>(null)
const messages = await store.fetchMessages(client, user?.value?.id, 10)

function reimburseEmail() {
	const formattedSubject = encodeURIComponent(`⚠️ Reimbursement request for user: ${user?.value?.id}`)
	const formattedBody = encodeURIComponent(`Hi Ray, \n\n My message with id "${message?.value?.uuid}" went wrong. \n\n My userID is "${user?.value?.id}" \n\n Can you please reimburse the credit? \n\n Thanks!`)
	return `mailto:${CONFIG?.email}?subject=${formattedSubject}&body=${formattedBody}`
}

const {
	params: { id },
} = useRoute()
definePageMeta({
	middleware: ['auth'],
	layout: false,
})

const rtf = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short', hour12: false, })

onMounted(async () => {
	if (id.length === 1) {
		const { data, error } = await store.fetchSelectedMessage(client, id[0])
		if (data) {
			message.value = data
		} else {
			console.log('error: ', error)
		}
	}
})
console.log({ id })
</script>
