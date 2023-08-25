<template>
	<Head>
			<Link rel="canonical" :href="pageUrl" />
			<Meta
				hid="og:title"
				property="og:title"
				:content="CONFIG?.sitename"
			/>
			<Meta
				name="description"
				:content="CONFIG?.sitedesc"
			/>
			<Meta
				hid="og:description"
				property="og:description"
				:content="CONFIG?.sitedesc"
			/>
			<Meta hid="og:type" property="og:type" content="website" />
			<Meta hid="og:url" property="og:url" :content="pageUrl" />
			<Meta hid="og:locale" property="og:locale" content="en_EN" />

			<Meta name="author" :content="CONFIG?.sitename" />
			<Meta name="publisher" :content="CONFIG?.sitename" />

			<Meta
				name="twitter:card"
				property="twitter:card"
				content="summary_large_image"
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
				:content="CONFIG?.sitedesc"
			/>
			<Script
				v-if="!dev"
				async
				defer
				src="https://analytics.umami.is/script.js"
				data-website-id="37eb8bc1-f543-4d95-aba1-f52b88986834"
			></Script>
		</Head>
	<div class="default-layout">
		<div class="page-wrapper">
			<ThePageWrapper>
				<slot />
			</ThePageWrapper>
			<TheFooter contentPage="false" />
		</div>
	</div>
</template>

<script setup>
const {
	public: { CONFIG },
	dev,
} = useRuntimeConfig()
const { path } = useRoute()
const pageUrl = ref('')

pageUrl.value = `${CONFIG.domain}${path}`

const head = {
	title: CONFIG.sitename,
	htmlAttrs: {
		lang: 'en_EN',
	},
	scripts: [
		
	],
}

if (!dev) {
	head.scripts.push({
		src: 'https://analytics.umami.is/script.js',
		'data-website-id': '37eb8bc1-f543-4d95-aba1-f52b88986834',
		async: true,
		defer: true,
	})
}

useHead(head)
</script>

<style scoped>
.inner-container {
	min-height: calc(100vh - 100px);
}
.page-wrapper {
	overflow-x: hidden;
    position: relative;
    min-height: 100vh;
}
</style>
