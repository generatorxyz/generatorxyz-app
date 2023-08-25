<template>
	<!-- <div class="grid grid-cols-3 mx-auto max-w-5xl"> -->
	<div class="grid grid-cols-1 lg:grid-cols-4 px-4 lg:mx-auto max-w-4xl gap-4 mb-16">
		<Head>
			<Title>{{ CONFIG?.sitename }} | {{ PAGE_META?.title }}</Title>
			<Link rel="canonical" :href="pageUrl" />
			<Meta
				hid="og:title"
				property="og:title"
				:content="PAGE_META?.title"
			/>
			<Meta
				name="description"
				:content="PAGE_META?.description ?? CONFIG?.sitedesc"
			/>
		</Head>
		<aside class="hidden lg:block lg:col-span-1 pt-8" v-if="true">
			<TheAccountMenu :showPricing="betaUser" />
		</aside>
		<div class="lg:col-span-3 dark:bg-gray-800 bg-gray-200 rounded-md p-8 mt-8">
			<!-- Create a signup form with username and password and submit button -->
			<FormProfile :profile="profile" />
		</div>
		<aside class="lg:hidden lg:col-span-1 pt-8 w-full" v-if="true">
			<TheAccountMenu :showPricing="betaUser" />
		</aside>
	</div>
</template>

<script setup lang="ts">
import { getProfile } from '@/lib/user.service'

const {
	public: { CONFIG },
} = useRuntimeConfig()
const { path } = useRoute()
const pageUrl = ref('')

pageUrl.value = `${CONFIG.domain}${path}`
useHead({
	htmlAttrs: {
		lang: 'en_EN',
	},
})
definePageMeta({
	middleware: ['auth'],
})
const PAGE_META = {
	title: 'Profile',
	description: 'Profile page',
}

const user = useSupabaseUser()
const router = useRouter()
const client = useSupabaseClient()
const betaUser = ref(false)
console.log('client: ', client)

const { data: profile, error: profileError } = await getProfile(
	client,
	user.value?.id ?? ''
)

if (profile) {
	betaUser.value = profile?.beta_user
}
if (profileError) {
	router.push('/auth')
}

// User profile

onMounted(() => {
	watchEffect(() => {
		if (!user.value) {
			router.push('/auth')
		}
	})
})
</script>
