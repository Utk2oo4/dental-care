import React, { useEffect, useRef, useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronRight,
  Star,
  Plus,
  Minus,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Menu,
  X,
  Stethoscope,
  ShieldCheck,
  Award,
  CircleDollarSign,
  HeartPulse,
  Sparkles,
  Baby,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { cn } from './lib/utils';

gsap.registerPlugin(ScrollTrigger);

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

interface Dentist {
  id: string;
  name: string;
  qualification: string;
  specialization: string;
  experience: string;
  bio: string;
  image: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// --- Data ---
const SERVICES: Service[] = [
  {
    id: 'general',
    title: 'General Dentistry',
    description: 'Comprehensive oral exams, cleanings, and preventive care for the whole family.',
    icon: <Stethoscope className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'whitening',
    title: 'Teeth Whitening',
    description: 'Professional whitening treatments to brighten your smile safely and effectively.',
    icon: <Sparkles className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    description: 'Permanent, natural-looking solutions for missing teeth using advanced implant technology.',
    icon: <ShieldCheck className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ortho',
    title: 'Orthodontics',
    description: 'Straighten your teeth with modern braces or clear aligners for a perfect alignment.',
    icon: <Activity className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'root-canal',
    title: 'Root Canal Treatment',
    description: 'Expert endodontic care to save damaged teeth and eliminate pain.',
    icon: <HeartPulse className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    description: 'Veneers, bonding, and smile makeovers to enhance your natural beauty.',
    icon: <Sparkles className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1460672985063-6764ac8b9c74?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'pediatric',
    title: 'Pediatric Dentistry',
    description: 'Gentle and fun dental care specifically designed for children and teens.',
    icon: <Baby className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1559832333-5d8275d5109b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'emergency',
    title: 'Emergency Care',
    description: 'Immediate attention for dental emergencies, available when you need us most.',
    icon: <Phone className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800'
  }
];

const DENTISTS: Dentist[] = [
  {
    id: '1',
    name: 'Dr. Palak',
    qualification: 'BDS, MDS',
    specialization: 'Dental Surgeon & Implantologist',
    experience: '10+ Years',
    bio: 'Expert in complex dental implants and restorative oral surgery.',
    image: "/images/doctor-image.png"
  }
];

const FAQS: FAQ[] = [
  {
    id: '1',
    question: 'Is root canal treatment painful?',
    answer: 'With modern anesthesia and techniques, a root canal is no more painful than getting a filling. Our goal is to eliminate your pain, not cause it.'
  },
  {
    id: '2',
    question: 'How long does teeth whitening last?',
    answer: 'Results typically last from 6 months to 2 years, depending on your diet and oral hygiene habits.'
  },
  {
    id: '3',
    question: 'Do braces hurt?',
    answer: 'You may feel some pressure or soreness for a few days after adjustments, but this is temporary and manageable.'
  },
  {
    id: '4',
    question: 'How often should I visit a dentist?',
    answer: 'We recommend a professional check-up and cleaning every 6 months to maintain optimal oral health.'
  },
  {
    id: '5',
    question: 'What should I do in a dental emergency?',
    answer: 'Call our emergency line immediately. We prioritize emergency cases to ensure you get relief as soon as possible.'
  }
];

// --- Components ---

const Counter = ({ value, label, suffix = "" }: { value: number, label: string, suffix?: string }) => {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(countRef.current, {
        textContent: 0,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: countRef.current,
          start: 'top 80%',
        },
      });
    });
    return () => ctx.revert();
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-medical-navy mb-2">
        <span ref={countRef}>{value}</span>{suffix}
      </div>
      <div className="text-slate-600 font-medium">{label}</div>
    </div>
  );
};

const SectionHeading = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-16 px-4">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
        light ? "text-white" : "text-medical-navy"
      )}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={cn(
          "max-w-2xl mx-auto text-lg",
          light ? "text-blue-100" : "text-slate-600"
        )}
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className={cn(
        "h-1 w-24 mx-auto mt-6 rounded-full",
        light ? "bg-white/30" : "bg-medical-blue"
      )}
    />
  </div>
);

