<template>
	<div class="tabs-wrapper p-4">
		<div
			class="tabs-content p-6 rounded-lg bg-yellow-400 dark:bg-yellow-500 shadow-2xl z-[10] relative"
		>
			<div class="tab-item">
				<GeneratorsSeoTitleSuggestionsTabContent>
					<GeneratorsSeoTitleSuggestionsTabUrl
						:user="user"
					/>
				</GeneratorsSeoTitleSuggestionsTabContent>
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

const user = useSupabaseUser()
const client = useSupabaseClient()
const $creditLoader = ref('not-loaded')

const getUserCredits = async () => {
	if (!user?.value?.id) return
	$creditLoader.value = 'loading'
	const { data, error } = await creditsStore.getCredits(
		client,
		user?.value.id
	)
	if (error) {
		$creditLoader.value = 'done'
		console.log(error)
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
