/**
 * Sunrise Hotel - 5-Star Coastal Luxury Resort & Online Room Reservation System
 * 
 * Features:
 * 1. 76 distinct rooms listed sequentially starting from Room 1 (Room 1 to Room 76).
 * 2. 76 DIFFERENT unique images: every single room has its own individual photograph with zero repeats.
 * 3. Each floor has ALL 4 types of rooms: Single, Double, Family, and Executive.
 * 4. Dining section displays the Swahili dish videos cleanly without any auto-cycling feed clutter.
 * 5. Section Order: Dining Section comes FIRST, followed by Visitor Suggestions below it.
 * 6. Interactive Google Maps location embed for Sunrise Hotel in Mombasa, Kenya.
 * 7. Real-time Room Booking Status: "Available" vs "Booked".
 *    - Automatically unbooks when stay is finished.
 * 8. Tariffs removed from Homepage; they automatically calculate and add up when the booking section is opened.
 * 9. Customer enters their own details directly when booking.
 * 10. Contact Details: Telephone +254748642275, Email marvinfrank2680@gmail.com.
 * 11. Luxury Cookie Consent Banner with persistent preference.
 */

import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Users,
  CheckCircle2,
  AlertTriangle,
  Coffee,
  Plane,
  Shirt,
  Printer,
  ShieldCheck,
  Bed,
  Check,
  ChevronRight,
  Info,
  ArrowRight,
  X,
  Phone,
  Mail,
  Send,
  Cookie,
  Clock,
  Lock,
  Unlock,
  CheckCircle,
  Eye,
  Filter,
  Sparkles,
  MapPin,
  UtensilsCrossed,
  ExternalLink,
  Play,
  Sun,
  Moon,
  Menu,
  Wind,
  Waves,
  Compass
} from "lucide-react";

// Visitor Suggestion Interface: STRICTLY suggestion, visitor name, and visitor location ONLY
interface VisitorSuggestion {
  id: string;
  name: string;
  location: string;
  suggestion: string;
}

const INITIAL_SUGGESTIONS: VisitorSuggestion[] = [
  {
    id: "sug-1",
    name: "James Gategi",
    location: "Nakuru, Kenya",
    suggestion: "Make sure to add the breakfast buffet option during booking—the fresh coastal passion fruit juice and warm Swahili pastries are exceptional every single morning!"
  },
  {
    id: "sug-2",
    name: "Reginah Wairimu",
    location: "Muranga, Kenya",
    suggestion: "If you have a late flight arriving at Mombasa airport, request the Chauffeured Airport Transfer. The driver was waiting at Arrivals holding a name board and made check-in effortless."
  },
  {
    id: "sug-3",
    name: "Benedict Mwangi",
    location: "Nairobi, Kenya",
    suggestion: "Book the top-floor Penthouse suites for an uninterrupted 360-degree ocean sunset view over the Indian Ocean."
  },
  {
    id: "sug-4",
    name: "Hope Motaro",
    location: "Kisii, Kenya",
    suggestion: "The ambience of the coastal view from the balcony is the best and also sandbathing at the shores made it even more intresting, making my stay to be excelent and i will be vising agin very soon."
  },
  {
    id: "sug-5",
    name: "Mary Muiruri",
    location: "Nakuru, Kenya",
    suggestion: "Ground Floor Garden rooms are quiet and offer step-out access to private lawns surrounded by palms, which is perfect if you want zero stairs."
  },
  {
    id: "sug-6",
    name: "Laurine Atieno",
    location: "Kisumu, Kenya",
    suggestion: "The express valet laundry had our vacation clothing washed, steam pressed, and delivered back to our room in under 5 hours. Highly recommend checking that option!"
  },
  {
    id: "sug-7",
    name: "Levin Mwei",
    location: "Kericho, Kenya",
    suggestion: "Early morning swims in the infinity pool between 6:30 and 8:00 AM offer the calmest ocean views with the sunrise right in front of you."
  }
];

// Swahili Coastal Dishes Interface
interface SwahiliDish {
  id: string;
  name: string;
  swahiliName: string;
  category: string;
  description: string;
  origin: string;
  videoUrl: string;
  posterUrl: string;
  flavorNotes: string[];
}

const SWAHILI_DISHES: SwahiliDish[] = [
  {
    id: "dish-1",
    name: "Coastal Swahili Biryani",
    swahiliName: "Biryani ya Pwani",
    category: "Signature Main Course",
    description: "Aromatic saffron and turmeric basmati rice layered with slow-simmered tender meat in rich caramelized tomato-onion masala, garnished with golden fried onions, fresh coriander, and hard-boiled egg.",
    origin: "Mombasa Old Town & Coast",
    videoUrl: "/videos/dish_biryani.mp4",
    posterUrl: "/images/swahili_biryani_coastal_1791488036200.jpg",
    flavorNotes: ["Saffron Basmati", "Slow-Simmered Meat", "Coastal Masala", "Caramelized Crispy Onions"]
  },
  {
    id: "dish-2",
    name: "Charcoal Grilled Fish in Coconut Curry",
    swahiliName: "Samaki wa Kupaka",
    category: "Fresh Ocean Catch",
    description: "Whole freshly-caught Indian Ocean red snapper, marinated in tamarind and garlic, flame-grilled over coconut charcoal embers and basted with velvety spiced coconut cream and turmeric glaze.",
    origin: "Mombasa & Malindi Coastline",
    videoUrl: "/videos/dish_samaki_kupaka.mp4",
    posterUrl: "/images/samaki_wa_kupaka_1791488054917.jpg",
    flavorNotes: ["Charcoal Grilled Snapper", "Coconut Tamarind Glaze", "Fresh Lime Wedges", "Swahili Kachumbari"]
  },
  {
    id: "dish-3",
    name: "Garlic Coconut Jumbo Tiger Prawns",
    swahiliName: "Kamba wa Nazi",
    category: "Seafood Delicacy",
    description: "Succulent wild ocean jumbo tiger prawns simmered in freshly-grated thick coconut cream with crushed garlic, ginger, and lime juice, served in a carved coconut bowl with flaky coastal chapati.",
    origin: "Diani Beach & Ocean Veranda",
    videoUrl: "/videos/dish_kamba_nazi.mp4",
    posterUrl: "/images/kamba_wa_nazi_1791488072068.jpg",
    flavorNotes: ["Wild Jumbo Tiger Prawns", "Pressed Coconut Cream", "Garlic & Ginger", "Flaky Coastal Chapati"]
  },
  {
    id: "dish-4",
    name: "Cardamom Beignets & Coconut Pigeon Peas",
    swahiliName: "Mahamri na Mbaazi za Nazi",
    category: "Coastal Breakfast Tradition",
    description: "The time-honored coastal morning classic: golden, fluffy triangular mahamri pastries delicately spiced with ground cardamom, paired with pigeon peas simmered in rich sweet coconut milk and spiced chai tea.",
    origin: "Lamu Heritage & Coastal Veranda",
    videoUrl: "/videos/dish_mahamri_mbaazi.mp4",
    posterUrl: "/images/mahamri_mbaazi_1791488097813.jpg",
    flavorNotes: ["Golden Cardamom Mahamri", "Creamy Mbaazi za Nazi", "Grated Fresh Coconut", "Coastal Spiced Chai"]
  }
];

// Room Item Interface
export interface RoomItem {
  roomNo: number; // 1 to 76
  name: string;
  category: "Single" | "Double" | "Family" | "Executive";
  rate: number; // Used for calculation in booking; NOT displayed on homepage
  maxGuests: number;
  floor: string;
  view: string;
  viewType: "Ocean View" | "Garden View" | "No Ocean View";
  beds: string;
  dimensions: string;
  image: string; // 76 DIFFERENT IMAGES: every room has its own photo (strictly rooms with zero people)
  status: "Available" | "Booked";
  bookedBy?: string;
  checkInDate?: string;
  checkOutDate?: string;
  checkOutTimestamp?: number; // Unix timestamp in ms
}

// Generate all 76 Rooms sequentially starting from Room 1 to Room 76
// Crucial Rule 1: EACH FLOOR contains ALL 4 types of room (Single, Double, Family, Executive)!
// Crucial Rule 2: EACH ROOM has its OWN DIFFERENT IMAGE from /images/rooms/room_1.jpg to room_76.jpg!
// Crucial Rule 3: STRICTLY ROOMS located at Sunrise Hotel on the Indian Ocean shore with ZERO people.
//                 Some rooms have ocean view, some have gardens, and some do not have ocean view (interior suites).
const generateAll76Rooms = (): RoomItem[] => {
  const rooms: RoomItem[] = [];

  // 4 floors, 19 rooms per floor = 76 rooms
  // Floor 1: Ground Floor Garden Wing (Rooms 1 - 19)
  // Floor 2: 1st Floor Coral Terrace Wing (Rooms 20 - 38)
  // Floor 3: 2nd Floor Ocean Horizon Wing (Rooms 39 - 57)
  // Floor 4: Penthouse Sunset Panorama Floor (Rooms 58 - 76)

  // Explicit View assignments:
  // No Ocean View (Interior / Courtyard suites): Rooms 1, 2, 3, 5, 6, 7, 20, 21, 39, 40, 43, 44, 58, 59, 62, 63
  // Garden View (Tropical palm & floral garden terraces): Rooms 4, 8, 9, 10, 11, 12, 13, 22, 23, 24, 25, 26, 31, 32, 50, 51, 69, 70
  // Ocean View (Indian Ocean panorama, coral reef shoreline, sunset horizon): All remaining rooms
  const noOceanRoomSet = new Set([1, 2, 3, 5, 6, 7, 20, 21, 39, 40, 43, 44, 58, 59, 62, 63]);
  const gardenRoomSet = new Set([4, 8, 9, 10, 11, 12, 13, 22, 23, 24, 25, 26, 31, 32, 50, 51, 69, 70]);

  for (let i = 1; i <= 76; i++) {
    let floor = "Ground Floor Garden Wing";
    let floorIndex = 0;
    if (i <= 19) {
      floor = "Ground Floor Garden Wing";
      floorIndex = 0;
    } else if (i <= 38) {
      floor = "1st Floor Coral Terrace Wing";
      floorIndex = 1;
    } else if (i <= 57) {
      floor = "2nd Floor Ocean Horizon Wing";
      floorIndex = 2;
    } else {
      floor = "Penthouse Sunset Panorama Floor";
      floorIndex = 3;
    }

    // Position within the floor (0 to 18)
    const pos = (i - 1) % 19;

    let category: "Single" | "Double" | "Family" | "Executive" = "Double";
    let rate = 5000;
    let maxGuests = 2;
    let beds = "1 Queen Bed";
    let dimensions = "42 m²";

    // Guarantee that EACH FLOOR has ALL 4 types of rooms:
    // Positions 0 - 3 (4 rooms per floor): Single
    // Positions 4 - 10 (7 rooms per floor): Double
    // Positions 11 - 15 (5 rooms per floor): Family
    // Positions 16 - 18 (3 rooms per floor): Executive
    if (pos < 4) {
      category = "Single";
      rate = 3500;
      maxGuests = 1;
      beds = "1 Single Bed";
      dimensions = "28 m²";
    } else if (pos < 11) {
      category = "Double";
      rate = 5000;
      maxGuests = 2;
      beds = "1 Queen Bed";
      dimensions = "42 m²";
    } else if (pos < 16) {
      category = "Family";
      rate = 7500;
      maxGuests = 4;
      beds = "2 King / Twin Beds";
      dimensions = "68 m²";
    } else {
      category = "Executive";
      rate = 10000;
      maxGuests = 2;
      beds = "1 King Presidential Bed";
      dimensions = "92 m²";
    }

    // Determine View Type & Detailed View Description
    let viewType: "Ocean View" | "Garden View" | "No Ocean View" = "Ocean View";
    let view = "Indian Ocean View";

    if (noOceanRoomSet.has(i)) {
      viewType = "No Ocean View";
      view = floorIndex === 0
        ? "Quiet Interior Courtyard Suite (No Ocean View)"
        : floorIndex === 1
        ? "Interior Architecture Suite (No Ocean View)"
        : floorIndex === 2
        ? "Private Atrium Suite (No Ocean View)"
        : "Penthouse Sky Courtyard (No Ocean View)";
    } else if (gardenRoomSet.has(i)) {
      viewType = "Garden View";
      view = floorIndex === 0
        ? "Ground Floor Tropical Garden & Palm Patio"
        : floorIndex === 1
        ? "Coral Terrace Botanical Garden View"
        : floorIndex === 2
        ? "Elevated Garden & Poolside Landscape"
        : "Sky Rooftop Garden Terrace";
    } else {
      viewType = "Ocean View";
      view = floorIndex === 0
        ? "Beachfront Indian Ocean Shoreline View"
        : floorIndex === 1
        ? "Coral Terrace Indian Ocean Balcony"
        : floorIndex === 2
        ? "Panoramic Indian Ocean Horizon"
        : "Royal Sunset Indian Ocean 360° Panorama";
    }

    // Customer must book a room for it to show as Booked (not pre-booked arbitrarily)
    const isInitiallyBooked = false;

    rooms.push({
      roomNo: i,
      name: `Room ${i} – ${
        category === "Single"
          ? "Single Boutique Suite"
          : category === "Double"
          ? "Deluxe Ocean Terrace"
          : category === "Family"
          ? "Family Horizon Suite"
          : "Executive Penthouse Suite"
      }`,
      category,
      rate,
      maxGuests,
      floor,
      view,
      viewType,
      beds,
      dimensions,
      // 76 DIFFERENT UNIQUE IMAGES (Room 1 to Room 76 each has its own unique photo, zero people)
      image: `/images/rooms/room_${i}.jpg`,
      status: "Available",
      checkInDate: undefined,
      checkOutDate: undefined,
      checkOutTimestamp: undefined
    });
  }

  return rooms;
};

