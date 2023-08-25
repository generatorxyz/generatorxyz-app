export default defineNuxtRouteMiddleware((context) => {
    const user = useSupabaseUser();

    if(!user.value) {
        navigateTo('/auth');
    }
 })