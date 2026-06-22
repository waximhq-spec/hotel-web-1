'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  ChevronDown, 
  Menu, 
  X, 
  MessageSquare,
  Plus,
  Minus,
  Thermometer,
  Wifi,
  Tv,
  Droplets,
  Wind,
  Shirt,
  Sparkles,
  Utensils,
  Coffee
} from 'lucide-react';
import EnquiryModal from './components/EnquiryModal';

const SUITE_IMAGES = [
  "https://images.pexels.com/photos/6466224/pexels-photo-6466224.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/6466285/pexels-photo-6466285.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/6466484/pexels-photo-6466484.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/6466230/pexels-photo-6466230.jpeg?auto=compress&cs=tinysrgb&w=1200"
];

const DESIGN_SUITE_IMAGES = [
  "https://images.pexels.com/photos/7546283/pexels-photo-7546283.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/7546280/pexels-photo-7546280.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/7546281/pexels-photo-7546281.jpeg?auto=compress&cs=tinysrgb&w=1200"
];

const FAQ_ITEMS = [
  {
    q: "What is the check-in and check-out policy?",
    a: "Check-in is from 3:00 PM and check-out is before 11:00 AM. Early check-in or late check-out is subject to availability and can be coordinated directly with our hotel host."
  },
  {
    q: "Are all meals included in the stay?",
    a: "Yes, our luxury stay options are fully inclusive, featuring custom menus curated by our in-house chef, sunrise tea, morning breakfast spreads, afternoon high tea, and multi-course candlelight dinners."
  },
  {
    q: "How do we coordinate airport transfers?",
    a: "We offer private, chauffeured transfer service from Zurich Airport directly to the hotel. For all direct reservations, this round-trip transfer is completely complimentary."
  },
  {
    q: "Is there private parking available on site?",
    a: "Yes, we provide secure, gated private parking on site with 24-hour security and CCTV surveillance, completely complimentary for all guests."
  },
  {
    q: "What is the connectivity situation in the valley?",
    a: "The hotel is equipped with high-speed fiber Wi-Fi throughout all rooms and communal areas, ensuring excellent connectivity for remote work or streaming."
  }
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('Modernist Design Suite');
  const [selectedMeal, setSelectedMeal] = useState('Breakfast & Dinner (Half Board)');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);
  const [enquireInitialRoom, setEnquireInitialRoom] = useState('Modernist Design Suite');
  
  // Parallax Scroll Tracking
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [room1ActiveImg, setRoom1ActiveImg] = useState(0);
  const [room2ActiveImg, setRoom2ActiveImg] = useState(0);

  // Auto-scroll images timer
  useEffect(() => {
    const timer = setInterval(() => {
      setRoom1ActiveImg((prev) => (prev + 1) % DESIGN_SUITE_IMAGES.length);
      setRoom2ActiveImg((prev) => (prev + 1) % SUITE_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Monitor screen size for video selection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Monitor scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll-fade reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    const targets = document.querySelectorAll('.reveal-fade-in');
    targets.forEach((target) => observer.observe(target));

    return () => {
      targets.forEach((target) => observer.unobserve(target));
    };
  }, []);

  // Handle room card booking click - select room and scroll to booking form
  const handleSelectRoomAndScroll = (roomName: string) => {
    setSelectedRoom(roomName);
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // WhatsApp link generator
  const getWhatsAppLink = () => {
    const phone = '919876543210';
    const message = `Hello KAYA Hotel,%0A%0AI would like to make a reservation for the *${selectedRoom}* under the *${selectedMeal}* plan. Please check availability and details.%0A%0AThank you.`;
    return `https://wa.me/${phone}?text=${message}`;
  };

  return (
    <>
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link href="/" className="navbar-logo">K A Y A</Link>
        <ul className="navbar-links">
          <li><Link href="/explore" className="navbar-link">Explore The Hotel</Link></li>
          <li><Link href="/explore#dining" className="navbar-link">Dining</Link></li>
          <li><a href="#reviews" className="navbar-link">Reviews</a></li>
          <li><a href="#gallery" className="navbar-link">Gallery</a></li>
          <li><a href="#about" className="navbar-link">About</a></li>
          <li><a href="#faqs" className="navbar-link">FAQs</a></li>
        </ul>
        <div className="navbar-actions">
          <button onClick={() => { setEnquireInitialRoom('Modernist Design Suite'); setIsEnquireModalOpen(true); }} className="btn-navbar-enquire">Enquire Now</button>
        </div>
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </nav>

      {/* Mobile Menu — editorial dark overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {/* Top header bar */}
        <div className="mobile-menu-header">
          <div className="mobile-menu-brand">
            <span className="mobile-menu-brand-name">K A Y A</span>
            <span className="mobile-menu-brand-sub">HOTEL</span>
          </div>
          <button
            className="mobile-menu-enquire"
            onClick={() => { setMobileMenuOpen(false); setEnquireInitialRoom('Modernist Design Suite'); setIsEnquireModalOpen(true); }}
          >
            ENQUIRE NOW
          </button>
          <button
            className="mobile-menu-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Numbered nav links */}
        <nav className="mobile-menu-nav">
          <Link href="/explore" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
            <span className="mobile-menu-num">01</span>
            <span className="mobile-menu-label">Explore The Hotel</span>
          </Link>
          <Link href="/explore#dining" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
            <span className="mobile-menu-num">02</span>
            <span className="mobile-menu-label">Dining</span>
          </Link>
          <a href="#reviews" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
            <span className="mobile-menu-num">03</span>
            <span className="mobile-menu-label">Reviews</span>
          </a>
          <a href="#gallery" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
            <span className="mobile-menu-num">04</span>
            <span className="mobile-menu-label">Gallery</span>
          </a>
          <a href="#about" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
            <span className="mobile-menu-num">05</span>
            <span className="mobile-menu-label">About</span>
          </a>
          <a href="#faqs" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
            <span className="mobile-menu-num">06</span>
            <span className="mobile-menu-label">FAQs</span>
          </a>
        </nav>
      </div>


      {/* Hero Section (Cinematic Zoom & Parallax) */}
      <section className="hero">
        <div 
          style={{ 
            position: 'absolute', 
            inset: 0, 
            transform: `translateY(${scrollY * 0.18}px) scale(${1.04 + scrollY * 0.00015})`,
            transition: 'transform 0.1s ease-out',
            zIndex: 0
          }}
        >
          {isMobile ? (
            <video
              key="mobile-video"
              src="https://www.pexels.com/download/video/6466568/"
              autoPlay
              loop
              muted
              playsInline
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          ) : (
            <video
              key="desktop-video"
              src="https://www.pexels.com/download/video/6466564/"
              autoPlay
              loop
              muted
              playsInline
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          )}
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content" style={{ paddingBottom: '8rem' }}>
          <h1 className="hero-title reveal-fade-in active">KAYA</h1>
          <p className="hero-tagline reveal-fade-in active" style={{ animationDelay: '0.2s' }}>
            A quiet luxury hotel stay of design
          </p>
          <div className="hero-cta-container">
            <button 
              onClick={() => handleSelectRoomAndScroll(selectedRoom)}
              className="btn-hero-cta"
            >
              <span>Reserve Your Stay</span>
              <ArrowRight size={14} className="arrow-icon" />
            </button>
            <span className="hero-cta-subtext">Best Available Rate &bull; Exclusive Benefits</span>
          </div>
        </div>

        {/* Floating Property Stats Bar */}
        <div className="hero-stats-bar">
          <div className="hero-stats-container">
            <div className="hero-stat-item">
              <span className="hero-stat-label">LOCATION</span>
              <span className="hero-stat-value">Swiss Alps</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-label">ROOMS</span>
              <span className="hero-stat-value">4 Bedrooms</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-label">CATEGORIES</span>
              <span className="hero-stat-value">2 Suite Types</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-label">BOARD</span>
              <span className="hero-stat-value">All-Inclusive</span>
            </div>
          </div>
          <button onClick={() => { setEnquireInitialRoom(selectedRoom); setIsEnquireModalOpen(true); }} className="btn-hero-enquire">
            ENQUIRE ABOUT YOUR STAY
          </button>
        </div>
      </section>

      {/* Property Details Section (About) */}
      <section id="about" className="section-padding max-width-container reveal-fade-in">
        <div className="property-details-grid">
          {/* Left Column: Text & CTA */}
          <div className="property-left-desc">
            <span className="section-label">ABOUT THE PROPERTY</span>
            <h2 className="section-title about-heading">
              Built for the valley.<br />Designed around tranquility.
            </h2>
            
            <div className="property-body-text">
              <p>
                KAYA stands at 1,815 metres in the Engadin Valley — one of the Swiss Alps' most breathtaking and pristine alpine corridors. Below the lower garden, the Inn River runs ice-cold and crystal clear. Above, ancient pine and larch forests climb toward alpine passes that open onto the Bernina Range.
              </p>
              <p>
                The hotel was not built into this landscape. It was drawn from it. Local stone-clad walls, larch-wood ceilings, Swiss wool textiles — each element speaks the same language as the valley beyond the windows. The pine-scented air, the particular quality of light through the mountain canopy, the sound of the river after dark — these are not amenities. They are the design.
              </p>
              <p>
                We are small by intention. Four bedrooms, a single living area, one dining table, one kitchen. Small enough that we know how you take your espresso by the second morning. Small enough that the tranquility you travelled this far to find remains, always, intact.
              </p>
            </div>

            <div className="property-action-links">
              <button onClick={() => { setEnquireInitialRoom('Modernist Design Suite'); setIsEnquireModalOpen(true); }} className="prop-text-link">MAKE A RESERVATION</button>
              <span className="prop-bullet">•</span>
              <a href="tel:+919858301646" className="prop-text-link">CALL US</a>
              <span className="prop-bullet">•</span>
              <a href="mailto:concierge@kayalakehotel.com" className="prop-text-link">EMAIL US</a>
            </div>
          </div>

          {/* Right Column: Property Table */}
          <div className="property-right-table-col">
            <span className="table-header-label">PROPERTY DETAILS</span>
            <div className="property-table-container">
              <div className="prop-row">
                <span className="prop-label">LOCATION</span>
                <span className="prop-val">Silvaplana, Engadin Valley, Graubünden, Switzerland</span>
              </div>
              <div className="prop-row">
                <span className="prop-label">ALTITUDE</span>
                <span className="prop-val">1,815 metres above sea level</span>
              </div>
              <div className="prop-row">
                <span className="prop-label">VALLEY</span>
                <span className="prop-val">Engadin Valley &bull; Swiss Alps</span>
              </div>
              <div className="prop-row">
                <span className="prop-label">CHECK-IN</span>
                <span className="prop-val">3:00 PM &bull; Check-out 11:00 AM</span>
              </div>
              <div className="prop-row">
                <span className="prop-label">RECEPTION</span>
                <span className="prop-val">24-hour hotel host service</span>
              </div>
              <div className="prop-row">
                <span className="prop-label">CONNECTIVITY</span>
                <span className="prop-val">High-speed Wi-Fi throughout</span>
              </div>
              <div className="prop-row">
                <span className="prop-label">PARKING</span>
                <span className="prop-val">Complimentary private parking on site</span>
              </div>
              <div className="prop-row">
                <span className="prop-label">TRANSFERS</span>
                <span className="prop-val">Private transfer from Zurich</span>
              </div>
              <div className="prop-row">
                <span className="prop-label">DINING</span>
                <span className="prop-val">All meals included</span>
              </div>
              <div className="prop-row">
                <span className="prop-label">CONTACT</span>
                <span className="prop-val">+41 81 838 6000</span>
              </div>
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="prop-maps-link">
              <span>OPEN IN MAPS</span>
              <ArrowRight size={12} style={{ marginLeft: '4px' }} />
            </a>
          </div>
        </div>
      </section>

      {/* Subtle Separator */}
      <div className="editorial-divider max-width-container reveal-fade-in">
        <span className="editorial-divider-mark">K A Y A</span>
      </div>

      {/* Rooms Section */}
      <section id="rooms" className="reveal-fade-in">
        <div className="section-header rooms-header max-width-container">
          <span className="section-label">Living Spaces</span>
          <h2 className="section-title">Rooms & Suites</h2>
          <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto' }}>
            Designed to blur the lines between interior comfort and the raw grandeur of the surrounding landscape.
          </p>
        </div>

        <div className="rooms-list">
          {/* Card 1: Modernist Design Suite */}
          <div className="room-editorial-block">
            <div className="room-hero-image-wrapper">
              <Image
                src={DESIGN_SUITE_IMAGES[room1ActiveImg]}
                alt="Modernist Design Suite View"
                fill
                sizes="100vw"
                className="room-hero-img"
                priority
              />
            </div>
            
            {/* Thumbnail Strip */}
            <div className="room-strip-gallery">
              {DESIGN_SUITE_IMAGES.map((src, index) => (
                <div 
                  key={src} 
                  onClick={() => setRoom1ActiveImg(index)}
                  className={`room-strip-thumb ${room1ActiveImg === index ? 'active' : ''}`}
                >
                  <Image
                    src={src}
                    alt={`Modernist Design Suite Thumbnail ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 25vw, 150px"
                    className="room-strip-img"
                  />
                </div>
              ))}
              <Link href="/rooms/modernist-design-suite" className="room-strip-thumb">
                <Image
                  src={SUITE_IMAGES[3]}
                  alt="Explore more images"
                  fill
                  sizes="(max-width: 768px) 25vw, 150px"
                  className="room-strip-img"
                />
                <div className="room-strip-overlay">+12</div>
              </Link>
            </div>

            {/* Room Details Block */}
            <div className="room-editorial-details">
              <span className="room-editorial-header">01 — MODERNIST SUITE</span>
              <h3 className="room-editorial-title">Modernist Design Suite</h3>
              <p className="room-editorial-desc">
                Designed for guests seeking privacy and understated luxury, the suite combines courtyard garden views, handcrafted interiors, and generous living spaces for an unforgettable stay.
              </p>

              {/* Specifications Grid */}
              <div className="room-editorial-specs">
                <div className="spec-col">
                  <span className="spec-label">SIZE</span>
                  <span className="spec-val">95 SQM</span>
                </div>
                <div className="spec-divider"></div>
                <div className="spec-col">
                  <span className="spec-label">GUESTS</span>
                  <span className="spec-val">4 Guests</span>
                </div>
                <div className="spec-divider"></div>
                <div className="spec-col">
                  <span className="spec-label">VIEW</span>
                  <span className="spec-val">Courtyard View</span>
                </div>
              </div>

              {/* Feature Tags */}
              <div className="room-editorial-tags">
                <span className="luxury-tag">King Bed</span>
                <span className="luxury-tag">Walk-In Closet</span>
                <span className="luxury-tag">Breakfast Included</span>
                <span className="luxury-tag">Rain Shower</span>
                <span className="luxury-tag">Private Lounge</span>
                <span className="luxury-tag">Airport Transfer</span>
              </div>

              {/* Direct Booking Benefits */}
              <div className="luxury-benefits-card">
                <span className="benefits-card-title">DIRECT BOOKING BENEFITS</span>
                <div className="benefits-card-grid">
                  <div className="benefit-card-item">✦ Best Available Rate</div>
                  <div className="benefit-card-item">✦ Complimentary Breakfast</div>
                  <div className="benefit-card-item">✦ Flexible Check-In</div>
                  <div className="benefit-card-item">✦ Priority Guest Support</div>
                </div>
              </div>

              {/* Pricing Overhaul */}
              <div className="luxury-pricing">
                <span className="price-lead">Starting From</span>
                <span className="price-amount">₹75,000</span>
                <span className="price-period">Per Night</span>
              </div>

              {/* Concierge Actions */}
              <div className="luxury-actions">
                <Link href="/rooms/modernist-design-suite" className="btn-luxury-primary">
                  <span>Explore Suite</span>
                  <ArrowRight size={14} className="arrow-icon" />
                </Link>
                <button 
                  onClick={() => { setEnquireInitialRoom('Modernist Design Suite'); setIsEnquireModalOpen(true); }}
                  className="btn-luxury-secondary"
                >
                  <span>Reserve Direct</span>
                  <ArrowRight size={14} className="arrow-icon" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Signature Butler Suite */}
          <div className="room-editorial-block">
            <div className="room-hero-image-wrapper">
              <Image
                src={SUITE_IMAGES[room2ActiveImg]}
                alt="Signature Butler Suite View"
                fill
                sizes="100vw"
                className="room-hero-img"
              />
            </div>
            
            {/* Thumbnail Strip */}
            <div className="room-strip-gallery">
              {SUITE_IMAGES.slice(0, 3).map((src, index) => (
                <div 
                  key={src} 
                  onClick={() => setRoom2ActiveImg(index)}
                  className={`room-strip-thumb ${room2ActiveImg === index ? 'active' : ''}`}
                >
                  <Image
                    src={src}
                    alt={`Signature Butler Suite Thumbnail ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 25vw, 150px"
                    className="room-strip-img"
                  />
                </div>
              ))}
              <Link href="/rooms/signature-butler-suite" className="room-strip-thumb">
                <Image
                  src={SUITE_IMAGES[3]}
                  alt="Explore more images"
                  fill
                  sizes="(max-width: 768px) 25vw, 150px"
                  className="room-strip-img"
                />
                <div className="room-strip-overlay">+12</div>
              </Link>
            </div>

            {/* Room Details Block */}
            <div className="room-editorial-details">
              <span className="room-editorial-header">02 — SIGNATURE SUITE</span>
              <h3 className="room-editorial-title">Signature Butler Suite</h3>
              <p className="room-editorial-desc">
                An expansive suite offering private quarters, high-ceiling panoramas, and a dedicated butler foyer. Meticulously designed with raw timbers, premium stone, and fine Italian linens.
              </p>

              {/* Specifications Grid */}
              <div className="room-editorial-specs">
                <div className="spec-col">
                  <span className="spec-label">SIZE</span>
                  <span className="spec-val">120 SQM</span>
                </div>
                <div className="spec-divider"></div>
                <div className="spec-col">
                  <span className="spec-label">GUESTS</span>
                  <span className="spec-val">4 Guests</span>
                </div>
                <div className="spec-divider"></div>
                <div className="spec-col">
                  <span className="spec-label">VIEW</span>
                  <span className="spec-val">Panoramic Lake View</span>
                </div>
              </div>

              {/* Feature Tags */}
              <div className="room-editorial-tags">
                <span className="luxury-tag">King Bed</span>
                <span className="luxury-tag">Lake View</span>
                <span className="luxury-tag">In-Suite Dining</span>
                <span className="luxury-tag">Rainforest Tub</span>
                <span className="luxury-tag">Private Balcony</span>
                <span className="luxury-tag">24/7 Butler</span>
              </div>

              {/* Direct Booking Benefits */}
              <div className="luxury-benefits-card">
                <span className="benefits-card-title">DIRECT BOOKING BENEFITS</span>
                <div className="benefits-card-grid">
                  <div className="benefit-card-item">✦ Best Available Rate</div>
                  <div className="benefit-card-item">✦ Complimentary Breakfast</div>
                  <div className="benefit-card-item">✦ Flexible Check-In</div>
                  <div className="benefit-card-item">✦ Priority Guest Support</div>
                </div>
              </div>

              {/* Pricing Overhaul */}
              <div className="luxury-pricing">
                <span className="price-lead">Starting From</span>
                <span className="price-amount">₹65,000</span>
                <span className="price-period">Per Night</span>
              </div>

              {/* Concierge Actions */}
              <div className="luxury-actions">
                <Link href="/rooms/signature-butler-suite" className="btn-luxury-primary">
                  <span>Explore Suite</span>
                  <ArrowRight size={14} className="arrow-icon" />
                </Link>
                <button 
                  onClick={() => { setEnquireInitialRoom('Signature Butler Suite'); setIsEnquireModalOpen(true); }}
                  className="btn-luxury-secondary"
                >
                  <span>Reserve Direct</span>
                  <ArrowRight size={14} className="arrow-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="section-padding reveal-fade-in" style={{ backgroundColor: '#171717', color: 'var(--color-warm-white)', padding: '8rem 0' }}>
        <div className="max-width-container amenities-grid-layout">
          {/* Left Column: List */}
          <div className="amenities-left">
            <span className="section-label" style={{ color: '#E2DCCF' }}>ALL-INCLUSIVE</span>
            <h2 className="section-title" style={{ color: 'var(--color-warm-white)', marginBottom: '3rem', textAlign: 'left' }}>Every comfort, already in place.</h2>
            
            <div className="amenities-tagline-label">AMENITIES</div>
            <ul className="amenities-text-list">
              <li>Spacious parking</li>
              <li>24hr hotel host</li>
              <li>Onsite cook</li>
              <li>Fully gated</li>
              <li>24hr security CCTV</li>
            </ul>
          </div>

          {/* Right Column: Grid */}
          <div className="amenities-right-grid">
            <div className="amenity-icon-card">
              <Thermometer className="amenity-icon" size={24} />
              <span className="amenity-name">Central heating</span>
            </div>
            <div className="amenity-icon-card">
              <Wifi className="amenity-icon" size={24} />
              <span className="amenity-name">WiFi</span>
            </div>
            <div className="amenity-icon-card">
              <Tv className="amenity-icon" size={24} />
              <span className="amenity-name">TV</span>
            </div>
            <div className="amenity-icon-card">
              <Droplets className="amenity-icon" size={24} />
              <span className="amenity-name">Hot water</span>
            </div>
            <div className="amenity-icon-card">
              <Wind className="amenity-icon" size={24} />
              <span className="amenity-name">Hair Dryer</span>
            </div>
            <div className="amenity-icon-card">
              <Shirt className="amenity-icon" size={24} />
              <span className="amenity-name">Iron</span>
            </div>
            <div className="amenity-icon-card">
              <Sparkles className="amenity-icon" size={24} />
              <span className="amenity-name">Washer and Dryer</span>
            </div>
            <div className="amenity-icon-card">
              <Utensils className="amenity-icon" size={24} />
              <span className="amenity-name">Fully equipped kitchen and dinnerware</span>
            </div>
            <div className="amenity-icon-card">
              <Coffee className="amenity-icon" size={24} />
              <span className="amenity-name">Coffee machine</span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="section-padding max-width-container reveal-fade-in">
        <div className="section-header">
          <span className="section-label">Reservations</span>
          <h2 className="section-title">Initiate Booking</h2>
          <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto' }}>
            Secure your hotel stay directly with our concierge team or via our global booking channels.
          </p>
        </div>

        <div className="booking-grid">
          {/* Left Card: Direct Booking (Bespoke Stationery Design) */}
          <div className="booking-card left luxury-card">
            <div className="booking-card-top">
              <span className="booking-card-tag">Best Available Rate</span>
              <h3 className="booking-card-title">Direct Booking</h3>
              <p className="booking-card-desc">
                Receive personalized support, bespoke meal plan adjustments, and complimentary airport transfers by booking directly with our concierge desk.
              </p>

              {/* Exclusive Benefits Container */}
              <div className="benefits-container">
                <h4 className="benefits-title">Exclusive Member Benefits</h4>
                <div className="benefits-list">
                  <div className="benefit-item">
                    <span className="benefit-icon">✦</span>
                    <span>Complimentary Private Airport Transfer</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✦</span>
                    <span>Daily Sunrise Yoga & Meditation Sessions</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✦</span>
                    <span>24/7 Dedicated Butler Service</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✦</span>
                    <span>Welcome Estate Champagne on Arrival</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="booking-form">
              <div className="booking-field">
                <label className="booking-field-label">Select Room / Suite</label>
                <div className="select-container">
                  <select 
                    value={selectedRoom} 
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="booking-select"
                  >
                    <option value="Modernist Design Suite">Modernist Design Suite — ₹75,000 / Night</option>
                    <option value="Signature Butler Suite">Signature Butler Suite — ₹65,000 / Night</option>
                  </select>
                  <ChevronDown className="select-arrow" size={18} />
                </div>
              </div>

              <div className="booking-field">
                <label className="booking-field-label">Meal Plan Option</label>
                <div className="select-container">
                  <select 
                    value={selectedMeal} 
                    onChange={(e) => setSelectedMeal(e.target.value)}
                    className="booking-select"
                  >
                    <option value="Breakfast & Dinner (Half Board)">Breakfast & Dinner (Half Board)</option>
                    <option value="All Meals Inclusive (Full Board)">All Meals Inclusive (Full Board)</option>
                    <option value="Room Only (Continental Breakfast)">Room Only (Continental Breakfast)</option>
                  </select>
                  <ChevronDown className="select-arrow" size={18} />
                </div>
              </div>
            </div>

            <a 
              href={getWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-accent flex-center"
              style={{ gap: '0.8rem', marginTop: '1.5rem' }}
            >
              <MessageSquare size={18} />
              <span>Book via WhatsApp</span>
            </a>

            <div className="booking-footer-dark">
              <span>Immediate Concierge Callback</span>
            </div>
          </div>

          {/* Right Card: Online Partners (Hotel Stationery Design) */}
          <div className="booking-card right luxury-card">
            <div className="booking-card-top">
              <span className="booking-card-tag" style={{ opacity: 0 }}>Placeholder</span>
              <h3 className="booking-card-title">Online Partners</h3>
              <p className="booking-card-desc">
                If you prefer to book via international agency channels, please select from our verified partners below.
              </p>
            </div>

            <div className="partners-container">
              <a href="https://booking.com" target="_blank" rel="noopener noreferrer" className="btn-partner">
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.15rem', letterSpacing: '0.04rem' }}>Booking.com</span>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.18em', opacity: 0.6 }}>Reservations ↗</span>
              </a>
              <a href="https://agoda.com" target="_blank" rel="noopener noreferrer" className="btn-partner">
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.15rem', letterSpacing: '0.04rem' }}>Agoda</span>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.18em', opacity: 0.6 }}>Reservations ↗</span>
              </a>
              <a href="https://expedia.com" target="_blank" rel="noopener noreferrer" className="btn-partner">
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.15rem', letterSpacing: '0.04rem' }}>Expedia</span>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.18em', opacity: 0.6 }}>Reservations ↗</span>
              </a>
              <a href="https://makemytrip.com" target="_blank" rel="noopener noreferrer" className="btn-partner">
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.15rem', letterSpacing: '0.04rem' }}>MakeMyTrip</span>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.18em', opacity: 0.6 }}>Reservations ↗</span>
              </a>
            </div>

            <div className="booking-footer">
              <p style={{ fontWeight: 500, color: 'var(--color-charcoal)', marginBottom: '0.4rem', letterSpacing: '0.1em' }}>Direct Concierge Hotline</p>
              <p style={{ fontSize: '0.9rem' }}>+41 81 838 6000  •  concierge@kayalakehotel.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Separator */}
      <div className="editorial-divider max-width-container reveal-fade-in">
        <span className="editorial-divider-mark">K A Y A</span>
      </div>

      {/* Gallery Section */}
      <section id="gallery" className="section-padding max-width-container reveal-fade-in">
        <div className="section-header">
          <span className="section-label">Gallery</span>
          <h2 className="section-title">Visual Silence</h2>
          <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto' }}>
            A glimpse into the architectural alignment and minimalist textures that define KAYA.
          </p>
        </div>

        <div className="gallery-grid">
          <div className="gallery-box main image-wrapper-editorial">
            <Image
              src="/images/gallery_lobby.webp"
              alt="Minimalist Luxury Lobby with Olive Tree"
              fill
              sizes="(max-width: 992px) 100vw, 65vw"
              className="gallery-img image-zoom-hover"
            />
          </div>
          <div className="gallery-box side image-wrapper-editorial">
            <Image
              src="/images/gallery_detail.webp"
              alt="Linen Close-up Bedroom Texture"
              fill
              sizes="(max-width: 992px) 100vw, 35vw"
              className="gallery-img image-zoom-hover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="section-padding reveal-fade-in" style={{ borderTop: '1px solid rgba(23,23,23,0.06)', borderBottom: '1px solid rgba(23,23,23,0.06)' }}>
        <div className="max-width-container">
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "The definition of luxury. Complete, uninterrupted silence, breathtaking architecture, and unmatched hospitality."
              </p>
              <h4 className="testimonial-author">Vogue Travel</h4>
              <span className="testimonial-origin">Editorial Choice</span>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-quote">
                "An architectural masterpiece. It feels less like a resort and more like a high-end private residence where time stands still."
              </p>
              <h4 className="testimonial-author">Architectural Digest</h4>
              <span className="testimonial-origin">Design Awards</span>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-quote">
                "Aman meets Six Senses in the most organic way. The spa stone carving is a wellness journey in itself."
              </p>
              <h4 className="testimonial-author">Condé Nast Traveler</h4>
              <span className="testimonial-origin">Gold List</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="section-padding max-width-container reveal-fade-in" style={{ borderBottom: '1px solid rgba(23,23,23,0.06)' }}>
        <div className="section-header">
          <span className="section-label">Questions</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto' }}>
            Everything you need to know about our rates, amenities, check-in, and personalized stay pathways.
          </p>
        </div>

        <div className="faqs-container" style={{ maxWidth: '800px', margin: '4rem auto 0 auto' }}>
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="faq-item" style={{ borderBottom: '1px solid rgba(23,23,23,0.08)', padding: '1.8rem 0' }}>
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                style={{ 
                  width: '100%', 
                  background: 'none', 
                  border: 'none', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-charcoal)' }}>{item.q}</span>
                {openFaq === idx ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              <div style={{ 
                maxHeight: openFaq === idx ? '500px' : '0', 
                overflow: 'hidden', 
                transition: 'all 0.4s ease-in-out',
                marginTop: openFaq === idx ? '1.5rem' : '0'
              }}>
                <p style={{ color: 'rgba(23, 23, 23, 0.7)', fontSize: '0.98rem', lineHeight: '1.8' }}>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding max-width-container reveal-fade-in">
        <div className="section-header">
          <span className="section-label">Connect</span>
          <h2 className="section-title">The Estate Location</h2>
          <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto' }}>
            Embark on a journey to stillness. Reach out to schedule arrival details.
          </p>
        </div>

        <div className="contact-grid">
          {/* Column 1: Info and Map */}
          <div className="contact-info">
            <div className="contact-info-block">
              <span className="contact-info-label">Address</span>
              <p className="contact-info-value serif">
                KAYA Estate, Via Veglia 12,<br />
                7513 Silvaplana, Switzerland
              </p>
            </div>

            <div className="contact-info-block">
              <span className="contact-info-label">Coordinates</span>
              <p className="contact-info-value">46.4608° N, 9.7955° E</p>
            </div>

            <div className="map-container">
              <div className="map-overlay">
                <div className="map-accent-dot"></div>
                <h4 className="map-title">KAYA LAKE HOTEL</h4>
                <p className="map-coords">46°27'39" N, 9°47'44" E</p>
              </div>
            </div>
          </div>

          {/* Column 2: Minimalist Contact Form */}
          <div className="contact-form-container">
            <h3 className="room-title" style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>Send an Inquiry</h3>
            <p style={{ color: 'rgba(23, 23, 23, 0.65)', fontSize: '0.95rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
              For booking adjustments, exclusive events, or special spatial configurations, fill out the form below. 
              Our butler desk will reply within 2 hours.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="contact-form">
              <div className="form-group">
                <input 
                  type="text" 
                  id="name" 
                  placeholder=" " 
                  className="form-input" 
                  required
                />
                <label htmlFor="name" className="form-label">Full Name</label>
              </div>

              <div className="form-group">
                <input 
                  type="email" 
                  id="email" 
                  placeholder=" " 
                  className="form-input" 
                  required
                />
                <label htmlFor="email" className="form-label">Email Address</label>
              </div>

              <div className="form-group">
                <input 
                  type="text" 
                  id="message" 
                  placeholder=" " 
                  className="form-input"
                />
                <label htmlFor="message" className="form-label">Message / Special Requests</label>
              </div>

              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
                <span>Submit Inquiry</span>
                <ArrowRight size={14} className="arrow-icon" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="max-width-container">
          <div className="footer-grid">
            {/* Column 1 */}
            <div className="footer-column">
              <span className="footer-logo">K A Y A</span>
              <p className="footer-about">
                A design-led luxury hotel dedicated to absolute silence, organic architecture, and custom wellness pathways. 
                Inspired by the philosophy of Aman resorts.
              </p>
            </div>

            {/* Column 2 */}
            <div className="footer-column">
              <span className="footer-title">Explore</span>
              <ul className="footer-links">
                <li><a href="#about" className="footer-link">The Hotel</a></li>
                <li><a href="#rooms" className="footer-link">Rooms & Suites</a></li>
                <li><a href="#gallery" className="footer-link">Visual Journal</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="footer-column">
              <span className="footer-title">Contact</span>
              <p className="footer-contact">
                KAYA Hotel Estate,<br />
                7513 Silvaplana, Switzerland<br /><br />
                T: +41 81 838 6000<br />
                E: concierge@kayalakehotel.com
              </p>
            </div>

            {/* Column 4 */}
            <div className="footer-column">
              <span className="footer-title">Stay Connected</span>
              <ul className="footer-links">
                <li><a href="https://instagram.com" className="footer-link" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://pinterest.com" className="footer-link" target="_blank" rel="noopener noreferrer">Pinterest</a></li>
                <li><a href="https://journal.com" className="footer-link" target="_blank" rel="noopener noreferrer">The Journal</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} KAYA LAKE HOTEL. All rights reserved.</p>
            <p style={{ letterSpacing: '0.12em', opacity: 0.8 }}>AMAN & SIX SENSES INSPIRATION</p>
          </div>
        </div>
      </footer>

      <EnquiryModal 
        isOpen={isEnquireModalOpen} 
        onClose={() => setIsEnquireModalOpen(false)} 
        initialRoom={enquireInitialRoom} 
      />
    </>
  );
}
