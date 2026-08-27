# AI Agent Rules

## 1. Read Before Coding

Before modifying code:
1. Read `README.md`.
2. Read `01_PRD.md`.
3. Read the relevant feature document.
4. Inspect the existing implementation.
5. Identify dependencies and side effects.

## 2. Do Not Invent Business Logic

If a requirement is not documented:
- do not silently invent a major business rule,
- inspect existing code,
- use the simplest behavior consistent with the documented product,
- flag an unresolved decision before implementing a risky architectural change.

## 3. Preserve Architecture

- Follow `04_PROJECT_STRUCTURE.md`.
- Keep business logic server-side.
- Do not duplicate domain logic across controllers/components.
- Reuse existing services/actions/components where appropriate.

## 4. Database Changes

Before changing database behavior:
- inspect migrations/models,
- update schema documentation when needed,
- preserve historical transaction data,
- do not casually rename/remove production-relevant columns.

## 5. Payment Safety

Never:
- trust client-submitted prices,
- trust client-side payment success,
- create seller earnings from an unverified payment,
- grant product access before payment verification.

Payment webhook/provider verification is authoritative.

## 6. Authorization

Every private action must be authorized server-side.

Examples:
- buyer can only see their orders/access,
- seller can only manage their own store/products/orders,
- admin-only operations require admin authorization.

## 7. Product Delivery

External delivery URLs are sensitive business data.

Never expose them:
- in public product JSON,
- in product listing responses,
- in public page source,
- before purchase.

Only return/redirect after access authorization.

## 8. UI/UX

- Follow `03_DESIGN_SYSTEM.md`.
- Maintain responsive behavior.
- Do not create a new visual language for each page.
- Reuse shared components.
- Provide loading, empty, success, and error states.

## 9. Guest Experience

Do not add unnecessary authentication barriers.

Guest must be able to:
- browse products,
- search,
- filter,
- open product detail,
- view seller stores,
- view services,
- view portfolio,
- view blog.

Login is required for protected actions such as checkout and personal features.

## 10. Testing

After significant changes:
- run relevant tests,
- verify validation,
- verify authorization,
- test mobile/responsive behavior where UI changed,
- test success and failure states.

For payment/order changes, test duplicate webhook/idempotency scenarios.

## 11. Scope Discipline

Do not modify unrelated features just because they are nearby.

If a requested feature requires architectural changes:
1. explain the dependency,
2. make the smallest safe change,
3. update documentation if the architecture changes.

## 12. Documentation Sync

If implementation changes an important business rule, data model, route contract, or feature behavior, update the relevant documentation.

Documentation and implementation should not intentionally contradict each other.
