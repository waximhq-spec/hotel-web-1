'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  ChevronDown, 
  Menu, 
  X, 
  MessageSquare
} from 'lucide-react';

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

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('Modernist Design Suite');
  const [selectedMeal, setSelectedMeal] = useState('Breakfast & Dinner (Half Board)');
  
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
    const message = `Hello KAYA Villa,%0A%0AI would like to make a reservation for the *${selectedRoom}* under the *${selectedMeal}* plan. Please check availability and details.%0A%0AThank you.`;
    return `https://wa.me/${phone}?text=${message}`;
  };

  return (
    <>
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="navbar-logo">K A Y A</a>
        <ul className="navbar-links">
          <li><a href="#about" className="navbar-link">About</a></li>
          <li><a href="#rooms" className="navbar-link">Rooms</a></li>
          <li><a href="#experiences" className="navbar-link">Experiences</a></li>
          <li><a href="#booking" className="navbar-link">Book</a></li>
          <li><a href="#gallery" className="navbar-link">Gallery</a></li>
          <li><a href="#contact" className="navbar-link">Contact</a></li>
        </ul>
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <button 
          className="mobile-menu-close" 
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={26} />
        </button>
        <a href="#about" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>About</a>
        <a href="#rooms" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Rooms</a>
        <a href="#experiences" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Experiences</a>
        <a href="#booking" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Book</a>
        <a href="#gallery" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
        <a href="#contact" className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
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
        <div className="hero-content">
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
      </section>

      {/* Editorial Statement */}
      <section id="about" className="section-padding max-width-container reveal-fade-in" style={{ textAlign: 'center' }}>
        <span className="section-label">The philosophy</span>
        <h2 className="section-title" style={{ maxWidth: '900px', margin: '0 auto 2.5rem auto', lineHeight: '1.35' }}>
          Where absolute stillness meets pure architectural expression.
        </h2>
        <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '2' }}>
          Nestled on the edge of a serene, mirror-like lake, KAYA is a boutique luxury hotel designed for quiet repose. 
          Inspired by the raw minimalism of Aman and the wellness philosophies of Six Senses, we offer an intimate escape 
          from the noise of the world. Every corner is crafted with raw concrete, natural timbers, and local stone—blending 
          seamlessly into the mist-covered mountains.
        </p>
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
                  onClick={() => handleSelectRoomAndScroll('Modernist Design Suite')}
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
                  onClick={() => handleSelectRoomAndScroll('Signature Butler Suite')}
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

      {/* Experiences Section (Gradient Tonal Background) */}
      <section id="experiences" className="section-padding reveal-fade-in">
        <div className="max-width-container">
          <div className="section-header" style={{ color: '#ffffff' }}>
            <span className="section-label">Experiences</span>
            <h2 className="section-title">Rituals of Stillness</h2>
            <p className="section-subtitle" style={{ color: 'rgba(248, 247, 244, 0.7)', maxWidth: '650px', margin: '0 auto' }}>
              Curated activities designed to engage the senses, promote longevity, and invite inner contemplation.
            </p>
          </div>

          {/* Dark Separator */}
          <div className="editorial-divider dark-section-divider max-width-container reveal-fade-in" style={{ marginBottom: '6rem' }}>
            <span className="editorial-divider-mark">R I T U A L S</span>
          </div>

          <div className="experiences-container">
            {/* Experience 1 */}
            <div className="experience-item">
              <div className="experience-img-box image-wrapper-editorial">
                <Image
                  src="/images/experience_spa.webp"
                  alt="Lake Luxury Spa Treatment Room"
                  fill
                  sizes="(max-width: 992px) 100vw, 50vw"
                  className="experience-img image-zoom-hover"
                />
              </div>
              <div className="experience-content">
                <span className="experience-label">Wellness</span>
                <h3 className="experience-title">Lake Luxury Spa</h3>
                <p className="experience-desc">
                  Carved out of local black granite, our spa treatments are rooted in ancient Tibetan therapies. 
                  Experience cold plunge stone baths, hot-stone treatments, and aromatherapy oils sourced from local forest flowers.
                </p>
                <a href="#booking" className="btn-accent" style={{ width: 'fit-content' }}>
                  <span>Inquire Details</span>
                  <ArrowRight size={14} className="arrow-icon" />
                </a>
              </div>
            </div>

            {/* Experience 2 */}
            <div className="experience-item">
              <div className="experience-img-box image-wrapper-editorial">
                <Image
                  src="/images/experience_dining.webp"
                  alt="Waterfront Candlelight Dining Experience"
                  fill
                  sizes="(max-width: 992px) 100vw, 50vw"
                  className="experience-img image-zoom-hover"
                />
              </div>
              <div className="experience-content">
                <span className="experience-label">Gastronomy</span>
                <h3 className="experience-title">Waterfront Dining</h3>
                <p className="experience-desc">
                  Enjoy custom degustation menus crafted by Michelin-starred culinary artists. Featuring organic ingredients 
                  grown in our own estate garden, served on private decks overlooking the twilight lake.
                </p>
                <a href="#booking" className="btn-accent" style={{ width: 'fit-content' }}>
                  <span>Inquire Details</span>
                  <ArrowRight size={14} className="arrow-icon" />
                </a>
              </div>
            </div>

            {/* Experience 3 */}
            <div className="experience-item">
              <div className="experience-img-box image-wrapper-editorial">
                <Image
                  src="/images/experience_lake.webp"
                  alt="Dawn Lake Rowing Activity"
                  fill
                  sizes="(max-width: 992px) 100vw, 50vw"
                  className="experience-img image-zoom-hover"
                />
              </div>
              <div className="experience-content">
                <span className="experience-label">Exploration</span>
                <h3 className="experience-title">Dawn Lake Rowing</h3>
                <p className="experience-desc">
                  As the sun crests the mountains, glide silently in hand-built wooden rowing boats on the mist-covered water. 
                  A meditative morning ritual guided by expert oarsmen, or enjoyed in absolute isolation.
                </p>
                <a href="#booking" className="btn-accent" style={{ width: 'fit-content' }}>
                  <span>Inquire Details</span>
                  <ArrowRight size={14} className="arrow-icon" />
                </a>
              </div>
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
              <p style={{ fontSize: '0.9rem' }}>+91 98765 43210  •  concierge@kayalakevilla.com</p>
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
      <section className="section-padding reveal-fade-in" style={{ borderTop: '1px solid rgba(23,23,23,0.06)', borderBottom: '1px solid rgba(23,23,23,0.06)' }}>
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
                KAYA Estate, Lake Estate road,<br />
                Misty Valley, Himachal Pradesh, India
              </p>
            </div>

            <div className="contact-info-block">
              <span className="contact-info-label">Coordinates</span>
              <p className="contact-info-value">32.2374° N, 76.3219° E</p>
            </div>

            <div className="map-container">
              <div className="map-overlay">
                <div className="map-accent-dot"></div>
                <h4 className="map-title">KAYA LAKE VILLA</h4>
                <p className="map-coords">32°14'15" N, 76°19'10" E</p>
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
                <li><a href="#experiences" className="footer-link">Rituals (Experiences)</a></li>
                <li><a href="#gallery" className="footer-link">Visual Journal</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="footer-column">
              <span className="footer-title">Contact</span>
              <p className="footer-contact">
                KAYA Villa Estate,<br />
                Himachal Pradesh, India<br /><br />
                T: +91 98765 43210<br />
                E: concierge@kayalakevilla.com
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
            <p>&copy; {new Date().getFullYear()} KAYA LAKE VILLA. All rights reserved.</p>
            <p style={{ letterSpacing: '0.12em', opacity: 0.8 }}>AMAN & SIX SENSES INSPIRATION</p>
          </div>
        </div>
      </footer>
    </>
  );
}
