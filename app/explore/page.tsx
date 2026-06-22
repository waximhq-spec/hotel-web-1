'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  Menu, 
  X,
  Compass,
  Utensils,
  Sparkles,
  Coffee
} from 'lucide-react';
import EnquiryModal from '../components/EnquiryModal';

export default function ExplorePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whitePlaceholder = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'><rect width='100%' height='100%' fill='%23ffffff'/><rect x='2%' y='2%' width='96%' height='96%' fill='none' stroke='%23f1f0eb' stroke-width='2'/></svg>";

  return (
    <>
      {/* Floating Glass Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <Link href="/" className="navbar-logo">K A Y A</Link>
        <ul className="navbar-links">
          <li><Link href="/explore" className="navbar-link">Explore The Hotel</Link></li>
          <li><Link href="/explore#dining" className="navbar-link">Dining</Link></li>
          <li><Link href="/#reviews" className="navbar-link">Reviews</Link></li>
          <li><Link href="/#gallery" className="navbar-link">Gallery</Link></li>
          <li><Link href="/#about" className="navbar-link">About</Link></li>
          <li><Link href="/#faqs" className="navbar-link">FAQs</Link></li>
        </ul>
        <div className="navbar-actions">
          <button onClick={() => setIsEnquireModalOpen(true)} className="btn-navbar-enquire">Enquire Now</button>
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
        <div className="mobile-menu-header">
          <div className="mobile-menu-brand">
            <span className="mobile-menu-brand-name">K A Y A</span>
            <span className="mobile-menu-brand-sub">HOTEL</span>
          </div>
          <button
            className="mobile-menu-enquire"
            onClick={() => { setMobileMenuOpen(false); setIsEnquireModalOpen(true); }}
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
        <nav className="mobile-menu-nav">
          <Link href="/explore" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
            <span className="mobile-menu-num">01</span>
            <span className="mobile-menu-label">Explore The Hotel</span>
          </Link>
          <Link href="/explore#dining" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
            <span className="mobile-menu-num">02</span>
            <span className="mobile-menu-label">Dining</span>
          </Link>
          <Link href="/#reviews" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
            <span className="mobile-menu-num">03</span>
            <span className="mobile-menu-label">Reviews</span>
          </Link>
          <Link href="/#gallery" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
            <span className="mobile-menu-num">04</span>
            <span className="mobile-menu-label">Gallery</span>
          </Link>
          <Link href="/#about" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
            <span className="mobile-menu-num">05</span>
            <span className="mobile-menu-label">About</span>
          </Link>
          <Link href="/#faqs" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
            <span className="mobile-menu-num">06</span>
            <span className="mobile-menu-label">FAQs</span>
          </Link>
        </nav>
      </div>


      {/* Hero Header */}
      <section className="section-padding max-width-container" style={{ paddingTop: '10rem', textAlign: 'center' }}>
        <span className="section-label">JOURNAL</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.6rem', fontWeight: 300, color: 'var(--color-charcoal)', margin: '1rem 0 2rem 0', letterSpacing: '-0.02em' }}>
          Explore KAYA Estate
        </h1>
        <p className="section-subtitle" style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.9' }}>
          A visual walk through the architectural alignment, private quarters, dining rituals, and wellness centers that define our high-end Alpine retreat.
        </p>
      </section>

      {/* Divider */}
      <div className="editorial-divider max-width-container">
        <span className="editorial-divider-mark">E S T A T E</span>
      </div>

      {/* Sections Wrapper */}
      <div className="max-width-container" style={{ paddingBottom: '10rem' }}>
        
        {/* 1. ROOMS SECTION */}
        <section id="rooms" className="room-editorial-block" style={{ marginTop: '4rem' }}>
          <div className="room-hero-image-wrapper">
            <Image
              src="https://images.pexels.com/photos/7546283/pexels-photo-7546283.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Modernist Design Suite View"
              fill
              sizes="100vw"
              className="room-hero-img"
            />
          </div>
          <div className="room-editorial-details" style={{ maxWidth: '800px', margin: '3rem auto 0 auto' }}>
            <span className="room-editorial-header">01 — LIVING SPACES</span>
            <h2 className="room-editorial-title" style={{ fontSize: '2.5rem' }}>Modernist Design Suite</h2>
            <p className="room-editorial-desc" style={{ textAlign: 'center' }}>
              A study in contemporary living and architectural layout. Featuring custom track lighting, rich timber cladding, and fine cashmere bed sheets.
            </p>
            <div className="luxury-actions" style={{ justifyContent: 'center', marginTop: '2rem' }}>
              <Link href="/rooms/modernist-design-suite" className="btn-luxury-primary">
                <span>View Suite Details</span>
                <ArrowRight size={14} className="arrow-icon" />
              </Link>
            </div>
          </div>
        </section>

        <section className="room-editorial-block" style={{ marginTop: '8rem' }}>
          <div className="room-hero-image-wrapper">
            <Image
              src="https://images.pexels.com/photos/6466224/pexels-photo-6466224.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Signature Butler Suite View"
              fill
              sizes="100vw"
              className="room-hero-img"
            />
          </div>
          <div className="room-editorial-details" style={{ maxWidth: '800px', margin: '3rem auto 0 auto' }}>
            <span className="room-editorial-header">02 — LIVING SPACES</span>
            <h2 className="room-editorial-title" style={{ fontSize: '2.5rem' }}>Signature Butler Suite</h2>
            <p className="room-editorial-desc" style={{ textAlign: 'center' }}>
              Our premier accommodation overlooking the valley. Features raw local stone, timber pillars, private terrace dining, and dedicated butler support.
            </p>
            <div className="luxury-actions" style={{ justifyContent: 'center', marginTop: '2rem' }}>
              <Link href="/rooms/signature-butler-suite" className="btn-luxury-primary">
                <span>View Suite Details</span>
                <ArrowRight size={14} className="arrow-icon" />
              </Link>
            </div>
          </div>
        </section>

        {/* 2. DINING SECTION */}
        <section id="dining" className="room-editorial-block" style={{ marginTop: '12rem' }}>
          <div className="room-hero-image-wrapper" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(23, 23, 23, 0.08)' }}>
            <Image
              src={whitePlaceholder}
              alt="Dining Experience Placeholder"
              fill
              sizes="100vw"
              className="room-hero-img"
              style={{ objectFit: 'contain' }}
            />
            <div className="flex-center" style={{ position: 'absolute', inset: 0, flexDirection: 'column', gap: '1rem' }}>
              <Utensils size={48} style={{ color: 'rgba(23, 23, 23, 0.15)' }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(23, 23, 23, 0.35)' }}>
                Culinary Space Photo Pending
              </span>
            </div>
          </div>
          <div className="room-editorial-details" style={{ maxWidth: '800px', margin: '3rem auto 0 auto' }}>
            <span className="room-editorial-header">03 — GASTRONOMY</span>
            <h2 className="room-editorial-title" style={{ fontSize: '2.5rem' }}>The Dining Room</h2>
            <p className="room-editorial-desc" style={{ textAlign: 'center' }}>
              A culinary journey showcasing seasonal alpine produce, hand-ground spices, and traditional recipes combined with modern culinary techniques. Enjoy bespoke menus served by candlelight on our waterside decks.
            </p>
            <div className="luxury-actions" style={{ justifyContent: 'center', marginTop: '2rem' }}>
              <button onClick={() => setIsEnquireModalOpen(true)} className="btn-luxury-secondary">
                <span>Inquire About Private Dining</span>
                <ArrowRight size={14} className="arrow-icon" />
              </button>
            </div>
          </div>
        </section>

        {/* 3. SPA & WELLNESS SECTION */}
        <section id="spa" className="room-editorial-block" style={{ marginTop: '12rem' }}>
          <div className="room-hero-image-wrapper" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(23, 23, 23, 0.08)' }}>
            <Image
              src={whitePlaceholder}
              alt="Spa Placeholder"
              fill
              sizes="100vw"
              className="room-hero-img"
              style={{ objectFit: 'contain' }}
            />
            <div className="flex-center" style={{ position: 'absolute', inset: 0, flexDirection: 'column', gap: '1rem' }}>
              <Sparkles size={48} style={{ color: 'rgba(23, 23, 23, 0.15)' }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(23, 23, 23, 0.35)' }}>
                Spa & Wellness Photo Pending
              </span>
            </div>
          </div>
          <div className="room-editorial-details" style={{ maxWidth: '800px', margin: '3rem auto 0 auto' }}>
            <span className="room-editorial-header">04 — REJUVENATION</span>
            <h2 className="room-editorial-title" style={{ fontSize: '2.5rem' }}>Stone Bath House & Spa</h2>
            <p className="room-editorial-desc" style={{ textAlign: 'center' }}>
              Formed out of deep volcanic stone, our private spa chambers offer aromatherapy, herbal steam treatments, and a cold plunge rock pool. Therapies are customized to promote longevity and relaxation.
            </p>
            <div className="luxury-actions" style={{ justifyContent: 'center', marginTop: '2rem' }}>
              <button onClick={() => setIsEnquireModalOpen(true)} className="btn-luxury-secondary">
                <span>Inquire Spa Services</span>
                <ArrowRight size={14} className="arrow-icon" />
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="max-width-container">
          <div className="footer-grid">
            <div className="footer-column">
              <span className="footer-logo">K A Y A</span>
              <p className="footer-about">
                A design-led luxury hotel dedicated to absolute silence, organic architecture, and custom wellness pathways. 
                Inspired by the philosophy of Aman resorts.
              </p>
            </div>

            <div className="footer-column">
              <span className="footer-title">Explore</span>
              <ul className="footer-links">
                <li><Link href="/#about" className="footer-link">The Hotel</Link></li>
                <li><Link href="/#rooms" className="footer-link">Rooms & Suites</Link></li>
                <li><Link href="/#gallery" className="footer-link">Visual Journal</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <span className="footer-title">Contact</span>
              <p className="footer-contact">
                KAYA Hotel Estate,<br />
                7513 Silvaplana, Switzerland<br /><br />
                T: +41 81 838 6000<br />
                E: concierge@kayalakehotel.com
              </p>
            </div>

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
      />
    </>
  );
}
