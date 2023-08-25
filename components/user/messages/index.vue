<template>
    <div>
        <h1>Messages</h1>
        <div class="flex gap-4">
            <UserMessagesList :list="messages" class="min-w-[200px]" />
            <div class="flex-1">
                <UserMessagesItem :selectedItem="props.selectedItem" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { MessageItem, store } from '~/store/messages.store'
const client = useSupabaseClient()
const user = useSupabaseUser();

const props = defineProps<{
    selectedItem: any
}>()


console.log(({props}))
const messages = await store.fetchMessages(client, user?.value?.id)


console.log('messages: ', messages)

</script>