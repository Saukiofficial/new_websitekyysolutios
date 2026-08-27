# Payment

Payment integration should support a selected payment gateway and its webhook/callback.

## Rules
- Browser redirect is not proof of payment.
- Webhook/provider verification is authoritative.
- Prevent duplicate order fulfillment.
- Verify amount and order reference.
- Handle pending, paid, failed, expired, refunded states.
