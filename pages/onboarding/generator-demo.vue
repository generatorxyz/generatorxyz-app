<template>
	<NuxtLayout>
		<OnboardingHeader />
		<div
			class="mx-auto max-w-6xl text-center flex justify-center items-center p-8"
		>
			<div class="bg-white dark:bg-gray-800 p-8 rounded-2xl w-full">
				<h1>
					<TextGradient class="text-5xl uppercase"
						>Generate message</TextGradient
					>
				</h1>
				<p class="text-lg mb-8">
					Now that you have completed your profile, <br />you can
					start generating messages. Let's do one together.
				</p>

				<!-- <SocialWizardTabs /> -->

				<div class="w-full ratio-16/9 relative">
					<div
						v-if="!playVideo"
						class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900/50"
					>
						<button
							@click="startVideo()"
							class="max-w-min unset mt-4 text-base text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg px-4 py-2 dark:focus:ring-green-800 shadow"
						>
							Play
						</button>
					</div>
					<img
						v-if="!playVideo"
						src="https://res.cloudinary.com/raymons/video/upload/f_webp,q_70/v1676561033/generator-xyz/onboarding/screen-demo-16-02-2023.webp"
						alt="Video screenshot"
					/>
					<video
						v-if="playVideo"
						class="w-full ratio-16/9"
						loading="lazy"
						controls
						autoplay="true"
						muted
					>
						<source
							src="https://res.cloudinary.com/raymons/video/upload/q_70,f_mp4/v1676561033/generator-xyz/onboarding/generator-xyz-screen-recording-no-audio.mov"
							type="video/mp4"
						/>
					</video>
				</div>

				<p>We are giving you free credits to get you started 🎉</p>
				<div class="mb-8 flex justify-center gap-4">

					<div>
						<button
							type="button"
							@click="prev()"
							class="unset mt-4 text-white text-base bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-lg px-4 py-2 dark:focus:ring-orange-800"
						>
							Prev
						</button>
					</div>
					<div>
						<button
							v-if="playVideo"
							type="button"
							@click="next()"
							class="unset mt-4 text-white text-base bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg px-4 py-2 dark:focus:ring-green-800"
						>
							Finish: Generate messages 🎉
						</button>
					</div>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { createCredits, userDidOnboarding } from '@/lib/user.service';

const user = useSupabaseUser()
const client = useSupabaseClient()
const router = useRouter()
const playVideo = ref(false)

definePageMeta({
	layout: false,
})

function startVideo() {
	playVideo.value = true
}
async function next() {
    const { data, error } = await userDidOnboarding(client, user.value?.id ?? '')
    if(error) {
        console.error(error)
        return
	} else {
		await createCredits(client, user.value?.id ?? '')

        router.push('/generators')
    }
}
function prev() {
	router.push('/onboarding/profile')
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
