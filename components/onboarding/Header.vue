<template>
	<div
		class="bg-primary-color mx-auto logo flex items-center justify-center mb-4 lg:mb-0 p-4"
	>
		<nuxt-link to="/">
			<img
				src="https://res.cloudinary.com/raymons/image/upload/q_100,f_auto,w_200/v1672499457/generator-xyz/generator-xyz-logo.png" alt="Generator XYZ Logo"
			/>
		</nuxt-link>
	</div>
</template>

<script setup lang="ts">
import { getProfile } from '@/lib/user.service'

const supabase = useSupabaseAuthClient()
const client = useSupabaseClient()
const user = useSupabaseUser()
const isLoggedIn = ref(false)
const router = useRouter()
const profile = ref(null)

onMounted(() => {
	watchEffect(async () => {
		if (!user.value) {
			isLoggedIn.value = false
		} else {
			await getProfile(client, user.value?.id ?? '')
				.then((data) => {
					if(!data) return
					profile.value = data?.data
				})
				.catch((error) => console.log(error))

			isLoggedIn.value = true
		}
	})
})
</script>
