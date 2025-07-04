export const PAYMENT_QUERY_KEYS = Object.freeze({
	PAYMENT: 'payment',
	GET: 'get',
	TRANSFER: 'transfer',
	TRANSFER_HISTORY: 'transfer-history',
	CREATE_TRANSFER: 'create-transfer',
	SUBMIT_TRANSFER: 'submit-transfer',
})

export const paymentKeys = Object.freeze({
	getPayment : () => [PAYMENT_QUERY_KEYS.GET, PAYMENT_QUERY_KEYS.PAYMENT]
})