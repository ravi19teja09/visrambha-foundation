import { useState, useEffect, useRef } from "react";
import {
  Menu, X, Heart, BookOpen, Users, School, MapPin, HeartPulse,
  ChevronLeft, ChevronRight, Download, Mail, Phone,
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  GraduationCap, Laptop, Lightbulb, Award, BarChart2,
  ArrowRight, Calendar, Globe, FileText, Shield,
  Quote, CheckCircle, Star, Copy,
  Check,
  QrCode,
  Building2,
  CreditCard, Calculator
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoImg from "@/imports/Screenshot_2026-08-07_171608.png";
import FloatingActions from "@/app/components/ui/FloatingActions";
import scanner from "../assets/hero-section-images/scanner.png";

// ─── DATA ────────────────────────────────────────────────────────────────────
const events = [
  {
    category: "Education",
    categoryColor: "#1B6B6B",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=480&h=280&fit=crop&auto=format",
    title: "Education Support – BR Hills",
    desc: "Supporting children in the BR Hills region with access to education, learning resources, and opportunities for a brighter future.",
    raised: 0,
    goal: 500000,
    progress: 0,
  },
  {
    category: "Medical Relief",
    categoryColor: "#C9A84C",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=480&h=280&fit=crop&auto=format",
    title: "Medical Relief – BR Hills",
    desc: "Providing essential medical assistance and healthcare support to underserved communities in the BR Hills region.",
    raised: 0,
    goal: 500000,
    progress: 0,
  },
];
// // Tax calculator
const SLABS = [
  { label: "5% Slab", desc: "Income ₹2.5L – ₹5L", rate: 5 },
  { label: "20% Slab", desc: "Income ₹5L – ₹10L", rate: 20 },
  { label: "30% Slab", desc: "Income above ₹10L", rate: 30 },
];

const avatarUrls = [
  "https://images.unsplash.com/photo-1628717341663-0007b0ee2597?w=48&h=48&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=48&h=48&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=48&h=48&fit=crop&auto=format",
];

const founders = [
  {
    initials: "KK",
    name: "Kiran Kumar G M",
    role: "Founder · Import & Export",
    bio: "Founder of Visrambha Foundation, bringing his professional experience and vision towards creating meaningful opportunities for children and underserved communities.",
    cardBg: "linear-gradient(150deg, #163C3C 0%, #1C5050 60%, #1F5A5A 100%)",
    badgeBg: "#C9A84C22",
    badgeColor: "#C9A84C",
    borderColor: "#C9A84C",
    glowColor: "#1C505055",
    textName: "#fff",
    textRole: "#C9A84C",
    textBio: "#96BEBE",
    ghostColor: "#C9A84C",
  },
  {
    initials: "DG",
    name: "Darshan G",
    role: "Trust Member · Interior Designer",
    bio: "Brings creative design expertise and a thoughtful approach to spaces, events, and initiatives that support the Foundation's mission.",
    cardBg: "linear-gradient(150deg, #1B5E5E 0%, #22686A 60%, #1A5A5C 100%)",
    badgeBg: "#C9A84C22",
    badgeColor: "#C9A84C",
    borderColor: "#C9A84C",
    glowColor: "#22686A55",
    textName: "#fff",
    textRole: "#C9A84C",
    textBio: "#A8CECE",
    ghostColor: "#C9A84C",
  },
  {
    initials: "SB",
    name: "Supriya B M",
    role: "Trust Member · Event Management",
    bio: "Contributes her event management and coordination skills to help organize meaningful Foundation activities and community programs.",
    cardBg: "linear-gradient(150deg, #153D3D 0%, #1A5252 60%, #1E5858 100%)",
    badgeBg: "#C9A84C22",
    badgeColor: "#C9A84C",
    borderColor: "#C9A84C",
    glowColor: "#153D3D55",
    textName: "#fff",
    textRole: "#C9A84C",
    textBio: "#96BEBE",
    ghostColor: "#C9A84C",
  },
  {
    initials: "SP",
    name: "Sunil Paswan",
    role: "Trust Member · DJ & Event Management",
    bio: "Brings creativity, event coordination, and entertainment expertise to support the Foundation's events and community initiatives.",
    cardBg: "linear-gradient(150deg, #1B5E5E 0%, #1F6F6F 60%, #256060 100%)",
    badgeBg: "#C9A84C22",
    badgeColor: "#C9A84C",
    borderColor: "#C9A84C",
    glowColor: "#1B5E5E55",
    textName: "#fff",
    textRole: "#C9A84C",
    textBio: "#A8CECE",
    ghostColor: "#C9A84C",
  }
];

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  // { label: "Impact", href: "#impact" },
  // { label: "Stories", href: "#stories" },
  // { label: "Gallery", href: "#gallery" },
  { label: "Events", href: "#events" },
  // { label: "Transparency", href: "#transparency" },
  { label: "Contact", href: "#contact" },
];

const FOUNDERS = [
  {
    name: "Sunil Paswan",
    role: "Trust Member – DJ & Event Management",
    initials: "SP",
    bio: "An experienced professional in DJ and event management, Sunil contributes his creativity, coordination skills, and event expertise to support the Foundation's initiatives and community programs.",
  },
  {
    name: "Supriya B M",
    role: "Trust Member – Event Management",
    initials: "SB",
    bio: "With experience in event management, Supriya plays an active role in organizing and coordinating Foundation activities, helping create meaningful experiences for the communities we serve.",
  },
  {
    name: "Darshan G",
    role: "Trust Member – Interior Designer",
    initials: "DG",
    bio: "An interior designer with a creative and practical approach, Darshan contributes his design expertise and ideas to support the Foundation's spaces, events, and community initiatives.",
  },
  {
    name: "Kiran Kumar G M",
    role: "Founder – Import & Export",
    initials: "KK",
    bio: "A professional in the import and export sector, Kiran Kumar G M founded Visrambha Foundation with a vision to contribute to society and create meaningful opportunities for children and underserved communities.",
  },
];

const TIMELINE = [
  { year: 2018, title: "Foundation Established", desc: "Visrambha Foundation registered with a mission to bring quality education to every child in rural India." },
  { year: 2019, title: "First 100 Scholarships", desc: "Awarded inaugural scholarships across 3 districts in Maharashtra and Andhra Pradesh." },
  { year: 2020, title: "Digital Pivot in a Crisis", desc: "Launched emergency online learning kits for 2,000 students during the pandemic lockdown." },
  { year: 2021, title: "50 Schools Milestone", desc: "Completed infrastructure renovation of 50 government schools, benefiting 12,000 students." },
  { year: 2022, title: "Skill Development Centers", desc: "Expanded to vocational training with 15 new centers across 5 states." },
  { year: 2023, title: "UNESCO Recognition", desc: "Received the UNESCO Civil Society Education Award for innovative community-driven learning." },
  { year: 2024, title: "15,000 Children Milestone", desc: "Crossed the milestone of actively supporting 15,000 children across 8 states." },
];

const sliderStyle = (v: number, min: number, max: number) => ({
  background: `linear-gradient(to right, #1D4E5F ${((v - min) / (max - min)) * 100}%, #EDE9E3 ${((v - min) / (max - min)) * 100}%)`,
});

