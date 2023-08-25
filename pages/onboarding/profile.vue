<template>
	<NuxtLayout>
		<OnboardingHeader />
		<div
			class="mx-auto max-w-2xl text-center flex justify-center items-center p-8"
		>
			<div class="bg-white dark:bg-gray-800 p-8 rounded-2xl w-full">
				<h1 class="mb-4">
					<TextGradient class="text-5xl uppercase"
						>Profile</TextGradient
					>
				</h1>

				<div>
					<p class="text-lg mb-8">
						Fill in all the fields below to complete your profile.
					</p>
				</div>

				<FormProfile
					:showTitle="false"
					:profile="profile"
					:showSaveButton="!profileComplete"
				/>

				<div
					v-if="profileComplete"
					class="text-base pt-8 text-green-500"
				>
					Your profile is complete! Click next to continue.
				</div>

				<div class="flex justify-center gap-4">
					<div>
						<button
						type="button"
						@click="prev()"
						class="unset mt-4 text-white text-base bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-lg px-4 py-2 dark:focus:ring-orange-800"
					>
						Prev
					</button>
					</div>
					<div v-if="profileComplete">
						<button
						type="button"
						@click="next()"
						class="unset mt-4 text-white text-base bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg px-4 py-2 dark:focus:ring-green-800"
					>
						Next: How to generate a message
					</button>
					</div>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { getProfile, didUserOnboard } from '@/lib/user.service'

const user = useSupabaseUser()
const client = useSupabaseAuthClient()
const router = useRouter()
const profileComplete = ref(false)

definePageMeta({
	layout: false,
})
console.log('userId: ', user.value?.id)
console.log('client: ', client)
const { data: profile, error: profileError } = await getProfile(
	client,
	user.value?.id ?? ''
)

if (profileError) {
	router.push('/auth')
}

if (
	profile?.country !== null &&
	profile?.full_name !== null &&
	profile?.username !== null &&
	profile?.avatar_url !== null
) {
	profileComplete.value = true
}

function next() {
	router.push('/onboarding/generator-demo')
}
function prev() {
	router.push('/onboarding/welcome')
}
onMounted(async () => {
		if (user.value) {
			const check = await didUserOnboard(client, user.value?.id)
			if (check) {
				router.push('/generators/social-media')
			}
		}
})
</script>
