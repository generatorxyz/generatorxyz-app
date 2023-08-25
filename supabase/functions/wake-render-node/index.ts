// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.170.0/http/server.ts'
import { Crony } from 'https://deno.land/x/crony/mod.ts'

serve(async (req) => {
	console.log('Hello from Functions!')
	// Create a new instance of Crony
	const crony = new Crony()

	// Or with function

	crony.add({
		name: 'Task2',
		schedule: '1 */10 * * * *',
		debug: true,
		command: async () => {
			const res = await fetch('https://api.generatorxyz.com').then(
				(body) => body.text()
			)
			console.log('Hello from GeneratorXYZ!')
			return { res }
		},
		enabled: true,
	})

	await crony.run()

	return new Response(null, {
		status: 200,
		headers: {
			'content-type': 'application/json',
		},
	})
})

// serve(async (req) => {
// 	// Run Job in every 30 minutes
// 	cron('1 */10 * * * *', async () => {
// 		const res = await fetch('https://api.generatorxyz.com', {
// 			headers: {
// 				accept: 'application/json',
// 			},
// 		})
// 		return new Response(res.body, {
// 			status: res.status,
// 			headers: {
// 				'content-type': 'application/json',
// 			},
// 		})
// 	})
// })

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
