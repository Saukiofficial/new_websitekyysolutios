# 10 — API / Server Action Specification

The project uses Laravel + Inertia + React. Do not force every operation into a public REST API. Use server-side controllers/actions appropriate to the application.

## Public

- `GET /`
- `GET /products`
- `GET /products/{slug}`
- `GET /categories/{slug}`
- `GET /@{username}`
- `GET /services`
- `GET /portfolio`
- `GET /blog`

## Authentication

- `POST /login`
- `POST /register`
- `POST /logout`
- password reset routes
- email verification routes

## Buyer

- `POST /checkout`
- `GET /orders`
- `GET /orders/{order}`
- `GET /my-products`
- `GET /my-products/{product}`
- `POST /wishlist`
- `DELETE /wishlist/{product}`
- `POST /reviews`

## Payment

- `POST /payments/{payment}/create`
- `POST /payments/webhook`

Webhook must:
1. validate provider signature where supported,
2. identify payment,
3. verify amount/order,
4. prevent duplicate processing,
5. update payment status,
6. update order,
7. create access/earnings only once.

## Seller

- `GET /seller`
- `GET /seller/products`
- `POST /seller/products`
- `PUT /seller/products/{product}`
- `DELETE /seller/products/{product}`
- `GET /seller/orders`
- `GET /seller/earnings`
- `POST /seller/withdrawals`

## Admin

- `GET /admin`
- seller management
- product moderation
- order/payment management
- commission settings
- withdrawal processing
- categories
- reports
- CMS
- settings

## Security Rules

- Never trust price sent by browser.
- Never trust payment success from browser.
- Verify ownership before product access.
- Validate seller ownership before editing a product.
- Authorize every private action server-side.
