<template>
	<NuxtLayout>
		<OnboardingHeader />
		<div
			class="mx-auto max-w-2xl text-center flex justify-center items-center p-8"
		>
		<div class="bg-white dark:bg-gray-800 p-8 rounded-2xl w-full">
				<h1>
					<TextGradient class="text-5xl uppercase"
						>Welcome</TextGradient
					> 🎉
				</h1>
				<p class="text-lg">
					Thanks for using our generator platform. <br />We are happy
					to have you here!
				</p>

				<p class="text-lg">
					Before you can generate compeling messages, we
					want you to complete a few steps and show you how to use
					our generator.
				</p>
				<div class="mt-8">
					<button
						type="button"
                        @click="next()"
						class=" unset mt-4 text-white text-base bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg px-4 py-2 dark:focus:ring-green-800"
					>
						Next: Profile
					</button>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { didUserOnboard, resetUserOnboarding } from '@/lib/user.service';
const supabase = useSupabaseAuthClient()
const user = useSupabaseUser()
const router = useRouter()
const route = useRoute()

definePageMeta({
	layout: false,
	// middleware: ['onboarding']
})

function next() {
    router.push('/onboarding/profile')
}

onMounted(async () => {
		if (user.value) {
			const check = await didUserOnboard(supabase, user.value?.id)
			if (route?.query?.reset) {
				await resetUserOnboarding(supabase, user.value?.id)
			} else if(check) {
				router.push('/generators')
			}
		}
})
</script>
