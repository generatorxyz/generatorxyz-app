import { getUserMessages, getMessage } from "~/lib/user.service";

export interface Store {
    messages: MessageItem[]
    selectedMessage: MessageItem
    fetchMessages(client: any, user_id: string, max?: number): Promise<MessageItem[]>
    fetchSelectedMessage(client: any, message_id: string): Promise<any>
}

export interface MessageItem {
	id: number
	created_at: Date
	user_id: string
	cost: number
	message: string
	api_key: string
	uuid: string
	url: string | null
	source_content: string | null
	type: string
}


export const store = reactive<Store>({
    // Data
    messages: [],
    selectedMessage: {} as MessageItem,
    async fetchMessages(client, user_id, max = 50) {
        // Fetch data from API
        if(this.messages.length > 0) return this.messages;
        const {data, error} = await getUserMessages(client, user_id, max);
        this.messages = data;
        return data
    },
    async fetchSelectedMessage(client, id) { 
        // Fetch data from API
        return await getMessage(client, id);
    }
});