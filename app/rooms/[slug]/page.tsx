'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowRight, 
  ChevronDown, 
  ArrowLeft, 
  MessageSquare
} from 'lucide-react';

interface RoomData {
  slug: string;
  name: string;
  category: string;
  price: string;
  size: string;
  view: string;
  features: string[];
  description: string;
  images: string[];
  videoSrc: string;
}

const ROOMS_DATA: Record<string, RoomData> = {
  'private-pool-villa': {
    slug: 'private-pool-villa',
    name: 'Private Pool Villa',
    category: 'Private Villa',
    price: '₹75,000',
    size: '180 SQM',
    view: 'Lake View',
    features: [
      'Private Infinity Pool',
      '24/7 Dedicated Butler Service',
      'Lakefront Private Sun Deck',
      'Raw Concrete Stone Bath',
      'Welcome Estate Champagne',
      'Complimentary Airport Transfer'
    ],
    description: 'A masterpiece of architectural minimalism, the Private Pool Villa features raw concrete lines, natural timber decks, and an expansive private infinity pool that merges seamlessly with the twilight lake. Unwind in absolute seclusion with dedicated around-the-clock butler service.',
    images: [
      '/images/room_villa.webp',
      'https://images.pexels.com/photos/6466224/pexels-photo-6466224.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/6466285/pexels-photo-6466285.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    videoSrc: 'https://www.pexels.com/download/video/6466564/'
  },
  'signature-butler-suite': {
    slug: 'signature-butler-suite',
    name: 'Signature Butler Suite',
    category: 'Signature Suite',
    price: '₹65,000',
    size: '120 SQM',
    view: 'Panoramic Lake View',
    features: [
      'In-Suite Fine Dining Service',
      '24/7 Dedicated Butler Service',
      'Private Suite Entrance',
      'Plush Italian Linens & Pillow Selection',
      'Rainforest Shower & Tub',
      'Complimentary Airport Transfer'
    ],
    description: 'The Signature Butler Suite is designed for deep repose. Featuring a dedicated butler entry, exquisite custom furnishings, and a sequence of floor-to-ceiling windows overlooking the misty mountains. Indulge in bespoke room service menu designs curated by our resident culinary experts.',
    images: [
      'https://images.pexels.com/photos/6466224/pexels-photo-6466224.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/6466285/pexels-photo-6466285.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/6466484/pexels-photo-6466484.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/6466230/pexels-photo-6466230.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    videoSrc: 'https://www.pexels.com/download/video/6466568/'
  }
};

export default function RoomPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const room = ROOMS_DATA[slug];

  const [activeMediaIndex, setActiveMediaIndex] = useState(0); // 0 = Video, 1..N = Images
  const [selectedMeal, setSelectedMeal] = useState('Breakfast & Dinner (Half Board)');
  const [scrolled, setScrolled] = useState(false);

  // Scroll tracking for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Timer for auto-cycling hero media (video & images cross-fade)
  useEffect(() => {
    if (!room) return;
    const mediaCount = 1 + room.images.length; // 1 video + N images
    const timer = setInterval(() => {
      setActiveMediaIndex((prev) => (prev + 1) % mediaCount);
    }, 5000); // Shift every 5 seconds
    return () => clearInterval(timer);
  }, [room]);

  if (!room) {
    return (
      <div className="flex-center" style={{ height: '100vh', flexDirection: 'column', backgroundColor: '#F8F7F4' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1.5rem', color: '#171717' }}>Room Not Found</h1>
        <Link href="/" className="btn-outline" style={{ width: 'auto', padding: '1rem 2.5rem' }}>
          <ArrowLeft size={14} style={{ marginRight: '0.8rem' }} />
          <span>Return to Estate</span>
        </Link>
      </div>
    );
  }

  // WhatsApp link generator
  const getWhatsAppLink = () => {
    const phone = '919876543210';
    const message = `Hello KAYA Villa,%0A%0AI would like to make a reservation for the *${room.name}* under the *${selectedMeal}* plan. Please check availability for my details.%0A%0AThank you.`;
    return `https://wa.me/${phone}?text=${message}`;
  };

  const totalMediaCount = 1 + room.images.length;

  return (
    <>
      {/* Navigation (Floating Glass) */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link href="/" className="navbar-logo">K A Y A</Link>
        <ul className="navbar-links">
          <li><Link href="/" className="navbar-link">Back to Estate</Link></li>
          <li><a href="#details" className="navbar-link">Details</a></li>
          <li><a href="#reserve" className="navbar-link">Reserve</a></li>
        </ul>
        <Link href="/" className="mobile-menu-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-charcoal)' }}>
          <ArrowLeft size={14} />
          <span>Back</span>
        </Link>
      </nav>

      {/* Hero Section: Dynamic Media cross-fader */}
      <section className="hero">
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {/* Slide 0: Streaming Video */}
          <div 
            style={{ 
              position: 'absolute', 
              inset: 0, 
              opacity: activeMediaIndex === 0 ? 1 : 0, 
              transition: 'opacity 1.2s ease-in-out',
              zIndex: activeMediaIndex === 0 ? 1 : 0
            }}
          >
            <video
              src={room.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>

          {/* Slides 1..N: High-Res Images */}
          {room.images.map((src, index) => {
            const slideIndex = index + 1;
            return (
              <div 
                key={src}
                style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  opacity: activeMediaIndex === slideIndex ? 1 : 0, 
                  transition: 'opacity 1.2s ease-in-out',
                  zIndex: activeMediaIndex === slideIndex ? 1 : 0
                }}
              >
                <Image
                  src={src}
                  alt={`${room.name} Detail View ${slideIndex}`}
                  fill
                  priority={slideIndex === 1}
                  quality={100}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            );
          })}
        </div>

        {/* Hero Overlay */}
        <div className="hero-overlay"></div>

        {/* Hero Content */}
        <div className="hero-content">
          <span className="section-label reveal-fade-in active" style={{ color: 'rgba(248,247,244,0.7)', letterSpacing: '0.3em' }}>
            {room.category}
          </span>
          <h1 className="hero-title reveal-fade-in active" style={{ fontSize: '4.8rem', animationDelay: '0.1s' }}>
            {room.name}
          </h1>
          <p className="hero-tagline reveal-fade-in active" style={{ animationDelay: '0.2s', marginBottom: '5.5rem' }}>
            {room.size} &bull; {room.view}
          </p>
          
          {/* Custom Media Slide indicators */}
          <div className="flex-center" style={{ gap: '0.8rem', zIndex: 5, position: 'relative' }}>
            {Array.from({ length: totalMediaCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveMediaIndex(i)}
                aria-label={`Show slide ${i + 1}`}
                style={{
                  width: '24px',
                  height: '2px',
                  border: 'none',
                  backgroundColor: activeMediaIndex === i ? 'var(--color-warm-white)' : 'rgba(248, 247, 244, 0.25)',
                  cursor: 'pointer',
                  transition: 'background-color 0.4s ease'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Details Section */}
      <section id="details" className="section-padding max-width-container">
        <div className="contact-grid">
          {/* Left Column: Description & Specifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <span className="section-label" style={{ alignSelf: 'flex-start' }}>The Living Space</span>
            <h2 className="section-title" style={{ textAlign: 'left', margin: 0, fontSize: '2.8rem', lineHeight: '1.2' }}>
              Refined silence, crafted for private contemplation.
            </h2>
            <p style={{ fontSize: '1.05rem', lineHeight: '2.1', color: 'rgba(23, 23, 23, 0.85)' }}>
              {room.description}
            </p>

            {/* Room Features Checklist */}
            <div className="benefits-container" style={{ padding: '2.5rem', backgroundColor: 'rgba(23, 23, 23, 0.02)', border: '1px solid rgba(23, 23, 23, 0.05)', borderRadius: '4px' }}>
              <h4 className="benefits-title" style={{ color: 'var(--color-charcoal)', borderBottom: '1px solid rgba(23, 23, 23, 0.08)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                Room Specifications
              </h4>
              <div className="benefits-list" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', display: 'grid' }}>
                {room.features.map((feat) => (
                  <div key={feat} className="benefit-item" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'rgba(23, 23, 23, 0.75)', fontSize: '0.9rem' }}>
                    <span className="benefit-icon" style={{ color: 'var(--color-forest)' }}>✦</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Reservation form card */}
          <div id="reserve" className="booking-card left luxury-card" style={{ alignSelf: 'flex-start', top: '120px', position: 'sticky' }}>
            <div className="booking-card-top">
              <span className="booking-card-tag" style={{ color: 'var(--color-accent)' }}>Best Available Rate</span>
              <h3 className="booking-card-title">{room.name}</h3>
              <div className="room-footer" style={{ borderBottom: '1px solid rgba(248, 247, 244, 0.1)', paddingBottom: '1.2rem', marginBottom: '1.5rem' }}>
                <span className="room-specs" style={{ color: 'rgba(248,247,244,0.7)' }}>{room.size} &bull; {room.view}</span>
                <span className="room-price" style={{ color: 'var(--color-accent)' }}>{room.price} / Night</span>
              </div>
              <p className="booking-card-desc" style={{ color: 'rgba(248,247,244,0.75)' }}>
                Reserve your stay directly with our estate concierge desk to receive exclusive booking upgrades, customized dining schedules, and personal airport transfers.
              </p>
            </div>

            <div className="booking-form" style={{ marginTop: '1.5rem' }}>
              <div className="booking-field">
                <label className="booking-field-label" style={{ color: 'rgba(248,247,244,0.7)' }}>Meal Plan Preference</label>
                <div className="select-container" style={{ borderBottom: '1px solid rgba(248, 247, 244, 0.2)' }}>
                  <select 
                    value={selectedMeal} 
                    onChange={(e) => setSelectedMeal(e.target.value)}
                    className="booking-select"
                    style={{ color: 'var(--color-warm-white)' }}
                  >
                    <option value="Breakfast & Dinner (Half Board)">Breakfast & Dinner (Half Board)</option>
                    <option value="All Meals Inclusive (Full Board)">All Meals Inclusive (Full Board)</option>
                    <option value="Room Only (Continental Breakfast)">Room Only (Continental Breakfast)</option>
                  </select>
                  <ChevronDown className="select-arrow" size={18} style={{ color: 'var(--color-warm-white)' }} />
                </div>
              </div>
            </div>

            <a 
              href={getWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-accent flex-center"
              style={{ gap: '0.8rem', marginTop: '2rem' }}
            >
              <MessageSquare size={18} />
              <span>Request Villa Booking</span>
            </a>

            <div className="booking-footer-dark">
              <span>Direct Concierge Reply Within 2 Hours</span>
            </div>
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
                <li><Link href="/#about" className="footer-link">The Hotel</Link></li>
                <li><Link href="/#rooms" className="footer-link">Rooms & Suites</Link></li>
                <li><Link href="/#experiences" className="footer-link">Rituals (Experiences)</Link></li>
                <li><Link href="/#gallery" className="footer-link">Visual Journal</Link></li>
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
