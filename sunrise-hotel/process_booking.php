<?php
/**
 * Sunrise Hotel - Room Booking and Billing System
 * Server-Side Booking Processor (process_booking.php)
 * 
 * Task 6: PHP Processing
 * - Retrieves submitted data via POST method
 * - Performs rigorous server-side validation
 * - Independently calculates and verifies the bill total
 * - Renders a professional, well-formatted Booking Confirmation receipt
 */

// Define standard hotel pricing and room capacities (Server-authoritative)
$ROOM_PRICING = [
    'Single' => ['name' => 'Single Room', 'rate' => 3500, 'max_guests' => 1],
    'Double' => ['name' => 'Double Room', 'rate' => 5000, 'max_guests' => 2],
    'Family' => ['name' => 'Family Room', 'rate' => 7500, 'max_guests' => 4],
    'Executive' => ['name' => 'Executive Room', 'rate' => 10000, 'max_guests' => 2]
];

$BREAKFAST_RATE_PER_PERSON_PER_DAY = 700;
$AIRPORT_TRANSFER_FEE = 2000;
$LAUNDRY_SERVICE_FEE = 1000; // Individualization requirement (#4: Last digit 4)

// Check if form was submitted via POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: booking.html");
    exit();
}

// 1. Retrieve and sanitize inputs from $_POST
$customer_name   = isset($_POST['customer_name']) ? trim(htmlspecialchars($_POST['customer_name'])) : '';
$id_number       = isset($_POST['id_number']) ? trim(htmlspecialchars($_POST['id_number'])) : '';
$email           = isset($_POST['email']) ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
$phone           = isset($_POST['phone']) ? preg_replace('/[^0-9]/', '', trim($_POST['phone'])) : '';
$check_in_date   = isset($_POST['check_in_date']) ? trim(htmlspecialchars($_POST['check_in_date'])) : '';
$nights          = isset($_POST['nights']) ? intval($_POST['nights']) : 0;
$room_type       = isset($_POST['room_type']) ? trim($_POST['room_type']) : '';
$guests          = isset($_POST['guests']) ? intval($_POST['guests']) : 0;
$has_breakfast   = isset($_POST['breakfast']) && ($_POST['breakfast'] === 'yes' || $_POST['breakfast'] === 'on');
$has_transfer    = isset($_POST['airport_transfer']) && ($_POST['airport_transfer'] === 'yes' || $_POST['airport_transfer'] === 'on');
$flight_details  = isset($_POST['flight_details']) ? trim(htmlspecialchars($_POST['flight_details'])) : '';
$has_laundry     = isset($_POST['laundry']) && ($_POST['laundry'] === 'yes' || $_POST['laundry'] === 'on');
$client_total    = isset($_POST['client_total']) ? trim($_POST['client_total']) : '';

// 2. Server-side Validation
$errors = [];

// Name validation
if (empty($customer_name)) {
    $errors[] = "Customer full name is required and cannot be empty.";
} elseif (strlen($customer_name) < 2) {
    $errors[] = "Customer name must be at least 2 characters long.";
}

// National ID/Passport validation
if (empty($id_number)) {
    $errors[] = "National ID or Passport number is required.";
}

// Email format validation
if (empty($email)) {
    $errors[] = "Email address is required.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email address format provided.";
}

// Phone number: Exactly 10 digits
if (empty($phone)) {
    $errors[] = "Phone number is required.";
} elseif (strlen($phone) !== 10) {
    $errors[] = "Phone number must contain exactly 10 digits (provided: " . strlen($phone) . " digits).";
}

// Check-in date validation
if (empty($check_in_date)) {
    $errors[] = "Check-in date is required.";
}

// Number of nights between 1 and 14
if ($nights < 1 || $nights > 14) {
    $errors[] = "Number of nights must be between 1 and 14 nights.";
}

// Room type validation
if (empty($room_type) || !array_key_exists($room_type, $ROOM_PRICING)) {
    $errors[] = "A valid room type must be selected.";
}

