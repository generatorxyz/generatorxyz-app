<template>
	<div>
		<div class="bg-primary-color z-[15] relative">
			<header
				class="mx-auto max-w-7xl text-white flex lg:py-4 p-4 flex gap-4 items-center lg:justify-between lg:flex-row flex-col lg:h-[80px]"
			>
				<div
					class="w-full logo flex items-center justify-between gap-4 mb-4 lg:mb-0"
				>
					<nuxt-link to="/">
						<img
							src="https://res.cloudinary.com/raymons/image/upload/q_100,f_auto,w_200/v1672499457/generator-xyz/generator-xyz-logo.png"
						/>
					</nuxt-link>

					<button
						class="unset flex lg:hidden rounded-l-lg"
						@click="toggleMenu()"
						aria-label="Toggle menu"
					>
						<icons-menu class="w-8" />
					</button>
				</div>
				<div class="menu hidden lg:block">
					<ul
						class="flex justify-center items-center align-center gap-4 md:gap-8 mb-0 flex-row flex-nowrap"
					>
						<li>
							<nuxt-link class="text-base" to="/generators"
								>Generators</nuxt-link
							>
						</li>

						<li>
							<nuxt-link class="text-base" to="/guides"
								>Guides</nuxt-link
							>
						</li>
						<li v-if="isLoggedIn">
							<nuxt-link class="text-base" to="/user/messages"
								>Messages</nuxt-link
							>
						</li>
						<li v-if="isLoggedIn">
							<nuxt-link class="text-base" to="/pricing"
								>Pricing</nuxt-link
							>
						</li>
						<li v-if="!isLoggedIn">
							<nuxt-link
								class="text-base mt-0 bg-green-500 hover:bg-green-600 button py-3 text-black"
								to="/auth"
								>Login</nuxt-link
							>
						</li>
						<li v-if="isLoggedIn">
							<button
								v-on:click="logout()"
								class="unset text-base bg-secondary-color hover:bg-secondary-color-hover py-3 px-3 rounded-lg"
							>
								Logout
							</button>
						</li>
						<li v-if="isLoggedIn" class="lg:block hidden">
							<nuxt-link
								class="text-bas relative block ml-5"
								to="/profile"
							>
								<div
									class="relative w-10 h-10 overflow-hidden bg-yellow-100 rounded-full dark:bg-yellow-600 ring-2 ring-yellow-500"
								>
									<svg
										v-if="!profile?.avatar_url"
										class="absolute w-12 h-12 text-gray-400 -left-1"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
											clip-rule="evenodd"
										></path>
									</svg>
									<img
										v-if="profile?.avatar_url"
										class="absolute w-10 h-10 object-cover rounded-full"
										:src="profile?.avatar_url"
									/>
								</div>
								<HeaderBadge :credits="store.credits" />
							</nuxt-link>
						</li>
					</ul>
				</div>
				<div
					class="w-full menu lg:hidden"
					:class="{ hidden: isMenuShown }"
				>
					<ul
						class="w-full flex justify-center items-center align-center gap-4 md:gap-8 mb-0 flex-row flex-wrap"
					>
						<li v-if="isLoggedIn">
							<nuxt-link class="text-base" to="/generators"
								>Generators</nuxt-link
							>
						</li>

						<li>
							<nuxt-link class="text-base" to="/guides"
								>Guides</nuxt-link
							>
						</li>
						<li v-if="isLoggedIn">
							<nuxt-link class="text-base" to="/user/messages"
								>Messages</nuxt-link
							>
						</li>
						<li v-if="isLoggedIn">
							<nuxt-link class="text-base" to="/pricing"
								>Pricing</nuxt-link
							>
						</li>
						<li v-if="!isLoggedIn">
							<nuxt-link
								class="text-base mt-0 bg-green-500 hover:bg-green-600 button py-3 text-black"
								to="/auth"
								>Login</nuxt-link
							>
						</li>
						<li v-if="isLoggedIn">
							<button
								v-on:click="logout()"
								class="unset text-base bg-secondary-color hover:bg-secondary-color-hover py-3 px-3 rounded-lg"
							>
								Logout
							</button>
						</li>
						<li v-if="isLoggedIn" class="">
							<nuxt-link class="text-base relative" to="/profile"
								><div
									class="relative w-10 h-10 overflow-hidden bg-yellow-100 rounded-full dark:bg-yellow-600 ring-2 ring-yellow-500"
								>
									<svg
										v-if="!profile?.avatar_url"
										class="absolute w-12 h-12 text-gray-400 -left-1"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
											clip-rule="evenodd"
										></path>
									</svg>
									<img
										v-if="profile?.avatar_url"
										class="absolute w-10 h-10 object-cover rounded-full"
										:src="profile?.avatar_url"
									/>
								</div>
								<HeaderBadge :credits="store.credits" />
							</nuxt-link>
						</li>
					</ul>
				</div>
			</header>
		</div>
	</div>
</template>

<script setup lang="ts">
import { didUserOnboard, getProfile } from '@/lib/user.service'
import { store } from '@/store/credits.store'

const supabase = useSupabaseAuthClient()
const client = useSupabaseClient()
const user = useSupabaseUser()
const isLoggedIn = ref(false)
const router = useRouter()
const profile = ref(null)
const productsDropdown = ref(false)
const showGuidesDropdown = ref(false)
const isMenuShown = ref(false)

const logout = async () => {
	supabase.auth
		.signOut()
		.then((data) => {
			isLoggedIn.value = false
			router.push('/')
		})
		.catch((error) => {
			console.log(error)
		})
}

function toggleMenu() {
	isMenuShown.value = !isMenuShown.value
}

supabase.auth.onAuthStateChange((event, session) => {
	console.log(event)
})

onMounted(async () => {
	if (!user.value) {
		isLoggedIn.value = false
	} else {
		await getProfile(client, user.value?.id ?? '')
			.then((data) => {
				if (!data) return
				profile.value = data?.data
			})
			.catch((error) => console.log(error))

		await store.getCredits(client, user.value?.id ?? '')

		const data = await didUserOnboard(client, user.value?.id ?? '')
		if (!data) {
			router.push('/onboarding/welcome')
		}

		isLoggedIn.value = true
	}
})
</script>

<style>
.nav-sub-text {
	cursor: pointer;
}
.nav-with-sub:hover .nav-sub {
	display: block;
}
.nav-with-sub:hover .nav-sub-text {
	background-color: #3b82f6;
}
</style>
