# Sunrise Hotel - Online Room Booking and Billing System
**PROJECT 2: Implementation & Submission Guide**

---

## 📁 Project Structure
```text
HotelRoomBooking_Project/
├── index.html            # Task 1: Hotel Home page, room cards, tariffs, amenities
├── booking.html          # Task 1 & 3: Interactive reservation form with dynamic controls
├── process_booking.php   # Task 6: PHP server-side validation & verified bill calculation
├── style.css             # Tasks 1 & 7: Responsive luxury styling and print media
├── script.js             # Tasks 2, 3, 4, 5: Client-side validation & bill calculator
└── README.md             # Project documentation and local server setup instructions
```

---

## 🚀 How to Run in XAMPP / WAMP / MAMP

1. **Copy Files to Web Server Directory**:
   - For **XAMPP**: Copy this folder into `C:\xampp\htdocs\sunrise-hotel\`
   - For **WAMP**: Copy this folder into `C:\wamp64\www\sunrise-hotel\`
   - For **MAMP**: Copy this folder into `/Applications/MAMP/htdocs/sunrise-hotel/`

2. **Start Apache**:
   - Open XAMPP / WAMP Control Panel.
   - Start the **Apache** web server module.

3. **Open in Web Browser**:
   - Navigate to: `http://localhost/sunrise-hotel/index.html` or `http://localhost/sunrise-hotel/booking.html`

4. **Submit Booking Form**:
   - The form will submit via `POST` to `process_booking.php`.
   - The PHP script will independently calculate and display the official verified receipt.

---

## 🎯 Verification of Project Tasks

### Task 1: Interface and Booking Form
- Captures: Customer Name, National ID/Passport, Email, 10-digit Phone, Check-in Date, Nights (1-14), Room Type, Guests, Breakfast buffet, Airport transfer, and Laundry service.
- Implements semantic HTML controls: text inputs, date pickers, number fields, select dropdown, and styled checkboxes.

### Task 2: JavaScript Validation
- Validates:
  - Name is not empty (min 2 chars).
  - Email format matching standard email pattern.
  - Phone contains exactly 10 numeric digits.
  - Nights must be between 1 and 14.
  - Number of guests greater than 0 and within room capacity.
  - Room type is selected.
- Displays inline red error messages and blocks submission via `event.preventDefault()`.

### Task 3: Dynamic JavaScript Behavior
- Displays maximum room capacity immediately when a room is chosen.
- Shows dynamic capacity warning when guests exceed capacity.
- Toggles flight details input when Airport Transfer is checked.
- Real-time live package summary and price changes without page reload.

### Task 4: JavaScript Bill Calculator
- Rates applied:
  - Single: KSh 3,500/night (Max 1)
  - Double: KSh 5,000/night (Max 2)
  - Family: KSh 7,500/night (Max 4)
  - Breakfast: KSh 700 / person / day
  - Airport Transfer: KSh 2,000 flat
  - Laundry: KSh 1,000 flat (Requirement #4)
- **Formula**: `Total = Room Cost + Breakfast + Airport Transfer + Laundry`
- Automatic real-time updates on `input` and `change` events.

### Task 5: JavaScript Functions and Events
- User-defined functions:
  - `validateBooking(event)`
  - `calculateBill()`
  - `checkRoomCapacity()`
  - `toggleAirportTransfer()`
  - `formatCurrency(amount)`
- Events demonstrated: `submit`, `change`, `input`, `click`.

### Task 6: PHP Processing
- Retrieves `$_POST` data.
- Enforces independent server-side validation.
- Recalculates amount from scratch on the server (does not trust client JavaScript).
- Renders receipt matching required output:
  ```text
  BOOKING CONFIRMED
  Customer: Marvin Frank
  Room: Double Room
  Guests: 2
  Number of Nights: 3
  Breakfast: Yes
  Airport Transfer: Yes
  TOTAL AMOUNT: KSh 21,200
  Thank you for choosing Sunrise Hotel.
  ```

### Task 8 & Individualization Requirement (#4)
- Individualization: Last digit 4 implements **Laundry service option costing KSh 1,000**.
- Fully integrated in JavaScript live calculator and PHP server verification.
