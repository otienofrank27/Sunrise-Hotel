/**
 * Sunrise Hotel - Online Room Booking and Billing System
 * Client-Side JavaScript (script.js)
 * 
 * Features Implemented:
 * - Task 2: Robust Form Validation (Name, Email, 10-digit Phone, Nights 1-14, Guests > 0, Room Type)
 * - Task 3: Dynamic DOM Behavior (Room capacity display, capacity warning, transfer options toggle, package summary)
 * - Task 4: Real-time Live Bill Calculator with itemized breakdown
 * - Task 5: User-defined functions: validateBooking(), calculateBill(), checkRoomCapacity(), etc.
 *           Events: submit, change, input, click
 * - Individualization (#4): Laundry service option costing KSh 1,000
 */

// Room Rates & Capacity Configuration
const ROOM_CONFIG = {
  Single: { rate: 3500, maxGuests: 1, name: "Single Room" },
  Double: { rate: 5000, maxGuests: 2, name: "Double Room" },
  Family: { rate: 7500, maxGuests: 4, name: "Family Room" },
  Executive: { rate: 10000, maxGuests: 2, name: "Executive Room" }
};

const BREAKFAST_RATE_PER_PERSON_PER_DAY = 700;
const AIRPORT_TRANSFER_FLAT_FEE = 2000;
const LAUNDRY_SERVICE_FEE = 1000; // Individualization requirement (Admission number last digit 4)

/**
 * Helper function to format numbers as Kenyan Shillings currency
 * @param {number} amount
 * @returns {string} e.g. "KSh 21,200"
 */
function formatCurrency(amount) {
  return "KSh " + Math.round(amount).toLocaleString("en-KE");
}

/**
 * Task 5 & Task 3: checkRoomCapacity()
 * Checks the selected room type capacity against entered number of guests
 * Displays maximum capacity info and shows warning if exceeded
 * @returns {boolean} True if within capacity, false if exceeded
 */
function checkRoomCapacity() {
  const roomTypeSelect = document.getElementById("room_type");
  const guestsInput = document.getElementById("guests");
  const capacityInfo = document.getElementById("capacity-info");
  const capacityWarning = document.getElementById("capacity-warning");
  const capacityWarningText = document.getElementById("capacity-warning-text");

  if (!roomTypeSelect || !guestsInput) return true;

  const selectedType = roomTypeSelect.value;
  const numGuests = parseInt(guestsInput.value, 10) || 0;

  if (selectedType && ROOM_CONFIG[selectedType]) {
    const maxCapacity = ROOM_CONFIG[selectedType].maxGuests;
    if (capacityInfo) {
      capacityInfo.textContent = `(Max Capacity: ${maxCapacity} ${maxCapacity === 1 ? 'Guest' : 'Guests'})`;
    }

    if (numGuests > maxCapacity) {
      if (capacityWarning) {
        capacityWarning.classList.add("show");
        if (capacityWarningText) {
          capacityWarningText.textContent = `Caution: Selected ${ROOM_CONFIG[selectedType].name} has a maximum capacity of ${maxCapacity} guest(s). You entered ${numGuests} guests!`;
        }
      }
      return false;
    } else {
      if (capacityWarning) {
        capacityWarning.classList.remove("show");
      }
      return true;
    }
  } else {
    if (capacityInfo) {
      capacityInfo.textContent = "";
    }
    if (capacityWarning) {
      capacityWarning.classList.remove("show");
    }
    return true;
  }
}

/**
 * Task 3: toggleAirportTransfer()
 * Displays extra flight/transfer fields only when transfer is requested
 */
function toggleAirportTransfer() {
  const transferCheckbox = document.getElementById("airport_transfer");
  const transferBox = document.getElementById("transfer-details-box");
  if (!transferCheckbox || !transferBox) return;

  if (transferCheckbox.checked) {
    transferBox.classList.add("active");
  } else {
    transferBox.classList.remove("active");
  }
}

/**
 * Task 4 & Task 5: calculateBill()
 * Computes the real-time cost breakdown and grand total:
 * Total = Room Cost + Breakfast Cost + Airport Transfer + Laundry Service
 */
