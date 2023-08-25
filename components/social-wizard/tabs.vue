<template>
	<div class="tabs-wrapper p-4">
		<ul class="tabs flex justify-center mb-[-16px] gap-2 relative mb-0">
			<li
				v-for="tab in store.tabs"
				class="px-4 pt-1 pb-4 rounded-l-lg rounded-r-lg cursor-pointer relative text-gray-900"
				:class="{
					'z-[9] bg-yellow-500 dark:bg-yellow-600':
						store.currentTab !== tab.key,
					'z-[11] bg-yellow-400 dark:bg-yellow-500':
						store.currentTab === tab.key,
				}"
				v-on:click="store.changeTab(tab.key)"
			>
				<span class="text-base">{{ tab.label }}</span>
			</li>
		</ul>

		<div
			class="tabs-content p-6 rounded-lg bg-yellow-400 dark:bg-yellow-500 shadow-2xl z-[10] relative"
		>
			<div class="tab-item" v-if="store.currentTab === 'url'">
				<SocialWizardTabContent>
					<SocialWizardTabUrl :user="user" />
				</SocialWizardTabContent>
			</div>
			<div class="tab-item" v-if="store.currentTab === 'content'">
				<SocialWizardTabContent>
					<SocialWizardTabWithContent :user="user" />
				</SocialWizardTabContent>
			</div>
		</div>
		<div
			v-if="$creditLoader === 'not-loaded' || $creditLoader === 'loading'"
			class="mt-4 flex justify-center"
		>
			<Loader />
		</div>
		<div v-if="$creditLoader === 'done'">
			<footer
				class="text-base mt-4 text-center bg-red-500 p-4"
				v-if="creditsStore.credits === undefined"
			>
				<p class="text-base">
					I'm sorry, you don't have any credits. Probably you haven't
					went completed the onboarding process. Please go through the
					<nuxt-link
						to="/onboarding/welcome?reset=true"
						class="underline"
						>onboarding</nuxt-link
					>
					and complete it. After that we will give you free credits.
				</p>
				<p class="text-base">
					If this solution didn't resolve the issue, please contact us
					at
					<a
						:href="`mailto:info@generatorxyz.com?subject=UserID:${user?.id} did not got any credits.`"
						class="underline"
						>info@generatorxyz.com</a
					>
				</p>
			</footer>
		</div>
	</div>
</template>

<script setup lang="ts">
import { store as creditsStore } from '@/store/credits.store'
import { tabsStore } from '~/store/social-generator.store'

const user = useSupabaseUser()
const client = useSupabaseClient()
const store = tabsStore

const $creditLoader = ref('not-loaded')

const getUserCredits = async () => {
	if (!user?.value?.id) return
	$creditLoader.value = 'loading'
	const { data, error } = await creditsStore.getCredits(
		client,
		user?.value.id
	)
	if (error) {
		console.log(error)
		$creditLoader.value = 'done'
		return
	}
	$creditLoader.value = 'done'
}

onMounted(() => {
	if (user.value) {
		console.log(user.value)
		getUserCredits()
	}
})
</script>
