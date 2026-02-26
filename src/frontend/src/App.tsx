import { useState, useEffect, useRef, useCallback } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSubmitForm } from "./hooks/useQueries";
import { Loader2, Phone, MessageCircle, MapPin, Menu, X, Star } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

// ─── Constants ───────────────────────────────────────────────────────────────
const PHONE = "+91 99347 56863";
const PHONE_HREF = "tel:+919934756863";
const WHATSAPP_HREF = "https://wa.me/919934756863";
const MAPS_HREF =
  "https://www.google.com/maps/search/?api=1&query=Bhootnath+Road+Patna+Bihar";
const MAPS_EMBED =
  "https://maps.google.com/maps?q=Bhootnath+Road+Patna+Bihar&output=embed";
const GOOGLE_REVIEWS_HREF =
  "https://www.google.com/maps/search/?api=1&query=ABC+Book+Center+Bhootnath+Road+Patna";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Reviews", href: "#reviews" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "FAQ", href: "#faq" },
];

const TRUST_POINTS = [
  {
    icon: "📚",
    title: "Wide Collection",
    desc: "School, college, and reference books across all subjects and boards.",
  },
  {
    icon: "📖",
    title: "Latest NCERT & Exam Guides",
    desc: "Up-to-date NCERT textbooks and top competitive exam preparation books.",
  },
  {
    icon: "💰",
    title: "Affordable Prices",
    desc: "Quality education materials at prices every student can afford.",
  },
  {
    icon: "📍",
    title: "Prime Location",
    desc: "Conveniently located on Bhootnath Road, easily accessible from all areas.",
  },
  {
    icon: "⭐",
    title: "Trusted by 350+ Customers",
    desc: "4-star rated by hundreds of satisfied students, parents, and teachers.",
  },
];

const CATEGORIES = [
  { icon: "📚", label: "School Books", prefill: "School Books" },
  { icon: "📖", label: "NCERT Books", prefill: "NCERT Books" },
  { icon: "🎓", label: "Competitive Exam Books", prefill: "Competitive Exam Books" },
  { icon: "✏️", label: "Stationery", prefill: "Stationery" },
  { icon: "🎨", label: "Art & Craft Supplies", prefill: "Art & Craft Supplies" },
  { icon: "📓", label: "College Books", prefill: "College Books" },
];

const TESTIMONIALS = [
  {
    text: "The collection is well organized and quality is good.",
    author: "Rahul K.",
    rating: 4,
  },
  {
    text: "All books available at affordable price. Highly recommended!",
    author: "Priya S.",
    rating: 5,
  },
  {
    text: "Best book store on Bhootnath Road. Found all my NCERT books here.",
    author: "Amit T.",
    rating: 4,
  },
  {
    text: "Very helpful staff. Got all competitive exam books easily.",
    author: "Sneha R.",
    rating: 5,
  },
];

const FAQS = [
  {
    q: "Do you stock NCERT books for all classes?",
    a: "Yes, we have NCERT books for all classes from 1 to 12, covering all subjects including Hindi, English, Maths, Science, Social Studies, and more.",
  },
  {
    q: "Do you have competitive exam books?",
    a: "Yes, we stock books for UPSC, SSC, BPSC, Railway, Bank exams, and other competitive exams from popular publishers.",
  },
  {
    q: "What are your store timings?",
    a: "We are open Monday to Saturday, 9 AM to 7 PM. We're closed on Sundays and national holidays.",
  },
  {
    q: "Can I place an order on WhatsApp?",
    a: "Yes! WhatsApp us at +91 99347 56863 with your requirement and we'll confirm availability and arrange pick-up or delivery.",
  },
];

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  const observe = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    const items = node.querySelectorAll(".reveal");
    items.forEach((el) => { observer.observe(el); });
    return () => { observer.disconnect(); };
  }, []);
  return observe;
}

