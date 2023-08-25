<template>
	<div class="generator-layout">
		<Head>
			<Script v-if="!dev"
				async
				defer
				src="https://analytics.umami.is/script.js"
				data-website-id="37eb8bc1-f543-4d95-aba1-f52b88986834"
			></Script>
		</Head>
		<div class="page-wrapper">
			<ThePageWrapper>
				<slot />
			</ThePageWrapper>
			<div class="mx-auto max-w-2xl pb-48">
				
			</div>
			<GeneratorsOverviewNav />
		</div>
        <TheFooter />
	</div>
</template>

<script setup>
const {
	public: { CONFIG }, dev,
} = useRuntimeConfig()
const { path } = useRoute()
const pageUrl = ref('')

pageUrl.value = `${CONFIG.domain}${path}`
const head = {
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
.content-layout {
}

.page-wrapper {
    position: relative;
    min-height: 80vh;
}
</style>
