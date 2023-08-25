<template>
	<NuxtLayout name="content-layout">
		<Head>
			<Title>{{ CONFIG?.sitename }} - {{ content?.title }}</Title>

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
			<div class="content dark:bg-gray-700 bg-gray-200 py-4 px-8 rounded-2xl">
				<h1 class="">{{ content?.title }}</h1>
                <p>{{ content?.description }}</p>
                <ul>

                    <li
                        class=""
                        v-for="guide in guides"
                    >
                        <strong
                            ><nuxt-link
                                class="dark:text-white"
                                :to="`${guide._path}`"
                                >{{ guide.title }}</nuxt-link
                            ></strong
                        >
                        <!-- <p class="text-base">{{ guide?.description.substring(0, 200) }}</p> -->
                    </li>
                </ul>
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
const content = {
    title: 'Guides',
    description: 'Want to learn how to use our content generator? Check the guides for your needs.',
}
pageUrl.value = `${CONFIG.domain}${path}`
const { data: guides } = await useAsyncData('guides', () =>
	queryContent('guides').limit(12).sort({ date: -1 }).find()
)

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
