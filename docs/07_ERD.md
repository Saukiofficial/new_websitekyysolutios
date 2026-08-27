# 07 — ERD

```mermaid
erDiagram
    USERS ||--o| STORES : owns
    USERS ||--o{ PRODUCTS : sells
    CATEGORIES ||--o{ PRODUCTS : contains
    PRODUCTS ||--o{ PRODUCT_MEDIA : has
    PRODUCTS ||--o{ PRODUCT_LINKS : delivers
    USERS ||--o{ ORDERS : places
    ORDERS ||--o{ ORDER_ITEMS : contains
    PRODUCTS ||--o{ ORDER_ITEMS : purchased
    ORDERS ||--o{ PAYMENTS : has
    USERS ||--o{ PRODUCT_ACCESSES : receives
    PRODUCTS ||--o{ PRODUCT_ACCESSES : grants
    ORDER_ITEMS ||--o| PRODUCT_ACCESSES : creates
    USERS ||--o{ REVIEWS : writes
    PRODUCTS ||--o{ REVIEWS : receives
    USERS ||--o{ WISHLISTS : creates
    PRODUCTS ||--o{ WISHLISTS : saved
    ORDER_ITEMS ||--o| COMMISSIONS : generates
    USERS ||--o| SELLER_BALANCES : owns
    USERS ||--o{ WITHDRAWALS : requests
    USERS ||--o{ SERVICE_REQUESTS : submits
```

## ERD Principles

- Order item stores snapshots of product price/title so historical orders remain stable.
- Payment status must be verified server-side.
- Product access should be tied to a successful order/order item.
- Delivery URL must not be exposed publicly before purchase.
