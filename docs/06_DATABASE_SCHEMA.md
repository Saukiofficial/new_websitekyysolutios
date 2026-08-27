# 06 — Database Schema Baseline

> Ini adalah baseline konseptual. Detail field dapat disesuaikan saat ERD dan migration final dibuat.

## users

- id
- name
- email
- password
- role
- status
- email_verified_at
- timestamps

Roles minimum:
- buyer
- seller
- admin

## stores

- id
- user_id
- name
- username
- slug
- logo
- banner
- description
- status
- timestamps

## categories

- id
- parent_id nullable
- name
- slug
- description
- status
- timestamps

## products

- id
- seller_id
- category_id
- title
- slug
- short_description
- description
- price
- compare_price nullable
- thumbnail
- demo_url nullable
- version nullable
- license_type nullable
- requirements nullable
- tech_stack nullable
- status
- published_at nullable
- timestamps

## product_links

- id
- product_id
- type
- url
- status
- timestamps

## product_media

- id
- product_id
- type
- path
- sort_order
- timestamps

## orders

- id
- buyer_id
- order_number
- subtotal
- discount
- payment_fee
- total
- currency
- status
- paid_at nullable
- timestamps

## order_items

- id
- order_id
- product_id
- seller_id
- product_title_snapshot
- price
- commission_rate
- commission_amount
- seller_amount
- timestamps

## payments

- id
- order_id
- provider
- provider_reference
- amount
- status
- paid_at nullable
- expired_at nullable
- raw_reference nullable
- timestamps

## product_accesses

- id
- buyer_id
- product_id
- order_id
- order_item_id
- access_status
- access_count
- last_accessed_at nullable
- timestamps

## reviews

- id
- buyer_id
- product_id
- order_id
- rating
- comment
- status
- timestamps

## wishlists

- id
- buyer_id
- product_id
- timestamps

## commissions

- id
- order_id
- order_item_id
- seller_id
- rate
- amount
- status
- timestamps

## seller_balances

- id
- seller_id
- pending_amount
- available_amount
- total_earned
- total_withdrawn
- timestamps

## withdrawals

- id
- seller_id
- amount
- method
- account_reference
- status
- processed_at nullable
- rejection_reason nullable
- timestamps

## service_requests

- id
- user_id nullable
- name
- email
- service_type
- budget nullable
- brief
- status
- timestamps
