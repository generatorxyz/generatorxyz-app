export interface User {
	id: string;
	customer_id: string;
	email: string;
	created_ad: string | Date;
	sub_id?: string;
	sub_start_date?: string | Date;
	sub_end_date?: string | Date;
}