<template>
		<div class="grid md:grid-cols-3 mx-auto max-w-3xl pt-8 gap-4">
			<section>
				<strong class="text-base text-white uppercase">Guides</strong>
				<ul class="text-white list-none">
					<li class="text-base mb-2">
						<nuxt-link
							class="text-base py-1 text-white"
							to="/guides/how-to-generate-twitter-messages"
							>How to generate tweets</nuxt-link
						>
					</li>
					<li class="text-base mb-2">
						<nuxt-link
							class="text-base py-1 text-white"
							to="/guides/how-to-generate-linkedin-messages"
							>How to generate LinkedIn messages</nuxt-link
						>
					</li>
				</ul>
			</section>
			<section class="md:text-center">
				<strong class="text-base text-white uppercase">Account</strong>
				<ul class="text-white list-none">
					<li class="text-base mb-2">
						<nuxt-link
							class="text-base py-1 text-white"
							to="/profile"
							>Profile</nuxt-link
						>
					</li>
					<li class="text-base mb-2">
						<nuxt-link
							class="text-base py-1 text-white"
							to="/user/messages"
							>Your messages</nuxt-link
						>
					</li>
					<!-- <li class="text-base mb-2" v-if="isLoggedIn">
						<nuxt-link class="text-base py-1 text-white" to="/subscription"
							>Pricing</nuxt-link
						>
					</li> -->
				</ul>
			</section>
			<section class="md:text-right">
				<strong class="text-base text-white uppercase">Generators</strong>
				<ul class="text-white list-none">
					<li class="text-base mb-2">
						<nuxt-link
							class="text-base py-1 text-white"
							to="/generators/seo-title-description-improver"
							>SEO: Title & Description improver</nuxt-link
						>
					</li>
					<li class="text-base mb-2">
						<nuxt-link
							class="text-base py-1 text-white"
							to="/generators/social-media"
							>Social generator</nuxt-link
						>
					</li>
					<li class="text-base mb-2">
						<nuxt-link
							class="text-base py-1 text-white"
							to="/generators/summarize"
							>Summary generator</nuxt-link
						>
					</li>
				</ul>
			</section>
		</div>
		<hr class="my-8 mx-auto max-w-3xl">
		<div class="pb-8">
			<section
				class="text-sm text-center px-4 py-2 text-gray-900 text-white"
			>
				Build by <a href="https://byrayray.dev">DevByRayRay</a>
			</section>
		</div>
</template>

<script setup lang="ts">
const isLoggedIn = ref(false)
const user = useSupabaseUser()

onMounted(() => {
	watchEffect(async () => {
		if (!user.value) {
			isLoggedIn.value = false
		} else {
			isLoggedIn.value = true
		}
	})
})
</script>
