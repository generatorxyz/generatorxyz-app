<template>
	<div class="mb-4" v-if="tabsStore.output.content">
		<label for="outputContent" class="uppercase">Result</label>
		<div class="pt-2 mb-4">
			You can use this message to post directly or use it as a
			startingpoint for your own message.
		</div>
		<div class="flex justify-center items-center gap-4 mb-4">
			<button
			@:click.prevent="
					copySocial(tabsStore.output.content, tabsStore.requestUrl)
					"
				class="unset max-w-max px-3 py-2 flex gap-2 items-center justify-center text-white bg-blue-500 hover:bg-blue-600 rounded-md"
				>
				<span class="items-center" :class="{'flex' : coppied === true, 'hidden' : coppied !== true}">Copied to clipboard</span>
				<svg
					class="w-5 h-5 fill-white"
					xmlns="http://www.w3.org/2000/svg"
					xml:space="preserve"
					style="enable-background: new 0 0 115.77 122.88"
					viewBox="0 0 115.77 122.88"
				>
					<path
						d="M89.62 13.96v7.73h12.2v.02c3.85.01 7.34 1.57 9.86 4.1 2.5 2.51 4.06 5.98 4.07 9.82h.02v73.3h-.02c-.01 3.84-1.57 7.33-4.1 9.86-2.51 2.5-5.98 4.06-9.82 4.07v.02H40.1v-.02c-3.84-.01-7.34-1.57-9.86-4.1-2.5-2.51-4.06-5.98-4.07-9.82h-.02V92.51h-12.2v-.02c-3.84-.01-7.34-1.57-9.86-4.1-2.5-2.51-4.06-5.98-4.07-9.82H0V13.95h.02c.01-3.85 1.58-7.34 4.1-9.86C6.63 1.59 10.1.03 13.94.02V0H75.67v.02c3.85.01 7.34 1.57 9.86 4.1 2.5 2.51 4.06 5.98 4.07 9.82h.02v.02zm-10.58 7.73v-7.75h.02c0-.91-.39-1.75-1.01-2.37-.61-.61-1.46-1-2.37-1v.02H13.95v-.02c-.91 0-1.75.39-2.37 1.01-.61.61-1 1.46-1 2.37h.02v64.62h-.02c0 .91.39 1.75 1.01 2.37.61.61 1.46 1 2.37 1v-.02h12.2V35.64h.02c.01-3.85 1.58-7.34 4.1-9.86 2.51-2.5 5.98-4.06 9.82-4.07v-.02H79.04zm26.14 87.23V35.63h.02c0-.91-.39-1.75-1.01-2.37-.61-.61-1.46-1-2.37-1v.02H40.09v-.02c-.91 0-1.75.39-2.37 1.01-.61.61-1 1.46-1 2.37h.02v73.3h-.02c0 .91.39 1.75 1.01 2.37.61.61 1.46 1 2.37 1v-.02H101.83v.02c.91 0 1.75-.39 2.37-1.01.61-.61 1-1.46 1-2.37h-.02v-.01z"
						style="fill-rule: evenodd; clip-rule: evenodd"
					/>
				</svg>
			</button>
			<nuxt-link
				class="py-2 rounded-lg unset w-max flex justify-center items-center gap-4 cursor-pointer bg-[#1da1f2] hover:bg-[#1da1f2]/90 no-underline px-4 h-[38px]"
				:to="tabsStore.tweetLink"
				target="_blank"
				title="Send the generated message directly as a Tweet"
			>
				<svg
					class="w-6 h-6 mr-[-6px] -ml-1"
					aria-hidden="true"
					focusable="false"
					data-prefix="fab"
					data-icon="twitter"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						fill="currentColor"
						d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
					></path>
				</svg>
			</nuxt-link>
			<nuxt-link
				v-if="false"
				class="py-2 rounded-lg unset w-max flex justify-center items-center gap-4 cursor-pointer bg-[#1da1f2] hover:bg-[#1da1f2]/90 no-underline px-4 h-[38px]"
				:to="tabsStore.linkedInLink"
				target="_blank"
				title="Send the generated message directly to LinkedIn"
			>
				<svg
					class="w-6 h-6 mr-[-6px] -ml-1"
					aria-hidden="true"
					focusable="false"
					data-prefix="fab"
					data-icon="twitter"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						fill="currentColor"
						d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
					></path>
				</svg>
			</nuxt-link>
		</div>
		<div class="relative">
			<textarea
				placeholder="Your generated message will be here..."
				name="outputContent"
				id="outputContent"
				cols="30"
				rows="8"
				class="rounded-lg w-full py-4 pb-12 min-h-[250px] leading-loose"
				v-model="tabsStore.output.content"
			>
	 {{ tabsStore.output.content }}</textarea
			>

			<div
				class="self-center text-sm px-4 py-2 absolute bottom-0 left-0 bg-white rounded-tr-lg rounded-bl-lg"
			>
				<strong>{{ tabsStore.output.content.length }}</strong> chars
			</div>
		</div>
		<footer class="flex justify-between flex-row gap-4">
			<button
				@click.prevent="tabsStore.showContentForm = true"
				class="unset max-w-min self-end button text-black bg-green-500 hover:bg-green-600 disabled:opacity-50"
			>
				Back
			</button>
			<button
				@click.prevent="reset()"
				class="unset max-w-min self-end button text-black bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
			>
				Reset
			</button>
		</footer>

		<div class="flex justify-end"></div>
	</div>
</template>

<script setup lang="ts">
import { generateLinkedInShareLink } from '~/lib/linkedin.service';
import { generateTweetLink } from '~/lib/twitter.service'
import { tabsStore } from '~/store/social-generator.store'

const coppied = ref(false)

function copySocial(text: string, url: string) {
	coppied.value = true
	navigator.clipboard.writeText(`${ text } ${ url }`)
	setTimeout(handler => {
		coppied.value = false
	}, 2000)
}

watch(
	() => tabsStore.output.content,
	() => {
		generateTweet()
		// generateLinkedin()
		console.log('generate tweet and linkedin message link watch')
	}
)

function generateTweet() {
	tabsStore.tweetLink = generateTweetLink(
		tabsStore.output.content,
		tabsStore.requestUrl
	)
}
function generateLinkedin() {
	tabsStore.linkedInLink = generateLinkedInShareLink(
		tabsStore.requestUrl,
		tabsStore?.urlContent?.title,
		tabsStore?.urlContent?.content,
		'GeneratorXYZ'
	)
}

function reset() {
	tabsStore.resetTabStore()
}

onMounted(() => {
	if (tabsStore.output.content) {
		generateTweet()
		// generateLinkedin()
		console.log('generate tweet mount')
	}
})
</script>