function calculateBill() {
  const roomTypeSelect = document.getElementById("room_type");
  const nightsInput = document.getElementById("nights");
  const guestsInput = document.getElementById("guests");
  const breakfastCheckbox = document.getElementById("breakfast");
  const transferCheckbox = document.getElementById("airport_transfer");
  const laundryCheckbox = document.getElementById("laundry");

  // DOM output elements
  const billRoomTypeEl = document.getElementById("bill-room-type");
  const billRoomRateEl = document.getElementById("bill-room-rate");
  const billRoomSubtotalEl = document.getElementById("bill-room-subtotal");
  const billBreakfastRow = document.getElementById("bill-breakfast-row");
  const billBreakfastSubtotalEl = document.getElementById("bill-breakfast-subtotal");
  const billTransferRow = document.getElementById("bill-transfer-row");
  const billTransferSubtotalEl = document.getElementById("bill-transfer-subtotal");
  const billLaundryRow = document.getElementById("bill-laundry-row");
  const billLaundrySubtotalEl = document.getElementById("bill-laundry-subtotal");
  const billTotalAmountEl = document.getElementById("bill-total-amount");

  const roomType = roomTypeSelect ? roomTypeSelect.value : "";
  const nights = parseInt(nightsInput ? nightsInput.value : 0, 10) || 0;
  const guests = parseInt(guestsInput ? guestsInput.value : 0, 10) || 0;
  const hasBreakfast = breakfastCheckbox ? breakfastCheckbox.checked : false;
  const hasTransfer = transferCheckbox ? transferCheckbox.checked : false;
  const hasLaundry = laundryCheckbox ? laundryCheckbox.checked : false;

  let roomRate = 0;
  let roomSubtotal = 0;
  let breakfastSubtotal = 0;
  let transferCost = 0;
  let laundryCost = 0;

  // 1. Room Cost calculation
  if (roomType && ROOM_CONFIG[roomType]) {
    roomRate = ROOM_CONFIG[roomType].rate;
    roomSubtotal = roomRate * nights;
    if (billRoomTypeEl) billRoomTypeEl.textContent = ROOM_CONFIG[roomType].name;
    if (billRoomRateEl) billRoomRateEl.textContent = `${formatCurrency(roomRate)} x ${nights} night${nights === 1 ? '' : 's'}`;
    if (billRoomSubtotalEl) billRoomSubtotalEl.textContent = formatCurrency(roomSubtotal);
  } else {
    if (billRoomTypeEl) billRoomTypeEl.textContent = "None Selected";
    if (billRoomRateEl) billRoomRateEl.textContent = "-";
    if (billRoomSubtotalEl) billRoomSubtotalEl.textContent = "KSh 0";
  }

  // 2. Breakfast Cost calculation: KSh 700 per person per day
  if (hasBreakfast && nights > 0 && guests > 0) {
    breakfastSubtotal = nights * guests * BREAKFAST_RATE_PER_PERSON_PER_DAY;
    if (billBreakfastRow) billBreakfastRow.style.display = "flex";
    if (billBreakfastSubtotalEl) {
      billBreakfastSubtotalEl.textContent = `${formatCurrency(breakfastSubtotal)} (${guests} pax × ${nights} d)`;
    }
  } else {
    if (billBreakfastRow) billBreakfastRow.style.display = "none";
  }

  // 3. Airport Transfer calculation: Flat KSh 2,000
  if (hasTransfer) {
    transferCost = AIRPORT_TRANSFER_FLAT_FEE;
    if (billTransferRow) billTransferRow.style.display = "flex";
    if (billTransferSubtotalEl) billTransferSubtotalEl.textContent = formatCurrency(transferCost);
  } else {
    if (billTransferRow) billTransferRow.style.display = "none";
  }

  // 4. Laundry Service calculation (Individualization requirement #4: KSh 1,000)
  if (hasLaundry) {
    laundryCost = LAUNDRY_SERVICE_FEE;
    if (billLaundryRow) billLaundryRow.style.display = "flex";
    if (billLaundrySubtotalEl) billLaundrySubtotalEl.textContent = formatCurrency(laundryCost);
  } else {
    if (billLaundryRow) billLaundryRow.style.display = "none";
  }

  // Grand Total
  const grandTotal = roomSubtotal + breakfastSubtotal + transferCost + laundryCost;
  if (billTotalAmountEl) {
    billTotalAmountEl.textContent = formatCurrency(grandTotal);
  }

  return grandTotal;
}

/**
 * Task 2 & Task 5: validateBooking(event)
 * Validates all required inputs before form submission.
 * Prevents submission and highlights errors if invalid.
 * @param {Event} event
 * @returns {boolean}
 */
