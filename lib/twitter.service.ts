export const generateTweetLink = (text: string, url: string) => {
	return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
		`${text} ${url}`
	)}`
}