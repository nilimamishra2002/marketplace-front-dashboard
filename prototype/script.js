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
