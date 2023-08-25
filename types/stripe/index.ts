interface AutomaticTax {
	enabled: boolean
}

interface Recurring {
	aggregate_usage: any
	interval: string
	interval_count: number
	usage_type: string
}

interface Price {
	id: string
	object: string
	active: boolean
	billing_scheme: string
	created: number
	currency: string
	custom_unit_amount: any
	livemode: boolean
	lookup_key: any
	metadata: {}
	nickname: any
	product: string
	recurring: Recurring
	tax_behavior: string
	tiers_mode: any
	transform_quantity: any
	type: string
	unit_amount: number
	unit_amount_decimal: string
}

interface SubscriptionItem {
	id: string
	object: string
	billing_thresholds: any
	created: number
	metadata: {}
	price: Price
	quantity: number
	subscription: string
	tax_rates: any[]
}

interface Items {
	object: string
	data: SubscriptionItem[]
	has_more: boolean
	url: string
}

interface PaymentSettings {
	payment_method_options: any
	payment_method_types: any
	save_default_payment_method: string
}

enum SubscriptionStatus {
	'incomplete',
	'incomplete_expired',
	'trialing',
	'active',
	'past_due',
	'canceled',
	'unpaid',
}

export interface Subscription {
	id: string
	object: string
	application: any
	application_fee_percent: any
	automatic_tax: AutomaticTax
	billing_cycle_anchor: number
	billing_thresholds: any
	cancel_at: any
	cancel_at_period_end: boolean
	canceled_at: number
	collection_method: string
	created: number
	currency: string
	current_period_end: number
	current_period_start: number
	customer: string
	days_until_due: any
	default_payment_method: string
	default_source: any
	default_tax_rates: any[]
	description: any
	discount: any
	ended_at: any
	items: Items
	latest_invoice: string
	livemode: boolean
	metadata: {}
	next_pending_invoice_item_invoice: any
	on_behalf_of: any
	pause_collection: any
	payment_settings: PaymentSettings
	pending_invoice_item_interval: any
	pending_setup_intent: any
	pending_update: any
	schedule: any
	start_date: number
    status: SubscriptionStatus;
	test_clock: any
	transfer_data: any
	trial_end: any
	trial_start: any
}
