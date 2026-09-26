# Marketplace — Front Dashboard & Internship Tasks

A front-end marketplace prototype developed as part of the internship tasks.

## How to Run and Test

### Requirements

- A modern web browser such as Google Chrome, Microsoft Edge, or Firefox
- No Node.js, framework, database, or backend is required

### Steps

1. Download or clone this repository to your computer.
2. Open the project folder.
3. Navigate to:

   `prototype/index.html`

4. Double-click `index.html` or open it directly in a web browser.
5. The Marketplace Front Dashboard will appear.

### Test the Status Tracker

1. Locate the **Classic Cotton T-Shirt** card.
2. Click **Ship T-shirt**.
3. Verify that its status changes from **Pending** to **Shipped**.
4. Locate the **Professional Haircut** card.
5. Click **Complete Haircut**.
6. Verify that its status changes from **Scheduled** to **Completed**.
7. Verify that changing one status does not change the other.

### Test the Double Booking Simulation

1. Locate the **Classic Cotton T-Shirt** card.
2. Verify that the stock shows **Stock: 1**.
3. Click **Buy (simulate 2 users)**.
4. Verify that the dashboard displays:
   - User A: **Purchase Successful**
   - User B: **Out of Stock**
   - Final Stock: **0**
5. Open the browser Developer Console (`F12` → Console) to view the JavaScript logs and assertions used to verify the result.

## Hardest Problem & Solution

The hardest problem was handling the double-booking scenario where two users attempt to purchase the only available T-shirt at the same time. The challenge was ensuring that both users could not successfully purchase the same single item. I solved this by keeping the stock check and stock decrement together in one synchronous purchase operation. The first successful purchase reduces the stock from 1 to 0, so the second purchase attempt immediately receives an **“Out of Stock”** result. Console assertions were also added to verify that exactly one user succeeds and that the final stock is 0.

## Project Structure

```text
prototype/
├── index.html
└── script.js