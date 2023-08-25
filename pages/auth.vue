<template>
	<NuxtLayout name="content-layout">
		<Head>
			<Link rel="canonical" :href="pageUrl" />
			<Meta
				hid="og:title"
				property="og:title"
				:content="CONFIG?.sitename"
			/>
			<Meta
				name="description"
				:content="PAGE_META?.description ?? CONFIG?.sitedesc"
			/>
			<Meta
				hid="og:description"
				property="og:description"
				:content="PAGE_META?.description ?? CONFIG?.sitedesc"
			/>
			<Meta hid="og:type" property="og:type" content="website" />
			<Meta hid="og:url" property="og:url" :content="pageUrl" />
			<Meta hid="og:locale" property="og:locale" content="en_EN" />

			<Meta name="author" :content="CONFIG?.sitename" />
			<Meta name="publisher" :content="CONFIG?.sitename" />

			<Meta
				name="twitter:card"
				property="twitter:card"
				content="summary"
			/>
			<Meta
				name="twitter:site"
				property="twitter:site"
				:content="CONFIG?.twitter"
			/>
			<Meta
				name="twitter:creator"
				property="twitter:creator"
				:content="CONFIG?.twitter"
			/>
			<Meta
				name="twitter:title"
				property="twitter:title"
				:content="CONFIG?.sitename"
			/>
			<Meta
				hid="twitter:image"
				property="twitter:image"
				:content="CONFIG?.logoUrl"
			/>
			<Meta
				hid="og:image"
				property="og:image"
				:content="CONFIG?.logoUrl"
			/>
			<Meta
				hid="twitter:description"
				property="twitter:description"
				:content="PAGE_META?.description ?? CONFIG?.sitedesc"
			/>
		</Head>
		<div class="text-center pt-32">
			<h1 class="mb-8">Login or signup</h1>
			<div class="mx-auto max-w-lg">
				<p class="text-md">
					We want to make it as easy as possible to use our service,
					so login with Google or Twitter.
				</p>
			</div>
			<div class="mx-auto flex justify-center mb-32">
				<AuthForm type="login" />
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import AuthForm from '@/components/auth/auth-form/AuthForm.vue'
const {
	public: { CONFIG },
} = useRuntimeConfig()
const { path } = useRoute()
const user = useSupabaseUser()
const router = useRouter()
const pageUrl = ref('')
definePageMeta({
	layout: false,
})
pageUrl.value = `${CONFIG.domain}${path}`
useHead({
	htmlAttrs: {
		lang: 'en_EN',
	},
})
const PAGE_META = {
	title: 'Login',
	description:
		'Login to generate social media messages in seconds 🚀 with our powerful generators!',
}

onMounted(() => {
	watchEffect(() => {
		if (user.value) {
			router.push('/generators/social-media')
		}
	})
})

</script>
