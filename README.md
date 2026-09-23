# Marketplace — Front Dashboard UI/UX

## Assignment
Basic Dashboard UI/UX Design — internship task.

## Objective
Design a basic UI/UX layout for the front dashboard of the new marketplace: the first
discovery screen a buyer sees, supporting Browse/Search/Filter before moving on to
product/service detail pages, cart, or booking (those pages are out of scope for this task).

## Design Approach
The dashboard was designed element-by-element from the supplied project blueprints
rather than from a generic template. Every element on screen is either a documented
requirement or an explicitly labeled design recommendation (see below and
`design-rationale.md`).

## Document-Grounded Decisions
- **Search bar** — named directly in the project's sprint plan as a homepage requirement.
- **Product/Service toggle** — "Type" is one of the named filter dimensions.
- **Categories in a left sidebar** — the project's UI-execution notes specify this exact
  placement (logo top-left, cart/profile top-right, categories left, content center-right).
- **Separate Products and Services sections** — the source documents treat products and
  services as separate domain entities (different fulfillment/inventory rules), so they
  are not merged into one generic listings grid.
- **Cart / Profile icons in the header** — both are named buyer-facing pages/features.
- **"Sell on Marketplace" inside the profile menu** — Seller is a documented platform
  role, but seller tools (inventory, orders, earnings) are explicitly out of scope for
  this discovery screen. A single low-emphasis entry point in the account menu is the
  least intrusive way to acknowledge the role without letting it compete with buyer
  discovery.
- **Price / Rating quick filters** — named filter dimensions in the sprint plan; placed
  under Categories since the source document groups "Categories & Filters" together.

Anything not traceable to the documents (e.g. exact pixel values, the "View all" links)
is a design recommendation, not a stated requirement.

## Dashboard Features
- Header: logo, search with Products/Services toggle, cart, profile (with account menu)
- Left sidebar: category list + price/rating quick filters
- Products section: 3-card grid + "View all"
- Services section: 3-card grid + "View all"

Out of scope (by design): checkout, product/service detail pages, seller dashboard,
admin dashboard, order/booking management, authentication and payment implementation.

## Design System
- Colors: Primary `#2563EB`, background `#F8FAFC`, surface `#FFFFFF`,
  text `#0F172A`, muted `#64748B`, border `#E2E8F0`
- Type: Inter, single family, weight-based hierarchy
- Grid: 1440px reference viewport, 12 columns, 24px gutter, 8px spacing scale
- Sidebar 260px fixed, main content 3-column card grid (24px gap)
- Components: 44px inputs/buttons, 8px control radius, 12px card radius

## Prototype
This repository contains an HTML/CSS prototype (`prototype/index.html`) used only to
demonstrate the UI/UX visually. It is **not** built against any framework or backend,
and does not indicate a technology choice for the production app.

Static exports for review without opening a browser:
- `design/dashboard.png`
- `design/dashboard.pdf`

## Notes
The technology stack for the production application has not yet been finalized. This
repository contains a UI/UX prototype only — it is not the production application and
makes no assumptions about the eventual frontend/backend framework.