// Load saved customer bookings so booked rooms persist and show to others
const loadInitialRooms = (): RoomItem[] => {
  const base = generateAll76Rooms();
  try {
    const saved = localStorage.getItem("sunrise_customer_bookings");
    if (saved) {
      const bookings: Record<
        number,
        { bookedBy: string; checkInDate: string; checkOutDate: string; checkOutTimestamp?: number }
      > = JSON.parse(saved);
      const now = Date.now();
      let hasExpired = false;
      const updated = base.map(r => {
        const b = bookings[r.roomNo];
        if (b) {
          if (b.checkOutTimestamp && now >= b.checkOutTimestamp) {
            hasExpired = true;
            delete bookings[r.roomNo];
            return r;
          }
          return {
            ...r,
            status: "Booked" as const,
            bookedBy: b.bookedBy,
            checkInDate: b.checkInDate,
            checkOutDate: b.checkOutDate,
            checkOutTimestamp: b.checkOutTimestamp
          };
        }
        return r;
      });
      if (hasExpired) {
        localStorage.setItem("sunrise_customer_bookings", JSON.stringify(bookings));
      }
      return updated;
    }
  } catch (e) {
    console.error("Could not load stored customer bookings", e);
  }
  return base;
};

interface BookingFormData {
  customer_name: string;
  id_number: string;
  email: string;
  phone: string;
  check_in_date: string;
  nights: number;
  selected_room_no: number;
  guests: number;
  breakfast: boolean;
  airport_transfer: boolean;
  flight_details: string;
  laundry: boolean;
  special_requests: string;
}

interface FormErrors {
  customer_name?: string;
  id_number?: string;
  email?: string;
  phone?: string;
  check_in_date?: string;
  nights?: string;
  guests?: string;
}

interface ConfirmedBooking extends BookingFormData {
  reference: string;
  timestamp: string;
  room_name: string;
  room_rate: number;
  room_total: number;
  breakfast_total: number;
  transfer_total: number;
  laundry_total: number;
  grand_total: number;
}

