/**
 * PROFILE
 */
export const postGnenerateSocialMediaMessages = async (
	api: string,
	content: string,
	type: string,
	audience: string,
	id: string,
	amount?: string,
	
) => {
	if (!api || !id) throw new Error('Missing client or id')
	return new Promise(async (resolve, reject) => {
		try {
			const post = await fetch(api, {
				method: 'POST',
				body: JSON.stringify({
					content,
					type,
					amount,
					supabaseUserId: id,
					audience
				}),
				headers: {
					'Content-Type': 'application/json',
				},
            })
            
            const data = await post.json()
            resolve(data)
		} catch (error) {
			console.log('error', error)
            reject(error)
        }
	})
}

export function formatResponseText(response: any): string {
	const positionLineBreak = response?.indexOf('\n')
	console.log('response', response)

	// regex for checking ? . ! and new lines
	// const regex = /([.?!])\s*(?=[A-Z])/g
	const regex = /[\?\.\!\n\r]/g
	const substr = response?.substring(0, 10).replaceAll(regex, '')
	console.log('substr', substr)
	const restStr = response?.substring(10)
	console.log('restStr', restStr)
	return `${substr}${restStr}`
}

/**
 * HELPERS
 */
export const stringToNumber = (str: string | number) => parseInt(`${str}`, 0)
