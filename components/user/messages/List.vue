<template>
    <aside class="">
        <header class="flex items-center">
            <h2 class="text-2xl font-bold">Last {{ props?.list?.length }} messages</h2>
        </header>
        
        <div class="list relative">
            <button class="unset flex md:hidden rounded-l-lg" @click="toggleList()"><icons-menu class="w-8" /></button>
            <div class="ml-0 dark:bg-gray-800 bg-gray-200 rounded-lg grid grid-cols-2 lg:grid-cols-1 gap-2 md:block " :class="{'hidden': isListMinimized}">
                <div v-for="(item, index) in props?.list" class="md:border-b md:border-gray-300 overflow-hidden dark:border-white last:border-0 md:max-w-full h-[40px] md:h-auto rounded-lg md:rounded-none md:bg-transparant"  :class="{'bg-yellow-500': item.uuid === messageId, 'md:rounded-t-lg': index === 0, 'md:rounded-b-lg': index === props?.list?.length - 1}">
                    <nuxt-link :to="`/user/messages/${item.uuid}`" class="px-4 py-2  block cursor-pointer hover:bg-yellow-500 no-underline dark:text-white" :class="{'rounded-t-lg': index === 0, 'rounded-b-lg': index === props?.list?.length - 1}">
                       <span v-if="item?.message && item?.type !== 'seo'"> {{ item?.message ? `${item?.message.substring(0, 20)}...` : '⚠️ No message' }}</span>
                       <span v-if="item?.message && item?.type === 'seo'"> {{ item?.url ? `${item?.url.substring(0, 20)}...` : '⚠️ No url' }}</span>
                    </nuxt-link>
                </div>
            </div>

        </div>

    </aside>
</template>

<script lang="ts" setup>
import { MessageItem } from '~/store/messages.store'
const { params: {id} } = useRoute()
const messageId = id !== undefined ? id[0] : null
const isListMinimized = ref(false)

function toggleList() {
    isListMinimized.value = !isListMinimized.value
}

const props = defineProps<{
    list: MessageItem[]
}>()
</script>