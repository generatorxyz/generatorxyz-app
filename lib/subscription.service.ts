import { User } from '@/types'
/**
 * SUBSCRIPTIONS
 */
export const createCustomer = async (
	url: string,
	email: string,
	fullname: string,
	id: string
) => {
	console.log('createCustomer: ', { email, fullname })
	if (!email || !id) throw new Error('Missing id or email')
	return await fetch(`${url}/payments/create-customer`, {
		method: 'POST',
		body: JSON.stringify({ email, fullname, id }),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const getSession = async (url: string, id: string) => {
	console.log('get session: ', { id })
	if (!id) throw new Error('Missing id')
	return await fetch(`${url}/payments/session?id=${id}`)
}

export const createSession = async (
	url: string,
	priceId: string,
	userId: string,
	supabaseUserId: string
) => {
	console.log('create session for: ', { priceId, userId, supabaseUserId })
	if (!priceId || !userId || !supabaseUserId)
		throw new Error('Missing session, user id or supabase user id')
	return await fetch(`${url}/payments/create-subscription`, {
		method: 'POST',
		body: JSON.stringify({ priceId, userId, supabaseUserId }),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
export const createOrderCheckoutSession = async (
	url: string,
	priceId: string,
	userId: string,
	supabaseUserId: string
) => {
	console.log('create session for: ', { priceId, userId, supabaseUserId })
	if (!priceId || !userId || !supabaseUserId)
		throw new Error('Missing session, user id or supabase user id')
	return await fetch(`${url}/payments/order-checkout`, {
		method: 'POST',
		body: JSON.stringify({ priceId, userId, supabaseUserId }),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
export const deleteSubscription = async (
	url: string,
	userId: string,
	subscriptionId: string
) => {
	console.log('delecte subscription for: ', { userId, subscriptionId })
	if (!userId || !subscriptionId)
		throw new Error('Missing subscription or user id')
	return await fetch(`${url}/payments/create-subscription`, {
		method: 'POST',
		body: JSON.stringify({ subscriptionId }),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
export const sessionSuccess = async (
	url: string,
	session_id: string,
	user_id: string
) => {
	console.log('session success: ', { user_id, session_id })
	if (!user_id || !session_id) throw new Error('Missing session and user id')
	return await fetch(`${url}/payments/subscription-success`, {
		method: 'POST',
		body: JSON.stringify({ session_id, user_id }),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}
export const orderSuccess = async (
	url: string,
	session_id: string,
	user_id: string
) => {
	console.log('session success: ', { user_id, session_id })
	if (!user_id || !session_id) throw new Error('Missing session and user id')
	return await fetch(`${url}/payments/order-success`, {
		method: 'POST',
		body: JSON.stringify({ session_id, user_id }),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const subscriptionCanceled = async (
	url: string,
	client: any,
	user_id: string,
	subscriptionId: string
) => {
	if (!client || !subscriptionId || !user_id)
		throw new Error('Missing client, or subscription/user id')
	const cancalation = await fetch(
		`${url}/payments/delete-subscription?subscriptionId=${subscriptionId}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
	return await cancalation.json()
}

export const getCustomer = async (client: any, id: string) => {
	if (!client || !id) throw new Error('Missing client, or id')
	return await client.from('user').select('*').eq('id', id)
}

export const hasActiveSubscription = async (client: any, id: string) => {
	if (!client || !id) throw new Error('Missing client, or id')
	const user: User = await client
		.from('user')
		.select('*')
		.eq('id', id)
		.single()

	if (!user || !user.customer_id) {
		return false
	} else if (
		user.sub_id &&
		user.sub_start_date &&
		user.sub_end_date === null
	) {
		return true
	}
}
export const changeSubscriptionStatus = async (
	client: any,
	id: string,
	sub_id: string
) => {
	if (!client || !id) throw new Error('Missing client, or id')
	const user: User = await client
		.from('user')
		.select('*')
		.eq('id', id)
		.single()

	if (!user || !user.customer_id) {
		return false
	} else if (
		user.sub_id &&
		user.sub_start_date &&
		user.sub_end_date === null
	) {
		return true
	}
}
