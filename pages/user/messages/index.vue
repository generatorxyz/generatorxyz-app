<template>
	<NuxtLayout name="content-layout">
		<div class="mx-auto max-w-4xl py-8 mb-16">
			<h1 class="text-center">Your messages</h1>
			<div class="flex gap-4 flex-col md:flex-row px-4 md:px-0">
				<UserMessagesList :list="messages" class="md:max-w-[300px]" />
				<div class="flex-1">
					<h2 class="text-2xl font-bold">Message</h2>
					<section class="dark:bg-gray-800 bg-white w-full p-4 rounded-lg">
						<p>
							<strong>Select a message </strong>
						</p>
					</section>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { store } from '~/store/messages.store'
const client = useSupabaseClient()
const user = useSupabaseUser();

const messages = await store.fetchMessages(client, user?.value?.id, 10)

definePageMeta({
	middleware: ['auth'],
	layout: false,
})
</script>
