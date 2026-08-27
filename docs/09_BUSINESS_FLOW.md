# 09 — Business Flow

## Product Publishing

```text
Seller creates product
→ adds product information
→ adds delivery URL
→ submits
→ admin reviews
→ approved
→ published
```

## Purchase

```text
Buyer selects product
→ checkout
→ payment created
→ payment gateway
→ webhook/callback
→ server verifies payment
→ order becomes PAID
→ order item finalized
→ commission calculated
→ seller earning recorded
→ product access created
→ buyer notified
```

## External Product Delivery

```text
Seller
→ stores external delivery URL
→ platform keeps URL non-public
→ buyer pays
→ product access exists
→ buyer clicks Access Product
→ server verifies access
→ redirect/provide controlled access
→ external storage
```

## Seller Earnings

```text
Paid Order
→ Commission calculation
→ Seller pending balance
→ Holding/clearing period if configured
→ Available balance
→ Withdrawal request
→ Admin review/automatic processing
→ Paid
```

## Refund / Dispute Concept

If refund/dispute is introduced:

```text
Order Paid
→ Refund Request
→ Review
→ Approved/Rejected
→ Balance adjustment
→ Product access revoked if policy requires
```

## Service Business

```text
Customer
→ Service page
→ Request project
→ Requirement brief
→ Consultation
→ Quotation
→ Approval
→ Payment
→ Development
→ Testing
→ Delivery
→ Maintenance
```
