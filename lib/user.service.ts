/**
 * PROFILE
 */
export const getProfile = async (client: any, id: string) => {
	if (!client || !id) throw new Error('Missing client or id')
	return await client.from('profiles').select('*').eq('id', id).single()
}
export const saveProfile = async (client: any, id: string, profile) => {
	if (!client || !id || !profile) throw new Error('Missing client, id or profile')
	return await client.from('profiles').update(profile).eq('id', id).select()
}
export const getCredits = async (client: any, id: string) => {
	if (!client || !id) throw new Error('Missing client, or id')
	return await client.from('credits').select('*').eq('user_id', id).single()
}
export const spendCredits = async (client: any, id: string, currentAmount: number, spendAmound: number | string) => {
	if (!client || !id) throw new Error('Missing client, or id')
	const newSpendCredits = currentAmount - stringToNumber(spendAmound)
	return await client.from('credits').update({ amount: newSpendCredits }).select('*').eq('user_id', id)
}
export const createCredits = async (client: any, id: string) => {
	if (!client || !id) throw new Error('Missing client, or id')
	const { data, error } = await getCredits(client, id)
	if (data) {
		console.log('User already has credits')
		return false
	}
	return await client.from('credits').insert({ amount: 30, user_id: id }).select()
}
export const getCustomer = async (client: any, id: string) => {
	if (!client || !id) throw new Error('Missing client or id')
	return await client.from('user').select('*').eq('id', id).maybeSingle()
}
export const resetUserOnboarding = async (client: any, id: string) => {
	if (!client || !id) throw new Error('Missing client, or id')
	return await client.from('profiles').update({ onboarding_done: false }).eq('id', id).select()
}
export const userDidOnboarding = async (client: any, id: string) => {
	if (!client || !id) throw new Error('Missing client, or id')
	return await client.from('profiles').update({ onboarding_done: true }).eq('id', id).select()
}
export const didUserOnboard = async (client: any, id: string): Promise<boolean> => {
	if (!client || !id) throw new Error('Missing client, or id')
	const { data, error } = await client.from('profiles').select('*').eq('id', id).single()
	if (error) throw new Error(error)
	return data?.onboarding_done
}
export const getUserMessages = async (client: any, id: string, max?: number) => {
	if (!client || !id) throw new Error('Missing client, or id')
	return await client.from('messages').select('*').eq('user_id', id).order('created_at', { ascending: false }).limit(max ?? 50)
}
export const getMessage = async (client: any, id: string) => {
	if (!client || !id) throw new Error('Missing client, or id')
	return await client.from('messages').select('*').eq('uuid', id).single()
}

/** 
 * HELPERS 
*/
export const stringToNumber = (str: string | number) => parseInt(`${ str }`, 0)
