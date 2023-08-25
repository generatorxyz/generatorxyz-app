<template>
	<div class="mx-auto">
		<div class="flex flex-col">
			<div class="flex flex-col">
				<div class="flex justify-center">
					
					<!-- <button
						type="submit"
						class="unset text-white font-medium rounded-lg text-base px-6 py-3.5 text-sm inline-flex items-center mr-2 mb-2 max-w-max bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 transition-all duration-300 ease-in-out hidden"
						@click="authenticate('twitter')"
					>
						Sigin with Twitter
						<svg
							class="w-6 h-6 ml-2 -ml-1"
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
					</button> -->
					<button
						data-umami-event="auth-google"
						type="submit"
						class="unset text-white font-medium rounded-lg text-base px-6 py-3.5 text-sm inline-flex items-center mr-2 mb-2 max-w-max bg-gradient-to-r from-red-500 to-red-600 hover:bg-gradient-to-r hover:from-red-700 hover:to-red-800 transition-all duration-300 ease-in-out"
						@click="authenticate('google')"
					>
						Sigin with Google
						<svg
							class="w-6 h-6 ml-2 -ml-1"
							aria-hidden="true"
							focusable="false"
							data-prefix="fab"
							data-icon="google"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 488 512"
						>
							<path
								fill="currentColor"
								d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
							></path>
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- <div>
			<p class="text-sm text-red-500 italic">Signing in with Twitter is not available because of issue at Twitter. <br /> If you have questions? Please <a href="mailto:info@generatorxyz.com">send an email</a>.</p>
		</div> -->

		<div class="loader pb-4 flex justify-center" v-if="loader$">
			<Loader />
		</div>
		<div class="dark:text-white mb-4" v-if="!loader$ && magicLinkSend$">
			Check your email for a magic link to login 🔐
		</div>
		<div class="text-red-600 mb-4" v-if="errorMessage">
			{{ errorMessage }}
		</div>
	</div>
</template>
<script lang="ts" setup>
const providers = ['google', 'twitter']
const { auth } = useSupabaseClient()
const email = ref('')
const password = ref('')
const client = useSupabaseClient()
const router = useRouter()
const magicLinkSend$ = ref(false)
const loader$ = ref(false)
const errorMessage = ref('')
const domain = ref('')

const authenticate = async (provider: 'google' | 'twitter') => {
	domain.value = `${window?.location?.origin}/onboarding/welcome`
	loader$.value = true

	const { data, error } = await auth.signInWithOAuth({
		provider,
		// options: {
		// 	redirectTo: domain.value,
		// },
	})
}
</script>

<style scoped></style>