const PROGRAMS = [
  {
    icon: Heart,
    title: "RELIEF TO POOR",
    desc: "Providing essential support, food, clothing, and other basic necessities to underprivileged individuals and families in need.",
    color: "accent",
  },
  {
    icon: Users,
    title: "SOCIAL WELFARE",
    desc: "Promoting the well-being of communities through inclusive social initiatives, community support, and programs that create positive and lasting change.",
    color: "primary",
  },
  {
    icon: BookOpen,
    title: "Education",
    desc: "Supporting children and underserved communities through access to quality education, learning opportunities, and educational resources.",
    color: "primary",
  },
  {
    icon: HeartPulse,
    title: "Medical Relief",
    desc: "Providing essential medical support and relief to individuals and families in need, helping improve access to basic healthcare.",
    color: "accent",
  },
  {
    icon: Building2,
    title: "Urban & Rural Development",
    desc: "Working towards sustainable development and improved living conditions in both urban and rural communities through meaningful social initiatives.",
    color: "primary",
  }
];

const STATS = [
  { end: 15000, label: "Children Educated", suffix: "+", icon: Users },
  { end: 2500, label: "Scholarships Awarded", suffix: "+", icon: Award },
  { end: 580, label: "Active Volunteers", suffix: "+", icon: Heart },
  { end: 210, label: "Schools Supported", suffix: "+", icon: School },
  { end: 85, label: "Villages Reached", suffix: "+", icon: MapPin },
  { end: 95, label: "Donations Utilized", suffix: "%", icon: BarChart2 },
];

const YEAR_CHART = [
  { year: 2018, v: 1200 }, { year: 2019, v: 3400 }, { year: 2020, v: 5800 },
  { year: 2021, v: 8200 }, { year: 2022, v: 10500 }, { year: 2023, v: 12800 }, { year: 2024, v: 15000 },
];

const TESTIMONIALS = [
  {
    name: "Ananya Reddy",
    age: 14,
    location: "Anantapur, Andhra Pradesh",
    story: "Before Visrambha found me, I had dropped out of school to help my mother at home. Now I am in Class 9 with a full scholarship, dreaming of becoming a doctor.",
    quote: "My daughter was losing hope. Visrambha's team visited our village and changed everything. She now studies with confidence and real joy.",
    quoteName: "Lakshmi Reddy",
    quoteRole: "Ananya's Mother",
    img: "https://images.unsplash.com/photo-1630864972901-052dfdc7fba4?w=400&h=400&fit=crop&auto=format",
    tag: "Scholarship Recipient",
  },
  {
    name: "Rahul Patil",
    age: 12,
    location: "Nashik, Maharashtra",
    story: "The digital learning lab at our school opened a new world for me. I learned to code and won my district's first technology competition for students.",
    quote: "Watching these children discover computers and then build their own projects — that is why I volunteer every single weekend.",
    quoteName: "Vikram Nair",
    quoteRole: "Volunteer Tutor, 3 Years",
    img: "https://images.unsplash.com/photo-1603185030522-05d4497bb180?w=400&h=400&fit=crop&auto=format",
    tag: "Digital Learning",
  },
  {
    name: "Meera Kumari",
    age: 16,
    location: "Varanasi, Uttar Pradesh",
    story: "The skill development program helped me learn tailoring. I now run a small enterprise and also teach other girls in my village.",
    quote: "Meera's transformation shows what happens when you invest in a girl child. She is now an inspiration for the entire community.",
    quoteName: "Sarita Devi",
    quoteRole: "Village Head, Rampur",
    img: "https://images.unsplash.com/photo-1761365361648-3968a6b588a6?w=400&h=400&fit=crop&auto=format",
    tag: "Skill Development",
  },
];

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/flagged/photo-1574098335395-18cf525e45d6?w=600&h=400&fit=crop&auto=format", alt: "Boy learning in rural classroom" },
  { src: "https://images.unsplash.com/photo-1780282148151-e53f763cbb30?w=600&h=900&fit=crop&auto=format", alt: "Group of smiling children outdoors" },
  { src: "https://images.unsplash.com/photo-1758685848754-0aa566b4ddf4?w=600&h=400&fit=crop&auto=format", alt: "Teacher writing on chalkboard" },
  { src: "https://images.unsplash.com/photo-1774504798059-0e7022b63b47?w=600&h=400&fit=crop&auto=format", alt: "Children in a line outdoors" },
  { src: "https://images.unsplash.com/photo-1771577125646-b38ed7b14411?w=600&h=900&fit=crop&auto=format", alt: "Volunteer storytelling with children" },
  { src: "https://images.unsplash.com/photo-1630864972901-052dfdc7fba4?w=600&h=400&fit=crop&auto=format", alt: "Girl at school smiling" },
  { src: "https://images.unsplash.com/photo-1778864874528-696db2f002bd?w=600&h=400&fit=crop&auto=format", alt: "Mentor with young student" },
  { src: "https://images.unsplash.com/photo-1497486443155-158cceb6629a?w=600&h=900&fit=crop&auto=format", alt: "Young girl near school wall" },
];

const UPCOMING_EVENTS = [
  { date: "Aug 15, 2026", title: "Annual Education Summit 2026", location: "Hyderabad, Telangana", type: "Conference", desc: "Gathering educators, policymakers, and volunteers for our flagship conference on inclusive education." },
  { date: "Sep 5, 2026", title: "Teacher's Day Felicitation", location: "Mumbai, Maharashtra", type: "Ceremony", desc: "Honoring 50 outstanding rural teachers who have made extraordinary impact in their communities." },
  { date: "Oct 2, 2026", title: "Village Outreach Drive", location: "Nashik Region, Maharashtra", type: "Outreach", desc: "Awareness drive across 20 villages to enroll out-of-school children back into education." },
];

const PAST_EVENTS = [
  { date: "Jun 21, 2026", title: "Scholarship Award Ceremony", location: "Pune, Maharashtra", type: "Ceremony", desc: "Celebrated 500 new scholarship recipients with their families and local community leaders." },
  { date: "May 5, 2026", title: "Digital Lab Inauguration", location: "Raichur, Karnataka", type: "Launch", desc: "Launched 5 new computer labs providing digital access to 1,200 students in rural schools." },
  { date: "Mar 8, 2026", title: "Women & Education Forum", location: "Jaipur, Rajasthan", type: "Forum", desc: "Brought together 200 educators and community leaders to address barriers in girls' education." },
];

const DONATION_DATA = [
  { name: "Direct Education", value: 45, color: "#1d5054" },
  { name: "Scholarships", value: 25, color: "#c49a3a" },
  { name: "Infrastructure", value: 15, color: "#2a7a7f" },
  { name: "Skill Training", value: 10, color: "#e8b547" },
  { name: "Admin & Ops", value: 5, color: "#8ab5b8" },
];

const ANNUAL_REPORTS = [
  { year: "2024–25", size: "3.2 MB" },
  { year: "2023–24", size: "2.8 MB" },
  { year: "2022–23", size: "2.5 MB" },
  { year: "2021–22", size: "2.1 MB" },
];

const CSR_PARTNERS = [
  "Tata Consultancy Services",
  "Infosys Foundation",
  "Wipro Cares",
  "HDFC Bank Parivartan",
  "Mahindra Foundation",
  "Azim Premji Foundation",
];

