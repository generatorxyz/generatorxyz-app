<template>
	<div class="content-layout">
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
			<TheFooter />
		</div>
	</div>
</template>

<script setup>
const {
	public: { CONFIG }, dev,
} = useRuntimeConfig()
const { path } = useRoute()
const pageUrl = ref('')

pageUrl.value = `${CONFIG.domain}${path}`
useHead({
	htmlAttrs: {
		lang: 'en_EN',
	},
})
</script>

<style scoped>
.content-layout {
	min-height: 100vh;
}

.page-wrapper {
	position: relative;
	min-height: 100vh;
}
</style>
