export const CONFIG = {
	sitename: 'Generator XYZ',
	siteTitle: 'The AI Generator platfom for content creators and marketeers',
	sitedesc:
		'Get ready to supercharge your content marketing efforts with our AI-powered content generator. Create engaging social media content in seconds and reach more people. Try it now and see the difference we can make for you!',
	appcolor: '#4f00ec',
	twitter: '@generator_xyz',
	logoUrl:
		'https://res.cloudinary.com/raymons/image/upload/q_100,f_auto,w_200/v1672499457/generator-xyz/generator-xyz-logo.png',
	domain: 'https://www.generatorxyz.com',
	screenshot:
		'https://res.cloudinary.com/raymons/video/upload/f_auto/v1676561033/generator-xyz/onboarding/screen-demo-16-02-2023.webp',
	email: 'info@generatorxyz.com',
}

export const HEAD = {
	htmlAttrs: {
		lang: 'en',
	},
	title: CONFIG?.siteTitle,
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{
			hid: 'description',
			name: 'description',
			content: CONFIG?.sitedesc,
		},
		// SOCIAL
		{
			hid: 'og:title',
			property: 'og:title',
			content: CONFIG?.sitename,
		},
		{
			hid: 'og:description',
			property: 'og:description',
			content: CONFIG?.sitedesc,
		},
		{
			hid: 'og:type',
			property: 'og:type',
			content: 'website',
		},
		{
			hid: 'og:image',
			property: 'og:image',
			content: CONFIG?.logoUrl,
		},
		{
			hid: 'og:url',
			property: 'og:url',
			content: CONFIG?.domain,
		},
		{
			property: 'og:locale',
			content: 'en_EN',
		},
		// Twitter
		{
			hid: 'twitter:card',
			property: 'twitter:card',
			content: 'summary',
		},
		{
			hid: 'twitter:title',
			property: 'twitter:title',
			content: CONFIG?.sitename,
		},
		{
			hid: 'twitter:creator',
			property: 'twitter:creator',
			content: CONFIG?.twitter,
		},
		{
			hid: 'twitter:image',
			property: 'twitter:image',
			content: CONFIG?.logoUrl,
		},
		{
			hid: 'twitter:description',
			property: 'twitter:description',
			content: CONFIG?.sitedesc,
		},
		// Other
		{
			name: 'apple-mobile-web-app-title',
			content: CONFIG?.sitename,
		},
		{
			name: 'application-name',
			content: CONFIG?.sitename,
		},
		{
			name: 'msapplication-TileColor',
			content: CONFIG?.appcolor,
		},
		{
			name: 'theme-color',
			content: CONFIG?.appcolor,
		},
	],
	link: [
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			href: '/favicon-16x16.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			href: '/favicon-32x32.png',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			href: '/apple-touch-icon.png',
		},
		{
			rel: 'mask-icon',
			href: '/safari-pinned-tab.svg',
			color: '#b91d47',
		},
		{
			rel: 'manifest',
			href: '/site.webmanifest',
		},
		{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		{ rel: 'preconnect', href: '//analytics.umami.is', as: 'script' },
	],
	link: [],
	// please note that this is an area that is likely to change
	style: [],
	noscript: [],
}

export default {
	runtimeConfig: {
		dev: process.env.NODE_ENV !== 'production',
		api: process.env.API_URL,
		public: {
			API: process.env.API_URL,
			REST: `${process.env.API_URL}/rest/v1`,
			CONFIG,
			HEAD,
			LOCAL: process.env.NODE_ENV !== 'production' || process?.env?.LOCAL,
		},
	},

	// Target: https://go.nuxtjs.dev/config-target
	// target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: HEAD,

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['~/assets/css/main.css'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	// plugins: ['@/plugins/vue-confetti.client.js'],

	// Auto import components: https://go.nuxtjs.dev/config-components

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
		// https://go.nuxtjs.dev/stylelint
		'@nuxtjs/stylelint-module',
		// https://go.nuxtjs.dev/tailwindcss
		'@nuxtjs/tailwindcss',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/content
		'@nuxt/content',
		'@nuxtjs/supabase',
	],

	supabase: {
		// Options
		url: process.env.SUPABASE_URL,
		key: process.env.SUPABASE_KEY,
	},

	postcss: {
		plugins: {
			autoprefixer: {},
			tailwindcss: {},
		},
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: 'en',
		},
	},

	// Content module configuration: https://go.nuxtjs.dev/config-content
	content: {},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		transpile: ['trpc-nuxt'],
		rollupOptions: {
			external: ['@vueuse/core']
		},
	},

	nitro: {
		preset: 'vercel',
		prerender: {
			routes: ['/sitemap.xml'],
		},
	},

	routeRules: {
		'/api/*': {
			cors: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		},
		'/': {
			static: true,
		},
		'/social-generator': {
			static: false,
		},
		'/profile': {
			static: false,
		},
		'/_nuxt/**': { headers: { 'cache-control': 's-maxage=0' } },
		'/social-generator': { redirect: '/generators/social-media' },
	},

	// With vite
	vite: {
		server: {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		},
	},

	devtools: {
		enabled: true,
	},
}
