interface Profile {
	id: string
	full_name: string
	country: string
	avatar_url: string
	website: string
	username: string
}

export default class UserService {
	public user = useSupabaseUser()
	public client = useSupabaseClient()
	public profile: any = {}

	constructor() {}

	getUser() {
		return this.user
	}

	async getUserProfile() {
		const profile = await this.client
			.from('profiles')
			.select('*')
			.eq('id', this.user.value?.id)
			.single()
		this.profile = profile.data
		return profile
	}

	async updateUserProfile(profile: Profile) {
		console.log('profile: ', profile)
		return await this.client
			.from('profiles')
			.update({
				full_name: profile?.fullName,
				country: profile?.country,
				avatar_url: profile?.avatar_url,
			})
			.eq('id', this.profile?.id)
			.select()
	}

	async login(email: string) {
		return await this.client.auth.signInWithOtp({ email: email })
	}
}
