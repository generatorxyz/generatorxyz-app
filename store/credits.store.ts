import { getCredits } from "~/lib/user.service";

export interface Store {
    credits: number | null
    getCredits(client: any, user_id: string): Promise<any>
}

export const store = reactive<Store>({
    // Data
    credits: null,
    async getCredits(client, user_id) { 
        // Fetch data from API
        const credits = await getCredits(client, user_id);
        this.credits = credits?.data.amount;
        return credits
    }
});