
import { useState, useEffect, useRef } from "react";

import tricycleImg from "./assets/tricycle.png";
import jeepneyImg from "./assets/jeepney.png";
import bangkaImg from "./assets/bangka.png";

/* ── Google Fonts ── */
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
    * { font-family: 'DM Sans', sans-serif; }
    h1, h2, h3, .display { font-family: 'Playfair Display', serif; }
    html { scroll-behavior: smooth; }
    .nav-link { position: relative; }
    .nav-link::after {
      content: ''; position: absolute; bottom: -4px; left: 0;
      width: 0; height: 2px; background: #16a34a;
      transition: width 0.3s ease;
    }
    .nav-link.active::after, .nav-link:hover::after { width: 100%; }
    .nav-link.active { color: #16a34a; font-weight: 600; }
    .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
    .star { cursor: pointer; transition: transform 0.15s; }
    .star:hover { transform: scale(1.2); }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeUp 0.6s ease both; }
    @keyframes pulse-soft {
      0%, 100% { opacity: 1; } 50% { opacity: 0.6; }
    }
    .pulse-soft { animation: pulse-soft 2s infinite; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #f0fdf4; }
    ::-webkit-scrollbar-thumb { background: #16a34a; border-radius: 3px; }
  `}</style>
);

/* ── WMO Weather Code Map ── */
const WMO = {
  0: { label: "Clear Sky", icon: "☀️" },
  1: { label: "Mainly Clear", icon: "🌤️" },
  2: { label: "Partly Cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Foggy", icon: "🌫️" },
  48: { label: "Icy Fog", icon: "🌫️" },
  51: { label: "Light Drizzle", icon: "🌦️" },
  53: { label: "Drizzle", icon: "🌦️" },
  55: { label: "Heavy Drizzle", icon: "🌧️" },
  61: { label: "Light Rain", icon: "🌧️" },
  63: { label: "Rain", icon: "🌧️" },
  65: { label: "Heavy Rain", icon: "🌧️" },
  71: { label: "Light Snow", icon: "🌨️" },
  80: { label: "Rain Showers", icon: "🌦️" },
  81: { label: "Showers", icon: "🌧️" },
  82: { label: "Heavy Showers", icon: "⛈️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
  99: { label: "Heavy Thunderstorm", icon: "🌩️" },
};

/* ── Static Data ── */
const destinations = [
  {
    name: "Dahican Beach",
    badge: "Beach & Sea",
    location: "Mati City, Davao Oriental",
    tagline: "The Skimboarding Capital of the Philippines",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590523278191-995cbcda646b?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?q=80&w=900&auto=format&fit=crop",
    ],
    description: "Dahican Beach is a stunning 7-kilometer white-sand coastline famous as the skimboarding capital of the Philippines. Its powerful shore breaks draw riders from around the world, while its crystal-clear waters and natural beauty make it a must-visit destination in Mindanao.",
    highlights: ["World-class skimboarding", "7km white sand beach", "Surfing & kiteboarding", "Beach camping", "Seafood stalls"],
    bestTime: "November – May",
    entryFee: "Free (₱20 parking)",
    coords: { lat: 6.9376, lon: 126.3098 },
    mapBbox: "126.2898,6.9176,126.3298,6.9576",
    googleMaps: "https://maps.google.com/?q=Dahican+Beach+Mati+Davao+Oriental",
    rating: 4.9, reviews: 210,
  },
  {
    name: "Mt. Hamiguitan Range",
    badge: "UNESCO Heritage",
    location: "Mati City, Davao Oriental",
    tagline: "UNESCO World Heritage Site & Pygmy Forest",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542202229-7d93c33f5d07?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=900&auto=format&fit=crop",
    ],
    description: "Mount Hamiguitan Range Wildlife Sanctuary is a UNESCO World Heritage Site renowned for its dwarf (pygmy) forest ecosystem, rare pitcher plants, endemic birds, and unique biodiversity. Rising 1,637 meters above sea level, it is one of the Philippines' most ecologically significant mountains.",
    highlights: ["UNESCO World Heritage Site", "Pygmy forest ecosystem", "Pitcher plants & orchids", "Endemic wildlife", "Sunrise trekking"],
    bestTime: "March – June",
    entryFee: "₱100 – ₱300 (with guide)",
    coords: { lat: 6.7183, lon: 126.1917 },
    mapBbox: "126.1517,6.6783,126.2317,6.7583",
    googleMaps: "https://maps.google.com/?q=Mount+Hamiguitan+Wildlife+Sanctuary+Davao+Oriental",
    rating: 4.8, reviews: 142,
  },
  {
    name: "Subangan Museum",
    badge: "Cultural Heritage",
    location: "Mati City, Davao Oriental",
    tagline: "Heart of Davao Oriental's Indigenous Heritage",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1200&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=900&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=900&auto=format&fit=crop",
    ],
    description: "The Subangan Museum in Mati City is a regional museum showcasing the rich cultural heritage, traditional artifacts, and indigenous traditions of the Mandaya, Mansaka, and Kalagan peoples of Davao Oriental. It is the cultural heartbeat of the province.",
    highlights: ["Mandaya tribal artifacts", "Traditional weaving demos", "Indigenous costumes", "Local craft market", "Cultural performances"],
    bestTime: "Year-round (closed Mon)",
    entryFee: "₱30 (students ₱15)",
    coords: { lat: 6.9534, lon: 126.2127 },
    mapBbox: "126.1927,6.9334,126.2327,6.9734",
    googleMaps: "https://maps.google.com/?q=Subangan+Museum+Mati+City",
    rating: 4.7, reviews: 98,
  },
];

const packages = [
  { title: "Adventure Package", price: "₱2,500", duration: "2 Days / 1 Night", icon: "🏕️", perks: ["Guide included", "Meals", "Equipment"] },
  { title: "Beach Escape", price: "₱3,200", duration: "3 Days / 2 Nights", icon: "🏖️", perks: ["Snorkel gear", "Boat trips", "Breakfast"] },
  { title: "Cultural Tour", price: "₱1,800", duration: "1 Day", icon: "🏛️", perks: ["Local guide", "Lunch", "Craft demo"] },
];

const fareRates = [
  {
    mode: "🛺 Tricycle",
    image: tricycleImg,
    color: "bg-amber-50 border-amber-200",
    accent: "text-amber-700",
    routes: [
      { route: "City Proper → Public Market", fare: "₱15" },
      { route: "Bus Terminal → Baywalk", fare: "₱20" },
      { route: "City Proper → Dahican Beach", fare: "₱50–₱80" },
      { route: "Special Trip (within city)", fare: "₱100–₱150" },
      { route: "Night Surcharge", fare: "+₱10" },
    ],
  },
  {
    mode: "🚐 Van / Jeepney",
    image: jeepneyImg,
    color: "bg-sky-50 border-sky-200",
    accent: "text-sky-700",
    routes: [
      { route: "Mati City → Banaybanay", fare: "₱60–₱90" },
      { route: "Mati City → Lupon", fare: "₱80–₱120" },
      { route: "Mati City → Tagum", fare: "₱250–₱350" },
      { route: "Mati City → Davao City", fare: "₱350–₱500" },
      { route: "Air-conditioned Van", fare: "+₱50" },
    ],
  },
  {
    mode: "⛵ Boat / Bangka",
    image: bangkaImg,
    color: "bg-teal-50 border-teal-200",
    accent: "text-teal-700",
    routes: [
      { route: "Island Hopping (shared)", fare: "₱100–₱300" },
      { route: "Pujada Bay Tour", fare: "₱1,500–₱3,000" },
      { route: "Waniban Island Trip", fare: "₱2,000–₱4,000" },
      { route: "Dahican Coastal Tour", fare: "₱500–₱1,200" },
      { route: "Private Charter", fare: "₱3,000+" },
    ],
  },
];

const hotlines = [
  { name: "Philippine National Police (PNP)", number: "117", icon: "👮", color: "bg-blue-600", desc: "Emergency police assistance" },
  { name: "Bureau of Fire Protection", number: "160", icon: "🚒", color: "bg-red-600", desc: "Fire emergency & rescue" },
  { name: "Emergency Medical Services", number: "911", icon: "🚑", color: "bg-green-600", desc: "Medical & general emergency" },
  { name: "Philippine Coast Guard", number: "(083) 552-0111", icon: "⚓", color: "bg-sky-600", desc: "Maritime & sea emergencies" },
  { name: "NDRRMC Hotline", number: "8888", icon: "🆘", color: "bg-orange-600", desc: "Disaster risk & response" },
  { name: "DOT Tourist Hotline", number: "1-800-10-239-6000", icon: "🗺️", color: "bg-purple-600", desc: "Tourism assistance (toll-free)" },
  { name: "Mati Provincial Hospital", number: "(083) 508-2345", icon: "🏥", color: "bg-emerald-600", desc: "Nearest provincial hospital" },
  { name: "Local Tourist Office", number: "(083) 300-1234", icon: "ℹ️", color: "bg-indigo-600", desc: "Local tourism information" },
];

const initialReviews = [
  { id: 1, name: "Maria Santos", destination: "Island Paradise", rating: 5, date: "May 2025", text: "Affordable packages and incredibly friendly local guides. The snorkeling spots were pristine. Highly recommended for families!", avatar: "MS" },
  { id: 2, name: "John Cruz", destination: "Mountain Escape", rating: 4, date: "Apr 2025", text: "The mountain trails were breathtaking. Booking was seamless and the eco-guides were very knowledgeable about local flora.", avatar: "JC" },
  { id: 3, name: "Angela Reyes", destination: "Cultural Village", rating: 5, date: "Mar 2025", text: "Perfect platform for supporting local entrepreneurs. The weaving demo and native food experience were unforgettable!", avatar: "AR" },
  { id: 4, name: "Rodel Manalo", destination: "Island Paradise", rating: 5, date: "Feb 2025", text: "Best island hopping experience I've had in Mindanao. The bangka crew were professional and the waters were crystal clear.", avatar: "RM" },
  { id: 5, name: "Liza Ocampo", destination: "Mountain Escape", rating: 4, date: "Jan 2025", text: "A refreshing break from city life. The community-based tourism approach ensures your money goes directly to locals.", avatar: "LO" },
];

/* ── Star component ── */
const Stars = ({ rating, onRate, size = "text-xl" }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <span
        key={s}
        className={`star ${size} ${s <= rating ? "text-yellow-400" : "text-gray-300"}`}
        onClick={() => onRate && onRate(s)}
      >★</span>
    ))}
  </div>
);

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function TourismWebsite() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [reviews, setReviews] = useState(initialReviews);
  const [filterRating, setFilterRating] = useState(0);
  const [newReview, setNewReview] = useState({ name: "", destination: "", rating: 0, text: "" });
  const [showForm, setShowForm] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [bookingForm, setBookingForm] = useState({ fullname: "", email: "", package: "", guests: "", date: "" });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const sectionRefs = useRef({});

  /* ── Smart Navigation: IntersectionObserver ── */
  useEffect(() => {
    const sections = ["home", "destinations", "packages", "reviews", "weather", "fares", "hotlines", "booking"];
    const observers = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      sectionRefs.current[id] = el;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Weather: Open-Meteo (no API key) ── */
  useEffect(() => {
    // Mati City, Davao Oriental coordinates
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=6.9551&longitude=126.2163" +
      "&current=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m,apparent_temperature" +
      "&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max" +
      "&timezone=Asia%2FManila&forecast_days=5"
    )
      .then((r) => r.json())
      .then((d) => { setWeather(d); setWeatherLoading(false); })
      .catch(() => setWeatherLoading(false));
  }, []);

  /* ── Booking submit ── */
  const handleBooking = (e) => {
    e.preventDefault();
    setBookings((prev) => [...prev, { ...bookingForm, id: Date.now() }]);
    setBookingForm({ fullname: "", email: "", package: "", guests: "", date: "" });
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 4000);
  };

  /* ── Review submit ── */
  const submitReview = () => {
    if (!newReview.name || !newReview.text || !newReview.rating || !newReview.destination) return;
    const initials = newReview.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    setReviews((prev) => [
      { ...newReview, id: Date.now(), date: "Just now", avatar: initials },
      ...prev,
    ]);
    setNewReview({ name: "", destination: "", rating: 0, text: "" });
    setShowForm(false);
  };

  const filteredReviews = filterRating ? reviews.filter((r) => r.rating === filterRating) : reviews;
  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "destinations", label: "Destinations" },
    { id: "packages", label: "Packages" },
    { id: "reviews", label: "Reviews" },
    { id: "weather", label: "Weather" },
    { id: "fares", label: "Fare Rates" },
    { id: "hotlines", label: "Hotlines" },
    { id: "booking", label: "Book Now" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  /* ── Weather helpers ── */
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const cur = weather?.current;
  const curInfo = WMO[cur?.weathercode] ?? { label: "Loading…", icon: "🌡️" };

  return (
    <div className="bg-gray-50 text-gray-800" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <FontLink />

      {/* ════════ NAVBAR ════════ */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-green-700" style={{ fontFamily: "'Playfair Display', serif" }}>
              TourEase Mati
            </h1>
            <p className="text-xs text-gray-400 leading-none">www.tourease.xyz-abc.workers.dev</p>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`nav-link pb-1 transition-colors ${activeSection === l.id ? "active text-green-700 font-semibold" : "hover:text-green-700"}`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`h-0.5 bg-gray-700 transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 bg-gray-700 transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 bg-gray-700 transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 grid grid-cols-2 gap-2">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  activeSection === l.id ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ════════ HERO ════════ */}
      <section
        id="home"
        className="min-h-screen bg-cover bg-center flex items-center justify-center text-white relative"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="relative z-10 text-center max-w-3xl px-6 fade-up">
          <span className="inline-block bg-green-500/30 backdrop-blur-sm border border-green-400/40 text-green-200 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            🌿 Sustainable & Community-Driven Tourism
          </span>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Empowering Local Tourism Entrepreneurs
          </h2>
          <p className="text-lg mb-10 text-gray-200 max-w-xl mx-auto">
            Explore eco-friendly destinations, support local communities, and experience unforgettable adventures.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => scrollTo("destinations")}
              className="bg-green-600 hover:bg-green-500 transition px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg shadow-green-900/40"
            >
              Explore Now
            </button>
            <button
              onClick={() => scrollTo("weather")}
              className="bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 transition px-8 py-4 rounded-2xl text-lg font-semibold"
            >
              Today's Weather ☀️
            </button>
          </div>
        </div>

        {/* Quick stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="max-w-5xl mx-auto px-6 py-4 grid grid-cols-3 gap-4 text-center text-white">
            {[["150+", "Local Guides"], ["3,000+", "Happy Travelers"], ["₱1,800", "Starting Price"]].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="text-2xl font-bold">{val}</div>
                <div className="text-xs text-gray-300">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ DESTINATIONS ════════ */}
      <section id="destinations" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-2">Discover · Mati City, Davao Oriental</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Tourist Destinations
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Tap any destination to explore the map location, photo gallery, and travel details.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {destinations.map((place, i) => (
              <button
                key={i}
                onClick={() => { setSelectedDest(place); setActivePhoto(0); }}
                className="card-hover bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 text-left group w-full"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={place.image} alt={place.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-green-600/90 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {place.badge}
                  </span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur text-gray-800 text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                      🗺️ View Details & Map
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>{place.name}</h3>
                    <span className="text-sm font-semibold text-yellow-600 flex-shrink-0 ml-2">⭐ {place.rating}</span>
                  </div>
                  <p className="text-green-600 text-xs font-medium mb-2">📍 {place.location}</p>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{place.tagline}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">{place.reviews} reviews</p>
                    <span className="text-xs text-green-600 font-medium">Tap to explore →</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ DESTINATION MODAL ════════ */}
      {selectedDest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
          onClick={(e) => e.target === e.currentTarget && setSelectedDest(null)}
        >
          <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl fade-up">
            <div className="relative">
              <img
                src={selectedDest.photos[activePhoto]}
                alt={selectedDest.name}
                className="w-full h-72 object-cover rounded-t-3xl"
                style={{ transition: "opacity 0.3s" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 rounded-t-3xl" />
              <button
                onClick={() => setSelectedDest(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition"
              >×</button>
              <span className="absolute top-4 left-4 bg-green-600/90 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                {selectedDest.badge}
              </span>
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{selectedDest.name}</h2>
                <p className="text-green-300 text-sm">📍 {selectedDest.location}</p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                {selectedDest.photos.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhoto(idx)}
                    className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition ${activePhoto === idx ? "border-green-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <img src={src} alt="" className="w-20 h-14 object-cover" />
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-green-700 font-semibold text-sm italic mb-3">"{selectedDest.tagline}"</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{selectedDest.description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { label: "⭐ Rating", value: `${selectedDest.rating} / 5` },
                      { label: "🗓️ Best Time", value: selectedDest.bestTime },
                      { label: "🎟️ Entry Fee", value: selectedDest.entryFee },
                      { label: "💬 Reviews", value: `${selectedDest.reviews} reviews` },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-green-50 rounded-2xl p-3 border border-green-100">
                        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                        <p className="text-sm font-semibold text-gray-800">{value}</p>
                      </div>
                    ))}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Highlights</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedDest.highlights.map((h) => (
                      <span key={h} className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full">✓ {h}</span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setSelectedDest(null); scrollTo("booking"); }}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold text-sm transition"
                    >
                      🗓️ Book This Destination
                    </button>
                    <a
                      href={selectedDest.googleMaps}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-2xl font-semibold text-sm transition flex items-center gap-1"
                    >
                      🗺️ Maps
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">📍 Map Location</h4>
                  <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md">
                    <iframe
                      title={`Map of ${selectedDest.name}`}
                      width="100%"
                      height="300"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedDest.mapBbox}&layer=mapnik&marker=${selectedDest.coords.lat},${selectedDest.coords.lon}`}
                      style={{ border: 0 }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    {selectedDest.coords.lat}°N, {selectedDest.coords.lon}°E ·{" "}
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${selectedDest.coords.lat}&mlon=${selectedDest.coords.lon}#map=14/${selectedDest.coords.lat}/${selectedDest.coords.lon}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-600 hover:underline"
                    >Open in OpenStreetMap ↗</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════ PACKAGES ════════ */}
      <section id="packages" className="py-24 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-2">Choose Your Trip</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Tour Packages
            </h2>
            <p className="text-gray-500">Affordable experiences designed by local tourism businesses.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((tour, i) => (
              <div key={i} className={`card-hover rounded-3xl p-8 shadow-lg border-2 ${i === 1 ? "bg-green-700 text-white border-green-600 scale-105" : "bg-white border-gray-100"}`}>
                <div className="text-4xl mb-4">{tour.icon}</div>
                <h3 className={`text-xl font-bold mb-1 ${i === 1 ? "text-white" : "text-gray-900"}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                  {tour.title}
                </h3>
                {i === 1 && <span className="text-xs bg-green-500/40 text-green-100 px-2 py-0.5 rounded-full font-medium">Most Popular</span>}
                <p className={`text-4xl font-black mt-4 mb-1 ${i === 1 ? "text-white" : "text-green-700"}`}>{tour.price}</p>
                <p className={`text-sm mb-6 ${i === 1 ? "text-green-200" : "text-gray-400"}`}>{tour.duration}</p>
                <ul className="space-y-2 mb-8">
                  {tour.perks.map((p) => (
                    <li key={p} className={`flex items-center gap-2 text-sm ${i === 1 ? "text-green-100" : "text-gray-600"}`}>
                      <span className="text-green-400">✓</span> {p}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("booking")}
                  className={`w-full py-3 rounded-2xl font-semibold transition ${i === 1 ? "bg-white text-green-700 hover:bg-green-50" : "bg-green-600 hover:bg-green-700 text-white"}`}
                >
                  Choose Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ REVIEWS ════════ */}
      <section id="reviews" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-2">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Travelers Say
            </h2>
            <div className="flex items-center justify-center gap-3 mb-2">
              <Stars rating={Math.round(avgRating)} size="text-2xl" />
              <span className="text-3xl font-bold text-gray-900">{avgRating}</span>
              <span className="text-gray-400">/ 5 · {reviews.length} reviews</span>
            </div>
          </div>

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <button onClick={() => setFilterRating(0)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${filterRating === 0 ? "bg-green-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-600"}`}>
              All ({reviews.length})
            </button>
            {[5, 4, 3, 2, 1].map((r) => (
              <button key={r} onClick={() => setFilterRating(r)} className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-1 ${filterRating === r ? "bg-green-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-600"}`}>
                {"⭐".repeat(r)} ({reviews.filter((rv) => rv.rating === r).length})
              </button>
            ))}
          </div>

          {/* Review grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredReviews.map((r) => (
              <div key={r.id} className="card-hover bg-gray-50 rounded-3xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
                    {r.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.destination} · {r.date}</p>
                  </div>
                </div>
                <Stars rating={r.rating} size="text-base" />
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">"{r.text}"</p>
              </div>
            ))}
          </div>

          {/* Write a review */}
          <div className="text-center">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-2xl font-semibold transition shadow-lg shadow-green-200"
            >
              ✍️ Write a Review
            </button>
          </div>

          {showForm && (
            <div className="mt-8 max-w-xl mx-auto bg-green-50 rounded-3xl p-8 border border-green-100 fade-up">
              <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Share Your Experience</h3>
              <div className="grid gap-4">
                <input
                  className="p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                  placeholder="Your name"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                />
                <select
                  className="p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 text-sm text-gray-600"
                  value={newReview.destination}
                  onChange={(e) => setNewReview({ ...newReview, destination: e.target.value })}
                >
                  <option value="">Select destination visited</option>
                  {destinations.map((d) => <option key={d.name}>{d.name}</option>)}
                </select>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Your rating:</span>
                  <Stars rating={newReview.rating} onRate={(r) => setNewReview({ ...newReview, rating: r })} size="text-2xl" />
                </div>
                <textarea
                  className="p-3.5 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-400 text-sm resize-none"
                  rows={4}
                  placeholder="Tell us about your experience..."
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                />
                <div className="flex gap-3">
                  <button onClick={submitReview} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold text-sm transition">
                    Submit Review
                  </button>
                  <button onClick={() => setShowForm(false)} className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-600 py-3 rounded-2xl font-semibold text-sm transition">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ════════ WEATHER DASHBOARD ════════ */}
      <section id="weather" className="py-24 px-6 bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sky-400 font-semibold text-sm uppercase tracking-widest mb-2">Live Conditions</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Weather Dashboard
            </h2>
            <p className="text-sky-300 text-sm">📍 Mati City, Davao Oriental, Philippines</p>
          </div>

          {weatherLoading ? (
            <div className="text-center py-20 pulse-soft text-sky-300 text-lg">🌤️ Fetching live weather data…</div>
          ) : !weather ? (
            <div className="text-center py-20 text-sky-300">Unable to load weather. Check your connection.</div>
          ) : (
            <>
              {/* Current conditions */}
              <div className="grid md:grid-cols-5 gap-4 mb-8">
                <div className="md:col-span-2 bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/15">
                  <div className="text-8xl mb-2">{curInfo.icon}</div>
                  <div className="text-6xl font-black mb-1">{Math.round(cur.temperature_2m)}°C</div>
                  <div className="text-sky-300 text-lg">{curInfo.label}</div>
                  <div className="text-sky-400 text-sm mt-1">Feels like {Math.round(cur.apparent_temperature)}°C</div>
                </div>
                <div className="md:col-span-3 grid grid-cols-2 gap-4">
                  {[
                    { label: "💧 Humidity", value: `${cur.relativehumidity_2m}%` },
                    { label: "💨 Wind Speed", value: `${cur.windspeed_10m} km/h` },
                    { label: "🌅 Best Time to Tour", value: "6 AM – 10 AM" },
                    { label: "🧴 UV Advisory", value: cur.weathercode <= 2 ? "High — use sunscreen" : "Moderate" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10">
                      <div className="text-sky-300 text-xs mb-1">{label}</div>
                      <div className="text-xl font-bold">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5-day forecast */}
              <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/15">
                <h3 className="font-bold text-sky-200 mb-4 text-sm uppercase tracking-wider">5-Day Forecast</h3>
                <div className="grid grid-cols-5 gap-3">
                  {weather.daily.time.slice(0, 5).map((dateStr, i) => {
                    const code = weather.daily.weathercode[i];
                    const info = WMO[code] ?? { icon: "🌡️", label: "—" };
                    const dow = days[new Date(dateStr).getDay()];
                    return (
                      <div key={i} className={`text-center p-4 rounded-2xl ${i === 0 ? "bg-sky-600/50 border border-sky-400/40" : "bg-white/5"}`}>
                        <div className="text-xs text-sky-300 mb-1">{i === 0 ? "Today" : dow}</div>
                        <div className="text-2xl mb-1">{info.icon}</div>
                        <div className="text-sm font-bold">{Math.round(weather.daily.temperature_2m_max[i])}°</div>
                        <div className="text-xs text-sky-400">{Math.round(weather.daily.temperature_2m_min[i])}°</div>
                        <div className="text-xs text-sky-300 mt-1">💧{weather.daily.precipitation_probability_max[i]}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="text-center text-sky-500 text-xs mt-4">Data source: Open-Meteo.com · Updates automatically</p>
            </>
          )}
        </div>
      </section>

      {/* ════════ LOCAL FARE RATES ════════ */}
      <section id="fares" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-2">Getting Around</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Local Fare Rates
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Approximate fares for common transportation options. Always confirm with the driver.
            </p>
          </div>

      <div className="grid md:grid-cols-3 gap-8">
        {fareRates.map((transport) => (
          <div
            key={transport.mode}
            className={`rounded-3xl border-2 overflow-hidden ${transport.color}`}
          >
            <img
              src={transport.image}
              alt={transport.mode}
              className="w-full h-48 object-cover"
            />

            <div className="p-6">
              <h3
                className={`text-xl font-bold mb-5 ${transport.accent}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {transport.mode}
              </h3>

              <div className="space-y-3">
                {transport.routes.map(({ route, fare }) => (
                  <div
                    key={route}
                    className="flex justify-between items-center py-2.5 border-b border-black/5 last:border-0"
                  >
                    <span className="text-gray-600 text-sm">{route}</span>

                    <span
                      className={`font-bold text-sm whitespace-nowrap ml-4 ${transport.accent}`}
                    >
                      {fare}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 text-amber-800 text-sm text-center">
            ⚠️ <strong>Disclaimer:</strong> Fare rates are indicative and may vary. Verify current rates with drivers or the local transport office.
          </div>
        </div>
      </section>

      {/* ════════ EMERGENCY HOTLINES ════════ */}
      <section id="hotlines" className="py-24 px-6 bg-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-red-600 font-semibold text-sm uppercase tracking-widest mb-2">Safety First</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Emergency Hotlines
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Save these numbers before your trip. For life-threatening emergencies, always call <strong>911</strong> first.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {hotlines.map((h) => (
              <div key={h.name} className="card-hover bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100">
                <div className={`${h.color} px-5 py-4 flex items-center gap-3`}>
                  <span className="text-2xl">{h.icon}</span>
                  <span className="text-white text-xs font-semibold">{h.name}</span>
                </div>
                <div className="p-5">
                  <a
                    href={`tel:${h.number.replace(/[^0-9+]/g, "")}`}
                    className="text-2xl font-black text-gray-900 hover:text-green-700 transition block mb-1"
                  >
                    {h.number}
                  </a>
                  <p className="text-gray-500 text-xs">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white border border-red-200 rounded-2xl px-6 py-4 text-red-700 text-sm text-center shadow-sm">
            🆘 In any emergency, call <strong>911</strong> immediately. Keep this page bookmarked for quick access to all hotlines.
          </div>
        </div>
      </section>

      {/* ════════ BOOKING ════════ */}
      <section id="booking" className="py-24 px-6 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-2">Reserve Your Spot</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Book Your Tour
            </h2>
            <p className="text-gray-500">All booking data is stored locally in your browser.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Form */}
            <div className="md:col-span-2 bg-white rounded-3xl shadow-xl p-8">
              {bookingSuccess && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-2xl px-5 py-4 flex items-center gap-3 fade-up">
                  <span className="text-2xl">🎉</span>
                  <div>
                    <p className="font-semibold">Booking saved!</p>
                    <p className="text-sm text-green-600">Your tour reservation has been recorded.</p>
                  </div>
                </div>
              )}
              <form onSubmit={handleBooking} className="grid gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={bookingForm.fullname}
                  onChange={(e) => setBookingForm({ ...bookingForm, fullname: e.target.value })}
                  className="p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                  className="p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                />
                <select
                  required
                  value={bookingForm.package}
                  onChange={(e) => setBookingForm({ ...bookingForm, package: e.target.value })}
                  className="p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm text-gray-600"
                >
                  <option value="">Select Package</option>
                  {packages.map((p) => <option key={p.title}>{p.title}</option>)}
                </select>
                <input
                  type="number"
                  placeholder="Number of Guests"
                  required
                  min="1"
                  value={bookingForm.guests}
                  onChange={(e) => setBookingForm({ ...bookingForm, guests: e.target.value })}
                  className="p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                />
                <input
                  type="date"
                  required
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                  className="p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                />
                <button type="submit" className="bg-green-600 hover:bg-green-700 transition text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-green-200">
                  Save Booking ✅
                </button>
              </form>
            </div>

            {/* Booking history + info */}
            <div className="space-y-5">
              {/* My bookings */}
              <div className="bg-white rounded-3xl p-6 shadow-md">
                <h3 className="font-bold text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  My Bookings ({bookings.length})
                </h3>
                {bookings.length === 0 ? (
                  <p className="text-gray-400 text-sm">No bookings yet. Fill the form to get started!</p>
                ) : (
                  <div className="space-y-3">
                    {bookings.slice(-3).reverse().map((b) => (
                      <div key={b.id} className="bg-green-50 rounded-xl p-3 border border-green-100">
                        <p className="font-semibold text-sm text-gray-800">{b.fullname}</p>
                        <p className="text-xs text-green-700">{b.package}</p>
                        <p className="text-xs text-gray-400">{b.date} · {b.guests} guest{b.guests > 1 ? "s" : ""}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>TourEase</h3>
              <p className="text-gray-400 text-sm max-w-xs">Supporting micro-entrepreneurs through sustainable, community-driven tourism in Mindanao.</p>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-300 mb-3 uppercase tracking-wider">Quick Links</p>
              <div className="space-y-2">
                {navLinks.slice(0, 4).map((l) => (
                  <button key={l.id} onClick={() => scrollTo(l.id)} className="block text-gray-400 hover:text-green-400 text-sm transition">
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-300 mb-3 uppercase tracking-wider">Info</p>
              <div className="space-y-2">
                {navLinks.slice(4).map((l) => (
                  <button key={l.id} onClick={() => scrollTo(l.id)} className="block text-gray-400 hover:text-green-400 text-sm transition">
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
            <p>© 2026 ExploreLocal Tourism · www.explorelocal-tourism.com</p>
            <p className="text-xs">Weather data: Open-Meteo.com · All fares are approximate</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