// Number of guests greater than zero and capacity check
if ($guests <= 0) {
    $errors[] = "Number of guests must be greater than zero.";
} elseif (isset($ROOM_PRICING[$room_type])) {
    $max_capacity = $ROOM_PRICING[$room_type]['max_guests'];
    if ($guests > $max_capacity) {
        $errors[] = "Number of guests ($guests) exceeds the maximum allowed capacity ($max_capacity) for " . $ROOM_PRICING[$room_type]['name'] . ".";
    }
}

// If validation errors exist, render the error notice
if (!empty($errors)) {
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Submission Error - Sunrise Hotel</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <header class="header">
            <div class="nav-container">
                <a href="index.html" class="logo-group">
                    <div class="logo-icon">&#9728;</div>
                    <div>
                        <div class="hotel-name">Sunrise Hotel</div>
                        <div class="hotel-tagline">Excellence in Hospitality</div>
                    </div>
                </a>
            </div>
        </header>

        <div class="container" style="max-width: 650px;">
            <div class="form-card" style="border-top: 4px solid var(--error-color);">
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <div style="font-size: 3rem; color: var(--error-color); line-height: 1;">&#9888;</div>
                    <h2 style="color: var(--error-color); margin-top: 0.5rem;">Booking Validation Failed</h2>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">
                        Server-side security verification detected errors in your submission.
                    </p>
                </div>

                <div style="background-color: var(--error-bg); border: 1px solid #fecaca; border-radius: 6px; padding: 1.25rem; margin-bottom: 2rem;">
                    <ul style="color: #991b1b; padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.7;">
                        <?php foreach ($errors as $error): ?>
                            <li><?php echo htmlspecialchars($error); ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>

                <div style="text-align: center;">
                    <a href="booking.html" class="btn-primary" style="display: inline-block;">
                        &larr; Return to Booking Form
                    </a>
                </div>
            </div>
        </div>
    </body>
    </html>
    <?php
    exit();
}

// 3. Independent Server-Side Bill Calculation
// Note: We do NOT rely on JavaScript amounts; we calculate from scratch.
$selected_room = $ROOM_PRICING[$room_type];
$room_rate = $selected_room['rate'];
$room_name = $selected_room['name'];

// Room Cost = Rate * Nights
$room_total = $room_rate * $nights;

// Breakfast Cost = Nights * Guests * 700
$breakfast_total = 0;
if ($has_breakfast) {
    $breakfast_total = $nights * $guests * $BREAKFAST_RATE_PER_PERSON_PER_DAY;
}

// Airport Transfer = Flat 2,000
$transfer_total = 0;
if ($has_transfer) {
    $transfer_total = $AIRPORT_TRANSFER_FEE;
}

// Laundry Service = Flat 1,000 (Individualization requirement #4)
$laundry_total = 0;
if ($has_laundry) {
    $laundry_total = $LAUNDRY_SERVICE_FEE;
}

// Final Verified Grand Total
$grand_total = $room_total + $breakfast_total + $transfer_total + $laundry_total;

// Generate reference number & timestamp
$booking_reference = "SHB-" . strtoupper(substr(md5(uniqid(rand(), true)), 0, 6));
$current_timestamp = date("d M Y, h:i A");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmed - Sunrise Hotel</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .verified-badge {
            display: inline-block;
            background: #dcfce7;
            color: #15803d;
            font-size: 0.8rem;
            font-weight: 700;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            margin-top: 0.5rem;
            border: 1px solid #86efac;
        }
    </style>
