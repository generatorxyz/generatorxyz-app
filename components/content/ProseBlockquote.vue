<template>
	<blockquote class="text-white bg-gray-700">
		<slot />
	</blockquote>
</template>

<style>
	blockquote {
		@apply text-lg leading-loose;
	}
	blockquote {
		@apply my-8;
		position: relative;
		color: #fff;
		border-left: 10px solid var(--primary-color);
		padding: 1.5rem;
		quotes: '\201C''\201D''\2018''\2019';
	}
	blockquote:before {
		position: absolute;
		top: 22px;
		left: 10px;
		color: var(--primary-color);
		content: open-quote;
		font-size: 7rem;
		line-height: 0.1em;
		margin-right: 0.25em;
		vertical-align: -0.4em;
	}
	blockquote p {
		@apply mt-4 font-bold;
		font-style: italic;
		color: #fff !important;
	}

</style>