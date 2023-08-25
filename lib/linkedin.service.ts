export function generateLinkedInShareLink(
	url: string,
	title: string,
	summary: string,
	source: string
) {
	const encodedUrl = encodeURIComponent(url)
	const encodedTitle = encodeURIComponent(title)
	const encodedSummary = encodeURIComponent(summary)
	const encodedSource = encodeURIComponent(source)
	const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}&source=${encodedSource}`
	return linkedInShareUrl
}