const VALUES = [
  { icon: Heart, title: "Compassion", desc: "Every child matters. We lead with empathy and human dignity in everything we do." },
  { icon: Shield, title: "Integrity", desc: "Full transparency in finances, governance, and impact — always." },
  { icon: Globe, title: "Equity", desc: "Breaking barriers of geography, gender, and economic background." },
  { icon: Star, title: "Excellence", desc: "Highest standards of program quality and measurable outcomes." },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCountUp(end: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      current = Math.min(current + step, end);
      setCount(Math.floor(current));
      if (current >= end) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, active]);
  return count;
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function SectionTag({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="font-mono text-xs font-bold tracking-widest text-accent">{number}</span>
      <div className="h-px w-8 bg-accent/50" />
      <span className="text-xs tracking-widest uppercase text-muted-foreground font-semibold">{label}</span>
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/96 backdrop-blur-md shadow-sm border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 shrink-0">
          <ImageWithFallback
            src={logoImg}
            alt="Visrambha Foundation Logo"
            className="w-11 h-11 object-contain"
          />
          <div className="hidden sm:block leading-none">
            <div className={`font-display font-bold text-base leading-tight tracking-wide ${scrolled ? "text-primary" : "text-primary"}`}>
              VISRAMBHA
            </div>
            <div className={`text-[10px] tracking-widest uppercase mt-0.5 ${scrolled ? "text-muted-foreground" : "text-primary/60"}`}>
              Foundation
            </div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-5">
          {NAV_LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${scrolled ? "text-foreground" : "text-primary/85"
                }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#get-involved"
            className="hidden sm:flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-accent/90 transition-all hover:scale-105 shadow-md"
          >
            <Heart className="w-4 h-4" />
            Donate Now
          </a>
          <button
            className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
              }`}
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-border px-6 py-4 space-y-0.5">
          {NAV_LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-foreground hover:text-accent font-medium transition-colors border-b border-border/50 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-4">
            <a
              href="#get-involved"
              className="flex items-center justify-center gap-2 bg-accent text-white w-full py-3 rounded-full text-sm font-semibold"
            >
              <Heart className="w-4 h-4" /> Donate Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="px-5 sm:px-10 lg:px-16 pt-14 pb-10 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FDF8EE 0%, #F7F2E4 50%, #F0EDD8 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Left */}
        <div>
          <span
            className="inline-block text-[10px] tracking-[0.28em] uppercase font-semibold px-3 py-1.5 rounded-full mb-6"
            style={{ background: "#1B6B6B18", color: "#1B6B6B" }}
          >
            Visrambha Foundation · Est. 2026
          </span>

          <h1
            style={{ fontFamily: "'Playfair Display', serif", color: "#0F2A2A" }}
            className="text-4xl sm:text-5xl leading-[1.18] font-semibold mb-5"
          >
            Uniting for Change,{" "}
            <span style={{ color: "#C9A84C", fontStyle: "italic" }}>
              Building
            </span>{" "}
            a Brighter Future
          </h1>

          <p
            style={{ fontFamily: "'Inter', sans-serif", color: "#4A6060" }}
            className="text-base leading-relaxed mb-8 max-w-sm font-light"
          >
            We work alongside communities across rural India to ensure every child has access to quality education, mentorship, and the tools they need to build a brighter future.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#get-involved"
              className="flex items-center gap-2.5 bg-accent text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-accent/90 transition-all hover:scale-105 shadow-xl"
            >
              <Heart className="w-5 h-5" />
              Donate Now
            </a>
            <a
              href="#about" style={{ background: "#1B6B6B" }}
              className="flex items-center gap-2.5 border-2 border-white/40 text-white px-8 py-4 rounded-full font-semibold text-base hover:border-white/80 hover:bg-white/8 transition-all"
            >
              Our Story
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* <div className="flex items-center gap-4 flex-wrap">
            <button
              className="px-6 py-3 rounded-full text-sm font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: "#1B6B6B", fontFamily: "'Inter', sans-serif" }}
            >
              What we do
            </button>
            <button
              className="flex items-center gap-2.5 text-sm font-medium transition-colors duration-200 hover:opacity-70"
              style={{ color: "#0F2A2A", fontFamily: "'Inter', sans-serif" }}
            >
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center border"
                style={{ borderColor: "#C9A84C60", background: "#C9A84C12" }}
              >
                <Play size={13} fill="#C9A84C" color="#C9A84C" />
              </span>
              Play Video
            </button>
          </div> */}
        </div>

        {/* Right — image collage */}
        <div className="relative flex justify-center md:justify-end pt-8 pb-8">
          {/* Main large image */}
          <div
            className="relative rounded-3xl overflow-hidden bg-[#D8E8D8] shadow-xl"
            style={{ width: 450, height: 360 }}
          >
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=720&fit=crop&auto=format"
              alt="Five children smiling and showing peace signs"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 rounded-3xl"
              style={{ background: "linear-gradient(180deg, transparent 60%, #1B6B6B22 100%)" }}
            />
          </div>

          {/* Small square image — top right */}
          <div
            className="absolute top-0 -right-2 sm:right-0 w-32 h-32 rounded-2xl overflow-hidden border-4 shadow-lg bg-[#E8D8C8]"
            style={{ borderColor: "#FDF8EE" }}
          >
            <img
              src="https://childcareindiatrust.org/wp-content/uploads/2024/08/man-is-cooking-with-group-children_976492-67921.jpg"
              alt="Four children laughing together on steps"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Small circle image — bottom right */}
          <div
            className="absolute bottom-4 -right-2 sm:right-0 w-24 h-24 rounded-full overflow-hidden border-4 shadow-md bg-[#D8E8D8]"
            style={{ borderColor: "#FDF8EE" }}
          >
            <img
              src="https://childcareindiatrust.org/wp-content/uploads/2024/09/360_F_649461336_VeKRYlh3Snjq7BCWXOmbh1IirtmWM1H3.png"
              // src="https://images.unsplash.com/photo-1773379884572-616d50c21d69?w=180&h=180&fit=crop&auto=format"
              alt="Three children standing together smiling"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Volunteer badge */}
          <div
            className="absolute -bottom-2 left-0 md:-left-6 rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 border"
            style={{ background: "#fff", borderColor: "#EDE8D8" }}
          >
            <div className="flex -space-x-2">
              {avatarUrls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="Volunteer"
                  className="w-8 h-8 rounded-full border-2 object-cover bg-[#D0E8E8]"
                  style={{ borderColor: "#FDF8EE" }}
                />
              ))}
            </div>
            <div>
              <p
                className="text-lg font-bold leading-none"
                style={{ color: "#0F2A2A", fontFamily: "'Playfair Display', serif" }}
              >
                150
              </p>
              <p
                className="text-[10px] mt-0.5"
                style={{ color: "#6A9090", fontFamily: "'Inter', sans-serif" }}
              >
                Happy Volunteers
              </p>
            </div>
          </div>

          {/* Decorative dot grid */}
          <div
            className="absolute -left-6 top-8 w-20 h-20 opacity-25 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #C9A84C 1.5px, transparent 1.5px)",
              backgroundSize: "10px 10px",
            }}
          />
        </div>
        {/* <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-white/15 bg-white/8 backdrop-blur-md divide-y sm:divide-y-0 sm:divide-x divide-white/15">
              {[
                { num: "15,000+", label: "Children Supported", Icon: Users },
                { num: "210+", label: "Schools Reached", Icon: School },
                { num: "580+", label: "Volunteers Nationwide", Icon: Heart },
              ].map(({ num, label, Icon }) => (
                <div key={label} className="flex items-center gap-5 px-8 py-7">
                  <Icon className="w-8 h-8 text-accent shrink-0" />
                  <div>
                    <div
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: "var(--font-family-display)" }}
                    >
                      {num}
                    </div>
                    <div className="text-white/60 text-sm mt-0.5">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

// function HeroSection() {
//   return (
//     <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-primary">
//       <div className="absolute inset-0">
//         <img
//           src="https://images.unsplash.com/flagged/photo-1574098335395-18cf525e45d6?w=1920&h=1080&fit=crop&auto=format"
//           alt="Boy learning in a rural classroom"
//           className="w-full h-full object-cover opacity-30"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-[#091f22]/95 via-[#1d5054]/85 to-[#1d5054]/55" />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-44 w-full">
//         <div className="max-w-3xl">
//           <div className="flex items-center gap-3 mb-8">
//             <div className="h-px w-12 bg-accent" />
//             <span className="text-accent font-semibold tracking-widest text-xs uppercase">
//               Visrambha Foundation
//             </span>
//           </div>
//           <h1
//             className="font-display text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-[1.08] mb-8"
//             style={{ fontFamily: "var(--font-family-display)" }}
//           >
//             {/* Every Child Deserves the Opportunity to Learn.  */}
//             Building Stronger Communities, Creating Brighter Futures.
//           </h1>
//           <p className="text-white/72 text-xl leading-relaxed mb-10 max-w-2xl">
//             We work alongside communities to expand access to quality education, strengthen rural development, and empower women with the skills and opportunities to build a better future.
//           </p>
//           <div className="flex flex-wrap gap-4">
//             <a
//               href="#get-involved"
//               className="flex items-center gap-2.5 bg-accent text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-accent/90 transition-all hover:scale-105 shadow-xl"
//             >
//               <Heart className="w-5 h-5" />
//               Donate Now
//             </a>
//             <a
//               href="#about"
//               className="flex items-center gap-2.5 border-2 border-white/40 text-white px-8 py-4 rounded-full font-semibold text-base hover:border-white/80 hover:bg-white/8 transition-all"
//             >
//               Our Story
//               <ArrowRight className="w-5 h-5" />
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-0 left-0 right-0 z-10">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-white/15 bg-white/8 backdrop-blur-md divide-y sm:divide-y-0 sm:divide-x divide-white/15">
//             {[
//               { num: "15,000+", label: "Children Supported", Icon: Users },
//               { num: "210+", label: "Schools Reached", Icon: School },
//               { num: "580+", label: "Volunteers Nationwide", Icon: Heart },
//             ].map(({ num, label, Icon }) => (
//               <div key={label} className="flex items-center gap-5 px-8 py-7">
//                 <Icon className="w-8 h-8 text-accent shrink-0" />
//                 <div>
//                   <div
//                     className="text-2xl font-bold text-white"
//                     style={{ fontFamily: "var(--font-family-display)" }}
//                   >
//                     {num}
//                   </div>
//                   <div className="text-white/60 text-sm mt-0.5">{label}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function AboutSection() {
  const [tab, setTab] = useState<"mission" | "vision" | "values">("mission");

  return (
    <section id="about" className="py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTag number="02" label="About Us" />

        {/* Mission/Vision/Values + Image */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
          <div>
            <h2
              className="text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-10"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Rooted in Communities, Growing With Every Life We Touch
            </h2>
            <div className="flex gap-2 mb-8 flex-wrap">
              {(["mission", "vision", "values"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold capitalize transition-all ${tab === t
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="min-h-[160px]">
              {tab === "mission" && (
                <div>
                  <p className="text-foreground text-lg leading-relaxed mb-6">
                    To close the distance between where someone starts and where they deserve to reach — through education that opens doors, healthcare that protects, and support that helps rural communities and women stand on their own strength. No child left behind by circumstance. No family left behind by silence.
                  </p>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-muted-foreground text-sm">Serving children across 8 states in India</span>
                  </div>
                </div>
              )}
              {tab === "vision" && (
                <p className="text-foreground text-lg leading-relaxed">
                  A future where a person's postcode never decides their potential — where every village has a school worth walking to, every family has access to care, and every woman has the means to choose her own path.                </p>
              )}
              {tab === "values" && (
                <div>
                  <p>Dignity first, always — we serve, we don't rescue. Transparency in every rupee. Equity without exception — caste, religion, gender, or ability never determine who we help.</p>
                  <br />
                  <div className="grid grid-cols-2 gap-5">
                    {VALUES.map(({ icon: Icon, title, desc }) => (
                      <div key={title} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-sm">{title}</div>
                          <div className="text-muted-foreground text-xs mt-1 leading-relaxed">{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1771577125646-b38ed7b14411?w=900&h=700&fit=crop&auto=format"
                alt="Volunteer with children in community setting"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-accent text-white p-6 rounded-2xl shadow-2xl">
              <div
                className="text-3xl font-bold"
                style={{ fontFamily: "var(--font-family-display)" }}
              >
                Together
              </div>
              <div className="text-white/80 text-sm mt-0.5">For a Better Tomorrow</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white border border-border p-5 rounded-2xl shadow-xl hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div
                    className="font-bold text-foreground text-lg"
                    style={{ fontFamily: "var(--font-family-display)" }}
                  >
                    15,000+
                  </div>
                  <div className="text-muted-foreground text-xs">Children Supported</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Founders */}
        <section
          className="min-h-screen px-4 sm:px-8 py-14 sm:py-20 flex flex-col items-center relative overflow-hidden"
          style={{
            fontFamily: "'Inter', sans-serif", background: "radial-gradient(ellipse 70% 50% at 20% 20%, #0D3535 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, #0A2828 0%, transparent 55%), #0B1F1F",
          }}
        >
          <div className="w-full max-w-2xl">
            {/* Decorative glow orbs */}
            <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #C47F0015 0%, transparent 70%)", filter: "blur(40px)" }} />
            <div className="absolute bottom-10 right-1/4 w-56 h-56 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #E8920012 0%, transparent 70%)", filter: "blur(32px)" }} />

            {/* Header */}
            <div className="mb-10 sm:mb-14 relative">
              <p className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase font-medium mb-3 opacity-80">
                The people behind it
              </p>
              <div className="flex items-end gap-4">
                <h2
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-[#F5E6C8] text-3xl sm:text-4xl leading-tight"
                >
                  Meet our founders
                </h2>
                <div className="mb-1.5 h-px flex-1 bg-gradient-to-r from-[#C9A84C]/50 to-transparent" />
              </div>
              <p className="mt-3 text-[#A08860] text-sm leading-relaxed max-w-sm font-light">
                Four decades of combined expertise, united by one purpose — your legacy.
              </p>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {founders.map((f) => (
                <div
                  key={f.name}
                  className="group relative rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: f.cardBg,
                    borderColor: f.borderColor + "60",
                    boxShadow: `0 4px 20px ${f.glowColor}`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px ${f.glowColor}, 0 2px 8px rgba(0,0,0,0.2)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 20px ${f.glowColor}`;
                  }}
                >
                  {/* Corner ghost letter */}
                  <div
                    className="absolute top-3 right-4 text-[64px] sm:text-[72px] leading-none font-bold select-none pointer-events-none opacity-[0.12]"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: f.ghostColor,
                    }}
                  >
                    {f.initials[0]}
                  </div>

                  {/* Badge */}
                  <div
                    className="relative w-11 h-11 rounded-xl flex items-center justify-center text-xs font-semibold tracking-widest mb-5 backdrop-blur-sm"
                    style={{ background: f.badgeBg, color: f.badgeColor, border: "1.5px solid rgba(255,255,255,0.3)" }}
                  >
                    {f.initials}
                  </div>

                  {/* Text */}
                  <h3
                    className="text-[15px] font-semibold mb-0.5 leading-snug"
                    style={{ color: f.textName }}
                  >
                    {f.name}
                  </h3>
                  <p
                    className="text-[10px] tracking-[0.18em] uppercase font-medium mb-3"
                    style={{ color: f.textRole }}
                  >
                    {f.role}
                  </p>
                  <p className="text-[13px] sm:text-sm leading-relaxed font-light" style={{ color: f.textBio }}>
                    {f.bio}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer line */}
            <div className="mt-10 sm:mt-12 flex items-center gap-4 relative">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C9A84C]/40" />
              <p className="text-[#8A7040] text-[11px] tracking-widest uppercase whitespace-nowrap">
                years of combined experience
              </p>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A84C]/40" />
            </div>
          </div>
        </section>

      </div>
    </section>
  );
}