function validateBooking(event) {
  let isValid = true;

  // Retrieve input elements
  const nameInput = document.getElementById("customer_name");
  const idInput = document.getElementById("id_number");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const checkinInput = document.getElementById("check_in_date");
  const nightsInput = document.getElementById("nights");
  const roomTypeSelect = document.getElementById("room_type");
  const guestsInput = document.getElementById("guests");

  // Helper to show or clear error message
  function setError(inputEl, errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (inputEl) inputEl.classList.add("input-error");
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("show");
    }
    isValid = false;
  }

  function clearError(inputEl, errorId) {
    if (inputEl) inputEl.classList.remove("input-error");
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove("show");
    }
  }

  // Rule 1: Customer Name is not empty
  if (!nameInput || !nameInput.value.trim()) {
    setError(nameInput, "name-error", "Customer's full name is required.");
  } else if (nameInput.value.trim().length < 2) {
    setError(nameInput, "name-error", "Please enter a valid full name (minimum 2 characters).");
  } else {
    clearError(nameInput, "name-error");
  }

  // Rule: National ID / Passport not empty
  if (idInput && !idInput.value.trim()) {
    setError(idInput, "id-error", "National ID or Passport number is required.");
  } else if (idInput) {
    clearError(idInput, "id-error");
  }

  // Rule 2: Email address has valid format
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailInput || !emailInput.value.trim()) {
    setError(emailInput, "email-error", "Email address is required.");
  } else if (!emailPattern.test(emailInput.value.trim())) {
    setError(emailInput, "email-error", "Please provide a valid email address (e.g. name@example.com).");
  } else {
    clearError(emailInput, "email-error");
  }

  // Rule 3: Phone number contains exactly 10 digits
  // Clean out spaces or dashes
  const rawPhone = phoneInput ? phoneInput.value.trim().replace(/[\s-]/g, "") : "";
  const phonePattern = /^[0-9]{10}$/;
  if (!phoneInput || !rawPhone) {
    setError(phoneInput, "phone-error", "Phone number is required.");
  } else if (!phonePattern.test(rawPhone)) {
    setError(phoneInput, "phone-error", "Phone number must contain exactly 10 digits (e.g. 0712345678).");
  } else {
    clearError(phoneInput, "phone-error");
  }

  // Rule: Check-in date not empty
  if (checkinInput && !checkinInput.value) {
    setError(checkinInput, "checkin-error", "Check-in date is required.");
  } else if (checkinInput) {
    clearError(checkinInput, "checkin-error");
  }

  // Rule 4: Number of nights is between 1 and 14
  const nightsVal = parseInt(nightsInput ? nightsInput.value : 0, 10);
  if (!nightsInput || isNaN(nightsVal) || nightsVal < 1 || nightsVal > 14) {
    setError(nightsInput, "nights-error", "Number of nights must be between 1 and 14.");
  } else {
    clearError(nightsInput, "nights-error");
  }

  // Rule 5: Room type is selected
  if (!roomTypeSelect || !roomTypeSelect.value) {
    setError(roomTypeSelect, "room-error", "Please select a room type.");
  } else {
    clearError(roomTypeSelect, "room-error");
  }

  // Rule 6: Number of guests is greater than zero & within room capacity
  const guestsVal = parseInt(guestsInput ? guestsInput.value : 0, 10);
  if (!guestsInput || isNaN(guestsVal) || guestsVal <= 0) {
    setError(guestsInput, "guests-error", "Number of guests must be at least 1.");
  } else if (roomTypeSelect && roomTypeSelect.value && ROOM_CONFIG[roomTypeSelect.value]) {
    const maxCapacity = ROOM_CONFIG[roomTypeSelect.value].maxGuests;
    if (guestsVal > maxCapacity) {
      setError(guestsInput, "guests-error", `Exceeds capacity! ${ROOM_CONFIG[roomTypeSelect.value].name} allows max ${maxCapacity} guest(s).`);
    } else {
      clearError(guestsInput, "guests-error");
    }
  } else {
    clearError(guestsInput, "guests-error");
  }

  // If any validation failed, block form submission and display banner
  const submitAlert = document.getElementById("submit-error-alert");
  const submitAlertText = document.getElementById("submit-error-alert-text");

  if (!isValid) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (submitAlert) {
      submitAlert.style.display = "block";
      if (submitAlertText) {
        submitAlertText.textContent = "Please complete all highlighted required fields above (Name, ID, valid email, 10-digit phone, check-in date) before submitting.";
      }
    }

    // Scroll smoothly to the first invalid field
    const firstError = document.querySelector(".input-error");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      firstError.focus();
    }
    return false;
  } else {
    if (submitAlert) {
      submitAlert.style.display = "none";
    }
  }

  return true;
}