export default function App() {
  const [activeView, setActiveView] = useState<"home" | "booking" | "confirmation">("home");

  // All 76 Rooms starting from Room 1 to Room 76 (Customer booking updates this and shows to others)
  const [allRooms, setAllRooms] = useState<RoomItem[]>(() => loadInitialRooms());

  // 3-hyphen navigation menu state
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Dark / Light Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("sunrise_theme");
      if (saved) return saved === "dark";
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      try {
        localStorage.setItem("sunrise_theme", next ? "dark" : "light");
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter state for Room Directory
  const [floorTab, setFloorTab] = useState<string>("All");
  const [roomFilterCategory, setRoomFilterCategory] = useState<string>("All");
  const [roomFilterView, setRoomFilterView] = useState<string>("All");
  const [roomFilterStatus, setRoomFilterStatus] = useState<string>("All");
  const [roomSearchQuery, setRoomSearchQuery] = useState<string>("");

  // Notification Toast (e.g., when a room is unbooked)
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Visitor Suggestions (strictly suggestion, visitor name, visitor location)
  const [suggestions, setSuggestions] = useState<VisitorSuggestion[]>(INITIAL_SUGGESTIONS);
  const [newSugName, setNewSugName] = useState("");
  const [newSugLocation, setNewSugLocation] = useState("");
  const [newSugText, setNewSugText] = useState("");
  const [sugSubmitted, setSugSubmitted] = useState(false);

  // Quick Room Specs Modal
  const [specsModalRoom, setSpecsModalRoom] = useState<RoomItem | null>(null);

  // Cookie Consent Banner
  const [cookieAccepted, setCookieAccepted] = useState<boolean>(() => {
    try {
      return localStorage.getItem("sunrise_cookie_consent") === "accepted";
    } catch {
      return false;
    }
  });

  // Booking Form State (Defaults to Room 1, customer enters their own details)
  const [formData, setFormData] = useState<BookingFormData>({
    customer_name: "",
    id_number: "",
    email: "",
    phone: "",
    check_in_date: "",
    nights: 1,
    selected_room_no: 1,
    guests: 1,
    breakfast: false,
    airport_transfer: false,
    flight_details: "",
    laundry: false,
    special_requests: ""
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitErrorNotice, setSubmitErrorNotice] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  // Form input refs for auto-focus
  const nameInputRef = useRef<HTMLInputElement>(null);
  const idInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Set default check-in date (tomorrow)
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFormData(p => ({ ...p, check_in_date: tomorrow.toISOString().split("T")[0] }));
  }, []);

  // AUTOMATIC STAY-COMPLETION UNBOOKING ENGINE
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setAllRooms(prevRooms => {
        let changed = false;
        let unbookedRoomNumber: number | null = null;

        const updated = prevRooms.map(room => {
          if (room.status === "Booked" && room.checkOutTimestamp && now >= room.checkOutTimestamp) {
            changed = true;
            unbookedRoomNumber = room.roomNo;
            return {
              ...room,
              status: "Available" as const,
              bookedBy: undefined,
              checkInDate: undefined,
              checkOutDate: undefined,
              checkOutTimestamp: undefined
            };
          }
          return room;
        });

        if (changed && unbookedRoomNumber !== null) {
          try {
            const saved = localStorage.getItem("sunrise_customer_bookings");
            if (saved) {
              const bookings = JSON.parse(saved);
              delete bookings[unbookedRoomNumber];
              localStorage.setItem("sunrise_customer_bookings", JSON.stringify(bookings));
            }
          } catch (e) {
            console.error("Error updating bookings in localStorage", e);
          }
          showToast(`Room ${unbookedRoomNumber} stay completed! It is now automatically unbooked and available.`);
          return updated;
        }
        return prevRooms;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 5000);
  };

  // Currently selected room details
  const activeRoom = allRooms.find(r => r.roomNo === formData.selected_room_no) || allRooms[0];
  const activeRate = activeRoom.rate;
  const activeMaxGuests = activeRoom.maxGuests;

  // Real-time bill calculations
  const roomCost = activeRate * formData.nights;
  const breakfastCost = formData.breakfast ? formData.nights * formData.guests * 700 : 0;
  const transferCost = formData.airport_transfer ? 2000 : 0;
  const laundryCost = formData.laundry ? 1000 : 0;
  const grandTotal = roomCost + breakfastCost + transferCost + laundryCost;

  const isCapacityExceeded = formData.guests > activeMaxGuests;

  const formatKsh = (amount: number) => {
    return "KSh " + Math.round(amount).toLocaleString("en-KE");
  };

  // Select a room from the 76-room directory
  const handleSelectRoomToBook = (room: RoomItem) => {
    if (room.status === "Booked") {
      showToast(`Room ${room.roomNo} is already booked by ${room.bookedBy || 'another guest'} until ${room.checkOutDate}. Each room can only be booked once. Please choose an available room.`);
      return;
    }

    setFormData(prev => ({
      ...prev,
      selected_room_no: room.roomNo,
      guests: Math.min(prev.guests, room.maxGuests) || 1
    }));
    setSubmitErrorNotice(null);
    setActiveView("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Instant Checkout / Release Simulator
  const handleSimulateFinishStay = (roomNo: number) => {
    setAllRooms(prev => {
      const updated = prev.map(r =>
        r.roomNo === roomNo
          ? {
              ...r,
              status: "Available" as const,
              bookedBy: undefined,
              checkInDate: undefined,
              checkOutDate: undefined,
              checkOutTimestamp: undefined
            }
          : r
      );
      try {
        const saved = localStorage.getItem("sunrise_customer_bookings");
        if (saved) {
          const bookings = JSON.parse(saved);
          delete bookings[roomNo];
          localStorage.setItem("sunrise_customer_bookings", JSON.stringify(bookings));
        }
      } catch (e) {
        console.error("Error updating bookings in localStorage", e);
      }
      return updated;
    });
    showToast(`Stay completed for Room ${roomNo}! The room has been released and is now Available.`);
  };

  // JavaScript Validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    const missing: string[] = [];

    if (!formData.customer_name.trim()) {
      errors.customer_name = "Full name is required.";
      missing.push("Customer Name");
    }

    if (!formData.id_number.trim()) {
      errors.id_number = "National ID or Passport number is required.";
      missing.push("ID / Passport");
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
      missing.push("Email");
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email format.";
      missing.push("Valid Email");
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required.";
      missing.push("Phone Number");
    } else if (cleanPhone.length !== 10) {
      errors.phone = `Must contain exactly 10 digits (currently ${cleanPhone.length}).`;
      missing.push("10-Digit Phone");
    }

    if (!formData.check_in_date) {
      errors.check_in_date = "Check-in date is required.";
      missing.push("Check-in Date");
    }

    if (formData.nights < 1 || formData.nights > 14) {
      errors.nights = "Stay must be between 1 and 14 nights.";
      missing.push("Nights (1-14)");
    }

    if (formData.guests < 1) {
      errors.guests = "At least 1 guest required.";
      missing.push("Guests count");
    } else if (formData.guests > activeMaxGuests) {
      errors.guests = `Room ${activeRoom.roomNo} accommodates a maximum of ${activeMaxGuests} guest(s).`;
      missing.push("Capacity Limit");
    }

    if (activeRoom.status === "Booked") {
      errors.customer_name = `Room ${activeRoom.roomNo} is already booked by ${activeRoom.bookedBy || 'another guest'}. Each room can only be booked once. Please choose an available room.`;
      missing.push(`Room ${activeRoom.roomNo} is already occupied`);
    }

    setFormErrors(errors);

    if (missing.length > 0) {
      setSubmitErrorNotice(`Please complete all required fields: ${missing.join(", ")}.`);
      if (errors.customer_name && nameInputRef.current) {
        nameInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        nameInputRef.current.focus();
      } else if (errors.id_number && idInputRef.current) {
        idInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        idInputRef.current.focus();
      } else if (errors.email && emailInputRef.current) {
        emailInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        emailInputRef.current.focus();
      } else if (errors.phone && phoneInputRef.current) {
        phoneInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        phoneInputRef.current.focus();
      }
      return false;
    }

    setSubmitErrorNotice(null);
    return true;
  };

  // Submit Booking Handler
  const handleConfirmSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (activeRoom.status === "Booked") {
      setSubmitErrorNotice(`Room ${activeRoom.roomNo} is already booked and cannot be booked again. Please select an available room.`);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const checkInObj = new Date(formData.check_in_date);
      const checkOutObj = new Date(checkInObj);
      checkOutObj.setDate(checkOutObj.getDate() + formData.nights);
      const checkOutStr = checkOutObj.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      const checkOutTimestamp = Date.now() + formData.nights * 86400000;

      setAllRooms(prev => {
        const updated = prev.map(r =>
          r.roomNo === formData.selected_room_no
            ? {
                ...r,
                status: "Booked" as const,
                bookedBy: formData.customer_name,
                checkInDate: formData.check_in_date,
                checkOutDate: checkOutStr,
                checkOutTimestamp: checkOutTimestamp
              }
            : r
        );
        try {
          const saved = localStorage.getItem("sunrise_customer_bookings");
          const bookings = saved ? JSON.parse(saved) : {};
          bookings[formData.selected_room_no] = {
            bookedBy: formData.customer_name,
            checkInDate: formData.check_in_date,
            checkOutDate: checkOutStr,
            checkOutTimestamp: checkOutTimestamp
          };
          localStorage.setItem("sunrise_customer_bookings", JSON.stringify(bookings));
        } catch (err) {
          console.error("Error saving customer booking", err);
        }
        return updated;
      });

      const confirmed: ConfirmedBooking = {
        ...formData,
        reference: "SHB-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        timestamp:
          new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          }) +
          " at " +
          new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        room_name: activeRoom.name,
        room_rate: activeRate,
        room_total: roomCost,
        breakfast_total: breakfastCost,
        transfer_total: transferCost,
        laundry_total: laundryCost,
        grand_total: grandTotal
      };

      setConfirmedBooking(confirmed);
      setIsSubmitting(false);
      setActiveView("confirmation");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 450);
  };

  // Add a new visitor suggestion
  const handleAddSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSugName.trim() || !newSugLocation.trim() || !newSugText.trim()) return;

    const newEntry: VisitorSuggestion = {
      id: "sug-" + Date.now(),
      name: newSugName.trim(),
      location: newSugLocation.trim(),
      suggestion: newSugText.trim()
    };

    setSuggestions([newEntry, ...suggestions]);
    setNewSugName("");
    setNewSugLocation("");
    setNewSugText("");
    setSugSubmitted(true);
    setTimeout(() => setSugSubmitted(false), 4000);
  };

  // Filtered rooms logic
  const filteredRooms = allRooms.filter(r => {
    if (floorTab === "Ground" && r.roomNo > 19) return false;
    if (floorTab === "First" && (r.roomNo < 20 || r.roomNo > 38)) return false;
    if (floorTab === "Second" && (r.roomNo < 39 || r.roomNo > 57)) return false;
    if (floorTab === "Penthouse" && r.roomNo < 58) return false;

    const matchesCategory = roomFilterCategory === "All" || r.category === roomFilterCategory;
    const matchesView = roomFilterView === "All" || r.viewType === roomFilterView;
    const matchesStatus = roomFilterStatus === "All" || r.status === roomFilterStatus;
    const matchesSearch =
      roomSearchQuery.trim() === "" ||
      r.roomNo.toString().includes(roomSearchQuery.trim()) ||
      r.name.toLowerCase().includes(roomSearchQuery.toLowerCase()) ||
      r.floor.toLowerCase().includes(roomSearchQuery.toLowerCase()) ||
      r.view.toLowerCase().includes(roomSearchQuery.toLowerCase()) ||
      r.viewType.toLowerCase().includes(roomSearchQuery.toLowerCase());
    return matchesCategory && matchesView && matchesStatus && matchesSearch;
  });

  const bookedCount = allRooms.filter(r => r.status === "Booked").length;
  const availableCount = allRooms.length - bookedCount;

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDarkMode
          ? "dark bg-[#070e1b] text-slate-100 selection:bg-amber-500/30"
          : "bg-[#fbfbf9] text-[#1e293b] selection:bg-amber-200"
      }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-24 right-6 z-50 px-5 py-3.5 rounded-lg shadow-2xl border flex items-center gap-3 animate-fade-in max-w-md ${
            isDarkMode
              ? "bg-[#0d182b] text-white border-amber-500/40"
              : "bg-[#0a192f] text-white border-amber-400/40"
          }`}
        >
          <Sparkles className="w-5 h-5 text-[#c59b27] shrink-0" />
          <div className="text-xs leading-snug">{toastMessage}</div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-auto cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Top Bar */}
      <header
        className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
          isDarkMode
            ? "bg-[#0a1424]/95 border-slate-800 text-white backdrop-blur-md"
            : "bg-white/95 border-slate-200/80 text-slate-800 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-22 sm:h-24 flex items-center justify-between gap-3">
          {/* Brand Logo - Enlarged "SUNRISE HOTEL MOMBASA RESORT" */}
          <div
            onClick={() => {
              setActiveView("home");
              setIsMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="cursor-pointer group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 shrink-0"
          >
            <span
              className={`font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight transition-colors ${
                isDarkMode ? "text-white group-hover:text-[#e2c069]" : "text-[#0a192f] group-hover:text-[#c59b27]"
              }`}
            >
              Sunrise Hotel
            </span>
            <span className="inline text-xs sm:text-sm md:text-base uppercase tracking-widest text-[#c59b27] font-bold font-sans">
              Mombasa Resort
            </span>
          </div>

          {/* Top Bar Actions: Dark/Light Mode Switch + Book Stay + 3-Hyphen Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* BUTTON TO CHANGE FROM DARK TO LIGHT MODE */}
            <button
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`px-3 py-2 rounded-lg border flex items-center gap-2 cursor-pointer transition-all text-xs font-semibold ${
                isDarkMode
                  ? "bg-[#14233e] border-slate-700 text-amber-300 hover:bg-[#1a2d4f] hover:text-amber-200 shadow-sm"
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
              }`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700 shrink-0" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>

            {/* Book Stay CTA Button */}
            <button
              onClick={() => {
                setActiveView("booking");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-[#c59b27] hover:bg-[#b0871d] text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-all shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-100" />
              <span className="hidden xs:inline">Book Stay</span>
            </button>

            {/* 3 HYPHEN BUTTON AT THE TOP (Opens Drawer containing all the buttons) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu (3 hyphens)"}
              className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-all ${
                isDarkMode
                  ? "bg-[#14233e] hover:bg-[#1a2d4f] border-slate-700 text-slate-100"
                  : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-[#0a192f]"
              }`}
              title="Menu: Click to view all navigation buttons"
            >
              {/* 3 Hyphens / 3 horizontal bars */}
              <div className="w-5 h-4 flex flex-col justify-between items-center" aria-hidden="true">
                <span
                  className={`h-0.5 w-5 rounded-full transition-all duration-300 ${
                    isDarkMode ? "bg-amber-400" : "bg-[#0a192f]"
                  } ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                />
                <span
                  className={`h-0.5 w-5 rounded-full transition-all duration-200 ${
                    isDarkMode ? "bg-amber-400" : "bg-[#0a192f]"
                  } ${isMenuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`h-0.5 w-5 rounded-full transition-all duration-300 ${
                    isDarkMode ? "bg-amber-400" : "bg-[#0a192f]"
                  } ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider hidden md:inline">
                {isMenuOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 3-HYPHEN DRAWER CONTAINING ALL THE BUTTONS */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
          {/* Backdrop */}
          <div
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div
            className={`relative w-full max-w-md h-full overflow-y-auto shadow-2xl flex flex-col justify-between z-10 transition-transform ${
              isDarkMode
                ? "bg-[#0c182b] text-slate-100 border-l border-slate-800"
                : "bg-white text-slate-900 border-l border-slate-200"
            }`}
          >
            {/* Drawer Header */}
            <div
              className={`p-6 border-b flex items-center justify-between ${
                isDarkMode ? "border-slate-800 bg-[#0a1424]" : "border-slate-100 bg-slate-50/80"
              }`}
            >
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-[#c59b27]">
                  Sunrise Hotel
                </div>
                <div className="text-xs text-[#c59b27]/80 uppercase tracking-widest font-semibold">
                  Mombasa Resort
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Menu &bull; All Navigation Buttons
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className={`p-2 rounded-lg cursor-pointer transition-colors ${
                  isDarkMode
                    ? "hover:bg-slate-800 text-slate-400 hover:text-white"
                    : "hover:bg-slate-200 text-slate-500 hover:text-slate-800"
                }`}
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* All Buttons List inside Drawer */}
            <div className="p-6 space-y-5 flex-1">
              {/* Dark / Light Mode Switch inside drawer */}
              <div
                className={`p-4 rounded-xl border flex items-center justify-between ${
                  isDarkMode ? "bg-[#11213b] border-slate-800" : "bg-slate-50 border-slate-200"
                }`}
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#c59b27]">
                    Display Theme
                  </div>
                  <div className="text-sm font-semibold">
                    {isDarkMode ? "Dark Coastal Night" : "Light Coastal Daytime"}
                  </div>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                    isDarkMode
                      ? "bg-[#1a2e50] border-amber-500/40 text-amber-300 hover:bg-[#233c66]"
                      : "bg-white border-slate-300 text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {isDarkMode ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-slate-700" />
                  )}
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </button>
              </div>

              {/* Navigation Buttons */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 px-2">
                  Navigation Buttons
                </div>

                {/* 1. Overview */}
                <button
                  onClick={() => {
                    setActiveView("home");
                    setIsMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full text-left p-3.5 rounded-xl flex items-center justify-between group cursor-pointer transition-all ${
                    activeView === "home"
                      ? isDarkMode
                        ? "bg-[#172b4c] text-amber-300 font-bold border border-amber-500/30"
                        : "bg-amber-50 text-[#0a192f] font-bold border border-amber-300"
                      : isDarkMode
                      ? "hover:bg-[#12213a] text-slate-200"
                      : "hover:bg-slate-100 text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-amber-500/20 text-[#c59b27]">🏠</span>
                    <div>
                      <div className="text-sm font-bold">Hotel Overview</div>
                      <div className="text-xs text-slate-400">
                        Coastal sanctuary, features &amp; oceanfront panoramas
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* 2. Reserve a Room */}
                <button
                  onClick={() => {
                    setActiveView("booking");
                    setIsMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full text-left p-3.5 rounded-xl flex items-center justify-between group cursor-pointer transition-all ${
                    activeView === "booking"
                      ? isDarkMode
                        ? "bg-[#172b4c] text-amber-300 font-bold border border-amber-500/30"
                        : "bg-amber-50 text-[#0a192f] font-bold border border-amber-300"
                      : isDarkMode
                      ? "hover:bg-[#12213a] text-slate-200"
                      : "hover:bg-slate-100 text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-amber-500/20 text-[#c59b27]">📅</span>
                    <div>
                      <div className="text-sm font-bold">Reserve a Room</div>
                      <div className="text-xs text-slate-400">
                        Online booking form with real-time bill calculations
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* 3. All 76 Rooms Directory */}
                <a
                  href="#rooms-list"
                  onClick={() => {
                    if (activeView !== "home") setActiveView("home");
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl flex items-center justify-between group cursor-pointer transition-all ${
                    isDarkMode ? "hover:bg-[#12213a] text-slate-200" : "hover:bg-slate-100 text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-amber-500/20 text-[#c59b27]">🛏️</span>
                    <div>
                      <div className="text-sm font-bold">All 76 Rooms Directory</div>
                      <div className="text-xs text-slate-400">
                        Sequential inventory with unique photographs (Rooms 1 &ndash; 76)
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Floor Jump Sub-buttons */}
                <div className="pl-12 grid grid-cols-2 gap-2 text-[11px]">
                  <button
                    onClick={() => {
                      setFloorTab("Ground");
                      if (activeView !== "home") setActiveView("home");
                      setIsMenuOpen(false);
                    }}
                    className={`p-2 rounded border text-left cursor-pointer transition-colors ${
                      isDarkMode
                        ? "border-slate-800 bg-[#0e1c31] hover:bg-[#162947] text-slate-300"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    🌿 Ground (1–19)
                  </button>
                  <button
                    onClick={() => {
                      setFloorTab("First");
                      if (activeView !== "home") setActiveView("home");
                      setIsMenuOpen(false);
                    }}
                    className={`p-2 rounded border text-left cursor-pointer transition-colors ${
                      isDarkMode
                        ? "border-slate-800 bg-[#0e1c31] hover:bg-[#162947] text-slate-300"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    🌊 1st Floor (20–38)
                  </button>
                  <button
                    onClick={() => {
                      setFloorTab("Second");
                      if (activeView !== "home") setActiveView("home");
                      setIsMenuOpen(false);
                    }}
                    className={`p-2 rounded border text-left cursor-pointer transition-colors ${
                      isDarkMode
                        ? "border-slate-800 bg-[#0e1c31] hover:bg-[#162947] text-slate-300"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    🌅 2nd Floor (39–57)
                  </button>
                  <button
                    onClick={() => {
                      setFloorTab("Penthouse");
                      if (activeView !== "home") setActiveView("home");
                      setIsMenuOpen(false);
                    }}
                    className={`p-2 rounded border text-left cursor-pointer transition-colors ${
                      isDarkMode
                        ? "border-slate-800 bg-[#0e1c31] hover:bg-[#162947] text-slate-300"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    ✨ Penthouse (58–76)
                  </button>
                </div>

                {/* 4. Dining & Swahili Dishes */}
                <a
                  href="#dining"
                  onClick={() => {
                    if (activeView !== "home") setActiveView("home");
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl flex items-center justify-between group cursor-pointer transition-all ${
                    isDarkMode ? "hover:bg-[#12213a] text-slate-200" : "hover:bg-slate-100 text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-amber-500/20 text-[#c59b27]">🍽️</span>
                    <div>
                      <div className="text-sm font-bold">Dining &amp; Swahili Dishes</div>
                      <div className="text-xs text-slate-400">
                        Authentic coastal gastronomy &amp; dish preparation videos
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* 5. Visitor Suggestions */}
                <a
                  href="#visitor-suggestions"
                  onClick={() => {
                    if (activeView !== "home") setActiveView("home");
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl flex items-center justify-between group cursor-pointer transition-all ${
                    isDarkMode ? "hover:bg-[#12213a] text-slate-200" : "hover:bg-slate-100 text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-amber-500/20 text-[#c59b27]">💬</span>
                    <div>
                      <div className="text-sm font-bold">Visitor Suggestions</div>
                      <div className="text-xs text-slate-400">
                        Guest testimonials, travel tips &amp; post feedback
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* 6. Google Map & Location */}
                <a
                  href="#location"
                  onClick={() => {
                    if (activeView !== "home") setActiveView("home");
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl flex items-center justify-between group cursor-pointer transition-all ${
                    isDarkMode ? "hover:bg-[#12213a] text-slate-200" : "hover:bg-slate-100 text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-amber-500/20 text-[#c59b27]">📍</span>
                    <div>
                      <div className="text-sm font-bold">Google Maps &amp; Directions</div>
                      <div className="text-xs text-slate-400">
                        Oceanfront Nyali Beach location &amp; travel times
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Room Occupancy Live Counter */}
              <div
                className={`p-4 rounded-xl border ${
                  isDarkMode ? "bg-[#0e1c31] border-slate-800" : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Live Room Occupancy
                </div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-emerald-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    {availableCount} Available Rooms
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-500">
                    <Lock className="w-3.5 h-3.5" />
                    {bookedCount} Booked by Guests
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-slate-400 leading-snug">
                  A room only shows as Booked when a customer reserves it. Each room can only be booked once.
                </div>
              </div>
            </div>

            {/* Drawer Footer Contact */}
            <div
              className={`p-6 border-t ${
                isDarkMode ? "border-slate-800 bg-[#0a1424]" : "border-slate-100 bg-slate-50/80"
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-[#c59b27] mb-2">
                24/7 Front Desk Reservations
              </div>
              <div className="space-y-1.5 text-xs">
                <a
                  href="tel:+254748642275"
                  className="flex items-center gap-2 hover:text-[#c59b27] transition-colors font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c59b27]" /> +254 748 642 275
                </a>
                <a
                  href="mailto:marvinfrank2680@gmail.com"
                  className="flex items-center gap-2 hover:text-[#c59b27] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#c59b27]" /> marvinfrank2680@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 1: HOMEPAGE */}
      {activeView === "home" && (
        <main className="flex-1">
          {/* Hero Banner */}
          <section className="relative min-h-[560px] flex items-center bg-[#0a192f] text-white overflow-hidden">
            <img
              src="/images/hero_sunrise_hotel_1791484239310.jpg"
              alt="Sunrise Hotel Coastal Panorama"
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/60 to-transparent" />
            
            <div className="relative max-w-7xl mx-auto px-6 py-24 z-10 w-full">
              <div className="max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#e2c069] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Mombasa Coastline &bull; 76 Separately Bookable Rooms
                </div>
                <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-[1.1] text-white text-balance">
                  Where Coastal Tranquility Meets Morning Light
                </h1>
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-light">
                  Welcome to Sunrise Hotel. Discover our full hotel collection of 76 individually numbered rooms, with each room featuring its own distinct photograph. Every floor offers Single, Double, Family, and Executive suites.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => {
                      setActiveView("booking");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-[#c59b27] hover:bg-[#b0871d] text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-md shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    Reserve a Room <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="#rooms-list"
                    className="border border-white/40 hover:bg-white/10 text-white font-medium text-sm sm:text-base px-6 py-3.5 rounded-md transition-colors"
                  >
                    Explore All Rooms Directory
                  </a>
                </div>
              </div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">
            
            {/* SECTION 1: ALL 76 ROOMS (76 DIFFERENT IMAGES + ALL 4 TYPES PER FLOOR) */}
            <section id="rooms-list">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="text-xs uppercase font-bold tracking-widest text-[#c59b27] mb-2">
                  Complete Accommodations Inventory
                </div>
                <h2
                  className={`font-serif text-3xl sm:text-4xl font-bold ${
                    isDarkMode ? "text-slate-100" : "text-[#0a192f]"
                  }`}
                >
                  All Rooms Listed Sequentially
                </h2>
                <p className={`text-sm mt-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Each room has its own unique photograph. Every floor features all room types: <strong>Single</strong>, <strong>Double</strong>, <strong>Family</strong>, and <strong>Executive</strong> suites.
                </p>
              </div>

              {/* Floor / Wing Selector Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                {[
                  { id: "All", label: "All Floors (Rooms 1 &ndash; 76)" },
                  { id: "Ground", label: "Ground Floor &bull; Garden Wing (Rooms 1 &ndash; 19)" },
                  { id: "First", label: "1st Floor &bull; Coral Terrace (Rooms 20 &ndash; 38)" },
                  { id: "Second", label: "2nd Floor &bull; Ocean Horizon (Rooms 39 &ndash; 57)" },
                  { id: "Penthouse", label: "Penthouse &bull; Sunset Panorama (Rooms 58 &ndash; 76)" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setFloorTab(tab.id)}
                    dangerouslySetInnerHTML={{ __html: tab.label }}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      floorTab === tab.id
                        ? "bg-[#c59b27] text-white shadow-md"
                        : isDarkMode
                        ? "bg-[#11213b] border border-slate-700 text-slate-300 hover:bg-[#182e52]"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  />
                ))}
              </div>

              {/* Filter & Search Bar */}
              <div
                className={`p-4 sm:p-5 rounded-xl border shadow-sm mb-8 space-y-3.5 ${
                  isDarkMode
                    ? "bg-[#0e1b30] border-slate-800 text-slate-200"
                    : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Category Filter */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-xs font-semibold flex items-center gap-1 mr-1 ${
                        isDarkMode ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      <Filter className="w-3.5 h-3.5 text-[#c59b27]" /> Suite Category:
                    </span>
                    {["All", "Single", "Double", "Family", "Executive"].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setRoomFilterCategory(cat)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                          roomFilterCategory === cat
                            ? "bg-[#c59b27] text-white shadow-sm"
                            : isDarkMode
                            ? "bg-[#162744] text-slate-300 hover:bg-[#1f3860]"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Occupancy & Search */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1 text-xs">
                      <span className={`font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                        Occupancy:
                      </span>
                      <select
                        value={roomFilterStatus}
                        onChange={(e) => setRoomFilterStatus(e.target.value)}
                        className={`px-2.5 py-1.5 rounded border text-xs font-medium ${
                          isDarkMode
                            ? "bg-[#162744] border-slate-700 text-slate-100"
                            : "bg-white border-slate-300 text-slate-800"
                        }`}
                      >
                        <option value="All">All Rooms (76)</option>
                        <option value="Available">Available Only ({availableCount})</option>
                        <option value="Booked">Booked Only ({bookedCount})</option>
                      </select>
                    </div>

                    <input
                      type="text"
                      placeholder="Search Room Number (e.g. 1, 24, 76)..."
                      value={roomSearchQuery}
                      onChange={(e) => setRoomSearchQuery(e.target.value)}
                      className={`px-3 py-1.5 text-xs rounded border w-48 sm:w-56 focus:outline-none focus:border-[#c59b27] ${
                        isDarkMode
                          ? "bg-[#162744] border-slate-700 text-slate-100 placeholder-slate-400"
                          : "bg-white border-slate-300 text-slate-800 placeholder-slate-400"
                      }`}
                    />
                  </div>
                </div>

                {/* Specific View Filter (Ocean vs Garden vs No Ocean View) */}
                <div
                  className={`pt-2 border-t flex flex-wrap items-center gap-2 ${
                    isDarkMode ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <span
                    className={`text-xs font-semibold flex items-center gap-1 mr-1 ${
                      isDarkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5 text-[#c59b27]" /> View Orientation:
                  </span>
                  {[
                    { id: "All", label: "All Views (76 Rooms)" },
                    { id: "Ocean View", label: "🌊 Indian Ocean View (38)" },
                    { id: "Garden View", label: "🌿 Tropical Garden (22)" },
                    { id: "No Ocean View", label: "🏛️ Interior Suite (No Ocean View) (16)" }
                  ].map(vt => (
                    <button
                      key={vt.id}
                      onClick={() => setRoomFilterView(vt.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        roomFilterView === vt.id
                          ? "bg-[#c59b27] text-white shadow-sm"
                          : isDarkMode
                          ? "bg-[#162744] text-slate-300 hover:bg-[#1f3860]"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {vt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 76 Rooms Sequential Grid (EACH WITH A DIFFERENT IMAGE) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredRooms.map((room) => {
                  const isBooked = room.status === "Booked";

                  return (
                    <div
                      key={room.roomNo}
                      className={`rounded-xl border transition-all flex flex-col justify-between overflow-hidden ${
                        isBooked
                          ? isDarkMode
                            ? "border-amber-600/70 bg-[#1c1715] shadow-sm"
                            : "border-amber-300 bg-amber-50/20 shadow-sm"
                          : isDarkMode
                          ? "border-slate-800 bg-[#0e1b30] hover:border-slate-700 hover:shadow-lg"
                          : "border-slate-200/90 bg-white hover:border-slate-400 hover:shadow-md"
                      }`}
                    >
                      {/* Room Visual: EACH of the 76 rooms has its OWN DIFFERENT IMAGE */}
                      <div className="relative h-48 bg-slate-900 overflow-hidden group">
                        <img
                          src={room.image}
                          alt={`Sunrise Hotel Room ${room.roomNo} - ${room.name}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/rooms/room_1.jpg";
                          }}
                        />
                        <div className="absolute top-2 left-2 bg-[#0a192f] text-white text-[11px] font-bold px-2 py-0.5 rounded font-mono shadow">
                          Room {room.roomNo}
                        </div>
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                          {room.category}
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded">
                          {room.dimensions}
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Room Header with Sequential Number & Status */}
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <div
                                className={`font-serif text-lg font-bold leading-snug ${
                                  isDarkMode ? "text-slate-100" : "text-[#0a192f]"
                                }`}
                              >
                                Room {room.roomNo}
                              </div>
                              <div
                                className={`text-[11px] font-medium ${
                                  isDarkMode ? "text-slate-400" : "text-slate-500"
                                }`}
                              >
                                {room.floor} &bull; {room.category}
                              </div>
                            </div>

                            {/* Status Indicator: Available vs Booked */}
                            {isBooked ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded">
                                <Lock className="w-3 h-3 text-amber-400" /> Booked
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                                <Unlock className="w-3 h-3 text-emerald-500" /> Available
                              </span>
                            )}
                          </div>

                          {/* View Orientation Badge */}
                          <div className="my-2">
                            {room.viewType === "Ocean View" && (
                              <span
                                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                                  isDarkMode
                                    ? "text-cyan-300 bg-cyan-950/60 border border-cyan-800"
                                    : "text-cyan-900 bg-cyan-50 border border-cyan-200"
                                }`}
                              >
                                🌊 Indian Ocean View
                              </span>
                            )}
                            {room.viewType === "Garden View" && (
                              <span
                                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                                  isDarkMode
                                    ? "text-emerald-300 bg-emerald-950/60 border border-emerald-800"
                                    : "text-emerald-900 bg-emerald-50 border border-emerald-200"
                                }`}
                              >
                                🌿 Tropical Garden View
                              </span>
                            )}
                            {room.viewType === "No Ocean View" && (
                              <span
                                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                                  isDarkMode
                                    ? "text-slate-300 bg-slate-800 border border-slate-700"
                                    : "text-slate-700 bg-slate-100 border border-slate-200"
                                }`}
                              >
                                🏛️ Interior Suite (No Ocean View)
                              </span>
                            )}
                          </div>

                          {/* Room Details */}
                          <div
                            className={`text-xs my-2 space-y-1 ${
                              isDarkMode ? "text-slate-300" : "text-slate-600"
                            }`}
                          >
                            <div className="flex justify-between">
                              <span className="text-slate-400">View:</span>
                              <span className={`font-medium ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                                {room.view}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Capacity:</span>
                              <span className={`font-medium ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                                Up to {room.maxGuests} {room.maxGuests === 1 ? 'Guest' : 'Guests'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Configuration:</span>
                              <span className={`font-medium ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
                                {room.beds}
                              </span>
                            </div>
                          </div>

                          {/* Occupancy details when Booked */}
                          {isBooked && (
                            <div
                              className={`mt-3 p-2.5 rounded text-[11px] space-y-1 border ${
                                isDarkMode
                                  ? "bg-[#271b12] border-amber-800/80 text-amber-200"
                                  : "bg-amber-50 border-amber-200 text-amber-900"
                              }`}
                            >
                              <div>
                                <strong>Guest:</strong> {room.bookedBy || 'Occupied'}
                              </div>
                              <div>
                                <strong>Checkout:</strong> {room.checkOutDate || 'Stay in progress'}
                              </div>
                              <div
                                className={`text-[10px] flex items-center gap-1 pt-0.5 ${
                                  isDarkMode ? "text-amber-300/80" : "text-amber-800"
                                }`}
                              >
                                <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                                Each room can only be booked once until stay ends
                              </div>
                              <button
                                onClick={() => handleSimulateFinishStay(room.roomNo)}
                                className={`mt-1.5 w-full text-[10px] font-bold py-1.5 rounded transition-colors cursor-pointer ${
                                  isDarkMode
                                    ? "bg-amber-900/60 hover:bg-amber-900 text-amber-200"
                                    : "bg-amber-200 hover:bg-amber-300 text-amber-950"
                                }`}
                                title="Click to release room and make it available again"
                              >
                                Fast-Forward Stay (Release Room Now)
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Action: Book Room (or Disabled when Booked - cannot book more than once) */}
                        <div
                          className={`mt-4 pt-3 border-t flex items-center gap-2 ${
                            isDarkMode ? "border-slate-800" : "border-slate-100"
                          }`}
                        >
                          {isBooked ? (
                            <button
                              disabled
                              className={`w-full text-xs font-semibold py-2 rounded cursor-not-allowed text-center ${
                                isDarkMode
                                  ? "bg-slate-800/80 text-slate-500 border border-slate-700/60"
                                  : "bg-slate-100 text-slate-400"
                              }`}
                              title="This room is already booked by another customer and cannot be booked more than once."
                            >
                              🔒 Booked (Unavailable)
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSelectRoomToBook(room)}
                              className="w-full bg-[#c59b27] hover:bg-[#b0871d] text-white text-xs font-semibold py-2 rounded transition-colors text-center flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                            >
                              Book Room {room.roomNo} <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            onClick={() => setSpecsModalRoom(room)}
                            className={`p-2 rounded cursor-pointer transition-colors ${
                              isDarkMode
                                ? "text-slate-400 hover:text-white hover:bg-slate-800"
                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                            }`}
                            title="View Room Specifications"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 2: DINING & SWAHILI DISHES (COMES FIRST BEFORE VISITOR SUGGESTIONS!) */}
            {/* NO auto-cycling feed clutter; shows the videos cleanly */}
            <section
              id="dining"
              className={`rounded-2xl p-8 sm:p-12 shadow-sm border transition-colors ${
                isDarkMode ? "bg-[#0b1629] border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
              }`}
            >
              <div className="max-w-3xl mx-auto text-center mb-10">
                <div
                  className={`inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#c59b27] px-3 py-1 rounded-full mb-3 border ${
                    isDarkMode
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                      : "bg-amber-50 border-amber-200/60 text-[#c59b27]"
                  }`}
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" /> Coastal Gastronomy &bull; Kenyan Ocean Flavors
                </div>
                <h2
                  className={`font-serif text-3xl sm:text-4xl font-bold ${
                    isDarkMode ? "text-slate-100" : "text-[#0a192f]"
                  }`}
                >
                  Authentic Coastal Swahili Dishes
                </h2>
                <p className={`text-sm sm:text-base mt-2 leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                  Explore four iconic coastal dishes prepared fresh daily by master chefs at Sunrise Hotel.
                </p>
              </div>

              {/* Clean Videos Showcase (Videos Only, No Auto-Cycling Feed Text) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SWAHILI_DISHES.map((dish, idx) => (
                  <div
                    key={dish.id}
                    className={`rounded-2xl border overflow-hidden shadow-sm flex flex-col transition-all ${
                      isDarkMode
                        ? "bg-[#101e35] border-slate-800 hover:border-slate-700"
                        : "bg-slate-50/80 border-slate-200 hover:shadow-md"
                    }`}
                  >
                    {/* Video Player */}
                    <div className="relative h-[250px] sm:h-[280px] bg-black overflow-hidden">
                      <video
                        src={dish.videoUrl}
                        poster={dish.posterUrl}
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-[#0a192f]/80 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                        {dish.swahiliName}
                      </div>
                    </div>

                    {/* Dish Information */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3
                            className={`font-serif text-xl font-bold ${
                              isDarkMode ? "text-slate-100" : "text-[#0a192f]"
                            }`}
                          >
                            {dish.name}
                          </h3>
                          <span className="text-[11px] text-[#c59b27] font-semibold">
                            {dish.category}
                          </span>
                        </div>
                        <p
                          className={`text-xs leading-relaxed mb-3 ${
                            isDarkMode ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          {dish.description}
                        </p>
                      </div>

                      <div
                        className={`pt-2 border-t flex flex-wrap items-center justify-between gap-2 ${
                          isDarkMode ? "border-slate-800" : "border-slate-200/80"
                        }`}
                      >
                        <div className="flex flex-wrap gap-1.5">
                          {dish.flavorNotes.map((note, nIdx) => (
                            <span
                              key={nIdx}
                              className={`text-[10px] px-2 py-0.5 rounded border ${
                                isDarkMode
                                  ? "bg-[#182c4d] border-slate-700 text-slate-300"
                                  : "bg-white border-slate-200 text-slate-600"
                              }`}
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {dish.origin}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 3: VISITOR SUGGESTIONS (COMES BELOW DINING SECTION!) */}
            <section
              id="visitor-suggestions"
              className={`rounded-2xl p-8 sm:p-12 border transition-colors ${
                isDarkMode ? "bg-[#0a1424] border-slate-800 text-slate-100" : "bg-slate-50/70 border-slate-200"
              }`}
            >
              <div className="max-w-2xl mx-auto text-center mb-10">
                <div className="text-xs uppercase font-bold tracking-widest text-[#c59b27] mb-2">
                  Guest Insights &bull; Real Experience
                </div>
                <h2
                  className={`font-serif text-3xl sm:text-4xl font-bold ${
                    isDarkMode ? "text-slate-100" : "text-[#0a192f]"
                  }`}
                >
                  Visitor Suggestions
                </h2>
                <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Helpful tips and recommendations shared by guests who recently visited Sunrise Hotel.
                </p>
              </div>

              {/* Suggestions Grid (Strictly Suggestion, Name, and Location ONLY) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {suggestions.map((item, index) => (
                  <div
                    key={item.id ? `${item.id}-${index}` : `sug-${index}`}
                    className={`p-6 rounded-xl border shadow-sm flex flex-col justify-between transition-colors ${
                      isDarkMode
                        ? "bg-[#0e1b30] border-slate-800 text-slate-200"
                        : "bg-white border-slate-200 text-slate-700"
                    }`}
                  >
                    {/* The Suggestion Text */}
                    <p className="text-sm leading-relaxed italic mb-5">
                      "{item.suggestion}"
                    </p>

                    {/* Visitor Name & Location ONLY */}
                    <div
                      className={`pt-3 border-t flex items-center justify-between text-xs ${
                        isDarkMode ? "border-slate-850" : "border-slate-100"
                      }`}
                    >
                      <span className={`font-bold ${isDarkMode ? "text-slate-100" : "text-[#0a192f]"}`}>
                        {item.name}
                      </span>
                      <span className="text-slate-400 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#c59b27]" />
                        {item.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Share Your Suggestion Form (Strictly Name, Location, Suggestion) */}
              <div
                className={`rounded-xl border p-6 sm:p-8 max-w-xl mx-auto shadow-sm ${
                  isDarkMode
                    ? "bg-[#0e1b30] border-slate-800 text-slate-100"
                    : "bg-white border-slate-200 text-slate-800"
                }`}
              >
                <h3
                  className={`font-serif text-xl font-bold mb-1 ${
                    isDarkMode ? "text-slate-100" : "text-[#0a192f]"
                  }`}
                >
                  Share Your Visitor Suggestion
                </h3>
                <p className={`text-xs mb-5 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Have a suggestion or travel tip for future guests? Post your recommendation below.
                </p>

                {sugSubmitted && (
                  <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    Thank you! Your visitor suggestion has been added to the board.
                  </div>
                )}

                <form onSubmit={handleAddSuggestion} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                        Your Full Name:
                      </label>
                      <input
                        type="text"
                        value={newSugName}
                        onChange={(e) => setNewSugName(e.target.value)}
                        placeholder="e.g. Marvin Frank"
                        required
                        className={`w-full text-xs px-3 py-2 border rounded focus:outline-none focus:border-[#c59b27] ${
                          isDarkMode
                            ? "bg-[#162744] border-slate-700 text-slate-100 placeholder-slate-400"
                            : "bg-white border-slate-300 text-slate-800"
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                        Your Location (Where You Came From):
                      </label>
                      <input
                        type="text"
                        value={newSugLocation}
                        onChange={(e) => setNewSugLocation(e.target.value)}
                        placeholder="e.g. Kisumu, Kenya"
                        required
                        className={`w-full text-xs px-3 py-2 border rounded focus:outline-none focus:border-[#c59b27] ${
                          isDarkMode
                            ? "bg-[#162744] border-slate-700 text-slate-100 placeholder-slate-400"
                            : "bg-white border-slate-300 text-slate-800"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                      Your Suggestion / Recommendation:
                    </label>
                    <textarea
                      value={newSugText}
                      onChange={(e) => setNewSugText(e.target.value)}
                      placeholder="Write your suggestion for fellow travelers..."
                      rows={3}
                      required
                      className={`w-full text-xs px-3 py-2 border rounded focus:outline-none focus:border-[#c59b27] ${
                        isDarkMode
                          ? "bg-[#162744] border-slate-700 text-slate-100 placeholder-slate-400"
                          : "bg-white border-slate-300 text-slate-800"
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#c59b27] hover:bg-[#b0871d] text-white font-semibold text-xs px-5 py-2.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-100" /> Post Suggestion
                  </button>
                </form>
              </div>
            </section>

            {/* SECTION 4: GOOGLE MAPS LOCATION & CONTACT */}
            <section id="location" className="space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <div className="text-xs uppercase font-bold tracking-widest text-[#c59b27] mb-2">
                  Prime Oceanfront Setting
                </div>
                <h2
                  className={`font-serif text-3xl sm:text-4xl font-bold ${
                    isDarkMode ? "text-slate-100" : "text-[#0a192f]"
                  }`}
                >
                  Google Maps Location &amp; Directions
                </h2>
                <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Sunrise Hotel is nestled directly along the tranquil Nyali and Bamburi beach coastline in Mombasa, Kenya.
                </p>
              </div>

              {/* Interactive Google Maps Embed */}
              <div
                className={`rounded-2xl border overflow-hidden shadow-lg p-2 sm:p-4 ${
                  isDarkMode ? "bg-[#0e1b30] border-slate-800" : "bg-white border-slate-200"
                }`}
              >
                <div className="relative w-full h-[380px] sm:h-[480px] rounded-xl overflow-hidden bg-slate-900">
                  <iframe
                    title="Sunrise Hotel Mombasa Google Maps Location"
                    src="https://maps.google.com/maps?q=Nyali+Beach+Bamburi+Mombasa+Kenya&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                  <div className="absolute top-3 left-3 bg-[#0a192f]/90 backdrop-blur-md text-white p-3 rounded-lg shadow-lg text-xs max-w-xs border border-white/20">
                    <div className="font-bold flex items-center gap-1.5 text-amber-300">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0" /> Sunrise Hotel
                    </div>
                    <div className="text-[11px] text-slate-300 mt-1">
                      Sunrise Boulevard, Oceanfront Nyali Beach Coastline, Mombasa, Kenya
                    </div>
                  </div>
                </div>

                {/* Location highlights below the map */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2 text-xs">
                  <div
                    className={`p-3.5 rounded-lg border ${
                      isDarkMode ? "bg-[#142644] border-slate-700/80 text-slate-200" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <span className="text-slate-400 block mb-1">Moi International Airport (MBA):</span>
                    <strong className={`text-sm ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>25 Minutes</strong>
                    <span className="text-slate-400 block text-[11px] mt-0.5">Via Hotel Chauffeured Shuttle</span>
                  </div>
                  <div
                    className={`p-3.5 rounded-lg border ${
                      isDarkMode ? "bg-[#142644] border-slate-700/80 text-slate-200" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <span className="text-slate-400 block mb-1">Old Town &amp; Fort Jesus:</span>
                    <strong className={`text-sm ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>15 Minutes</strong>
                    <span className="text-slate-400 block text-[11px] mt-0.5">Historic Swahili cultural heritage</span>
                  </div>
                  <div
                    className={`p-3.5 rounded-lg border ${
                      isDarkMode ? "bg-[#142644] border-slate-700/80 text-slate-200" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <span className="text-slate-400 block mb-1">Nyali Golf &amp; Country Club:</span>
                    <strong className={`text-sm ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>6 Minutes</strong>
                    <span className="text-slate-400 block text-[11px] mt-0.5">18-hole championship greens</span>
                  </div>
                  <div
                    className={`p-3.5 rounded-lg border flex flex-col justify-between ${
                      isDarkMode ? "bg-[#142644] border-slate-700/80 text-slate-200" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div>
                      <span className="text-slate-400 block mb-1">Direct GPS Coordinates:</span>
                      <strong className={`font-mono text-xs ${isDarkMode ? "text-amber-300" : "text-slate-800"}`}>
                        4.0152° S, 39.7289° E
                      </strong>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Nyali+Beach+Mombasa+Kenya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#c59b27] hover:underline font-semibold mt-2"
                    >
                      Open in Google Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Box */}
              <div
                className={`rounded-xl p-8 text-center shadow-sm border transition-colors ${
                  isDarkMode
                    ? "bg-[#0e1b30] border-slate-800 text-slate-100"
                    : "bg-white border-slate-200 text-slate-800"
                }`}
              >
                <div className="text-xs uppercase font-bold tracking-widest text-[#c59b27] mb-2">
                  24/7 Front Desk &amp; Concierge
                </div>
                <h3
                  className={`font-serif text-2xl font-bold mb-2 ${
                    isDarkMode ? "text-slate-100" : "text-[#0a192f]"
                  }`}
                >
                  Contact Sunrise Hotel Reservations
                </h3>
                <p className={`text-xs max-w-md mx-auto mb-6 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Our reservations team is available around the clock to assist with your room selections and travel plans.
                </p>
                <div className="flex flex-wrap justify-center gap-8 sm:gap-16 text-sm">
                  <div>
                    <div className="text-xs uppercase text-slate-400 font-semibold mb-1">Telephone Contact</div>
                    <a
                      href="tel:+254748642275"
                      className={`font-bold text-base hover:text-[#c59b27] transition-colors ${
                        isDarkMode ? "text-slate-100" : "text-[#0a192f]"
                      }`}
                    >
                      +254 748 642 275
                    </a>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-slate-400 font-semibold mb-1">Reservations Email</div>
                    <a
                      href="mailto:marvinfrank2680@gmail.com"
                      className={`font-bold text-base hover:text-[#c59b27] transition-colors ${
                        isDarkMode ? "text-slate-100" : "text-[#0a192f]"
                      }`}
                    >
                      marvinfrank2680@gmail.com
                    </a>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-slate-400 font-semibold mb-1">Total Capacity</div>
                    <div className={`font-bold text-base ${isDarkMode ? "text-slate-100" : "text-[#0a192f]"}`}>
                      76 Separately Bookable Rooms
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      )}

      {/* VIEW 2: BOOKING SECTION */}
      {/* CUSTOMER ENTERS THEIR OWN DETAILS DIRECTLY */}
      {activeView === "booking" && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Booking Form */}
            <div
              className={`lg:col-span-8 rounded-xl p-6 sm:p-8 shadow-sm border ${
                isDarkMode ? "bg-[#0e1b30] border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
              }`}
            >
              <div className={`border-b pb-5 mb-6 ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}>
                <h2
                  className={`font-serif text-3xl font-bold ${
                    isDarkMode ? "text-slate-100" : "text-[#0a192f]"
                  }`}
                >
                  Room Reservation Form
                </h2>
                <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  Reserving: <strong>Room {activeRoom.roomNo} ({activeRoom.name})</strong> &bull; {activeRoom.floor}
                </p>
              </div>

              <form onSubmit={handleConfirmSubmitBooking} noValidate className="space-y-8">
                {/* 01. Primary Guest Details */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                    <span className="font-mono text-[#c59b27]">01</span>
                    <span>Primary Guest Information</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                        Customer Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        type="text"
                        value={formData.customer_name}
                        onChange={(e) => {
                          setFormData(p => ({ ...p, customer_name: e.target.value }));
                          if (formErrors.customer_name) setFormErrors(p => ({ ...p, customer_name: undefined }));
                        }}
                        placeholder="Enter your full name"
                        className={`w-full px-3.5 py-2.5 text-sm rounded border focus:outline-none focus:ring-2 ${
                          formErrors.customer_name
                            ? "border-red-400 bg-red-500/10 focus:ring-red-200"
                            : isDarkMode
                            ? "bg-[#162744] border-slate-700 text-slate-100 placeholder-slate-400 focus:border-[#c59b27] focus:ring-amber-500/20"
                            : "bg-white border-slate-300 text-slate-800 placeholder-slate-400 focus:border-[#c59b27] focus:ring-amber-100"
                        }`}
                      />
                      {formErrors.customer_name && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{formErrors.customer_name}</p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                        National ID / Passport Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        ref={idInputRef}
                        type="text"
                        value={formData.id_number}
                        onChange={(e) => {
                          setFormData(p => ({ ...p, id_number: e.target.value }));
                          if (formErrors.id_number) setFormErrors(p => ({ ...p, id_number: undefined }));
                        }}
                        placeholder="Enter National ID or Passport"
                        className={`w-full px-3.5 py-2.5 text-sm rounded border focus:outline-none focus:ring-2 ${
                          formErrors.id_number
                            ? "border-red-400 bg-red-500/10 focus:ring-red-200"
                            : isDarkMode
                            ? "bg-[#162744] border-slate-700 text-slate-100 placeholder-slate-400 focus:border-[#c59b27] focus:ring-amber-500/20"
                            : "bg-white border-slate-300 text-slate-800 placeholder-slate-400 focus:border-[#c59b27] focus:ring-amber-100"
                        }`}
                      />
                      {formErrors.id_number && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{formErrors.id_number}</p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        ref={emailInputRef}
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData(p => ({ ...p, email: e.target.value }));
                          if (formErrors.email) setFormErrors(p => ({ ...p, email: undefined }));
                        }}
                        placeholder="Enter your email address"
                        className={`w-full px-3.5 py-2.5 text-sm rounded border focus:outline-none focus:ring-2 ${
                          formErrors.email
                            ? "border-red-400 bg-red-500/10 focus:ring-red-200"
                            : isDarkMode
                            ? "bg-[#162744] border-slate-700 text-slate-100 placeholder-slate-400 focus:border-[#c59b27] focus:ring-amber-500/20"
                            : "bg-white border-slate-300 text-slate-800 placeholder-slate-400 focus:border-[#c59b27] focus:ring-amber-100"
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                        Phone Number (10 Digits) <span className="text-red-500">*</span>
                      </label>
                      <input
                        ref={phoneInputRef}
                        type="tel"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => {
                          const v = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
                          setFormData(p => ({ ...p, phone: v }));
                          if (formErrors.phone) setFormErrors(p => ({ ...p, phone: undefined }));
                        }}
                        placeholder="e.g. 0712345678"
                        className={`w-full px-3.5 py-2.5 text-sm rounded border focus:outline-none focus:ring-2 ${
                          formErrors.phone
                            ? "border-red-400 bg-red-500/10 focus:ring-red-200"
                            : isDarkMode
                            ? "bg-[#162744] border-slate-700 text-slate-100 placeholder-slate-400 focus:border-[#c59b27] focus:ring-amber-500/20"
                            : "bg-white border-slate-300 text-slate-800 placeholder-slate-400 focus:border-[#c59b27] focus:ring-amber-100"
                        }`}
                      />
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[11px] text-slate-400">Exact 10 digits required</span>
                        <span className="text-[11px] font-mono text-slate-500">{formData.phone.length}/10</span>
                      </div>
                      {formErrors.phone && (
                        <p className="text-red-500 text-xs font-medium">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 02. Room & Dates Selection */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                    <span className="font-mono text-[#c59b27]">02</span>
                    <span>Room Number Selection &amp; Stay Duration</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                        Check-in Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.check_in_date}
                        onChange={(e) => setFormData(p => ({ ...p, check_in_date: e.target.value }))}
                        className={`w-full px-3.5 py-2.5 text-sm rounded border focus:outline-none focus:ring-2 ${
                          formErrors.check_in_date
                            ? "border-red-400 bg-red-500/10 focus:ring-red-200"
                            : isDarkMode
                            ? "bg-[#162744] border-slate-700 text-slate-100 focus:border-[#c59b27] focus:ring-amber-500/20"
                            : "bg-white border-slate-300 text-slate-800 focus:border-[#c59b27] focus:ring-amber-100"
                        }`}
                      />
                      {formErrors.check_in_date && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{formErrors.check_in_date}</p>
                      )}
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                        Number of Nights (1 &ndash; 14) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={14}
                        value={formData.nights}
                        onChange={(e) => setFormData(p => ({ ...p, nights: parseInt(e.target.value, 10) || 1 }))}
                        className={`w-full px-3.5 py-2.5 text-sm rounded border focus:outline-none focus:ring-2 ${
                          formErrors.nights
                            ? "border-red-400 bg-red-500/10 focus:ring-red-200"
                            : isDarkMode
                            ? "bg-[#162744] border-slate-700 text-slate-100 focus:border-[#c59b27] focus:ring-amber-500/20"
                            : "bg-white border-slate-300 text-slate-800 focus:border-[#c59b27] focus:ring-amber-100"
                        }`}
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block">Maximum 14 nights stay</span>
                      {formErrors.nights && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{formErrors.nights}</p>
                      )}
                    </div>

                    {/* Room Selector: 1 to 76 (Booked rooms clearly marked and disabled) */}
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                        Select Room Number (Room 1 to 76):
                      </label>
                      <select
                        value={formData.selected_room_no}
                        onChange={(e) => {
                          const rNo = parseInt(e.target.value, 10);
                          setFormData(p => ({ ...p, selected_room_no: rNo }));
                        }}
                        className={`w-full px-3.5 py-2.5 text-sm rounded border font-medium focus:outline-none focus:border-[#c59b27] ${
                          isDarkMode
                            ? "bg-[#162744] border-slate-700 text-slate-100"
                            : "bg-white border-slate-300 text-slate-800"
                        }`}
                      >
                        {allRooms.map(r => (
                          <option key={r.roomNo} value={r.roomNo} disabled={r.status === "Booked"}>
                            Room {r.roomNo} – {r.category} ({r.floor}){" "}
                            {r.status === "Booked"
                              ? `— [🔒 BOOKED by ${r.bookedBy || 'Customer'} - UNAVAILABLE]`
                              : `— ${formatKsh(r.rate)}/night`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                        Number of Guests <span className="text-red-500">*</span>
                        <span className="text-[#c59b27] font-semibold ml-2">
                          (Max: {activeMaxGuests} {activeMaxGuests === 1 ? 'Guest' : 'Guests'})
                        </span>
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={formData.guests}
                        onChange={(e) => setFormData(p => ({ ...p, guests: parseInt(e.target.value, 10) || 1 }))}
                        className={`w-full px-3.5 py-2.5 text-sm rounded border focus:outline-none focus:ring-2 ${
                          formErrors.guests || isCapacityExceeded
                            ? "border-red-400 bg-red-500/10 focus:ring-red-200"
                            : isDarkMode
                            ? "bg-[#162744] border-slate-700 text-slate-100 focus:border-[#c59b27] focus:ring-amber-500/20"
                            : "bg-white border-slate-300 text-slate-800 focus:border-[#c59b27] focus:ring-amber-100"
                        }`}
                      />
                      {formErrors.guests && (
                        <p className="text-red-500 text-xs mt-1 font-medium">{formErrors.guests}</p>
                      )}
                    </div>
                  </div>

                  {/* Warning if selected room is already booked */}
                  {activeRoom.status === "Booked" && (
                    <div className="mt-4 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 dark:text-red-400 text-xs flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <div>
                        <strong>Room {activeRoom.roomNo} is already booked!</strong> This room was reserved by <strong>{activeRoom.bookedBy || 'another customer'}</strong> and cannot be booked more than once. Please choose an available room from the dropdown list.
                      </div>
                    </div>
                  )}

                  {/* Capacity warning if exceeded */}
                  {isCapacityExceeded && (
                    <div className="mt-4 p-3.5 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-xs text-red-600 dark:text-red-400">
                      <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                      <div>
                        <strong>Capacity Limit Exceeded:</strong> Room {activeRoom.roomNo} accommodates a maximum of {activeMaxGuests} guest(s). You have entered <strong>{formData.guests} guests</strong>.
                      </div>
                    </div>
                  )}

                  {/* Selected room summary box with automatically added tariff */}
                  <div
                    className={`mt-5 p-4 rounded-xl border flex flex-col sm:flex-row gap-4 items-center ${
                      isDarkMode ? "bg-[#142644] border-slate-700" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <img
                      src={activeRoom.image}
                      alt={activeRoom.name}
                      className="w-full sm:w-44 h-28 object-cover rounded shadow-sm"
                    />
                    <div className="flex-1 text-xs">
                      <div
                        className={`font-serif text-lg font-bold ${
                          isDarkMode ? "text-slate-100" : "text-[#0a192f]"
                        }`}
                      >
                        Room {activeRoom.roomNo} &ndash; {activeRoom.name}
                      </div>
                      <div className={`my-1 font-medium ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                        {activeRoom.floor} &bull; {activeRoom.view} &bull; {activeRoom.beds} &bull; {activeRoom.dimensions}
                      </div>
                      <div
                        className={`font-semibold ${
                          activeRoom.status === "Available" ? "text-emerald-500" : "text-amber-400"
                        }`}
                      >
                        Status: {activeRoom.status === "Available" ? "Available to Book" : `Booked (${activeRoom.bookedBy || 'Occupied'})`}
                      </div>
                      <div className="mt-2 text-[#c59b27] font-semibold flex items-center gap-2">
                        <span>Nightly Tariff:</span>
                        <span
                          className={`font-mono font-bold text-sm px-2 py-0.5 rounded border ${
                            isDarkMode
                              ? "text-amber-300 bg-amber-500/20 border-amber-500/40"
                              : "text-[#0a192f] bg-amber-100/60 border-amber-300/40"
                          }`}
                        >
                          {formatKsh(activeRate)} / night
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 03. Additional Services */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                    <span className="font-mono text-[#c59b27]">03</span>
                    <span>Additional Hospitality Services</span>
                  </div>

                  <div className="space-y-3">
                    {/* Breakfast Buffet */}
                    <label
                      className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-colors ${
                        isDarkMode
                          ? "bg-[#142644] border-slate-700 hover:bg-[#182f54]"
                          : "bg-white border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.breakfast}
                        onChange={(e) => setFormData(p => ({ ...p, breakfast: e.target.checked }))}
                        className="mt-1 w-4 h-4 text-[#c59b27] rounded border-slate-300 focus:ring-[#c59b27]"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className={`text-sm font-semibold flex items-center gap-2 ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>
                            <Coffee className="w-4 h-4 text-[#c59b27]" />
                            Daily Gourmet Breakfast Buffet
                          </span>
                          <span
                            className={`font-mono font-bold text-xs px-2 py-0.5 rounded border ${
                              isDarkMode ? "text-amber-300 bg-amber-500/20 border-amber-500/40" : "text-slate-800 bg-amber-50 border-amber-200"
                            }`}
                          >
                            + KSh 700 / person / day
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Full continental and warm coastal Swahili breakfast buffet served fresh each morning. Automatically adds to your folio.
                        </p>
                      </div>
                    </label>

                    {/* Airport Transfer */}
                    <label
                      className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-colors ${
                        isDarkMode
                          ? "bg-[#142644] border-slate-700 hover:bg-[#182f54]"
                          : "bg-white border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.airport_transfer}
                        onChange={(e) => setFormData(p => ({ ...p, airport_transfer: e.target.checked }))}
                        className="mt-1 w-4 h-4 text-[#c59b27] rounded border-slate-300 focus:ring-[#c59b27]"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className={`text-sm font-semibold flex items-center gap-2 ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>
                            <Plane className="w-4 h-4 text-sky-400" />
                            Chauffeured Airport Transfer
                          </span>
                          <span
                            className={`font-mono font-bold text-xs px-2 py-0.5 rounded border ${
                              isDarkMode ? "text-sky-300 bg-sky-950/60 border-sky-800" : "text-slate-800 bg-blue-50 border-blue-200"
                            }`}
                          >
                            + KSh 2,000 flat
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Private executive shuttle pickup or drop-off directly to Sunrise Hotel entrance.
                        </p>
                      </div>
                    </label>

                    {/* Flight Details if Transfer Checked */}
                    {formData.airport_transfer && (
                      <div
                        className={`p-4 rounded-r-xl border-l-4 border-sky-500 space-y-2 ${
                          isDarkMode ? "bg-sky-950/40 border border-slate-700" : "bg-blue-50/70 border border-blue-200"
                        }`}
                      >
                        <label className={`block text-xs font-semibold ${isDarkMode ? "text-sky-300" : "text-blue-950"}`}>
                          Flight Number &amp; Scheduled Arrival Time:
                        </label>
                        <input
                          type="text"
                          value={formData.flight_details}
                          onChange={(e) => setFormData(p => ({ ...p, flight_details: e.target.value }))}
                          placeholder="e.g. Flight KQ 102 arriving at 14:30"
                          className={`w-full px-3 py-2 text-xs rounded border focus:outline-none ${
                            isDarkMode
                              ? "bg-[#12223c] border-slate-700 text-slate-100"
                              : "bg-white border-blue-200 text-slate-800"
                          }`}
                        />
                      </div>
                    )}

                    {/* Laundry Option */}
                    <label
                      className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-colors ${
                        isDarkMode
                          ? "bg-[#142644] border-slate-700 hover:bg-[#182f54]"
                          : "bg-emerald-50/30 border-emerald-200 hover:bg-emerald-50/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.laundry}
                        onChange={(e) => setFormData(p => ({ ...p, laundry: e.target.checked }))}
                        className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className={`text-sm font-semibold flex items-center gap-2 ${isDarkMode ? "text-emerald-300" : "text-emerald-950"}`}>
                            <Shirt className="w-4 h-4 text-emerald-500" />
                            Express Valet Laundry Service
                          </span>
                          <span
                            className={`font-mono font-bold text-xs px-2 py-0.5 rounded border ${
                              isDarkMode ? "text-emerald-300 bg-emerald-950/60 border-emerald-800" : "text-emerald-800 bg-emerald-100/60 border-emerald-200"
                            }`}
                          >
                            + KSh 1,000 flat
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Full garment wash, steam pressing, and express return within 6 hours.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* 04. Special Requests */}
                <div>
                  <label className={`block text-xs font-semibold mb-1.5 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                    Special Concierge Requests (Optional):
                  </label>
                  <textarea
                    value={formData.special_requests}
                    onChange={(e) => setFormData(p => ({ ...p, special_requests: e.target.value }))}
                    placeholder="e.g. Quiet floor preferred, extra feather pillows, anniversary arrival decor..."
                    rows={2}
                    className={`w-full px-3.5 py-2 text-xs rounded border focus:outline-none focus:border-[#c59b27] ${
                      isDarkMode
                        ? "bg-[#162744] border-slate-700 text-slate-100 placeholder-slate-400"
                        : "bg-white border-slate-300 text-slate-800 placeholder-slate-400"
                    }`}
                  />
                </div>

                {/* Validation Error Alert */}
                {submitErrorNotice && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-500 space-y-2">
                    <div className="flex items-center gap-2 font-bold">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Action Required: Cannot Submit Reservation</span>
                    </div>
                    <p>{submitErrorNotice}</p>
                  </div>
                )}

                {/* Confirm & Submit Booking Button (Double Booking Blocked) */}
                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                  {activeRoom.status === "Booked" ? (
                    <button
                      type="button"
                      disabled
                      className="flex-1 bg-slate-300 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold py-4 px-6 rounded-md text-sm cursor-not-allowed text-center border border-slate-400/20"
                    >
                      🔒 Room {activeRoom.roomNo} is Already Booked &mdash; Select An Available Room
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || isCapacityExceeded}
                      className="flex-1 bg-[#c59b27] hover:bg-[#b0871d] active:scale-[0.99] text-white font-bold py-4 px-6 rounded-md shadow-md transition-all text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing &amp; Securing Reservation...
                        </span>
                      ) : (
                        <>Confirm &amp; Submit Booking &rarr;</>
                      )}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        customer_name: "",
                        id_number: "",
                        email: "",
                        phone: "",
                        check_in_date: "",
                        nights: 1,
                        selected_room_no: 1,
                        guests: 1,
                        breakfast: false,
                        airport_transfer: false,
                        flight_details: "",
                        laundry: false,
                        special_requests: ""
                      });
                      setFormErrors({});
                      setSubmitErrorNotice(null);
                    }}
                    className={`sm:w-28 font-semibold py-4 px-4 rounded text-sm transition-colors cursor-pointer border ${
                      isDarkMode
                        ? "bg-[#162744] border-slate-700 text-slate-300 hover:bg-[#1d3356]"
                        : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Reset Form
                  </button>
                </div>
              </form>
            </div>

            {/* Right Folio Ledger */}
            <div className="lg:col-span-4 sticky top-28 space-y-4">
              <div
                className={`rounded-xl overflow-hidden shadow-sm border ${
                  isDarkMode ? "bg-[#0e1b30] border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
                }`}
              >
                <div className="bg-[#0a192f] text-white p-5 border-b border-slate-800">
                  <h3 className="font-serif text-xl font-bold">Estimated Folio</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Real-time automatic billing calculation</p>
                </div>

                <div className="p-6 space-y-4 text-sm">
                  {/* Room Charge */}
                  <div className={`flex justify-between items-baseline pb-2 border-b border-dashed ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}>
                    <div>
                      <div className={`font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>
                        Room {activeRoom.roomNo} ({activeRoom.category})
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        {formatKsh(activeRate)} &times; {formData.nights} night{formData.nights === 1 ? '' : 's'}
                      </div>
                    </div>
                    <div className={`font-mono font-bold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>{formatKsh(roomCost)}</div>
                  </div>

                  {/* Breakfast Charge */}
                  {formData.breakfast && (
                    <div className={`flex justify-between items-baseline pb-2 border-b border-dashed ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}>
                      <div>
                        <div className={`font-medium ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>Breakfast Buffet</div>
                        <div className="text-xs text-slate-400 font-mono">
                          {formData.guests} pax &times; {formData.nights} days &times; 700
                        </div>
                      </div>
                      <div className={`font-mono font-bold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>{formatKsh(breakfastCost)}</div>
                    </div>
                  )}

                  {/* Airport Transfer Charge */}
                  {formData.airport_transfer && (
                    <div className={`flex justify-between items-baseline pb-2 border-b border-dashed ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}>
                      <div>
                        <div className={`font-medium ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>Airport Transfer</div>
                        <div className="text-xs text-slate-400">Flat shuttle rate</div>
                      </div>
                      <div className={`font-mono font-bold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>{formatKsh(transferCost)}</div>
                    </div>
                  )}

                  {/* Laundry Charge */}
                  {formData.laundry && (
                    <div className={`flex justify-between items-baseline pb-2 border-b border-dashed ${isDarkMode ? "border-slate-800" : "border-slate-200"}`}>
                      <div>
                        <div className="font-medium text-emerald-400">Valet Laundry</div>
                        <div className="text-xs text-emerald-500/80">Flat garment care fee</div>
                      </div>
                      <div className="font-mono font-bold text-emerald-400">{formatKsh(laundryCost)}</div>
                    </div>
                  )}

                  {/* Total Amount */}
                  <div className="pt-2 flex justify-between items-baseline">
                    <span className={`font-serif text-lg font-bold ${isDarkMode ? "text-slate-100" : "text-[#0a192f]"}`}>
                      TOTAL AMOUNT:
                    </span>
                    <span className="font-mono text-2xl font-black text-[#c59b27]">
                      {formatKsh(grandTotal)}
                    </span>
                  </div>

                  <div className={`rounded p-3 text-[11px] leading-relaxed border ${isDarkMode ? "bg-[#142644] border-slate-700 text-slate-300" : "bg-slate-50 border-slate-200/80 text-slate-500"}`}>
                    <strong>Automated Status:</strong> Submitting locks Room {activeRoom.roomNo} as <strong>Booked</strong> by you. No one else can book this room until checkout completes.
                  </div>
                </div>
              </div>

              {/* Direct Help Widget */}
              <div
                className={`rounded-xl p-5 shadow-sm text-xs space-y-2 border ${
                  isDarkMode ? "bg-[#0e1b30] border-slate-800 text-slate-200" : "bg-white border-slate-200"
                }`}
              >
                <div className={`font-bold ${isDarkMode ? "text-slate-100" : "text-[#0a192f]"}`}>
                  Need Assistance with Your Booking?
                </div>
                <p className="text-slate-400">Contact our 24/7 customer help desk directly:</p>
                <div className="pt-1 flex flex-col gap-1 font-medium">
                  <a
                    href="tel:+254748642275"
                    className={`flex items-center gap-1.5 transition-colors ${
                      isDarkMode ? "text-slate-200 hover:text-[#c59b27]" : "text-[#0a192f] hover:text-[#c59b27]"
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5 text-[#c59b27]" /> +254 748 642 275
                  </a>
                  <a
                    href="mailto:marvinfrank2680@gmail.com"
                    className={`flex items-center gap-1.5 transition-colors ${
                      isDarkMode ? "text-slate-200 hover:text-[#c59b27]" : "text-[#0a192f] hover:text-[#c59b27]"
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5 text-[#c59b27]" /> marvinfrank2680@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VIEW 3: CONFIRMATION RECEIPT */}
      {activeView === "confirmation" && confirmedBooking && (
        <main className="flex-1 max-w-2xl mx-auto px-6 py-12 w-full">
          <div
            className={`border rounded-xl shadow-lg overflow-hidden transition-colors ${
              isDarkMode
                ? "bg-[#0c182b] border-slate-700 text-slate-100"
                : "bg-white border-slate-200 text-slate-800"
            }`}
          >
            <div className="bg-[#15803d] text-white p-8 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto text-2xl font-bold">
                &#10004;
              </div>
              <h1 className="font-serif text-3xl font-bold tracking-wide uppercase">
                BOOKING CONFIRMED
              </h1>
              <p className="text-emerald-100 text-xs sm:text-sm">
                Sunrise Hotel &bull; Verified Online Room Reservation Voucher
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-200 bg-emerald-900/50 px-3 py-1 rounded-full border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                Room {confirmedBooking.selected_room_no} is now secured as Booked
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div
                className={`flex justify-between items-center text-xs pb-3 border-b font-mono ${
                  isDarkMode ? "border-slate-800 text-slate-400" : "border-slate-200 text-slate-500"
                }`}
              >
                <span>REF: {confirmedBooking.reference}</span>
                <span>{confirmedBooking.timestamp}</span>
              </div>

              <div className="space-y-3 text-sm">
                <div
                  className={`flex justify-between py-1.5 border-b ${
                    isDarkMode ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>Customer:</span>
                  <span className={`font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>
                    {confirmedBooking.customer_name}
                  </span>
                </div>
                <div
                  className={`flex justify-between py-1.5 border-b ${
                    isDarkMode ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>National ID / Passport:</span>
                  <span className={`font-mono ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>
                    {confirmedBooking.id_number}
                  </span>
                </div>
                <div
                  className={`flex justify-between py-1.5 border-b ${
                    isDarkMode ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>Email Address:</span>
                  <span className={isDarkMode ? "text-slate-100" : "text-slate-900"}>
                    {confirmedBooking.email}
                  </span>
                </div>
                <div
                  className={`flex justify-between py-1.5 border-b ${
                    isDarkMode ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>Phone Number:</span>
                  <span className={`font-mono ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>
                    {confirmedBooking.phone}
                  </span>
                </div>
                <div
                  className={`flex justify-between py-1.5 border-b ${
                    isDarkMode ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>Check-in Date:</span>
                  <span className={`font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>
                    {confirmedBooking.check_in_date}
                  </span>
                </div>
                <div
                  className={`flex justify-between py-1.5 border-b ${
                    isDarkMode ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>Room:</span>
                  <span className={`font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>
                    Room {confirmedBooking.selected_room_no} ({confirmedBooking.room_name})
                  </span>
                </div>
                <div
                  className={`flex justify-between py-1.5 border-b ${
                    isDarkMode ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>Guests:</span>
                  <span className={`font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>
                    {confirmedBooking.guests}
                  </span>
                </div>
                <div
                  className={`flex justify-between py-1.5 border-b ${
                    isDarkMode ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>Number of Nights:</span>
                  <span className={`font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>
                    {confirmedBooking.nights}
                  </span>
                </div>
                <div
                  className={`flex justify-between py-1.5 border-b ${
                    isDarkMode ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>Breakfast:</span>
                  <span className={`font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>
                    {confirmedBooking.breakfast ? `Yes (${formatKsh(confirmedBooking.breakfast_total)})` : "No"}
                  </span>
                </div>
                <div
                  className={`flex justify-between py-1.5 border-b ${
                    isDarkMode ? "border-slate-800" : "border-slate-100"
                  }`}
                >
                  <span className={isDarkMode ? "text-slate-400" : "text-slate-500"}>Airport Transfer:</span>
                  <span className={`font-semibold ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}>
                    {confirmedBooking.airport_transfer ? `Yes (${formatKsh(confirmedBooking.transfer_total)})` : "No"}
                  </span>
                </div>
                {confirmedBooking.laundry && (
                  <div
                    className={`flex justify-between py-1.5 border-b ${
                      isDarkMode ? "border-slate-800 text-emerald-400" : "border-slate-100 text-emerald-800"
                    }`}
                  >
                    <span className="font-medium">Valet Laundry:</span>
                    <span className="font-mono font-bold">Yes ({formatKsh(confirmedBooking.laundry_total)})</span>
                  </div>
                )}
                {confirmedBooking.special_requests && (
                  <div
                    className={`flex justify-between py-1.5 border-b ${
                      isDarkMode ? "border-slate-800 text-slate-300" : "border-slate-100 text-slate-600"
                    }`}
                  >
                    <span className="font-medium">Special Requests:</span>
                    <span className="text-xs italic">{confirmedBooking.special_requests}</span>
                  </div>
                )}
              </div>

              {/* Total Verified Amount */}
              <div
                className={`rounded-lg p-5 flex justify-between items-center border-2 border-dashed ${
                  isDarkMode
                    ? "bg-amber-950/20 border-amber-500/40 text-amber-200"
                    : "bg-amber-50 border-[#c59b27] text-amber-900"
                }`}
              >
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold">
                    TOTAL AMOUNT:
                  </div>
                  <div className={`text-[11px] ${isDarkMode ? "text-amber-400/80" : "text-amber-700"}`}>
                    Verified Folio Billing
                  </div>
                </div>
                <div
                  className={`font-mono text-3xl font-black ${
                    isDarkMode ? "text-amber-300" : "text-amber-900"
                  }`}
                >
                  {formatKsh(confirmedBooking.grand_total)}
                </div>
              </div>

              <div
                className={`text-center text-sm italic font-serif ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Thank you for choosing Sunrise Hotel.
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2.5 rounded flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print Voucher
                </button>
                <button
                  onClick={() => {
                    setActiveView("booking");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="bg-[#c59b27] hover:bg-[#b0871d] text-white font-semibold text-xs px-5 py-2.5 rounded cursor-pointer"
                >
                  + New Booking
                </button>
                <button
                  onClick={() => {
                    setActiveView("home");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`font-semibold text-xs px-5 py-2.5 rounded cursor-pointer transition-colors ${
                    isDarkMode
                      ? "bg-[#142644] hover:bg-[#1a3156] text-slate-200"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  Return to 76 Rooms Directory
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ROOM SPECS MODAL */}
      {specsModalRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div
            className={`rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border transition-colors ${
              isDarkMode
                ? "bg-[#0c182b] border-slate-700 text-slate-100"
                : "bg-white border-slate-200 text-slate-800"
            }`}
          >
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-mono text-[#c59b27] font-bold">Room {specsModalRoom.roomNo} Specifications</div>
                  <h3
                    className={`font-serif text-2xl font-bold ${
                      isDarkMode ? "text-slate-100" : "text-[#0a192f]"
                    }`}
                  >
                    {specsModalRoom.name}
                  </h3>
                  <div className={`text-xs mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    {specsModalRoom.floor} &bull; {specsModalRoom.view}
                  </div>
                </div>
                <button
                  onClick={() => setSpecsModalRoom(null)}
                  className={`p-1 cursor-pointer transition-colors ${
                    isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="h-48 rounded-lg overflow-hidden bg-slate-900">
                <img
                  src={specsModalRoom.image}
                  alt={specsModalRoom.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className={`grid grid-cols-2 gap-3 text-xs p-4 rounded-lg border ${
                  isDarkMode
                    ? "bg-[#142644] border-slate-700/80 text-slate-200"
                    : "bg-slate-50 border-slate-200/80 text-slate-800"
                }`}
              >
                <div>
                  <span className="text-slate-400 block">Bed Configuration:</span>
                  <strong className={isDarkMode ? "text-slate-100" : "text-slate-800"}>
                    {specsModalRoom.beds}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Floor Area:</span>
                  <strong className={isDarkMode ? "text-slate-100" : "text-slate-800"}>
                    {specsModalRoom.dimensions}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Maximum Occupancy:</span>
                  <strong className={isDarkMode ? "text-slate-100" : "text-slate-800"}>
                    {specsModalRoom.maxGuests} {specsModalRoom.maxGuests === 1 ? 'Guest' : 'Guests'}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Room View:</span>
                  <strong className={`flex items-center gap-1 ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>
                    {specsModalRoom.viewType === "Ocean View" && "🌊 " + specsModalRoom.view}
                    {specsModalRoom.viewType === "Garden View" && "🌿 " + specsModalRoom.view}
                    {specsModalRoom.viewType === "No Ocean View" && "🏛️ " + specsModalRoom.view}
                  </strong>
                </div>
                <div
                  className={`col-span-2 pt-1 border-t ${
                    isDarkMode ? "border-slate-700" : "border-slate-200/60"
                  }`}
                >
                  <span className="text-slate-400 block">Current Status:</span>
                  <strong className={specsModalRoom.status === "Available" ? "text-emerald-400" : "text-amber-400"}>
                    {specsModalRoom.status === "Available" ? "Available for Online Booking" : `Booked (${specsModalRoom.bookedBy || 'Occupied'})`}
                  </strong>
                </div>
              </div>

              <div
                className={`text-[11px] p-2.5 rounded text-left border ${
                  isDarkMode
                    ? "bg-amber-950/20 border-amber-500/30 text-slate-300"
                    : "bg-amber-50/70 border-amber-200/70 text-slate-600"
                }`}
              >
                <strong>Sunrise Hotel Oceanfront Estate:</strong> Located directly on the shore of the Indian Ocean in Nyali Beach, Mombasa. Each room is strictly a private guest accommodation with zero disturbance.
              </div>

              <div className="pt-2 flex gap-3">
                {specsModalRoom.status === "Available" ? (
                  <button
                    onClick={() => {
                      handleSelectRoomToBook(specsModalRoom);
                      setSpecsModalRoom(null);
                    }}
                    className="flex-1 bg-[#c59b27] hover:bg-[#b0871d] text-white font-bold py-2.5 rounded text-xs text-center cursor-pointer"
                  >
                    Select Room {specsModalRoom.roomNo} &amp; Proceed to Booking &rarr;
                  </button>
                ) : (
                  <button
                    disabled
                    className={`flex-1 font-bold py-2.5 rounded text-xs text-center cursor-not-allowed border ${
                      isDarkMode
                        ? "bg-slate-800 text-slate-400 border-slate-700"
                        : "bg-slate-200 text-slate-500 border-slate-300"
                    }`}
                  >
                    Room {specsModalRoom.roomNo} is Currently Occupied
                  </button>
                )}
                <button
                  onClick={() => setSpecsModalRoom(null)}
                  className={`font-semibold px-4 py-2.5 rounded text-xs cursor-pointer transition-colors ${
                    isDarkMode
                      ? "bg-[#142644] hover:bg-[#1c3358] text-slate-200"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LUXURY COOKIE CONSENT BANNER */}
      {!cookieAccepted && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a192f]/98 text-white border-t border-amber-500/30 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-500/20 text-[#e2c069] rounded-lg shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="text-xs leading-relaxed text-slate-300 max-w-3xl">
                <strong className="text-white">Privacy &amp; Cookie Consent:</strong> We use essential cookies to maintain your selected room reservations, ensure secure bill verification, and enhance your stay experience. By continuing to explore Sunrise Hotel, you consent to our privacy and cookie terms.
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
              <button
                onClick={() => {
                  try { localStorage.setItem("sunrise_cookie_consent", "accepted"); } catch {}
                  setCookieAccepted(true);
                }}
                className="bg-[#c59b27] hover:bg-[#b0871d] text-white font-bold text-xs px-5 py-2 rounded shadow transition-colors whitespace-nowrap cursor-pointer"
              >
                Accept All Cookies
              </button>
              <button
                onClick={() => {
                  try { localStorage.setItem("sunrise_cookie_consent", "accepted"); } catch {}
                  setCookieAccepted(true);
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs px-4 py-2 rounded transition-colors whitespace-nowrap cursor-pointer"
              >
                Essential Only
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CLEAN LUXURY FOOTER WITH COASTAL WEATHER & TIDE BAR (LOCATED AT FOOTER AS REQUESTED) */}
      <footer className="bg-[#0a192f] text-slate-400 text-xs border-t border-slate-800 mt-auto">
        {/* Coastal Weather, Ocean Tide & Live Inventory Bar */}
        <div className="bg-[#06101e] border-b border-slate-800/80 py-3.5 px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-300">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Sun className="w-3.5 h-3.5 text-amber-400" /> Mombasa Coastline: 29°C &bull; Sunny
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Wind className="w-3.5 h-3.5 text-cyan-400" /> Sea Breeze: 11 kts NE
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Waves className="w-3.5 h-3.5 text-sky-400" /> Indian Ocean Tide: Low Tide 14:00 &bull; High Tide 20:15
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Room Inventory: <strong className="text-white">{availableCount} Available</strong> / <strong className="text-amber-400">{bookedCount} Booked</strong>
              </span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="hidden sm:inline">Nyali Beach Shore, Mombasa</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-14 px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-4">
          <div className="md:col-span-2">
            <div className="flex items-baseline gap-2.5 mb-2">
              <span className="font-serif text-3xl font-bold text-white">Sunrise Hotel</span>
              <span className="text-sm uppercase tracking-widest text-[#c59b27] font-bold">Mombasa Resort</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A serene 5-star coastal retreat in Kenya featuring 76 individually appointed rooms and suites (Room 1 to 76) across four wings, gourmet dining, and instant online room reservations with verified server billing.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-300">
              <a href="tel:+254748642275" className="flex items-center gap-1.5 hover:text-[#c59b27] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#c59b27]" /> +254 748 642 275
              </a>
              <a href="mailto:marvinfrank2680@gmail.com" className="flex items-center gap-1.5 hover:text-[#c59b27] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#c59b27]" /> marvinfrank2680@gmail.com
              </a>
            </div>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Reservations Desk</div>
            <p className="text-xs leading-relaxed space-y-1">
              <span>Telephone: +254 748 642 275</span><br />
              <span>Email: marvinfrank2680@gmail.com</span><br />
              <span>Location: Sunrise Boulevard, Coastway, Kenya</span><br />
              <span>Check-in: 2:00 PM &bull; Check-out: 10:00 AM</span>
            </p>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Hotel Navigation</div>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => { setActiveView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="text-left text-slate-400 hover:text-white cursor-pointer"
              >
                Hotel Overview
              </button>
              <button 
                onClick={() => { setActiveView("booking"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="text-left text-slate-400 hover:text-white cursor-pointer"
              >
                Room Reservation &amp; Folio Billing
              </button>
              <a href="#dining" className="text-left text-slate-400 hover:text-white">
                Swahili Dishes &amp; Dining
              </a>
              <a href="#visitor-suggestions" className="text-left text-slate-400 hover:text-white">
                Visitor Suggestions
              </a>
              <a href="#location" className="text-left text-slate-400 hover:text-white">
                Google Maps Location
              </a>
              <a href="#rooms-list" className="text-left text-slate-400 hover:text-white">
                Directory of 76 Rooms
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>&copy; 2026 Sunrise Hotel. Luxury Accommodations &amp; Online Room Reservation System.</div>
        </div>
      </footer>
    </div>
  );
}