// ─── PROGRAMS ────────────────────────────────────────────────────────────────

function ProgramsSection() {
  return (
    <section id="programs" className="py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTag number="03" label="Our Programs" />
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <h2
            className="text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            Programs Built for Lasting Change
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Each initiative is designed with community input, local context, and measurable outcomes — ensuring our work creates real, sustained transformation.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="group bg-card border border-border rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${color === "primary"
                  ? "bg-primary/10 group-hover:bg-primary"
                  : "bg-accent/10 group-hover:bg-accent"
                  }`}
              >
                <Icon
                  className={`w-6 h-6 transition-colors duration-300 ${color === "primary"
                    ? "text-primary group-hover:text-white"
                    : "text-accent group-hover:text-white"
                    }`}
                />
              </div>
              <h3
                className="text-xl font-bold text-foreground mb-3"
                style={{ fontFamily: "var(--font-family-display)" }}
              >
                {title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{desc}</p>
              <button
                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${color === "primary"
                  ? "text-primary hover:text-accent"
                  : "text-accent hover:text-primary"
                  }`}
              >
                See More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── IMPACT ──────────────────────────────────────────────────────────────────

function StatCard({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const count = useCountUp(stat.end, 1800, active);
  const Icon = stat.icon;
  return (
    <div className="bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl p-7 text-center hover:bg-white/12 transition-colors">
      <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <div
        className="text-[2.5rem] font-bold text-white leading-none mb-2"
        style={{ fontFamily: "var(--font-family-display)" }}
      >
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-white/60 text-sm">{stat.label}</div>
    </div>
  );
}

function ImpactSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section id="impact" className="py-28 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/6 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/4 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <SectionTag number="03" label="Our Impact" />
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <h2
            className="text-4xl lg:text-5xl font-bold text-white leading-[1.1]"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            Numbers That Tell a Human Story
          </h2>
          <p className="text-white/65 text-lg leading-relaxed">
            Every number here represents a real child, a real family, a real village transformed by the power of education and community support.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {STATS.map(stat => (
            <StatCard key={stat.label} stat={stat} active={inView} />
          ))}
        </div>

        {/* Year-over-year chart */}
        <div className="bg-white/8 border border-white/12 rounded-2xl p-8">
          <h3
            className="text-xl font-bold text-white mb-8"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            Children Reached — Year Over Year
          </h3>
          <div className="flex items-end gap-3" style={{ height: 140 }}>
            {YEAR_CHART.map(({ year, v }) => (
              <div key={year} className="flex-1 flex flex-col items-center gap-2.5">
                <div
                  className="w-full rounded-t-lg bg-accent/75 transition-all duration-700 ease-out"
                  style={{ height: inView ? `${(v / 15000) * 100}%` : "0%" }}
                />
                <span className="text-white/45 text-xs font-medium">{year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent(c => (c + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[current];

  return (
    <section id="stories" className="py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTag number="04" label="Success Stories" />
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <h2
            className="text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            Stories That Fuel Our Purpose
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Behind every statistic is a child whose life trajectory has been changed forever. Here are just a few of their stories.
          </p>
        </div>

        <div className="grid md:grid-cols-2 bg-card border border-border rounded-3xl overflow-hidden shadow-lg">
          {/* Child info + story */}
          <div className="relative bg-primary p-10 flex flex-col justify-between min-h-[460px]">
            <div className="absolute inset-0">
              <img
                src={t.img}
                alt={t.name}
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-primary/75" />
            </div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold border border-accent/25 mb-6">
                {t.tag}
              </span>
              <img
                src={t.img}
                alt={t.name}
                className="w-20 h-20 rounded-full object-cover border-[3px] border-white/30 mb-4"
              />
              <h3
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-family-display)" }}
              >
                {t.name}
              </h3>
              <p className="text-white/55 text-sm mt-1">Age {t.age} · {t.location}</p>
            </div>
            <div className="relative z-10 mt-8">
              <p className="text-white/82 text-base leading-relaxed italic">"{t.story}"</p>
            </div>
          </div>

          {/* Quote + navigation */}
          <div className="p-10 flex flex-col justify-between">
            <div>
              <Quote className="w-10 h-10 text-accent/25 mb-6" />
              <p
                className="text-foreground text-xl leading-relaxed font-medium italic mb-10"
                style={{ fontFamily: "var(--font-family-display)" }}
              >
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                  <span
                    className="text-primary font-bold"
                    style={{ fontFamily: "var(--font-family-display)" }}
                  >
                    {t.quoteName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{t.quoteName}</div>
                  <div className="text-muted-foreground text-xs mt-0.5">{t.quoteRole}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
              <div className="flex gap-2 items-center">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all ${i === current ? "w-8 h-2.5 bg-accent" : "w-2.5 h-2.5 bg-muted hover:bg-muted-foreground/40"
                      }`}
                    aria-label={`Story ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── GALLERY ─────────────────────────────────────────────────────────────────

function GallerySection() {
  return (
    <section id="gallery" className="py-28 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTag number="05" label="Gallery" />
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-12">
          <h2
            className="text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            Moments That Define Our Mission
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From classrooms to community centers, here are glimpses of the lives we are building together across rural India.
          </p>
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className="break-inside-avoid overflow-hidden rounded-2xl mb-4 group cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EVENTS ──────────────────────────────────────────────────────────────────

function EventCard({ ev }: { ev: typeof events[0] }) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border flex flex-col flex-shrink-0 w-[88vw] sm:w-72 lg:w-auto transition-shadow duration-200 hover:shadow-xl"
      style={{ borderColor: "#E8EFEF" }}
    >
      <div className="bg-[#D8EAEA] h-48 overflow-hidden">
        <img
          src={ev.image}
          alt={ev.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span
          className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-2"
          style={{ color: ev.categoryColor, fontFamily: "'Inter', sans-serif" }}
        >
          {ev.category}
        </span>
        <h3
          className="text-base font-semibold mb-2 leading-snug"
          style={{ color: "#0F2A2A", fontFamily: "'Playfair Display', serif" }}
        >
          {ev.title}
        </h3>
        <p
          className="text-[13px] leading-relaxed font-light mb-4 flex-1"
          style={{ color: "#6A8888", fontFamily: "'Inter', sans-serif" }}
        >
          {ev.desc}
        </p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px]" style={{ color: "#8AADAD", fontFamily: "'Inter', sans-serif" }}>
              Donated
            </span>
            <span
              className="text-[11px] font-medium"
              style={{ color: "#1B6B6B", fontFamily: "'Inter', sans-serif" }}
            >
              {ev.progress}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-[#E8F0F0] overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${ev.progress}%`, background: "#C9A84C" }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[11px]" style={{ color: "#8AADAD", fontFamily: "'Inter', sans-serif" }}>
              Raised: ₹{(ev.raised / 1000).toFixed(0)}K
            </span>
            <span className="text-[11px]" style={{ color: "#8AADAD", fontFamily: "'Inter', sans-serif" }}>
              Goal: ₹{(ev.goal / 1000).toFixed(0)}K
            </span>
          </div>
        </div>

        <button
          onClick={() =>
            document.getElementById("get-involved")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            background: "#1B6B6B",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Donate <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

function EventsSection() {
  const [offset, setOffset] = useState(0);
  const max = events.length - 1;

  return (
    <section id="events" className="px-5 sm:px-10 lg:px-16 py-16 bg-[#F7FAF9]">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <p
              className="text-[10px] tracking-[0.28em] uppercase font-semibold mb-2"
              style={{ color: "#C9A84C", fontFamily: "'Inter', sans-serif" }}
            >
              Get involved
            </p>
            <h2
              className="text-3xl sm:text-4xl font-semibold leading-tight"
              style={{ color: "#0F2A2A", fontFamily: "'Playfair Display', serif" }}
            >
              Engage With Our<br />Ongoing Causes
            </h2>
          </div>
          <div className="flex gap-2 mt-2 flex-shrink-0">
            <button
              onClick={() => setOffset((p) => Math.max(0, p - 1))}
              disabled={offset === 0}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-30 hover:bg-[#1B6B6B] hover:border-[#1B6B6B] hover:text-white"
              style={{ borderColor: "#C8D8D8", color: "#1B6B6B" }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setOffset((p) => Math.min(max, p + 1))}
              disabled={offset === max}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-30 hover:bg-[#1B6B6B] hover:border-[#1B6B6B] hover:text-white"
              style={{ borderColor: "#C8D8D8", color: "#1B6B6B" }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable row on mobile, grid on lg */}
        <div className="flex lg:grid lg:grid-cols-3 gap-5 overflow-x-auto pb-3 lg:overflow-visible scrollbar-hide">
          {events.map((ev) => (
            <EventCard key={ev.title} ev={ev} />
          ))}
        </div>
      </div>
    </section>
  );
}
// function EventsSection() {
//   const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
//   const events = tab === "upcoming" ? UPCOMING_EVENTS : PAST_EVENTS;

//   return (
//     <section id="events" className="py-28 bg-background">
//       <div className="max-w-7xl mx-auto px-6">
//         <SectionTag number="04" label="Events" />
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
//           <h2
//             className="text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]"
//             style={{ fontFamily: "var(--font-family-display)" }}
//           >
//             Events & Milestones
//           </h2>
//           <div className="flex bg-muted rounded-full p-1 shrink-0">
//             {(["upcoming", "past"] as const).map(t => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-all ${tab === t ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
//                   }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="space-y-4">
//           {events.map((event, i) => (
//             <div
//               key={i}
//               className="group flex flex-col sm:flex-row gap-6 bg-card border border-border rounded-2xl p-6 hover:shadow-md hover:border-primary/25 transition-all duration-300"
//             >
//               <div className="shrink-0">
//                 <div className="w-20 h-20 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center justify-center">
//                   <Calendar className="w-5 h-5 text-accent mb-1" />
//                   <div className="text-[10px] text-muted-foreground text-center leading-tight font-semibold px-2">
//                     {event.date.split(",")[0]}
//                   </div>
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <div className="flex flex-wrap items-center gap-3 mb-2">
//                   <span className="px-3 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-semibold border border-accent/15">
//                     {event.type}
//                   </span>
//                   <span className="text-muted-foreground text-xs flex items-center gap-1.5">
//                     <MapPin className="w-3.5 h-3.5" />
//                     {event.location}
//                   </span>
//                 </div>
//                 <h3
//                   className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors"
//                   style={{ fontFamily: "var(--font-family-display)" }}
//                 >
//                   {event.title}
//                 </h3>
//                 <p className="text-muted-foreground text-sm leading-relaxed">{event.desc}</p>
//               </div>
//               {tab === "upcoming" && (
//                 <div className="shrink-0 flex items-center">
//                   {/* <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap">
//                     Register <ArrowRight className="w-4 h-4" />
//                   </button> */}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// ─── GET INVOLVED ─────────────────────────────────────────────────────────────

function GetInvolvedSection() {
  const [copied, setCopied] = useState("");

  const donationDetails = {
    upi: "visrambhafoundation.82260080@hdfcbank@upi",
    accountName: "Visrambha Foundation",
    accountNumber: "50200121320235",
    ifsc: "HDFC0004228",
    bank: "HDFC Bank",
    branch: "Bengaluru Main Branch",
  };

  const copyToClipboard = async (value: any, type: any) => {
    await navigator.clipboard.writeText(value);
    setCopied(type);

    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  return (
    <section id="get-involved" className="relative py-24 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTag number="01" label="Get Involved" />

        <h2
          className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] max-w-xl mb-16"
          style={{ fontFamily: "var(--font-family-display)" }}
        >
          {/* Be the Reason a Child Believes in Their Future */}
          DONATE DIRECTLY TO MAKE A CHANGE
        </h2>

        <div className="grid  gap-6">

          {/* ================= DONATE ================= */}
          <div className="bg-accent/8 border border-accent/25 rounded-3xl p-8 lg:p-10 hover:bg-accent/12 transition-colors duration-300">

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-7">
              <Heart className="w-8 h-8 text-accent" />
            </div>

            <h3
              className="text-2xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Make a Donation
            </h3>

            <p className="text-white/65 leading-relaxed mb-8">
              Your contribution helps provide education, scholarships,
              healthcare, and better opportunities for children and
              underserved communities.
            </p>

            <div className="flex flex-col sm:flex-row justify-evenly">
              {/* ================= QR SECTION ================= */}
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5 mb-5">

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                    <QrCode className="w-5 h-5 text-accent" />
                  </div>

                  <div>
                    <h4 className="text-white font-semibold">
                      Scan & Pay
                    </h4>
                    <p className="text-white/45 text-xs">
                      Scan the QR code using any UPI app
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* QR Scanner */}
                  <div className="w-44 h-56 rounded-2xl bg-white p-4 flex items-center justify-center shadow-lg shrink-0">
                    <div className="w-full h-full border-4 border-black rounded-xl flex items-center justify-center overflow-hidden">
                      <img
                        src={scanner}
                        alt="Visrambha Foundation UPI QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* UPI Details */}
                  <div className="flex-1 w-full">
                    <p className="text-xs uppercase tracking-wider text-white/40 mb-2">
                      UPI ID
                    </p>

                    <div className="flex items-center justify-between gap-3 bg-white/10 border border-white/15 rounded-xl px-4 py-3">
                      <span className="text-white font-medium text-sm break-all">
                        {donationDetails.upi}
                      </span>

                      <button
                        onClick={() =>
                          copyToClipboard(donationDetails.upi, "upi")
                        }
                        className="shrink-0 w-9 h-9 rounded-lg bg-accent/15 hover:bg-accent/25 flex items-center justify-center transition-colors"
                        title="Copy UPI ID"
                      >
                        {copied === "upi" ? (
                          <Check className="w-4 h-4 text-accent" />
                        ) : (
                          <Copy className="w-4 h-4 text-accent" />
                        )}
                      </button>
                    </div>

                    <p className="text-white/35 text-xs mt-3">
                      Supports Google Pay, PhonePe, Paytm & other UPI apps
                    </p>

                  </div>
                </div>
              </div>

              {/* ================= BANK DETAILS ================= */}
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white/80" />
                  </div>

                  <div>
                    <h4 className="text-white font-semibold">
                      Bank Transfer
                    </h4>

                    <p className="text-white/45 text-xs">
                      Direct bank transfer
                    </p>
                  </div>

                </div>

                <div className="space-y-3">

                  <BankDetail
                    label="Account Name"
                    value={donationDetails.accountName}
                  />

                  <BankDetail
                    label="Account Number"
                    value={donationDetails.accountNumber}
                    copyable
                    copied={copied === "account"}
                    onCopy={() =>
                      copyToClipboard(
                        donationDetails.accountNumber,
                        "account"
                      )
                    }
                  />

                  <div className="grid grid-cols-2 gap-3">

                    <BankDetail
                      label="IFSC"
                      value={donationDetails.ifsc}
                    />

                    <BankDetail
                      label="Bank"
                      value={donationDetails.bank}
                    />

                  </div>

                  <BankDetail
                    label="Branch"
                    value={donationDetails.branch}
                  />

                </div>
              </div>
            </div>

            {/* Note */}
            <div className="flex items-start gap-3 mt-5 px-1">

              <CreditCard className="w-4 h-4 text-accent mt-0.5 shrink-0" />

              <p className="text-white/40 text-xs leading-relaxed">
                Please keep your transaction reference or receipt for
                donation records and tax purposes.
              </p>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
/* ================= BANK DETAIL COMPONENT ================= */

function BankDetail({
  label = '',
  value = '',
  copyable = false,
  copied = false,
  onCopy = () => { },
}) {
  return (
    <div className="flex items-center justify-between gap-3 bg-black/10 rounded-xl px-4 py-3">

      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-white/35 mb-1">
          {label}
        </p>

        <p className="text-sm text-white/80 font-medium truncate">
          {value}
        </p>
      </div>

      {copyable && (
        <button
          onClick={onCopy}
          className="shrink-0 w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
          title={`Copy ${label}`}
        >
          {copied ? (
            <Check className="w-4 h-4 text-accent" />
          ) : (
            <Copy className="w-4 h-4 text-white/50" />
          )}
        </button>
      )}

    </div>
  );
}

// ─── TRANSPARENCY ─────────────────────────────────────────────────────────────

function TransparencySection() {
  return (
    <section id="transparency" className="py-28 bg-secondary/35">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTag number="08" label="Financial Transparency" />
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <h2
            className="text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            Your Trust Is Our Greatest Responsibility
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We publish full audited accounts, annual reports, and real-time impact data so every donor can see exactly how their contribution creates change.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Donut chart */}
          <div className="bg-card border border-border rounded-3xl p-8">
            <h3
              className="text-xl font-bold text-foreground mb-1"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Donation Utilization 2024–25
            </h3>
            <p className="text-muted-foreground text-sm mb-6">95% of every donation goes directly to programs</p>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DONATION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {DONATION_DATA.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => [`${v}%`, ""]} />
                  <Legend
                    formatter={(value) => (
                      <span style={{ fontSize: 12, color: "var(--foreground)" }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Reports + certifications */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <h3
                  className="text-xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-family-display)" }}
                >
                  Annual Reports
                </h3>
              </div>
              <div className="space-y-1">
                {ANNUAL_REPORTS.map(r => (
                  <div
                    key={r.year}
                    className="flex items-center justify-between py-3.5 border-b border-border last:border-0"
                  >
                    <div>
                      <div className="font-semibold text-sm text-foreground">Annual Report {r.year}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{r.size} · PDF</div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/6 text-primary hover:bg-primary hover:text-white transition-all text-sm font-medium">
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-accent" />
                </div>
                <h3
                  className="text-xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-family-display)" }}
                >
                  Certifications
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {["80G Certified", "12A Registered", "FCRA Approved", "ISO 9001:2015", "GiveIndia Verified"].map(cert => (
                  <span
                    key={cert}
                    className="px-3.5 py-1.5 bg-accent/8 border border-accent/18 text-accent rounded-full text-xs font-semibold"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Partners */}
        <div className="bg-card border border-border rounded-3xl p-8">
          <h3
            className="text-xl font-bold text-foreground mb-7 text-center"
            style={{ fontFamily: "var(--font-family-display)" }}
          >
            Our CSR & Funding Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CSR_PARTNERS.map(p => (
              <div
                key={p}
                className="flex items-center justify-center py-5 px-3 bg-muted/50 rounded-2xl hover:bg-muted transition-colors cursor-pointer"
              >
                <span className="text-xs text-muted-foreground font-medium text-center leading-tight">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// TAX CALCULATOR
function TaxCalculator() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutTab, setAboutTab] = useState("mission");
  const [eventTab, setEventTab] = useState<"upcoming" | "past">("upcoming");
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);


  // Tax calculator
  const [taxInput, setTaxInput] = useState("10000");
  const [taxSlab, setTaxSlab] = useState(30);
  const taxValue = parseFloat(taxInput.replace(/,/g, "")) || 0;
  const deduction = taxValue * 0.5;
  const taxSaved = deduction * (taxSlab / 100);
  const netCost = taxValue - taxSaved;

  // Tax calc
  const [taxFreq, setTaxFreq] = useState<"once" | "monthly">("once");
  const [donAmount2, setDonAmount2] = useState(10000);
  const [taxSlab2, setTaxSlab2] = useState(30);
  const annualBase2 = taxFreq === "monthly" ? donAmount2 * 12 : donAmount2;
  const deduction2 = annualBase2 * 0.5;
  const taxSaved2 = deduction2 * (taxSlab2 / 100);
  const netCost2 = annualBase2 - taxSaved2;
  const chartData = [
    { name: "Net Cost", value: Math.max(1, netCost2), color: "#D9E6EA" },
    { name: "Tax Saved", value: Math.max(0, taxSaved2), color: "#1D4E5F" },
  ];

  const fmtINR = (n: number) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L` :
      n >= 1000 ? `₹${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` :
        `₹${n}`;

  const sliderStyle = (v: number, min: number, max: number) => ({
    background: `linear-gradient(to right, #1D4E5F ${((v - min) / (max - min)) * 100}%, #EDE9E3 ${((v - min) / (max - min)) * 100}%)`,
  });

  return (
    <div>
      {/* ═══ TAX CALCULATOR (image-1 style) ══════════════════════════════════════ */}
      <section id="tax" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase bg-secondary text-primary px-4 py-1.5 rounded-full mb-4">80G Tax Benefit</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground font-normal mb-4">Calculate Your Tax Savings</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">Donations to Visrambha Foundation qualify for a 50% deduction under Section 80G of the Income Tax Act.</p>
          </div>

          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            {/* Freq toggle */}
            {/* <div className="p-6 pb-0">
              <div className="inline-flex bg-muted rounded-xl p-1 gap-1">
                {(["once", "monthly"] as const).map((f) => (
                  <button key={f} onClick={() => setTaxFreq(f)}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${taxFreq === f ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                    {f === "once" ? "One-time" : "Monthly"}
                  </button>
                ))}
              </div>
            </div> */}

            <div className="grid lg:grid-cols-5 gap-0">
              <style>{`
        .rng{-webkit-appearance:none;appearance:none;outline:none;height:6px;border-radius:3px;cursor:pointer;}
        .rng::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:22px;height:22px;border-radius:50%;background:#1D4E5F;border:3px solid white;box-shadow:0 2px 8px rgba(29,78,95,.35);cursor:pointer;}
        .rng::-moz-range-thumb{width:22px;height:22px;border-radius:50%;background:#1D4E5F;border:3px solid white;cursor:pointer;}
      `}</style>
              {/* Left – sliders */}
              <div className="lg:col-span-3 p-6 flex flex-col gap-7">
                {/* Donation Amount slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">
                      {taxFreq === "monthly" ? "Monthly Donation" : "Donation Amount"}
                    </span>
                    <span className="bg-secondary text-primary font-bold text-sm px-3 py-1 rounded-lg">
                      {fmtINR(donAmount2)}
                    </span>
                  </div>
                  <input type="range" min={500} max={500000} step={500} value={donAmount2}
                    onChange={(e) => setDonAmount2(Number(e.target.value))}
                    className="rng w-full" style={sliderStyle(donAmount2, 500, 500000)} />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                    <span>₹500</span><span>₹5L</span>
                  </div>
                </div>

                {/* 80G Deduction — static info bar */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">80G Deduction Rate</span>
                    <span className="bg-secondary text-primary font-bold text-sm px-3 py-1 rounded-lg">50%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full relative">
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-primary rounded-full" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">Fixed — 50% of your annual donation qualifies as deduction</p>
                </div>

                {/* Tax Slab */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Your Tax Slab</span>
                    <span className="bg-secondary text-primary font-bold text-sm px-3 py-1 rounded-lg">{taxSlab2}%</span>
                  </div>
                  <div className="flex gap-2">
                    {SLABS.map((s) => (
                      <button key={s.rate} onClick={() => setTaxSlab2(s.rate)}
                        className={`flex-1 flex flex-col items-center py-2.5 rounded-xl border text-xs font-semibold transition-all ${taxSlab2 === s.rate ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"}`}>
                        {s.label}
                        <span className={`text-[10px] font-normal mt-0.5 ${taxSlab2 === s.rate ? "text-white/70" : "text-muted-foreground"}`}>{s.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary */}

                <div className="border-t border-border pt-5 flex flex-col gap-2.5">
                  {[
                    { label: taxFreq === "monthly" ? "Annual Donation" : "Donation Amount", value: `₹${annualBase2.toLocaleString("en-IN")}`, dim: false },
                    { label: "80G Deduction (50%)", value: `₹${deduction2.toLocaleString("en-IN")}`, dim: false },
                    { label: `Tax Saved (${taxSlab2}%)`, value: `₹${taxSaved2.toLocaleString("en-IN")}`, dim: false },
                    { label: taxFreq === "monthly" ? "Net Annual Cost" : "Net Cost to You", value: `₹${netCost2.toLocaleString("en-IN")}`, dim: true },
                  ].map((row) => (
                    <div key={row.label} className={`flex items-center justify-between ${row.dim ? "pt-2 border-t border-border" : ""}`}>
                      <span className={`text-sm ${row.dim ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{row.label}</span>
                      <span className={`font-bold ${row.dim ? "text-lg text-primary" : "text-foreground"}`}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <a href="#donate"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3.5 rounded-2xl hover:bg-primary/90 transition-colors text-sm">
                  <Heart className="w-4 h-4" /> Donate &amp; Save Tax Now
                </a>
                {/* <p className="text-[11px] text-muted-foreground -mt-4 text-center">* Applicable under the Old Tax Regime only.</p> */}
              </div>

              {/* Right – donut chart */}
              <div className="lg:col-span-2 bg-muted/40 border-l border-border p-6 flex flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#D9E6EA] inline-block" /> Net Cost</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-primary inline-block" /> Tax Saved</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={chartData} cx="50%" cy="50%" innerRadius={58} outerRadius={95} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                      {chartData.map((d, i) => <Cell key={i} fill={d.color} strokeWidth={0} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, ""]}
                      contentStyle={{ background: "#fff", border: "1px solid #EDE9E3", borderRadius: "10px", fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
                {taxSaved2 > 0 && (
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">You save</p>
                    <p className="text-2xl font-bold text-primary">₹{taxSaved2.toLocaleString("en-IN")}</p>
                    <p className="text-xs text-muted-foreground">in taxes annually</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>


  )
}


// ─── CONTACT ─────────────────────────────────────────────────────────────────

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTag number="04" label="Contact Us" />
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info side */}
          <div>
            <h2
              className="text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              We Would Love to Hear From You
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-12">
              Whether you'd like to donate, volunteer, partner, or simply learn more — our team is here to connect and answer every question.
            </p>

            <div className="space-y-7 mb-12">
              {[
                { Icon: MapPin, label: "Office", val: "No. 23, 3rd Floor, 14 'A’ Main Road, E-Block, Sahakar Nagar, Bengaluru - 560092" },
                { Icon: Phone, label: "Phone", val: "+91  8951621158 | 7676861953" },
                { Icon: Mail, label: "Email", val: "visrambhafoundation@gmail.com" },
                { Icon: Globe, label: "Website", val: "www.visrambha.org" },
              ].map(({ Icon, label, val }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-1">
                      {label}
                    </div>
                    <div className="text-foreground font-medium text-sm">{val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            {/* Google Map */}
            {/* Google Map */}
            <div
              className="w-full aspect-[16/9] rounded-2xl bg-muted overflow-hidden border border-border mb-8 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://maps.app.goo.gl/JMfLMv7fSu8ZyC4dA?g_st=aw",
                  "_blank"
                )
              }
            >
              <iframe
                src="https://www.google.com/maps?q=Visrambha+Foundation,+Pune,+Maharashtra&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: "none" }}
                loading="lazy"
                title="Visrambha Foundation Location"
              ></iframe>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-white text-muted-foreground flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h3
                  className="text-2xl font-bold text-foreground mb-3"
                  style={{ fontFamily: "var(--font-family-display)" }}
                >
                  Thank You!
                </h3>
                <p className="text-muted-foreground max-w-xs">
                  We have received your message and will be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-primary font-semibold hover:text-accent transition-colors text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3
                  className="text-xl font-bold text-foreground mb-6"
                  style={{ fontFamily: "var(--font-family-display)" }}
                >
                  Send Us a Message
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl bg-input-background border border-border text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-input-background border border-border text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 rounded-xl bg-input-background border border-border text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-input-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none"
                    >
                      <option value="">Select topic</option>
                      <option>Donation Enquiry</option>
                      <option>Volunteering</option>
                      <option>CSR Partnership</option>
                      <option>Media & Press</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us how you'd like to get involved, or ask us anything..."
                    className="w-full px-4 py-3 rounded-xl bg-input-background border border-border text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-full font-semibold text-base hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-sm"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer style={{ backgroundColor: "#091f22" }} className="text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <ImageWithFallback
                src={logoImg}
                alt="Visrambha Foundation"
                className="w-14 h-14 object-contain"
              />
              <div>
                <div
                  className="font-bold text-xl text-white leading-none"
                  style={{ fontFamily: "var(--font-family-display)" }}
                >
                  VISRAMBHA
                </div>
                <div className="text-white/45 text-[10px] tracking-widest uppercase mt-1">
                  Foundation
                </div>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-7 max-w-xs">
              Empowering children through education, one village at a time. Together, we are building a brighter India for every generation.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/8 hover:bg-accent flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="font-bold text-sm mb-6 text-white uppercase tracking-widest"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-white/55">
              {[
                "About Us", "Our Programs",
                "Events",
                "Contact Us",
              ].map(l => (
                <li key={l}>
                  <a href="#" className="hover:text-accent transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Legal */}
          <div>
            <h4
              className="font-bold text-sm mb-4 text-white uppercase tracking-widest"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Newsletter
            </h4>
            <p className="text-white/55 text-xs mb-4 leading-relaxed">
              Quarterly impact stories, upcoming events, and field updates delivered to your inbox.
            </p>
            <h4
              className="font-bold text-sm mb-3 text-white uppercase tracking-widest"
              style={{ fontFamily: "var(--font-family-display)" }}
            >
              Legal
            </h4>
            <div className="space-y-2.5 text-xs text-white/50">
              {["Privacy Policy", "Terms & Conditions", "Donation Policy", "Grievance Redressal"].map(l => (
                <a key={l} href="#" className="block hover:text-accent transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/35">
          <p>© 2026 Visrambha Foundation. All rights reserved. Registration No. MH-2018-04789</p>
          <p>Crafted with purpose for every child in India</p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {

  return (
    <div className="min-h-screen font-sans" style={{ fontFamily: "var(--font-family-sans)" }}>
      <Navbar />
      <main>
        <HeroSection />
        <GetInvolvedSection />
        <AboutSection />
        {/* <TaxCalculator /> */}
        <ProgramsSection />
        {/* <ImpactSection /> */}
        {/* <TestimonialsSection /> */}
        {/* <GallerySection /> */}
        <EventsSection />
        {/* <TransparencySection /> */}
        <ContactSection />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