/**
 * Quick Helper to fill test data for Task 8 demonstration
 * Demonstrates: Peter Mwangi, Double Room, 2 Guests, 3 Nights, Breakfast, Airport Transfer = KSh 21,200
 */
function fillPeterMwangiDemo() {
  const nameInput = document.getElementById("customer_name");
  const idInput = document.getElementById("id_number");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const checkinInput = document.getElementById("check_in_date");
  const nightsInput = document.getElementById("nights");
  const roomTypeSelect = document.getElementById("room_type");
  const guestsInput = document.getElementById("guests");
  const breakfastCheckbox = document.getElementById("breakfast");
  const transferCheckbox = document.getElementById("airport_transfer");
  const laundryCheckbox = document.getElementById("laundry");

  if (nameInput) nameInput.value = "Peter Mwangi";
  if (idInput) idInput.value = "24394012";
  if (emailInput) emailInput.value = "peter.mwangi@example.com";
  if (phoneInput) phoneInput.value = "0712345678";
  
  // Set tomorrow as default checkin date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const dd = String(tomorrow.getDate()).padStart(2, "0");
  if (checkinInput) checkinInput.value = `${yyyy}-${mm}-${dd}`;

  if (nightsInput) nightsInput.value = "3";
  if (roomTypeSelect) roomTypeSelect.value = "Double";
  if (guestsInput) guestsInput.value = "2";
  if (breakfastCheckbox) breakfastCheckbox.checked = true;
  if (transferCheckbox) transferCheckbox.checked = true;
  if (laundryCheckbox) laundryCheckbox.checked = false;

  // Trigger dynamic updates
  toggleAirportTransfer();
  checkRoomCapacity();
  calculateBill();
}

/**
 * Task 5: Event Listeners Initialization
 * Sets up submit, change, input, and click event handlers
 */
document.addEventListener("DOMContentLoaded", function () {
  const bookingForm = document.getElementById("booking-form");
  const roomTypeSelect = document.getElementById("room_type");
  const nightsInput = document.getElementById("nights");
  const guestsInput = document.getElementById("guests");
  const breakfastCheckbox = document.getElementById("breakfast");
  const transferCheckbox = document.getElementById("airport_transfer");
  const laundryCheckbox = document.getElementById("laundry");
  const checkinInput = document.getElementById("check_in_date");
  const phoneInput = document.getElementById("phone");
  const demoBtn = document.getElementById("btn-peter-mwangi-demo");
  const resetBtn = document.getElementById("btn-reset-form");

  // Prevent selecting dates in the past
  if (checkinInput) {
    const today = new Date().toISOString().split("T")[0];
    checkinInput.min = today;
  }

  // 1. Submit Event
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      const valid = validateBooking(e);
      if (!valid) {
        e.preventDefault();
      }
    });
  }

  // 2. Change Events
  if (roomTypeSelect) {
    roomTypeSelect.addEventListener("change", function () {
      checkRoomCapacity();
      calculateBill();
    });
  }

  if (breakfastCheckbox) {
    breakfastCheckbox.addEventListener("change", function () {
      calculateBill();
    });
  }

  if (transferCheckbox) {
    transferCheckbox.addEventListener("change", function () {
      toggleAirportTransfer();
      calculateBill();
    });
  }

  if (laundryCheckbox) {
    laundryCheckbox.addEventListener("change", function () {
      calculateBill();
    });
  }

  // 3. Input Events (real-time recalculation as user types)
  if (nightsInput) {
    nightsInput.addEventListener("input", function () {
      calculateBill();
    });
  }

  if (guestsInput) {
    guestsInput.addEventListener("input", function () {
      checkRoomCapacity();
      calculateBill();
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      // Auto-sanitize non-digits
      this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
    });
  }

  // 4. Click Events
  if (demoBtn) {
    demoBtn.addEventListener("click", function () {
      fillPeterMwangiDemo();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      setTimeout(() => {
        toggleAirportTransfer();
        checkRoomCapacity();
        calculateBill();
      }, 50);
    });
  }

  // Initial Calculation Run on Page Load
  toggleAirportTransfer();
  checkRoomCapacity();
  calculateBill();
});
