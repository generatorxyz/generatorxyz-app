<template>
	<div class="generator-layout">
		<Head>
			<Script
				v-if="!dev"
				async
				defer
				src="https://analytics.umami.is/script.js"
				data-website-id="37eb8bc1-f543-4d95-aba1-f52b88986834"
			></Script>
		</Head>
		<div class="page-wrapper">
			<ThePageWrapper>
				<GeneratorsOverviewNav />
				<slot />
			</ThePageWrapper>
		</div>
		<TheFooter />
	</div>
</template>

<script setup lang="ts">

const {
	public: { CONFIG },
	dev,
} = useRuntimeConfig()
const { path } = useRoute()
const pageUrl = ref('')

pageUrl.value = `${CONFIG.domain}${path}`
useHead({
	title: `Content generators - ${CONFIG.sitename}`,
	htmlAttrs: {
		lang: 'en_EN',
	},
})
</script>

<style scoped>

.page-wrapper {
	position: relative;
	min-height: 80vh;
}
</style>
