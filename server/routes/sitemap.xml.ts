import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'

export default defineEventHandler(async event => {
	const docs = await serverQueryContent(event).sort({ date: -1 }).where({ _partial: false }).find()

    const links = [
        {
            url: '/', lastmod: new Date()
        },
        {
            url: '/guides', lastmod: new Date()
        },
    ]

	for (const doc of docs) {
		links.push({ url: doc?._path, lastmod: doc?.date ?? new Date() })
	}

	// Create a stream to write to
	const stream = new SitemapStream({ hostname: 'https://wwww.generatorxyz.com' })

	// Return a promise that resolves with your XML string
	const feed = await streamToPromise(Readable.from(links).pipe(stream)).then(data => data.toString())

	// const feedString = feed.xml({ indent: true })
	event.res.setHeader('content-type', 'text/xml')
	event.res.end(feed)
})