const ComparisonSlider = ({ before, after, labelBefore = "BEFORE", labelAfter = "AFTER" }: { before: string, after: string, labelBefore?: string, labelAfter?: string }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(100, Math.max(0, position)));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-video rounded-3xl overflow-hidden shadow-lg select-none cursor-ew-resize group"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* Before Image */}
      <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full z-20 pointer-events-none">
        {labelBefore}
      </div>

      {/* After Image */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden z-10"
        style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
      >
        <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute top-4 right-4 bg-medical-blue text-white text-xs font-bold px-3 py-1 rounded-full z-20 pointer-events-none">
          {labelAfter}
        </div>
      </div>

      {/* Slider Line & Handle */}
      <div
        className="absolute inset-y-0 z-20 w-1 bg-white shadow-xl pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="flex gap-0.5">
            <span className="w-0.5 h-3 bg-slate-300 rounded-full" />
            <span className="w-0.5 h-3 bg-slate-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/7706844592?text=Hi, I would like to book an appointment."
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-[#22c35e] transition-colors"
  >
    <svg
      viewBox="0 0 24 24"
      className="w-8 h-8 fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  </motion.a>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Smooth Scrolling with Lenis
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Header scroll effect
    const handleScroll = () => {
      if (window.scrollY > 50) {
        headerRef.current?.classList.add('glass-card', 'py-2');
        headerRef.current?.classList.remove('bg-transparent', 'py-4');
      } else {
        headerRef.current?.classList.remove('glass-card', 'py-2');
        headerRef.current?.classList.add('bg-transparent', 'py-4');
      }
    };
    window.addEventListener('scroll', handleScroll);

    // GSAP Animations
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.hero-content > *', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Service cards stagger
      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 70%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.2)'
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Choose Us', href: '#why-us' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen selection:bg-medical-blue selection:text-white">
      {/* 1. Emergency Banner */}
      <div className="bg-medical-navy text-white py-2 px-4 text-center text-sm font-medium sticky top-0 z-50">
        <div className="flex items-center justify-center gap-2">
          <Activity className="w-4 h-4 animate-pulse text-medical-blue" />
          <span>Emergency Dental Care Available – Call Now:</span>
          <a href="tel:+919876543210" className="hover:text-medical-blue transition-colors font-bold">+91 7706844592</a>
        </div>
      </div>

      {/* 2. Header / Navbar */}
      <header
        ref={headerRef}
        className="fixed top-9 left-0 right-0 z-40 transition-all duration-300 bg-transparent py-4"
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src="/images/dr-logo-new.png"
                alt="DentalCare Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-medical-navy tracking-tight">Dental<span className="text-medical-blue">Care</span></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-medical-navy hover:text-medical-blue transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-medical-blue transition-all group-hover:w-full" />
              </a>
            ))}
            <button className="bg-medical-blue text-white px-6 py-2.5 rounded-full font-bold hover:bg-medical-navy transition-all hover:shadow-lg active:scale-95">
              Book Appointment
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-medical-navy"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-medical-navy hover:text-medical-blue"
                  >
                    {link.name}
                  </a>
                ))}
                <button className="bg-medical-blue text-white w-full py-3 rounded-xl font-bold mt-2">
                  Book Appointment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden blue-gradient">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="hero-content relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-medical-blue/10 text-medical-blue px-4 py-2 rounded-full text-sm font-bold mb-6"
            >
              <Award className="w-4 h-4" />
              <span>#1 Rated Dental Clinic in the Region</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-medical-navy leading-tight mb-6">
              Your Smile, <br />
              <span className="text-medical-blue">Our Priority</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Experience world-class dental care with our team of experts. We use the latest technology to ensure your comfort and the best results for your oral health.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-medical-blue text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-medical-navy transition-all hover:shadow-xl active:scale-95 flex items-center gap-2">
                Book Now <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-medical-navy border-2 border-medical-navy/10 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-all active:scale-95">
                Learn More
              </button>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="Patient"
                    className="w-12 h-12 rounded-full border-4 border-white object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400 mb-1">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm font-semibold text-slate-600">500+ Happy Patients this month</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square"
            >
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1000"
                alt="Modern Dental Clinic"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-medical-navy/40 to-transparent" />
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 glass-card p-4 rounded-2xl z-20 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="text-green-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Technology</p>
                  <p className="font-bold text-medical-navy">Advanced Laser Care</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl z-20 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="text-medical-blue w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Availability</p>
                  <p className="font-bold text-medical-navy">24/7 Emergency Support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-medical-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-medical-blue/5 rounded-full blur-3xl" />
      </section>

      {/* 4. About Us Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
                  alt="Our Clinic"
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-medical-blue rounded-3xl -z-10 hidden md:block" />
            </motion.div>

            <div>
              <p className="text-medical-blue font-bold uppercase tracking-widest mb-4">About Dental Care</p>
              <h2 className="text-4xl font-bold text-medical-navy mb-6 leading-tight">We Are Dedicated To Your Oral Health Excellence</h2>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                At Dental Care, we believe that a healthy smile is the foundation of confidence. Our clinic combines years of clinical expertise with a compassionate approach to patient care. We utilize cutting-edge dental technology to provide treatments that are not only effective but also comfortable and minimally invasive.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'State-of-the-art diagnostic equipment',
                  'Highly qualified and experienced specialists',
                  'Personalized treatment plans for every patient',
                  'Strict sterilization and hygiene protocols'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-medical-blue w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <button className="bg-medical-navy text-white px-8 py-3 rounded-full font-bold hover:bg-medical-blue transition-all">
                Discover Our Story
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-slate-100">
            <Counter value={5000} label="Happy Patients" suffix="+" />
            <Counter value={15} label="Years Experience" suffix="+" />
            <Counter value={10} label="Expert Dentists" suffix="+" />
            <Counter value={8000} label="Successful Treatments" suffix="+" />
          </div>
        </div>
      </section>

      {/* 5. Meet Our Dentists Section */}
      <section className="py-24 blue-gradient">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Meet Our Expert Dentist"
            subtitle="Our team of world-class specialists is dedicated to providing you with the highest standard of dental care."
          />

          <div className="flex flex-wrap justify-center gap-8">
            {DENTISTS.map((dentist) => (
              <motion.div
                key={dentist.id}
                whileHover={{ y: -10 }}
                className="glass-card rounded-3xl overflow-hidden group max-w-md w-full"
              >
                <div className="relative h-[500px] overflow-hidden">
                  <img
                    src={dentist.image}
                    alt={dentist.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-medical-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex gap-4">
                      <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-medical-blue transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-medical-blue transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-medical-navy">{dentist.name}</h3>
                      <p className="text-medical-blue font-semibold text-sm">{dentist.specialization}</p>
                    </div>
                    <span className="bg-medical-blue/10 text-medical-blue px-3 py-1 rounded-full text-xs font-bold">
                      {dentist.experience}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs font-bold mb-3 uppercase tracking-wider">{dentist.qualification}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {dentist.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us Section */}
      <section id="why-us" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Why Choose Dental Care?"
            subtitle="We combine clinical excellence with a patient-first approach to ensure your visit is as comfortable as it is effective."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Experienced Dentists',
                desc: 'Our team consists of board-certified specialists with decades of combined experience.',
                icon: <Award className="w-8 h-8" />,
                img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400'
              },
              {
                title: 'Advanced Equipment',
                desc: 'We invest in the latest dental technology for precise diagnostics and painless treatments.',
                icon: <ShieldCheck className="w-8 h-8" />,
                img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=400'
              },
              {
                title: 'Pain-Free Treatment',
                desc: 'Our gentle techniques and sedation options ensure a stress-free experience for all.',
                icon: <HeartPulse className="w-8 h-8" />,
                img: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=400'
              },
              {
                title: 'Affordable Pricing',
                desc: 'Premium dental care shouldn\'t break the bank. We offer competitive rates and flexible plans.',
                icon: <CircleDollarSign className="w-8 h-8" />,
                img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-slate-50 rounded-3xl overflow-hidden group border border-slate-100"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-medical-blue mb-6 -mt-16 relative z-10 group-hover:bg-medical-blue group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-medical-navy mb-3">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Our Services Section */}
      <section id="services" className="py-24 blue-gradient">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Specialized Services"
            subtitle="From routine check-ups to complex restorative procedures, we offer a full spectrum of dental services."
          />

          <div className="services-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -5 }}
                className="service-card glass-card rounded-3xl p-6 group cursor-pointer"
              >
                <div className="relative h-40 rounded-2xl overflow-hidden mb-6">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-medical-navy/20 group-hover:bg-medical-navy/0 transition-colors" />
                </div>
                <div className="w-12 h-12 bg-medical-blue/10 rounded-xl flex items-center justify-center text-medical-blue mb-4 group-hover:bg-medical-blue group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-medical-navy mb-2">{service.title}</h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-medical-blue group-hover:gap-3 transition-all">
                  Learn More <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Before & After Gallery Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Real Transformations"
            subtitle="See the life-changing results of our dental treatments. Every smile tells a story of confidence restored."
          />

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: 'Teeth Whitening',
                desc: 'Professional grade whitening for a radiant smile.',
                before: 'images/teeth-white1.png',
                after: 'images/white-white2.png'
              },
              {
                title: 'Orthodontics',
                desc: 'Perfect alignment with modern clear aligners.',
                before: 'images/ortho1.png',
                after: 'images/ortho2.png'
              },
              {
                title: 'Dental Implants',
                desc: 'Natural looking solutions for missing teeth.',
                before: 'images/implant1.png',
                after: 'images/implant2.png'
              },
              {
                title: 'Root Canal',
                desc: 'Complete aesthetic enhancement for a new you.',
                before: 'images/rc1.png',
                after: 'images/rc2.png'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="mb-6">
                  <ComparisonSlider before={item.before} after={item.after} />
                </div>
                <h3 className="text-2xl font-bold text-medical-navy mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Pricing Section */}
      <section id="pricing" className="py-24 navy-gradient text-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            light
            title="Transparent Pricing"
            subtitle="Quality dental care should be accessible. We offer competitive pricing and flexible payment options."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Teeth Cleaning', price: '₹1,499', features: ['Full Oral Exam', 'Plaque Removal', 'Polishing', 'Fluoride Treatment'] },
              { title: 'Root Canal', price: '₹4,999', features: ['X-Ray Included', 'Painless Procedure', 'Temporary Filling', 'Post-Op Checkup'], popular: true },
              { title: 'Braces', price: '₹24,999', features: ['Consultation', 'Metal/Ceramic', 'Monthly Adjustments', 'Retainers Included'] },
              { title: 'Dental Implants', price: '₹19,999', features: ['Titanium Post', 'Abutment', 'Custom Crown', 'Lifetime Warranty'] }
            ].map((plan, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className={cn(
                  "rounded-3xl p-8 flex flex-col relative overflow-hidden",
                  plan.popular ? "bg-white text-medical-navy shadow-2xl scale-105 z-10" : "bg-white/10 backdrop-blur-md border border-white/20"
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-medical-blue text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={cn("text-sm", plan.popular ? "text-slate-400" : "text-blue-200")}>/ starting</span>
                </div>
                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <CheckCircle2 className={cn("w-5 h-5", plan.popular ? "text-medical-blue" : "text-blue-300")} />
                      <span className="text-sm font-medium">{f}</span>
                    </div>
                  ))}
                </div>
                <button className={cn(
                  "w-full py-3 rounded-xl font-bold transition-all active:scale-95",
                  plan.popular ? "bg-medical-navy text-white hover:bg-medical-blue" : "bg-white text-medical-navy hover:bg-blue-50"
                )}>
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>
          <p className="text-center mt-12 text-blue-200 text-sm">
            * Prices are indicative and may vary based on individual diagnosis.
          </p>
        </div>
      </section>

      {/* 10. Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="What Our Patients Say"
            subtitle="We take pride in the smiles we create. Here's what some of our valued patients have to say about their experience."
          />

          <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-16">
            <div className="text-center md:text-left">
              <div className="text-5xl font-bold text-medical-navy mb-2">4.8/5</div>
              <div className="flex text-yellow-400 justify-center md:justify-start mb-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-6 h-6 fill-current" />)}
              </div>
              <p className="text-slate-500 font-medium">Average Patient Rating</p>
            </div>
            <div className="h-12 w-px bg-slate-200 hidden md:block" />
            <div className="text-center md:text-left">
              <div className="text-5xl font-bold text-medical-navy mb-2">320+</div>
              <p className="text-slate-500 font-medium">Verified Reviews</p>
            </div>
          </div>

          <div className="elfsight-app-0a0c572c-51e4-4324-81f6-3df2cc650c5c" data-elfsight-app-lazy></div>
        </div>
      </section>

      {/* 11. FAQ Section */}
      <section id="faq" className="py-24 blue-gradient">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our dental treatments and clinic procedures."
          />

          <div className="space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-medical-navy">{faq.question}</span>
                  {activeFaq === faq.id ? <Minus className="text-medical-blue" /> : <Plus className="text-medical-blue" />}
                </button>
                <AnimatePresence>
                  {activeFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 text-slate-600 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-medical-blue font-bold uppercase tracking-widest mb-4">Contact Us</p>
              <h2 className="text-4xl font-bold text-medical-navy mb-8">Get In Touch Or Book An Appointment</h2>

              <div className="space-y-8 mb-12">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-medical-blue/10 rounded-xl flex items-center justify-center text-medical-blue flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-medical-navy mb-1">Our Location</h4>
                    <p className="text-slate-600">Dr Palak's Dental Care, Sector 6, <br />Rohini, Delhi, 110085</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-medical-blue/10 rounded-xl flex items-center justify-center text-medical-blue flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-medical-navy mb-1">Phone Number</h4>
                    <p className="text-slate-600">+91 7706844592</p>
                    <p className="text-slate-600">+91 22 1234 5678</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-medical-blue/10 rounded-xl flex items-center justify-center text-medical-blue flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-medical-navy mb-1">Email Address</h4>
                    <p className="text-slate-600">drpalaksdentalcare@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden h-80 shadow-inner border border-slate-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.311018243915!2d77.10672060606876!3d28.710249800000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d019ece81f04d%3A0x7caa66adac113d41!2sDr%20Palak&#39;s%20Dental%20Care%20%7C%20Best%20Dentist%20%7C%20Best%20Root%20Canal%20Treatment%20%7C%20Dental%20Implants%20%7C%20Sector%206!5e0!3m2!1sen!2sin!4v1772718348951!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl font-bold text-medical-navy mb-6">Book Your Appointment</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone Number</label>
                    <input type="tel" placeholder="+91 7706844592" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Select Service</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all bg-white">
                      <option>General Checkup</option>
                      <option>Teeth Whitening</option>
                      <option>Dental Implants</option>
                      <option>Orthodontics</option>
                      <option>Root Canal</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Preferred Date</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Your Message</label>
                  <textarea rows={4} placeholder="How can we help you?" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all resize-none"></textarea>
                </div>
                <button className="w-full bg-medical-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-medical-navy transition-all shadow-lg hover:shadow-xl active:scale-95">
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Footer */}
      <footer className="bg-medical-navy text-white pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <a href="#home" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-medical-blue rounded-xl flex items-center justify-center">
                  <img
                src="/images/dr-logo-new.png"
                alt="DentalCare Logo"
                className="w-full h-full object-contain"
              />
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">Dental<span className="text-medical-blue">Care</span></span>
              </a>
              <p className="text-blue-100/60 leading-relaxed mb-8">
                Providing premium dental care with advanced technology and a compassionate touch. Your smile is our greatest achievement.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-medical-blue transition-colors">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {navLinks.slice(0, 5).map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-blue-100/60 hover:text-white transition-colors flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" /> {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Our Services</h4>
              <ul className="space-y-4">
                {SERVICES.slice(0, 5).map(service => (
                  <li key={service.id}>
                    <a href="#services" className="text-blue-100/60 hover:text-white transition-colors flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" /> {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Working Hours</h4>
              <ul className="space-y-4">
                <li className="flex justify-between text-blue-100/60">
                  <span>Mon - Fri:</span>
                  <span className="text-white font-medium">9:00 AM - 8:00 PM</span>
                </li>
                <li className="flex justify-between text-blue-100/60">
                  <span>Saturday:</span>
                  <span className="text-white font-medium">10:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between text-blue-100/60">
                  <span>Sunday:</span>
                  <span className="text-medical-blue font-bold uppercase text-xs">Emergency Only</span>
                </li>
              </ul>
              <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-2">Emergency Line</p>
                <p className="text-xl font-bold">+91 7706844592</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-100/40">
            <p>© 2026 Dental Care. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  );
}
