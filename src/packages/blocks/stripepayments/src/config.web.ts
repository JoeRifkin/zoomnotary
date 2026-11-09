
export const config = {
	// Customizable Area Start
	creatPaymentIntentApiContentType: 'application/json',
	createpaymentIntentEndpoint: 'stripe_integration/payment_intents',
	createPaymentIntentMethod: 'POST',

	stripeKey:'INSERT_KEY_HERE',
	stripeCurrency: 'GBP',

	orderId: 'Order ID',
	loading: 'Loading...',
	cancelText: 'Cancel',
	submitText: 'Submit',

	stripeSuccessMessage: 'Successfully communicated with Stripe',
	stripeErrorMessage: 'There has been an error'
	// Customizable Area End
};

