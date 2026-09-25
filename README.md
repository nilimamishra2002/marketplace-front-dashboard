# Marketplace — Front Dashboard & Internship Tasks

A front-end marketplace prototype developed as part of the internship tasks.

The project started as a buyer-facing marketplace dashboard and has been progressively extended with the functionality required by the assigned tasks.

---

## Completed Tasks

### Task 1 — Marketplace Front Dashboard UI/UX

Designed and implemented a buyer-focused marketplace discovery dashboard based on the provided project requirements.

Implemented:

- Search with Product / Service selection
- Category and quick filters
- Separate Product and Service sections
- Product and Service cards
- Cart and Profile access
- Seller entry point through the Profile menu
- Responsive marketplace-oriented UI

The dashboard focuses on **discovery, search and filtering** before a buyer moves to product/service details, cart or booking.

---

### Task 2 — Mixed-Cart Status Tracker

Implemented status tracking for two different types of items in the same cart:

| Item | Initial Status | Action | Final Status |
|------|----------------|--------|--------------|
| T-shirt | Pending | Ship T-shirt | Shipped |
| Haircut | Scheduled | Complete Haircut | Completed |

The two items maintain **independent states**.

- Shipping the T-shirt does not change the Haircut status.
- Completing the Haircut does not change the T-shirt status.
- Status changes are reflected directly in the dashboard UI.
- JavaScript assertions provide additional verification.

---

### Task 3 — Double Booking / Overselling Prevention

Implemented a simulation for the marketplace's single-stock double-booking scenario.

The T-shirt starts with exactly **1 item in stock**.

Two users are simulated attempting to purchase the same item:

```text
User A → Purchase Successful
User B → Out of Stock
Final Stock → 0
