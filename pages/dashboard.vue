<template>
	<div>
		<h1>Dashboard</h1>
		<pre>
		{{ user?.email }}
	</pre
		>
	</div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const router = useRouter()

onMounted(() => {
	watchEffect(() => {
		if (!user.value) {
			router.push('/auth')
		}
	})
})
</script>
