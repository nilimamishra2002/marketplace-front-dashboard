/* ============================================================
   PROFILE / ACCOUNT DROPDOWN MENU
   (unchanged behavior — lives here because ALL JS is in this file)
   ============================================================ */
(function () {
  var btn = document.getElementById("profileBtn");
  var menu = document.getElementById("accountMenu");

  function openMenu() {
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
  }
  function isOpen() {
    return menu.classList.contains("open");
  }

  // Toggle on button click
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    isOpen() ? closeMenu() : openMenu();
  });

  // Click outside closes
  document.addEventListener("click", function (e) {
    if (isOpen() && !menu.contains(e.target) && !btn.contains(e.target)) {
      closeMenu();
    }
  });

  // Selecting a menu item closes it
  menu.querySelectorAll(".item").forEach(function (item) {
    item.addEventListener("click", function () {
      // (navigation/action would happen here)
      closeMenu();
    });
  });

  // Escape closes
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) {
      closeMenu();
      btn.focus();
    }
  });
})();

/* ============================================================
   STATUS TRACKER — internship task
   ------------------------------------------------------------
   Two independent orders live in the same cart:
     - a physical product (T-shirt)  -> Pending  -> Shipped
     - a service booking  (Haircut)  -> Scheduled -> Completed

   Each is its own plain object. shipTShirt() only ever writes
   to tshirt.status, and completeHaircut() only ever writes to
   haircut.status — neither function reads or touches the
   other's field, so one can never affect the other.

   The dashboard UI updates immediately after each action; this
   is the primary demonstration. console.log/console.assert
   still run alongside as a secondary, code-level proof.
   ============================================================ */

var tshirt = { name: "Classic Cotton T-Shirt", status: "Pending" };
var haircut = { name: "Professional Haircut", status: "Scheduled" };

function updateTShirtUI() {
  var badge = document.getElementById("tshirtStatusBadge");
  var btn = document.getElementById("shipTShirtBtn");
  badge.textContent = tshirt.status;
  badge.classList.toggle("done", tshirt.status === "Shipped");
  if (tshirt.status === "Shipped") {
    btn.textContent = "Shipped ✓";
    btn.disabled = true;
  }
}

function updateHaircutUI() {
  var badge = document.getElementById("haircutStatusBadge");
  var btn = document.getElementById("completeHaircutBtn");
  badge.textContent = haircut.status;
  badge.classList.toggle("done", haircut.status === "Completed");
  if (haircut.status === "Completed") {
    btn.textContent = "Completed ✓";
    btn.disabled = true;
  }
}

// Changes ONLY the T-shirt status.
function shipTShirt() {
  var haircutBefore = haircut.status; // snapshot, to prove it doesn't move
  tshirt.status = "Shipped";
  updateTShirtUI();

  console.log(
    "shipTShirt() called ->",
    "T-shirt:",
    tshirt.status,
    "| Haircut:",
    haircut.status,
  );
  console.assert(tshirt.status === "Shipped", "Expected T-shirt to be Shipped");
  console.assert(
    haircut.status === haircutBefore,
    "Haircut must NOT change when T-shirt ships",
  );
}

// Changes ONLY the Haircut status.
function completeHaircut() {
  var tshirtBefore = tshirt.status; // snapshot, to prove it doesn't move
  haircut.status = "Completed";
  updateHaircutUI();

  console.log(
    "completeHaircut() called ->",
    "T-shirt:",
    tshirt.status,
    "| Haircut:",
    haircut.status,
  );
  console.assert(
    haircut.status === "Completed",
    "Expected Haircut to be Completed",
  );
  console.assert(
    tshirt.status === tshirtBefore,
    "T-shirt must NOT change when Haircut completes",
  );
}

/* ---- Wire the buttons already present in the existing cards ---- */
document.getElementById("shipTShirtBtn").addEventListener("click", shipTShirt);
document
  .getElementById("completeHaircutBtn")
  .addEventListener("click", completeHaircut);

