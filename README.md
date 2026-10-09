# Sunrise Hotel

[![PHP Version](https://img.shields.io/badge/PHP-8.0%2B-777BB4?style=flat&logo=php&logoColor=white)](https://www.php.net/)
[![HTML5](https://img.shields.io/badge/HTML-5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS-3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-Proprietary-blue.svg)](#)

A modern, responsive, and secure web-based room reservation and automated billing system developed for **Sunrise Hotel**, a luxury oceanfront boutique resort in Diani Beach, South Coast, Kenya (*"Nature · Comfort · Luxury"*).

The platform provides guests with seamless suite exploration, live stay schedule calculations, dynamic multi-currency bill estimation, GPS navigation, and verified server-side booking processing.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Client Browser                        │
│                                                             │
│   index.html              booking.html                      │
│   (Resort Overview)       (Reservation Form)                │
│            │                       │                        │
│            ▼                       ▼                        │
│   Geolocation API         script.js (ES6 Engine)            │
│   • GPS Coordinates       • Form Validation                 │
│   • Haversine Distance    • Dynamic Capacity Checks         │
│   • Google Maps Routing   • Real-Time Bill Calculator       │
│                           • Multi-Currency Converter        │
│                           • Draft State (localStorage)      │
└────────────────────────────────────┬────────────────────────┘
                                     │ HTTP POST (Form Data)
                                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Web Server (Apache / PHP)                │
│                                                             │
│   process_booking.php                                       │
│   • Request Sanitization & Anti-XSS Filtering               │
│   • Independent Server-Side Data Validation                 │
│   • Strict Room Capacity & Duration Rules Enforcement       │
│   • Independent Tariff Re-calculation                       │
│   • Cryptographic Booking Reference Generation              │
│   • Formatted Confirmation Invoice Output                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Room Inventory & Tariffs

| Room Suite | Nightly Tariff | Maximum Capacity | Ideal Occupancy & Amenities |
| :--- | :---: | :---: | :--- |
| **Single Room** | `KSh 3,500` | 1 Guest | 1 Queen Bed, ensuite rain shower, workstation, Wi-Fi |
| **Double Room** | `KSh 5,000` | 2 Guests | 1 King Bed, private ocean balcony, Nespresso bar, AC |
| **Family Room** | `KSh 7,500` | 4 Guests | 1 King + 2 Twin beds, dual zones, double vanity bath |

### Auxiliary Hospitality Services

| Service | Rate / Pricing Structure | Description |
| :--- | :---: | :--- |
| **Gourmet Buffet Breakfast** | `KSh 700` / person / night | Full chef-curated continental & Swahili breakfast buffet |
| **VIP Airport Transfer** | `KSh 2,000` fixed per stay | Chauffeured airport transfer from MBA Airport or Ukunda Airstrip |
| **Express Laundry Service** | `KSh 1,000` fixed per stay | Same-day washing, pressing, and gentle garment fabric care |

---

## Core Workflows & Business Logic

### 1. Client-Side Validation Engine
Function: `validateBooking(event)`
- **Full Name:** Non-empty, minimum length of 3 characters.
- **National ID / Passport:** Non-empty string.
- **Email Address:** Standard RFC-compliant regex pattern (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
- **Phone Number:** Exactly 10 numeric digits (`/^\d{10}$/`, e.g., `0712345678`).
- **Stay Duration:** Integer between 1 and 14 nights.
- **Guest Count:** Strictly positive integer (`> 0`).
- **Room Selection & Capacity:** Enforces that a suite is selected and verifies that `guests <= room.maxGuests`.
- **Submission Guard:** Prevents form submission and scrolls to the alert summary if any constraint fails.

### 2. Automated Bill Calculator
Function: `calculateBill()`
Calculates real-time financial obligations according to:
$$\text{Total} = (\text{Room Rate} \times \text{Nights}) + (\text{Guests} \times \text{Nights} \times 700) + \text{Transfer Fee} + \text{Add-ons} - \text{Discounts}$$

### 3. Dynamic Suite Capacity & Add-on Controls
Functions: `checkRoomCapacity()`, `toggleAirportTransferDetails()`, `updateCheckoutDate()`
- Changing the selected room type dynamically updates maximum guest indicators and triggers a warning banner if guest counts exceed suite limits.
- Checking the Airport Transfer option reveals conditionally styled fields for flight number, estimated arrival time, and terminal selection.
- Selecting a check-in date and duration dynamically computes the departure calendar date.

### 5. Geolocation Routing API
Functions: `getDirectionsToHotel()`, `haversineDistanceKm()`
- Coordinates: `Latitude: -4.2798, Longitude: 39.5936` (Diani Beach, Kenya).
- Requests user position via `navigator.geolocation.getCurrentPosition`.
- Computes direct distance and opens Google Maps turn-by-turn routing between the guest's location and the hotel.

### 6. Cookie Consent & LocalStorage Persistence
Functions: `initCookieConsent()`, `acceptAllCookies()`, `essentialCookiesOnly()`, `saveBookingDraft()`, `restoreBookingDraft()`
- Manages cookie banner display and stores consent preference in `localStorage`.
- Safely saves contact fields in the browser session to preserve guest inputs across page visits.

---

## Browser Support & Accessibility

- **Google Chrome:** 85+ (Full support)
- **Mozilla Firefox:** 80+ (Full support)
- **Apple Safari:** 14+ (Full support)
- **Microsoft Edge:** 85+ (Full support)
- **Mobile Browsers:** Fully responsive on iOS Safari and Android Chrome with touch-friendly form controls and dynamic viewports.

---

## Contact & Support

**Sunrise Hotel**  
Beach Road, Diani Beach, South Coast, Kenya  
- **Reservations:** [marvinfrank2680@gmail.co](marvinfrank2680@gmail.com)  
- **General Inquiries:** [marvinfrank2680@gmail.co](marvinfrank2680@gmail.co)  
- **24/7 Front Desk Hotline:** [+254748642275](tel:+254748642275)  

&copy; 2026 Sunrise Hotel Ltd. All rights reserved.