</head>
<body>
    <!-- Navigation Header -->
    <header class="header">
        <div class="nav-container">
            <a href="index.html" class="logo-group">
                <div class="logo-icon">&#9728;</div>
                <div>
                    <div class="hotel-name">Sunrise Hotel</div>
                    <div class="hotel-tagline">Excellence in Hospitality</div>
                </div>
            </a>
            <ul class="nav-links">
                <li><a href="index.html">Overview</a></li>
                <li><a href="booking.html" class="active">Room Reservation</a></li>
                <li><a href="index.html#accommodations">76 Rooms</a></li>
                <li><a href="index.html#location">Contact</a></li>
            </ul>
        </div>
    </header>

    <div class="container">
        <!-- Booking Confirmation Voucher -->
        <div class="confirmation-container">
            <div class="confirmation-banner">
                <div style="font-size: 2.25rem; margin-bottom: 0.25rem;">&#10004;</div>
                <h1>BOOKING CONFIRMED</h1>
                <p>Your room reservation has been successfully verified and secured.</p>
                <div class="verified-badge">&#128737; Server-Side Bill Calculation Verified</div>
            </div>

            <div class="receipt-body">
                <div class="receipt-header-meta">
                    <div>
                        <strong>Reference:</strong> <?php echo htmlspecialchars($booking_reference); ?>
                    </div>
                    <div>
                        <strong>Date Issued:</strong> <?php echo htmlspecialchars($current_timestamp); ?>
                    </div>
                </div>

                <!-- Structured Prompt Matching Output -->
                <table class="receipt-table">
                    <tbody>
                        <tr>
                            <th>Customer:</th>
                            <td><?php echo htmlspecialchars($customer_name); ?></td>
                        </tr>
                        <tr>
                            <th>ID / Passport No:</th>
                            <td><?php echo htmlspecialchars($id_number); ?></td>
                        </tr>
                        <tr>
                            <th>Email Address:</th>
                            <td><?php echo htmlspecialchars($email); ?></td>
                        </tr>
                        <tr>
                            <th>Phone Number:</th>
                            <td><?php echo htmlspecialchars($phone); ?></td>
                        </tr>
                        <tr>
                            <th>Check-in Date:</th>
                            <td><?php echo htmlspecialchars($check_in_date); ?></td>
                        </tr>
                        <tr>
                            <th>Room:</th>
                            <td><?php echo htmlspecialchars($room_name); ?> (KSh <?php echo number_format($room_rate); ?>/night)</td>
                        </tr>
                        <tr>
                            <th>Guests:</th>
                            <td><?php echo htmlspecialchars($guests); ?> (Max: <?php echo $selected_room['max_guests']; ?>)</td>
                        </tr>
                        <tr>
                            <th>Number of Nights:</th>
                            <td><?php echo htmlspecialchars($nights); ?></td>
                        </tr>
                        <tr>
                            <th>Breakfast:</th>
                            <td>
                                <?php if ($has_breakfast): ?>
                                    Yes (KSh <?php echo number_format($breakfast_total); ?>)
                                <?php else: ?>
                                    No
                                <?php endif; ?>
                            </td>
                        </tr>
                        <tr>
                            <th>Airport Transfer:</th>
                            <td>
                                <?php if ($has_transfer): ?>
                                    Yes (KSh <?php echo number_format($transfer_total); ?>)
                                    <?php if (!empty($flight_details)): ?>
                                        <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: normal;">
                                            Flight: <?php echo htmlspecialchars($flight_details); ?>
                                        </div>
                                    <?php endif; ?>
                                <?php else: ?>
                                    No
                                <?php endif; ?>
                            </td>
                        </tr>
                        <?php if ($has_laundry): ?>
                        <tr>
                            <th>Laundry Service:</th>
                            <td>Yes (KSh <?php echo number_format($laundry_total); ?>)</td>
                        </tr>
                        <?php endif; ?>
                        <tr>
                            <th>Room Subtotal:</th>
                            <td>KSh <?php echo number_format($room_total); ?></td>
                        </tr>
                    </tbody>
                </table>

                <!-- Grand Total Display -->
                <div class="receipt-grand-total">
                    <span class="receipt-grand-total-label">TOTAL AMOUNT:</span>
                    <span class="receipt-grand-total-val">KSh <?php echo number_format($grand_total); ?></span>
                </div>

                <div class="receipt-footer-note">
                    Thank you for choosing Sunrise Hotel. We look forward to welcoming you!
                </div>

                <div class="receipt-buttons">
                    <button onclick="window.print()" class="btn-primary" style="background-color: var(--primary-color);">
                        &#128438; Print Receipt
                    </button>
                    <a href="booking.html" class="btn-primary">
                        + New Booking
                    </a>
                    <a href="index.html" class="btn-secondary" style="border-color: var(--primary-color); color: var(--primary-color);">
                        Home
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-bottom">
            &copy; <?php echo date("Y"); ?> Sunrise Hotel. All rights reserved. Automated Hotel Reservation & Billing Prototype.
        </div>
    </footer>
</body>
</html>