// ─── Star Rating ─────────────────────────────────────────────────────────────
function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => {
        const filled = i < rating;
        return (
          <Star
            key={filled ? `filled-${i}` : `empty-${i}`}
            aria-hidden="true"
            className={`w-4 h-4 ${filled ? "fill-gold text-gold" : "text-gray-300"}`}
          />
        );
      })}
    </span>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-navy-lg border-b border-border"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex flex-col leading-tight">
            <span className="text-lg md:text-xl font-bold text-navy tracking-tight">
              ABC Book Center
            </span>
            <span className="text-xs text-muted-foreground font-medium tracking-wide">
              ए बी सी बुक सेंटर
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-foreground hover:text-navy transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Phone */}
          <a
            href={PHONE_HREF}
            className="hidden md:flex items-center gap-2 navy-btn px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:shadow-navy"
          >
            <Phone className="w-4 h-4" />
            {PHONE}
          </a>

          {/* Mobile: Phone + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <a href={PHONE_HREF} className="navy-btn p-2 rounded-lg">
              <Phone className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-navy hover:bg-sky-light rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border pb-4 pt-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-2 py-3 text-base font-medium text-foreground hover:text-navy hover:bg-sky-light rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="mt-3 pt-3 border-t border-border flex gap-3">
              <a href={PHONE_HREF} className="flex-1 navy-btn py-2.5 rounded-lg text-center text-sm font-semibold">
                📞 Call Now
              </a>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="flex-1 whatsapp-btn py-2.5 rounded-lg text-center text-sm font-semibold">
                💬 WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/generated/hero-bookstore.dim_1200x600.jpg')" }}
      />
      {/* Deep overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/75 to-navy-dark/90" />

      {/* Decorative geometric accent */}
      <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-sky/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 bg-white/10 border border-gold/30 backdrop-blur-sm rounded-full px-5 py-2 mb-8 animate-fade-in">
          <span className="flex gap-0.5">
            {[1,2,3,4].map(i => <span key={i} className="text-gold text-sm">★</span>)}
            <span className="text-white/30 text-sm">★</span>
          </span>
          <span className="w-px h-4 bg-white/20" />
          <span className="text-white/90 text-sm font-semibold tracking-wide">4.0 · 350+ Google Reviews</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-5 animate-fade-up">
          Patna's Trusted
          <br />
          <span className="text-gold font-extrabold" style={{ textShadow: "0 2px 20px oklch(0.75 0.16 72 / 0.45)" }}>
            Book & Stationery
          </span>{" "}
          <span className="font-light text-white/80">Store</span>
        </h1>
        <p className="text-white/75 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed tracking-wide" style={{ animationDelay: "0.15s" }}>
          All school books, NCERT, competitive exam guides & stationery —
          available at prices every student can afford.
        </p>

        {/* CTA Buttons — clear hierarchy */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary: Gold — visually dominant, pulsing */}
          <a
            href={PHONE_HREF}
            className="hero-cta-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base transition-all min-w-52 justify-center"
            style={{ transition: "background 0.2s, transform 0.2s, box-shadow 0.2s" }}
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
          {/* Secondary: WhatsApp green */}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 whatsapp-btn px-8 py-4 rounded-xl text-base font-bold transition-all hover:scale-105 min-w-52 justify-center"
            style={{ boxShadow: "0 4px 24px oklch(0.68 0.19 152 / 0.35)" }}
          >
            <SiWhatsapp className="w-5 h-5" />
            WhatsApp Order
          </a>
          {/* Tertiary: ghost */}
          <a
            href={MAPS_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 border border-white/40 text-white/85 hover:border-white/70 hover:text-white hover:bg-white/10 px-8 py-4 rounded-xl text-base font-semibold transition-all hover:scale-105 min-w-52 justify-center backdrop-blur-sm"
          >
            <MapPin className="w-5 h-5" />
            Get Directions
          </a>
        </div>

        {/* Address pill */}
        <div className="mt-10 inline-flex items-center gap-2 text-white/60 text-sm">
          <MapPin className="w-4 h-4 text-gold" />
          Bhootnath Road, Bahadurpur Housing Colony, Patna, Bihar 800026
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" role="presentation" aria-hidden="true">
          <title>Decorative wave</title>
          <path d="M0 60L1440 60L1440 0C1200 50 240 50 0 0L0 60Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const observeRef = useScrollReveal();

  useEffect(() => {
    return observeRef(sectionRef.current);
  }, [observeRef]);

  return (
    <section className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 reveal">
          <span className="section-label mb-3 block">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mt-3 leading-tight">
            Your Trusted Education Partner
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base leading-relaxed">
            Serving Patna students with quality books and stationery at unbeatable prices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {TRUST_POINTS.map((pt, i) => (
            <div
              key={pt.title}
              className={`reveal reveal-delay-${i + 1} bg-card rounded-2xl p-6 text-center shadow-xs hover:shadow-navy transition-all duration-300 border border-border hover:border-sky/40 group`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {pt.icon}
              </div>
              <h3 className="font-bold text-navy text-sm leading-tight mb-2">{pt.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{pt.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Product Categories ───────────────────────────────────────────────────────
function ProductCategories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const observeRef = useScrollReveal();

  useEffect(() => {
    return observeRef(sectionRef.current);
  }, [observeRef]);

  const handleCategoryClick = (prefill: string) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const textarea = document.getElementById(
          "bookRequirement"
        ) as HTMLTextAreaElement;
        if (textarea) {
          textarea.value = `I'm looking for: ${prefill}`;
          textarea.dispatchEvent(new Event("input", { bubbles: true }));
          textarea.focus();
        }
      }, 600);
    }
  };

  return (
    <section id="products" className="py-20 bg-sky-light/30" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-14 reveal">
          <span className="section-label mb-3 block">Browse Categories</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mt-3 leading-tight">
            Everything You Need
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base leading-relaxed">
            Click any category to enquire about availability or place an order.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => handleCategoryClick(cat.prefill)}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} card-lift bg-white rounded-2xl p-6 md:p-8 text-center border border-border cursor-pointer group`}
            >
              {/* Book-spine accent bar */}
              <div className="w-1 h-10 bg-navy rounded-full mx-auto mb-5 group-hover:bg-sky group-hover:h-14 transition-all duration-300" />
              <div className="text-4xl md:text-5xl mb-4">{cat.icon}</div>
              <h3 className="font-bold text-navy text-sm md:text-base leading-tight group-hover:text-sky transition-colors">
                {cat.label}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">Tap to enquire</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
function ReviewsSection() {
  // Duplicate testimonials for seamless loop
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="reviews" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="section-label mb-3 block">What Customers Say</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mt-3 leading-tight">
            Student Reviews
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <StarRating rating={4} />
            <span className="text-3xl font-extrabold text-navy">4.0</span>
            <span className="text-muted-foreground text-sm font-medium">· 350+ Reviews</span>
          </div>
        </div>
      </div>

      {/* Infinite scroll slider - full width */}
      <div className="relative w-full">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="testimonial-track gap-5 px-5" style={{ width: "max-content" }}>
          {doubled.map((t, i) => (
            <div
              key={`testimonial-${t.author}-${i}`}
              className="w-72 md:w-80 shrink-0 bg-card rounded-2xl p-6 border border-border shadow-xs"
            >
              <StarRating rating={t.rating} />
              <p className="text-foreground text-sm leading-relaxed mt-3 mb-4 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center text-white text-xs font-bold">
                  {t.author[0]}
                </div>
                <span className="text-sm font-semibold text-navy">{t.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10 text-center">
        <a
          href={GOOGLE_REVIEWS_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 sky-btn px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-navy transition-all hover:scale-105"
        >
          <Star className="w-4 h-4" />
          Read More Reviews on Google
        </a>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-sky/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
          Need Books Today?
          <br />
          <span className="text-gold">Call Now or WhatsApp Us!</span>
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-lg mx-auto">
          We'll help you find exactly what you need — school books, NCERT, exam
          guides, or stationery.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 hero-cta-primary px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 justify-center"
            style={{ transition: "background 0.2s, transform 0.2s, box-shadow 0.2s" }}
          >
            <Phone className="w-6 h-6" />
            {PHONE}
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 whatsapp-btn px-8 py-4 rounded-xl text-lg font-bold hover:shadow-lift transition-all hover:scale-105 justify-center"
          >
            <SiWhatsapp className="w-6 h-6" />
            WhatsApp Order
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const observeRef = useScrollReveal();

  useEffect(() => {
    return observeRef(sectionRef.current);
  }, [observeRef]);

  return (
    <section id="about" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div className="reveal">
            <span className="section-label mb-3 block">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mt-3 mb-6 leading-tight">
              Serving Patna Students for Years
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Located in the heart of Bhootnath Road, ABC Book Center has been
                the go-to destination for students, parents, and teachers across
                Patna. We believe quality education should be accessible and
                affordable to everyone.
              </p>
              <p>
                Our store stocks a comprehensive range — from NCERT textbooks for
                Class 1 to 12, to competitive exam preparation books for UPSC,
                BPSC, SSC, Railway, and Bank exams. We also carry a wide variety
                of stationery and art & craft supplies.
              </p>
              <p>
                Our friendly staff is always ready to help you find exactly what
                you need. Can't find a specific book? Just call or WhatsApp us —
                we'll do our best to arrange it for you.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-8">
              {[
                { val: "350+", label: "Happy Customers" },
                { val: "4.0★", label: "Google Rating" },
                { val: "1000+", label: "Book Titles" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-navy">{stat.val}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a
                href={MAPS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sky-btn px-5 py-3 rounded-xl font-semibold text-sm hover:shadow-navy transition-all"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 border border-navy text-navy px-5 py-3 rounded-xl font-semibold text-sm hover:bg-navy hover:text-white transition-all"
              >
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="reveal reveal-delay-2">
            <div className="rounded-2xl overflow-hidden shadow-navy-lg border border-border aspect-square md:aspect-[4/3]">
              <iframe
                src={MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ABC Book Center Location"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              📍 Bhootnath Road, Bahadurpur Housing Colony, Patna, Bihar 800026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bookRequirement, setBookRequirement] = useState("");
  const submitForm = useSubmitForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !bookRequirement.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await submitForm.mutateAsync({ name, phone, bookRequirement });
      toast.success("Your enquiry has been submitted! We'll reach out soon.", {
        duration: 5000,
      });
      setName("");
      setPhone("");
      setBookRequirement("");
    } catch {
      toast.error("Something went wrong. Please call us directly.");
    }
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const observeRef = useScrollReveal();

  useEffect(() => {
    return observeRef(sectionRef.current);
  }, [observeRef]);

  return (
    <section id="contact" className="py-20 bg-sky-light/30" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 reveal">
            <span className="section-label mb-3 block">Contact Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mt-3 leading-tight">Get in Touch</h2>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              Tell us what you need and we'll get back to you quickly.
            </p>
          </div>

          {/* Quick contact pills */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 reveal reveal-delay-1">
            <a
              href={PHONE_HREF}
              className="flex-1 flex items-center gap-3 bg-white border border-border rounded-xl px-5 py-4 hover:border-navy/30 hover:shadow-navy transition-all group"
            >
              <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Call us directly</div>
                <div className="font-bold text-navy text-sm">{PHONE}</div>
              </div>
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center gap-3 bg-white border border-border rounded-xl px-5 py-4 hover:border-whatsapp/30 hover:shadow-navy transition-all group"
            >
              <div className="w-10 h-10 bg-whatsapp rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <SiWhatsapp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">WhatsApp us</div>
                <div className="font-bold text-navy text-sm">+91 99347 56863</div>
              </div>
            </a>
          </div>

          {/* Form */}
          <div className="reveal reveal-delay-2 bg-white rounded-2xl border border-border shadow-navy p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-foreground font-semibold text-sm">
                  Your Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-foreground font-semibold text-sm">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bookRequirement" className="text-foreground font-semibold text-sm">
                  Book Requirement <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="bookRequirement"
                  placeholder="E.g., NCERT Class 10 Science, UPSC preparation books..."
                  value={bookRequirement}
                  onChange={(e) => setBookRequirement(e.target.value)}
                  required
                  rows={4}
                  className="rounded-xl resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={submitForm.isPending}
                className="w-full h-12 hero-cta-primary rounded-xl text-base transition-all hover:scale-[1.01] disabled:opacity-60 disabled:animate-none"
                style={{ transition: "background 0.2s, transform 0.15s, box-shadow 0.2s" }}
              >
                {submitForm.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Send Enquiry"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const observeRef = useScrollReveal();

  useEffect(() => {
    return observeRef(sectionRef.current);
  }, [observeRef]);

  return (
    <section id="faq" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12 reveal">
          <span className="section-label mb-3 block">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mt-3 leading-tight">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="reveal reveal-delay-1">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq) => (
              <AccordionItem
                key={faq.q}
                value={faq.q}
                className="bg-card border border-border rounded-xl px-6 py-1 data-[state=open]:border-sky/40 data-[state=open]:shadow-navy transition-all"
              >
                <AccordionTrigger className="text-left font-semibold text-navy hover:no-underline hover:text-sky text-sm md:text-base py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-navy-dark text-white/80 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold text-white mb-1">ABC Book Center</div>
            <div className="text-white/50 text-sm mb-4">ए बी सी बुक सेंटर</div>
            <p className="text-sm text-white/60 leading-relaxed">
              Patna's trusted destination for school books, NCERT textbooks,
              competitive exam guides, and stationery.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Contact</h4>
            <div className="space-y-3">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 text-sm hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-sky" />
                {PHONE}
              </a>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-gold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-whatsapp" />
                WhatsApp Order
              </a>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                <span>Bhootnath Road, Bahadurpur Housing Colony, Patna, Bihar 800026</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Quick Links</h4>
            <div className="space-y-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => {
                    const el = document.querySelector(link.href);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="block text-sm hover:text-gold transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <span>© 2026 ABC Book Center. All rights reserved.</span>
          <span>
            Built with ❤️ using{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating Elements ────────────────────────────────────────────────────────
function FloatingElements() {
  return (
    <>
      {/* Floating WhatsApp button — bottom right */}
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 whatsapp-btn rounded-full flex items-center justify-center shadow-lift wa-float transition-transform hover:scale-110"
        aria-label="WhatsApp Chat"
        title="Chat on WhatsApp"
      >
        <SiWhatsapp className="w-7 h-7 text-white" />
      </a>

      {/* Sticky mobile bottom bar — visible on mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-border shadow-navy-lg safe-area-pb">
        <div className="flex">
          <a
            href={PHONE_HREF}
            className="flex-1 flex items-center justify-center gap-2 navy-btn py-4 text-sm font-bold"
          >
            <Phone className="w-5 h-5" />
            📞 Call Now
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 whatsapp-btn py-4 text-sm font-bold"
          >
            <SiWhatsapp className="w-5 h-5" />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen font-poppins">
      <Toaster position="top-right" richColors />
      <Navbar />
      <main>
        <HeroSection />
        <WhyChooseUs />
        <ProductCategories />
        <ReviewsSection />
        <CTABanner />
        <AboutSection />
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
      <FloatingElements />
      {/* Bottom padding on mobile to account for sticky bar */}
      <div className="h-16 md:h-0" />
    </div>
  );
}
