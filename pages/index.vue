<template>
	<NuxtLayout name="home-layout">

		<div class="mx-auto max-w-3xl text-center pt-16">
			<h1 class="text-5xl pb-2">
				GeneratorXYZ<br />
				AI Content Generator Platform for
				<TextGradient>Content Creators</TextGradient>
			</h1>

			<div class="px-4">
				<p class="text-2xl mx-auto mb-8 font-bold">
					<span
						class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
						>{{ countData?.count ?? '1000+' }}</span
					>
					users already save 75% (or more) of their time, <br />
					creating social media content like.
				</p>
			</div>
			<div class="mx-auto flex justify-center mb-8">
				<AuthForm />
			</div>
		</div>
		<div class="mx-auto max-w-5xl">
			<div class="mt-16">
				<div class="w-full ratio-16/9 relative">
					<div
						v-if="!playVideo"
						class="rounded-t-lg absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900/50"
					>
						<button
							@click="startVideo()"
							class="max-w-min unset mt-4 text-black bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg px-4 py-2 dark:focus:ring-green-800"
						>
							Play
						</button>
					</div>
					<img
						v-if="!playVideo"
						class="rounded-t-lg shadow-2xl"
						src="https://res.cloudinary.com/raymons/video/upload/f_webp,q_70/v1676561033/generator-xyz/onboarding/screen-demo-16-02-2023.webp"
						alt="Video screenshot"
					/>
					<video
						v-if="playVideo"
						class="w-full ratio-16/9 rounded-t-lg shadow-2xl"
						loading="lazy"
						controls
						autoplay="true"
						muted
					>
						<source
							src="https://res.cloudinary.com/raymons/video/upload/q_70,f_mp4/v1676561033/generator-xyz/onboarding/generator-xyz-screen-recording-no-audio.mov"
							type="video/mp4"
						/>
					</video>
				</div>
			</div>
		</div>

		<div class="mt-32">
			<GeneratorsOverviewNav />
		</div>

		<div class="py-20 relative">
			<div class="w-full bg-white dark:bg-gray-900 relative">
				<div class="max-w-2xl mx-auto text-center">
					<h2>Save Time with GeneratorXYZ</h2>
					<p>
						At GeneratorXYZ, we know it can take a long time to
						create social media posts and summaries. That's why we
						created all kinds of generators that can speed up your process!
					</p>

					<h2>SEO Title Tag & Meta Description Improver</h2>
					<p>Boost your SEO performance with our AI-powered Title Tag & Meta Description Improver. Optimize your website's tags and descriptions to improve search engine rankings, attract organic traffic, and enhance user engagement.</p>
					<nuxt-link class="button bg-green-500 hover:bg-green-600 text-black" to="/generators/seo-title-description-improver">Try out our newest generator!</nuxt-link>

					<h2>Social Media Content Generator:</h2>
					<p>
						With GeneratorXYZ, making cool social media posts is
						super easy! You can use it to make posts for Facebook,
						Instagram, Twitter, and more! It's like having a magic
						wand that makes amazing posts with just a few clicks.
					</p>
					<nuxt-link class="text-white underline hover:no-underline" to="/generators/social-media">Try out social media content generator!</nuxt-link>
					<h2>Summary Generator:</h2>
					<p>
						If you need to read a long article or book and make a
						short summary, GeneratorXYZ can help with that too! It's
						like having a special helper who can understand big
						words and make them into easy-to-understand summaries.
					</p>
					<nuxt-link class="text-white underline hover:no-underline" to="/generators/summarize">Try out summary generator!</nuxt-link>
					<h2>Join Our Community</h2>
					<p>
						Join our group of friends who are using GeneratorXYZ to
						help them make great content! Over {{ countData?.count ?? '700+' }} people are
						already using GeneratorXYZ and they love it! Try it
						today and see how it can help you too!
					</p>
				</div>
			</div>
		</div>

		<div class="my-24">
			<div class="mx-auto max-w-2xl pt-8 pb-16 text-center">
				<h2 class="text-4xl">Supported platforms</h2>
				<p class="mb-8">
					You can generate messages for all the platforms below.
				</p>
				<div
					class="px-8 md:px-0 md:grid md:grid-cols-5 flex flex-wrap md:flex-nowrap justify-items-center items-center gap-8 md:gap-2 pt-8 pb-16 mx-auto max-w-lg"
				>
					<div class="flex mx-auto justify-center">
						<BrandsFacebook />
					</div>
					<div class="flex mx-auto justify-center">
						<BrandsInstagram />
					</div>
					<div class="flex mx-auto justify-center">
						<BrandsTwitter />
					</div>
					<div class="flex mx-auto justify-center">
						<BrandsLinkedIn />
					</div>
					<div class="flex mx-auto justify-center">
						<BrandsWordPress />
					</div>
				</div>
				<p class="text-sm">
					Want to see your favorite platform? <br />
					Request it
					<a href="mailto:info@generatorxyz.com"
						>by sending an email</a
					>
				</p>
			</div>
		</div>

		<div class="text-center py-12 md:grid md:grid-cols-2">
			<div class="p-12">
				<h2 class="dark:text-white text-gray-900 mt-0">
					Subscribe for updates ✉️
				</h2>
				<p class="text-base dark:text-white text-gray-900 mt-4 mb-8">
					We help you generate social messages in seconds! <br />
					Get all the latest updates, tips & tricks in your email.
				</p>
				<a
					class="button unset bg-green-500 hover:bg-green-600 py-3 px-4 text-black"
					href="https://generatorxyz.substack.com/"
					target="_blank"
					>Subscribe to our newsletter.</a
				>
			</div>
			<div class="flex justify-center flex-col items-center pb-12">
				<h2 class="text-gray-900 dark:text-white">
					Vote on Producthunt 🚀
				</h2>
				<p class="text-sm text-gray-900 dark:text-white">
					Your feedback is so important to us 🙏
				</p>
				<a
					href="https://www.producthunt.com/posts/generatorxyz-com?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-generatorxyz&#0045;com"
					target="_blank"
					><img
						src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=375861&theme=dark"
						alt="GeneratorXYZ&#0046;com - AI&#0032;Generator&#0032;platfom&#0032;for&#0032;bloggers&#0032;and&#0032;marketeers | Product Hunt"
						style="width: 250px; height: 54px"
						width="250"
						height="54"
						loading="lazy"
				/></a>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup>
const playVideo = ref(false)
const {
	public: { API },
} = useRuntimeConfig()
definePageMeta({
	layout: false,
})

function startVideo() {
	playVideo.value = true
}
const {
	data: countData,
	pending,
	error,
	refresh,
} = await useAsyncData('count', () => $fetch(`${API}/users/count`))
</script>
<style>
.home-heading {
	line-height: 3.5rem;
}
</style>
