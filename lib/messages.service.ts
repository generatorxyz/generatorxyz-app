export enum MessageType {
	DEFAULT = 'default',
	SUMMARY = 'summary',
}
export const saveGeneratedMessage = async (
	client: any,
	message: string,
	userId: string,
	cost: number,
	apiKey = null,
	sourceContent: string,
	type: MessageType,
	url?: string,
) => {
	return await client.from('messages').insert({
		message,
		cost,
		user_id: userId,
		api_key: apiKey,
		url: url ?? null,
		source_content: sourceContent,
		type: type ?? MessageType.DEFAULT
	})
}
