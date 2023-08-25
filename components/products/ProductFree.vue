<template>
	<div class="product">
		<div
			class="bg-yellow-500 w-full lg:max-2xl max-w-lg mx-auto h-full rounded px-12 pb-12 pt-8 text-white"
		>
			<header class="text-center">
				<h2 class="text-3xl uppercase">Free</h2>
				<div class="price">
					<span class="currency text-3xl">€</span>
					<span class="amount text-6xl font-bold">0</span>
					<span class="period text-sm">/mo</span>
				</div>
			</header>
			<hr class="mt-4 pb-8" />
			<ul class="">
				<li>
					<span class="emoticon">🚀</span> 50 credits to get you
					started
				</li>
				<li>
					<span class="emoticon">🏎️</span> Crafts message in seconds
				</li>
				<li>
					<span class="emoticon">📱</span> Post where-ever you want
				</li>
				<li>
					<span class="emoticon">💻</span> Generate messages based on
					URL or description
				</li>
			</ul>
			<hr class="mb-4" />
			<AuthForm />
		</div>
	</div>
</template>
