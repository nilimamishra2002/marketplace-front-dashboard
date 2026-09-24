# Marketplace — Front Dashboard & Status Tracker

A front-end prototype for a marketplace dashboard, created as part of the internship tasks.

## What I Built

### 1. Marketplace Front Dashboard

Designed a buyer-focused discovery dashboard based on the provided marketplace requirements.

The dashboard includes:

- Search with Product / Service selection
- Category and quick filters
- Separate Product and Service sections
- Product and Service cards
- Cart and Profile access
- Seller entry point through the Profile menu
- Responsive, clean marketplace-oriented UI

The design focuses on helping a buyer **discover, search and filter listings** before moving to product/service details, cart or booking.

### 2. Mixed-Cart Status Tracker

Added the required status-tracking functionality directly into the existing Product and Service cards.

| Item | Initial Status | Action | Final Status |
|------|----------------|--------|--------------|
| T-shirt | Pending | Ship T-shirt | Shipped |
| Haircut | Scheduled | Complete Haircut | Completed |

The two items maintain **independent states**.

For example:

- Shipping the T-shirt changes only the T-shirt status.
- Completing the haircut changes only the haircut status.
- One action does not modify the other item's status.

The status changes are also reflected visually in the dashboard.

## Implementation

```text
prototype/
├── index.html
└── script.js
