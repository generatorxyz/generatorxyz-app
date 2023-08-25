import { didUserOnboard } from "~/lib/user.service";

export default defineNuxtRouteMiddleware(async (context) => {
    const user = useSupabaseUser();
    const client = useSupabaseClient()

    const userId = user?.id ?? user?.value.id

    const check = await didUserOnboard(client, userId)
    if (check) {
        navigateTo('/generators/social-media')
    }
 })