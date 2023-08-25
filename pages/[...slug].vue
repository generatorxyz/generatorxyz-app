<template>
	<NuxtLayout name="content-layout">
		<Head>
			<Link rel="canonical" :href="pageUrl" />
			<Meta
				hid="og:title"
				property="og:title"
				:content="content?.title"
			/>
			<Meta
				name="description"
				:content="content?.description ?? CONFIG?.sitedesc"
			/>
			<Meta
				hid="og:description"
				property="og:description"
				:content="content?.description ?? CONFIG?.sitedesc"
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
				:content="CONFIG?.screenshot"
			/>
			<Meta
				hid="og:image"
				property="og:image"
				:content="CONFIG?.screenshot"
			/>
			<Meta
				hid="twitter:description"
				property="twitter:description"
				:content="content?.description ?? CONFIG?.sitedesc"
			/>
		</Head>
		<div class="mx-auto max-w-3xl px-8 py-8 mt-16">
			<div class="content">
                <h1 class="">{{ content?.title }}</h1>
				<ContentDoc>
					<template #not-found>
                        <div class="text-center max-w-lg mx-auto">

                            <h1>Sorry the content could not be found 🙈</h1>
                            <p>
                                <nuxt-link to="/">Go to homepage</nuxt-link> 😉 
                            </p>
                        </div>
					</template>
				</ContentDoc>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup>
const {
	public: { CONFIG },
} = useRuntimeConfig()
useHead({
	htmlAttrs: {
		lang: 'en_EN',
	},
})
const { path } = useRoute()
const pageUrl = ref('')
pageUrl.value = `${CONFIG.domain}${path}`
const { data: content } = await useAsyncData(`content-${path}`, () => {
	return queryContent().where({ _path: path }).findOne()
})
definePageMeta({
	layout: false,
})
</script>
<style>
.home-heading {
	line-height: 3.5rem;
}

iframe {
    max-width: 100%;
    width: 100%;
    margin-bottom: 1rem;
}
</style>
