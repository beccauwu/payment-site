from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, stripe
endpoint_secret = 'whsec_qBKGfSCmfPUGjItnWs5SAQDNnY6B4RTj'
class StripeWebhook(APIView):
    def post(self, request):
        # Get the event by verifying the signature sent by stripe
        event = None
        payload = request.data
        try:
            event = json.loads(payload)
        except ValueError as e:
            print('⚠️  Webhook error while parsing basic request.' + str(e))
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if endpoint_secret:
            sig_header = request.META['HTTP_STRIPE_SIGNATURE']
            try:
                event = stripe.Webhook.construct_event(
                    payload, sig_header, endpoint_secret
                )
            except stripe.error.SignatureVerificationError as e:
                # Invalid signature
                print('⚠️  Webhook error while verifying signature.' + str(e))
                return Response(status=status.HTTP_400_BAD_REQUEST)
        if event and event['type'] == 'payment_intent.succeeded':
            payment_intent = event['data']['object']  # contains a stripe.PaymentIntent
            print('Payment for {} succeeded'.format(payment_intent['amount']))
            # Then define and call a method to handle the successful payment intent.
            # handle_payment_intent_succeeded(payment_intent)
        elif event['type'] == 'payment_method.attached':
            payment_method = event['data']['object']  # contains a stripe.PaymentMethod
            # Then define and call a method to handle the successful attachment of a PaymentMethod.
            # handle_payment_method_attached(payment_method)
        else:
            # Unexpected event type
            print('Unhandled event type {}'.format(event['type']))