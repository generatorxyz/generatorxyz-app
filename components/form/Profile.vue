<template>
	<div class="form-wrapper">
		<h1 class="mb-8" v-if="props?.showTitle">Profile</h1>
		<div class="loader pb-4 flex justify-center" v-if="loader$">
			<Loader />
		</div>
		<div class="dark:text-white mb-4" v-if="!loader$ && profileUpdated$">
			Your profile has been updated!
		</div>
		<div class="text-red-600-4" v-if="errorMessage">
			{{ errorMessage }}
		</div>
		<form @submit.prevent="updateProfile()" class="flex flex-col gap-6">
			<div>
				<input
				type="text"
				v-model="username"
				placeholder="Username"
				disabled
			/>
			</div>
			<div>
				<input
				type="text"
				v-model="fullName"
				placeholder="Full Name"
				required
			/>
			</div>
			<div class="">
				<div class="flex gap-4">
					<input type="text" v-model="avatar_url" placeholder="Avatar URL" />
					<img :src="avatar_url" class="w-12 h-12 rounded-full" />
				</div>
				<p class="text-sm text-left my-0 w-full">
					<em>You can update the URL to change your avatar.</em>
				</p>
			</div>
			<div>
				<select v-model="country">
				<option value="">Select Country</option>
				<option
					v-for="country in (countries as Country[])"
					:key="country?.id"
					:value="country?.id"
				>
					{{ country?.name }}
				</option>
			</select>
			</div>
			<button
				v-if="showSaveButton"
				type="submit"
				class="w-full unset mt-4 text-black bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg px-4 py-2 dark:focus:ring-green-800"
			>
				Save
			</button>
		</form>
	</div>
</template>

<script setup lang="ts">
import { saveProfile } from '@/lib/user.service'
const user = useSupabaseUser()
const client = useSupabaseClient()

/**
 * FORM FIELDS
 */
const country = ref('')
const fullName = ref('')
const avatar_url = ref('')
const username = ref('')
const betaUser = ref(false)

const userProfile = ref(null)
const loader$ = ref(false)
const errorMessage = ref('')
const profileUpdated$ = ref(false)

/** AJAX */
const { data: countries } = await client.from('countries').select('*')

interface Country {
	id: string
	name: string
	iso2: string
	iso3: string
	local_name: string
}

const props = withDefaults(
	defineProps<{
		profile: any,
		showTitle: boolean,
		showSaveButton: boolean,
	}>(),
	{
		profile: null,
		showTitle: true,
		showSaveButton: true,
	}
)

const setProfile = () => {
	const profile = props?.profile
	userProfile.value = profile
	country.value = profile?.country
	fullName.value = profile?.full_name
	avatar_url.value = profile?.avatar_url
	username.value = profile?.username || user.value?.email
	betaUser.value = profile?.beta_user ?? false
}

if (props?.profile) {
	setProfile()
}

const updateProfile = async () => {
	const profile = {
		full_name: fullName?.value,
		country: country?.value,
		avatar_url: avatar_url?.value,
		username: username?.value,
		updated_at: new Date(),
	}
	loader$.value = true
	const { error } = await saveProfile(client, user.value?.id ?? '', profile)

	if (error) {
		errorMessage.value = error.message
	} else {
		profileUpdated$.value = true
		loader$.value = false
	}
}
</script>