/* ---- Initial state: log + assert, without touching the UI ---- */
console.log("--- Status Tracker ready ---");
console.log(
  "Initial state -> T-shirt:",
  tshirt.status,
  "| Haircut:",
  haircut.status,
);
console.assert(
  tshirt.status === "Pending",
  "Expected T-shirt to start as Pending",
);
console.assert(
  haircut.status === "Scheduled",
  "Expected Haircut to start as Scheduled",
);
console.log(
  "Click 'Ship T-shirt' / 'Complete Haircut' on the dashboard (or call shipTShirt()/completeHaircut() here) to see the independent transitions.",
);

/* ============================================================
   DOUBLE BOOKING BUG — internship task
   ------------------------------------------------------------
   Exactly 1 T-shirt in stock. Two users (A and B) try to buy
   it "at the same time". Only one may succeed.

   JavaScript runs on a single thread with "run-to-completion":
   once a plain (non-async) function starts, it always finishes
   before any other code can run. So as long as checking the
   stock and decrementing it happen inside ONE plain function
   call — with no async gap in between — nothing can slip in
   between the check and the update. That single synchronous
   step is the entire protection here: no lock, no library.
   ============================================================ */

var tshirtStock = 1; // exactly 1 in stock, per the task

// The protected purchase step: check stock and decrement it as
// ONE synchronous operation. This is what makes it safe.
function tryBuyTShirt(user) {
  if (tshirtStock > 0) {
    tshirtStock = tshirtStock - 1;
    return { user: user, result: "Purchase Successful" };
  }
  return { user: user, result: "Out of Stock" };
}

function updateBuyUI(outcomeA, outcomeB) {
  document.getElementById("stockBadge").textContent = "Stock: " + tshirtStock;

  // Exact result strings ("Purchase Successful" / "Out of Stock") are unchanged —
  // only the presentation (two clean lines, color-coded) is polished here.
  var resultEl = document.getElementById("buyResult");
  var classA = outcomeA.result === "Purchase Successful" ? "ok" : "fail";
  var classB = outcomeB.result === "Purchase Successful" ? "ok" : "fail";
  resultEl.innerHTML =
    '<span class="' +
    classA +
    '">User A: ' +
    outcomeA.result +
    "</span><br>" +
    '<span class="' +
    classB +
    '">User B: ' +
    outcomeB.result +
    "</span>";

  document.getElementById("buyBtn").disabled = true;
}

// Simulates User A and User B clicking "Buy" at the same moment:
// both purchase attempts are queued in the exact same tick.
function simulateConcurrentBuy() {
  Promise.resolve().then(function () {
    var resultA = tryBuyTShirt("User A");
    var resultB = tryBuyTShirt("User B");

    console.log("--- Double Booking simulation ---");
    console.log("User A ->", resultA.result);
    console.log("User B ->", resultB.result);
    console.log("Final stock:", tshirtStock);

    console.assert(tshirtStock === 0, "Expected final stock to be 0");
    console.assert(
      (resultA.result === "Purchase Successful") !==
        (resultB.result === "Purchase Successful"),
      "Exactly one of User A / User B must succeed, not both and not neither",
    );
    console.assert(
      !(
        resultA.result === "Purchase Successful" &&
        resultB.result === "Purchase Successful"
      ),
      "Both users must NOT be able to buy the same single item",
    );

    updateBuyUI(resultA, resultB);
  });
}

document
  .getElementById("buyBtn")
  .addEventListener("click", simulateConcurrentBuy);

console.log("--- Double Booking demo ready ---");
console.log("Initial stock:", tshirtStock);
console.assert(tshirtStock === 1, "Expected initial stock to be exactly 1");

/* ============================================================
   PRODUCTS / SERVICES SEARCH TOGGLE
   ------------------------------------------------------------
   Purely a UI state switch: which button looks active, and
   what the search placeholder says. No search/filter logic.
   ============================================================ */
(function () {
  var productsBtn = document.getElementById("toggleProductsBtn");
  var servicesBtn = document.getElementById("toggleServicesBtn");
  var searchInput = document.getElementById("searchInput");

  function activateProducts() {
    productsBtn.classList.add("active");
    servicesBtn.classList.remove("active");
    searchInput.placeholder = "Search products...";
  }

  function activateServices() {
    servicesBtn.classList.add("active");
    productsBtn.classList.remove("active");
    searchInput.placeholder = "Search services...";
  }

  productsBtn.addEventListener("click", activateProducts);
  servicesBtn.addEventListener("click", activateServices);
})();
