import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  initialTrainers, 
  initialLocations, 
  initialTestimonials, 
  initialClassSchedules, 
  initialAnnouncements 
} from "../../lib/fitness-data";
import { Flame, Star, Trophy, ArrowRight, Check, Play, AppWindow, Shield } from "lucide-react";

// Informational Hero slides
const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80",
    tag: "THE PREMIER FITNESS EXPERIENCE",
    titleLine1: "WHERE",
    titleLine2: "LEGENDS",
    titleLine3: "ARE BUILT",
    description: "Join 50,000+ members who chose to be exceptional. No shortcuts. No gimmicks. Only pure high-performance results.",
    stats: [
      { value: "50,000+", label: "GLOBAL ATHLETES" },
      { value: "85+", label: "WEEKLY CLASSES" },
      { value: "12", label: "ELITE SUITE LOCATIONS" }
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1920&q=80",
    tag: "WORLD-CLASS COACHES & CHAMPIONS",
    titleLine1: "OLYMPIAN",
    titleLine2: "ELITE",
    titleLine3: "TRAINING",
    description: "Train 1-on-1 with world-record powerlifters, ex-military tactical trainers, and certified human performance coaches.",
    stats: [
      { value: "1-ON-1", label: "ELITE COACHING" },
      { value: "100%", label: "PRO ATHLETES" },
      { value: "24/7", label: "CONCIERGE ACCESS" }
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a25f1?w=1920&q=80",
    tag: "METABOLIC & RECOVERY SYSTEMS",
    titleLine1: "CELLULAR",
    titleLine2: "REBUILD",
    titleLine3: "SUITES",
    description: "Accelerate deep tissue recovery with clinical infrared heat pods, dual-temp ice cold plunges, and custom metabolics.",
    stats: [
      { value: "39°F", label: "ICE COLD PLUNGES" },
      { value: "100°F", label: "INFRARED PODS" },
      { value: "80%", label: "DIET OPTIMIZATION" }
    ]
  }
];

interface HomeViewProps {
  onNavigate: (view: string) => void;
  onOpenTrialModal: () => void;
  onOpenMembershipModal: (planName?: string) => void;
}

export default function HomeView({ onNavigate, onOpenTrialModal, onOpenMembershipModal }: HomeViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto sliding every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Counters states (simulated starting or static high numbers since standard animation runs on scroll)
  const [trialEmail, setTrialEmail] = useState("");
  const [trialSuccess, setTrialSuccess] = useState(false);
  const [trialLoading, setTrialLoading] = useState(false);

  const activeAnnouncements = initialAnnouncements.filter(a => a.active);

  const handleTrialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trialEmail) return;
    setTrialLoading(true);

    try {
      const response = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Anonymous Web Trialist",
          email: trialEmail,
          phone: "Not provided",
          location: "Default Club Location",
          preferredClass: "Epsilon Dark",
          goal: "High performance transformation"
        })
      });

      if (response.ok) {
        setTrialSuccess(true);
        setTrialEmail("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTrialLoading(false);
    }
  };

  return (
    <div className="bg-[#0A1128] text-white overflow-hidden relative">
      <div className="film-grain"></div>

      {/* HERO SECTION SLIDER */}
      <section className="relative h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center overflow-hidden bg-[#0A1128]">
        {/* Sliding background slide images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `linear-gradient(rgba(10,17,40,0.85), rgba(10,17,40,0.88)), url('${heroSlides[currentSlide].image}')` 
            }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-dark/95 pointer-events-none"></div>
        
        {/* Slide Content */}
        <div className="z-10 max-w-5xl mx-auto flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <span className="text-[#FF5500] font-barlow font-bold tracking-[0.4em] text-sm sm:text-base md:text-lg uppercase mb-6 drop-shadow-md">
                {heroSlides[currentSlide].tag}
              </span>
              
              <h1 className="font-bebas leading-[0.8] text-[4rem] sm:text-[6.5rem] md:text-[8.5rem] lg:text-[10rem] xl:text-[11rem] uppercase flex flex-col select-none tracking-tight">
                <span className="text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
                  {heroSlides[currentSlide].titleLine1}
                </span>
                <span className="text-stroke-orange font-extrabold tracking-widest my-2 filter drop-shadow-[0_0_25px_rgba(255,85,0,0.4)]">
                  {heroSlides[currentSlide].titleLine2}
                </span>
                <span className="text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
                  {heroSlides[currentSlide].titleLine3}
                </span>
              </h1>

              <p className="text-gray-300 mt-8 max-w-xl text-base sm:text-lg md:text-xl font-normal leading-relaxed min-h-[4rem] sm:min-h-0 drop-shadow-md">
                {heroSlides[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full justify-center px-4 max-w-md sm:max-w-none">
            <button 
              onClick={onOpenTrialModal}
              className="bg-[#FF5500] hover:bg-[#D44700] text-white font-bebas text-2xl tracking-wider px-10 py-4 transition-all duration-300 transform hover:scale-105 active:scale-95 glow-orange border-bevel cursor-pointer"
            >
              START FREE TRIAL
            </button>
            <button 
              onClick={() => onNavigate("membership")}
              className="border border-[#FFD60A] text-[#FFD60A] hover:bg-[#FFD60A] hover:text-black font-bebas text-2xl tracking-wider px-10 py-4 transition-all duration-300 transform hover:scale-105 active:scale-95 glow-gold border-bevel cursor-pointer"
            >
              EXPLORE MEMBERSHIP
            </button>
          </div>
        </div>

        {/* Dots indicators */}
        <div className="absolute bottom-32 sm:bottom-36 left-0 right-0 z-20 flex justify-center gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx 
                  ? "bg-[#FF5500] w-9 shadow-[0_0_12px_#FF5500]" 
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Dynamic bottom hero stats */}
        <div className="absolute bottom-10 left-0 right-0 z-10 hidden md:block">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-3 gap-8 py-4 border-t border-white/10 glass-panel border-bevel">
              {heroSlides[currentSlide].stats.map((stat, i) => (
                <div key={i} className={`text-center transition-all duration-500 ${i === 1 ? "border-x border-white/10" : ""}`}>
                  <p className="font-bebas text-4xl text-white transition-all duration-500">{stat.value}</p>
                  <p className="font-barlow text-xs tracking-widest text-[#FFD60A] uppercase mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-[9px] font-barlow tracking-[0.2em] text-gray-500 uppercase">Scroll</span>
          <div className="w-1.5 h-1.5 bg-[#FF5500] rounded-full mt-1"></div>
        </div>
      </section>

      {/* a) ANNOUNCEMENT TICKER */}
      <div className="h-14 bg-[#FF5500] flex items-center overflow-hidden z-20 border-y border-black/20 select-none">
        <div className="ticker-animation flex whitespace-nowrap items-center text-white font-barlow font-bold uppercase tracking-widest text-sm sm:text-base">
          {activeAnnouncements.map((ann, i) => (
            <span key={ann.id} className="flex items-center">
              <span className="mx-8">{ann.text}</span>
              <span className="text-[#FFD60A]">★</span>
            </span>
          ))}
          {activeAnnouncements.map((ann, i) => (
            <span key={`${ann.id}-dup`} className="flex items-center">
              <span className="mx-8">{ann.text}</span>
              <span className="text-[#FFD60A]">★</span>
            </span>
          ))}
        </div>
      </div>

      {/* b) INTRO STATEMENT SECTION */}
      <section className="bg-[#0A1128] py-24 px-4 sm:px-6 lg:px-8 border-l-8 border-[#FF5500] relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] text-white flex flex-col gap-2">
            <span>THIS IS NOT A GYM.</span>
            <span className="text-stroke-white opacity-80">THIS IS WHERE YOUR EXCUSES GO TO DIE.</span>
          </h2>
          <div className="mt-10 max-w-3xl text-gray-400 font-sans text-lg sm:text-xl space-y-6 leading-relaxed">
            <p>
              Epsilon Fitness represents the highest evolution of high-performance preparation. We do not deal in temporary solutions or soft workouts. We build durable, functional strength inside a dark, highly optimized sonic theater.
            </p>
            <p>
              Every barbell, every coach, and every protocol is designed for premium performance. If you are ready to settle for average, there are plenty of cheap alternatives. If you want to build a legend, welcome home.
            </p>
          </div>
        </div>
      </section>

      {/* c) CLASSES SECTION: THE EPSILON EXPERIENCE */}
      <section className="bg-[#0A1128] py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[#FF5500] font-barlow font-bold tracking-widest text-sm uppercase">SIGNATURE HIGH-VOLUME WORKOUTS</span>
              <h2 className="font-bebas text-6xl sm:text-7xl text-white mt-2">THE EPSILON EXPERIENCE</h2>
            </div>
            <button 
              onClick={() => onNavigate("classes")} 
              className="mt-4 md:mt-0 text-[#FFD60A] hover:text-white font-barlow font-bold tracking-widest text-sm uppercase flex items-center gap-2 group cursor-pointer"
            >
              VIEW FULL SCHEDULE <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          {/* Cinematic Mosaic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Class 1 */}
            <div className="relative group overflow-hidden h-[380px] border border-white/5 bg-[#121A36] border-bevel">
              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-[#FF5500]/90 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col h-full justify-end">
                <span className="text-[#FFD60A] font-barlow text-xs tracking-widest uppercase font-bold">Class 01 / Signature</span>
                <h3 className="font-bebas text-3xl text-white mt-1">EPSILON DARK</h3>
                <p className="text-gray-300 text-xs mt-2 line-clamp-3 group-hover:text-white transition-colors">
                  The signature class. 60 minutes. No mercy. Full body destruction in the dark.
                </p>
                <button 
                  onClick={() => onNavigate("classes")}
                  className="mt-4 bg-[#0A1128] text-white hover:bg-[#FF5500] hover:text-white font-barlow text-xs font-bold py-2 px-4 uppercase tracking-wider self-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  BOOK CLASS
                </button>
              </div>
            </div>

            {/* Class 2 */}
            <div className="relative group overflow-hidden h-[380px] border border-white/5 bg-[#121A36] border-bevel">
              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581009137042-c552e485697a?w=600')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-[#FF5500]/90 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col h-full justify-end">
                <span className="text-[#FFD60A] font-barlow text-xs tracking-widest uppercase font-bold">Class 02 / Strength</span>
                <h3 className="font-bebas text-3xl text-white mt-1">POWER LIFT</h3>
                <p className="text-gray-300 text-xs mt-2 line-clamp-3 group-hover:text-white transition-colors">
                  Olympic weightlifting meets HIIT. For those who worship the iron.
                </p>
                <button 
                  onClick={() => onNavigate("classes")}
                  className="mt-4 bg-[#0A1128] text-white hover:bg-[#FF5500] hover:text-white font-barlow text-xs font-bold py-2 px-4 uppercase tracking-wider self-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  BOOK CLASS
                </button>
              </div>
            </div>

            {/* Class 3 */}
            <div className="relative group overflow-hidden h-[380px] border border-white/5 bg-[#121A36] border-bevel">
              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1538805060514-97d9cc172052?w=600')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-[#FF5500]/90 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col h-full justify-end">
                <span className="text-[#FFD60A] font-barlow text-xs tracking-widest uppercase font-bold">Class 03 / Cardio</span>
                <h3 className="font-bebas text-3xl text-white mt-1">CARDIO INFERNO</h3>
                <p className="text-gray-300 text-xs mt-2 line-clamp-3 group-hover:text-white transition-colors">
                  45 minutes of treadmill-based intervals that will redefine your limits.
                </p>
                <button 
                  onClick={() => onNavigate("classes")}
                  className="mt-4 bg-[#0A1128] text-white hover:bg-[#FF5500] hover:text-white font-barlow text-xs font-bold py-2 px-4 uppercase tracking-wider self-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  BOOK CLASS
                </button>
              </div>
            </div>

            {/* Class 4 */}
            <div className="relative group overflow-hidden h-[380px] border border-white/5 bg-[#121A36] border-bevel">
              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-[#FF5500]/90 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col h-full justify-end">
                <span className="text-[#FFD60A] font-barlow text-xs tracking-widest uppercase font-bold">Class 04 / Restoration</span>
                <h3 className="font-bebas text-3xl text-white mt-1">YOGA FLOW</h3>
                <p className="text-gray-300 text-xs mt-2 line-clamp-3 group-hover:text-white transition-colors">
                  Even warriors need recovery. Premium hot yoga for deep restoration.
                </p>
                <button 
                  onClick={() => onNavigate("classes")}
                  className="mt-4 bg-[#0A1128] text-white hover:bg-[#FF5500] hover:text-white font-barlow text-xs font-bold py-2 px-4 uppercase tracking-wider self-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  BOOK CLASS
                </button>
              </div>
            </div>

            {/* Class 5 */}
            <div className="relative group overflow-hidden h-[380px] border border-white/5 bg-[#121A36] border-bevel">
              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-[#FF5500]/90 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col h-full justify-end">
                <span className="text-[#FFD60A] font-barlow text-xs tracking-widest uppercase font-bold">Class 05 / Combat</span>
                <h3 className="font-bebas text-3xl text-white mt-1">BOXING FURY</h3>
                <p className="text-gray-300 text-xs mt-2 line-clamp-3 group-hover:text-white transition-colors">
                  Gloves on. Ego off. Championship boxing conditioning.
                </p>
                <button 
                  onClick={() => onNavigate("classes")}
                  className="mt-4 bg-[#0A1128] text-white hover:bg-[#FF5500] hover:text-white font-barlow text-xs font-bold py-2 px-4 uppercase tracking-wider self-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  BOOK CLASS
                </button>
              </div>
            </div>

            {/* Class 6 */}
            <div className="relative group overflow-hidden h-[380px] border border-white/5 bg-[#121A36] border-bevel">
              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-[#FF5500]/90 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col h-full justify-end">
                <span className="text-[#FFD60A] font-barlow text-xs tracking-widest uppercase font-bold">Class 06 / Cycling</span>
                <h3 className="font-bebas text-3xl text-white mt-1">CYCLE SURGE</h3>
                <p className="text-gray-300 text-xs mt-2 line-clamp-3 group-hover:text-white transition-colors">
                  Dark room. Loud music. 45 minutes of pure cycling euphoria.
                </p>
                <button 
                  onClick={() => onNavigate("classes")}
                  className="mt-4 bg-[#0A1128] text-white hover:bg-[#FF5500] hover:text-white font-barlow text-xs font-bold py-2 px-4 uppercase tracking-wider self-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  BOOK CLASS
                </button>
              </div>
            </div>

            {/* Class 7 */}
            <div className="relative group overflow-hidden h-[380px] border border-white/5 bg-[#121A36] border-bevel">
              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-[#FF5500]/90 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col h-full justify-end">
                <span className="text-[#FFD60A] font-barlow text-xs tracking-widest uppercase font-bold">Class 07 / Functional</span>
                <h3 className="font-bebas text-3xl text-white mt-1">FUNCTIONAL FIRE</h3>
                <p className="text-gray-300 text-xs mt-2 line-clamp-3 group-hover:text-white transition-colors">
                  Kettlebells, battle ropes, sleds. Functional fitness at its most brutal.
                </p>
                <button 
                  onClick={() => onNavigate("classes")}
                  className="mt-4 bg-[#0A1128] text-white hover:bg-[#FF5500] hover:text-white font-barlow text-xs font-bold py-2 px-4 uppercase tracking-wider self-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  BOOK CLASS
                </button>
              </div>
            </div>

            {/* Class 8 */}
            <div className="relative group overflow-hidden h-[380px] border border-white/5 bg-[#121A36] border-bevel">
              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-[#FF5500]/90 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col h-full justify-end">
                <span className="text-[#FFD60A] font-barlow text-xs tracking-widest uppercase font-bold">Class 08 / Recovery</span>
                <h3 className="font-bebas text-3xl text-white mt-1">STRETCH AND RECOVER</h3>
                <p className="text-gray-300 text-xs mt-2 line-clamp-3 group-hover:text-white transition-colors">
                  Compression. Foam rolling. Ice baths. Your body deserves this.
                </p>
                <button 
                  onClick={() => onNavigate("classes")}
                  className="mt-4 bg-[#0A1128] text-white hover:bg-[#FF5500] hover:text-white font-barlow text-xs font-bold py-2 px-4 uppercase tracking-wider self-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                >
                  BOOK CLASS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* d) STATS COUNTER SECTION */}
      <section className="bg-black py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 border border-white/5 bg-[#121A36]/40 border-bevel">
              <p className="font-bebas text-5xl sm:text-7xl text-[#FFD60A] tracking-wider">50,000+</p>
              <div className="w-10 h-[2px] bg-[#FF5500] mx-auto my-3"></div>
              <p className="font-barlow text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400">Members Worldwide</p>
            </div>
            <div className="text-center p-6 border border-white/5 bg-[#121A36]/40 border-bevel">
              <p className="font-bebas text-5xl sm:text-7xl text-white tracking-wider">85+</p>
              <div className="w-10 h-[2px] bg-[#FF5500] mx-auto my-3"></div>
              <p className="font-barlow text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400">Weekly Classes</p>
            </div>
            <div className="text-center p-6 border border-white/5 bg-[#121A36]/40 border-bevel">
              <p className="font-bebas text-5xl sm:text-7xl text-[#FFD60A] tracking-wider">12</p>
              <div className="w-10 h-[2px] bg-[#FF5500] mx-auto my-3"></div>
              <p className="font-barlow text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400">Premium Locations</p>
            </div>
            <div className="text-center p-6 border border-white/5 bg-[#121A36]/40 border-bevel">
              <p className="font-bebas text-5xl sm:text-7xl text-white tracking-wider">94%</p>
              <div className="w-10 h-[2px] bg-[#FF5500] mx-auto my-3"></div>
              <p className="font-barlow text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400">Member Retention</p>
            </div>
          </div>
        </div>
      </section>

      {/* e) MEMBERSHIP PREVIEW SECTION */}
      <section className="bg-[#0A1128] py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#FF5500] font-barlow font-bold tracking-widest text-sm uppercase">CHOOSE YOUR LEVEL</span>
            <h2 className="font-bebas text-6xl sm:text-7xl text-white mt-2">INVEST IN YOUR PERFORMANCE</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              Select the tier that aligns with your lifestyle. No contract required, cancel with 30 days notice.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Core Plan */}
            <div className="bg-[#121A36] border border-white/10 p-8 flex flex-col justify-between relative border-bevel hover:border-white/30 transition-all duration-300">
              <div>
                <span className="font-barlow text-xs tracking-widest text-gray-400 uppercase font-bold">Level 01</span>
                <h3 className="font-bebas text-4xl text-white mt-1">EPSILON CORE</h3>
                <p className="text-gray-400 text-xs mt-2">Perfect for single-location high frequency lifters.</p>
                <div className="my-6 flex items-baseline gap-1">
                  <span className="font-bebas text-6xl text-[#FFD60A]">$49</span>
                  <span className="text-gray-400 font-barlow tracking-wider uppercase text-sm">/ month</span>
                </div>
                <div className="h-[1px] bg-white/10 my-6"></div>
                <ul className="space-y-4 text-sm text-gray-300">
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-[#FF5500]" />
                    <span>Unlimited selected club access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-[#FF5500]" />
                    <span>2 high performance group classes/week</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-[#FF5500]" />
                    <span>Premium locker room access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-[#FF5500]" />
                    <span>Basic digital companion app</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onOpenMembershipModal("Epsilon Core")}
                className="mt-8 w-full border border-gray-600 hover:border-white text-white font-bebas text-xl py-3 tracking-wider transition-colors cursor-pointer"
              >
                JOIN NOW
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-[#121A36] border-2 border-[#FF5500] p-8 flex flex-col justify-between relative border-bevel scale-100 lg:scale-105 z-10 shadow-[0_0_30px_rgba(255,85,0,0.15)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF5500] text-white font-barlow text-xs font-bold uppercase tracking-[0.2em] px-4 py-1 rounded-sm">
                MOST POPULAR
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-barlow text-xs tracking-widest text-[#FF5500] uppercase font-bold">Level 02</span>
                    <h3 className="font-bebas text-4xl text-white mt-1">EPSILON PRO</h3>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mt-2">Complete access to group training formats and amenities.</p>
                <div className="my-6 flex items-baseline gap-1">
                  <span className="font-bebas text-6xl text-[#FF5500]">$99</span>
                  <span className="text-gray-400 font-barlow tracking-wider uppercase text-sm">/ month</span>
                </div>
                <div className="h-[1px] bg-white/10 my-6"></div>
                <ul className="space-y-4 text-sm text-gray-200 font-medium">
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-[#FF5500]" />
                    <span>All 12 national club locations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-[#FF5500]" />
                    <span>Unlimited group classes worldwide</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-[#FF5500]" />
                    <span>2 guest passes per month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-[#FF5500]" />
                    <span>Full app + custom biometric tracking</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-[#FF5500]" />
                    <span>Nutrition guidance & custom macros</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-[#FF5500]" />
                    <span>Full recovery & cryotherapy suite access</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onOpenMembershipModal("Epsilon Pro")}
                className="mt-8 w-full bg-[#FF5500] hover:bg-[#D44700] text-white font-bebas text-xl py-3 tracking-wider transition-colors glow-orange cursor-pointer"
              >
                JOIN NOW
              </button>
            </div>

            {/* Elite Plan */}
            <div className="bg-[#121A36] border border-[#FFD60A] p-8 flex flex-col justify-between relative border-bevel hover:border-[#FFD60A]/80 transition-all duration-300">
              <div>
                <span className="font-barlow text-xs tracking-widest text-[#FFD60A] uppercase font-bold">Level 03</span>
                <h3 className="font-bebas text-4xl text-white mt-1">EPSILON ELITE</h3>
                <p className="text-gray-400 text-xs mt-2">The absolute pinnacle. Dedicated coaching and luxury.</p>
                <div className="my-6 flex items-baseline gap-1">
                  <span className="font-bebas text-6xl text-[#FFD60A]">$199</span>
                  <span className="text-gray-400 font-barlow tracking-wider uppercase text-sm">/ month</span>
                </div>
                <div className="h-[1px] bg-white/10 my-6"></div>
                <ul className="space-y-4 text-sm text-gray-300">
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-[#FFD60A]" />
                    <span>Everything in Epsilon Pro plan</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-[#FFD60A]" />
                    <span>4 master personal training sessions/month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-[#FFD60A]" />
                    <span>VIP personalized keycard locker suite</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-[#FFD60A]" />
                    <span>Priority booking on all group classes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-[#FFD60A]" />
                    <span>1 complimentary guest always present</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-[#FFD60A]" />
                    <span>Exclusive invitation-only elite events</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onOpenMembershipModal("Epsilon Elite")}
                className="mt-8 w-full bg-gradient-to-r from-[#FFD60A] to-yellow-500 hover:brightness-110 text-black font-bebas text-xl py-3 tracking-wider transition-all glow-gold border-bevel cursor-pointer"
              >
                JOIN NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* f) TRAINER SPOTLIGHT */}
      <section className="bg-[#0A1128] py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[#FF5500] font-barlow font-bold tracking-widest text-sm uppercase">THE MASTER COACHES</span>
              <h2 className="font-bebas text-6xl sm:text-7xl text-white mt-2">OUR COACHES ARE WORLD CLASS</h2>
              <p className="text-gray-400 mt-2 max-w-xl">
                We do not employ casual enthusiasts. Our trainers are former professional athletes, elite military coaches, and biomechanics experts.
              </p>
            </div>
            <button 
              onClick={() => onNavigate("trainers")}
              className="mt-4 md:mt-0 text-[#FFD60A] hover:text-white font-barlow font-bold tracking-widest text-sm uppercase flex items-center gap-2 group cursor-pointer"
            >
              MEET THE TEAM <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {initialTrainers.slice(0, 4).map((trainer) => (
              <div key={trainer.id} className="bg-[#121A36] border border-white/5 relative group overflow-hidden border-bevel">
                <div className="h-[320px] overflow-hidden relative">
                  <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-[#FF5500] text-white font-barlow text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                    {trainer.specialty.split(" & ")[0]}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-[#FFD60A] font-barlow text-[10px] font-bold uppercase tracking-widest">{trainer.role}</span>
                  <h3 className="font-bebas text-3xl text-white mt-1">{trainer.name}</h3>
                  <p className="text-gray-400 text-xs mt-3 line-clamp-3 leading-relaxed">{trainer.bio}</p>
                  <p className="text-[#FF5500] font-barlow text-sm italic mt-4 font-bold">"{trainer.quote.replace(/'/g, "")}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* g) TRANSFORMATION GALLERY */}
      <section className="bg-black py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#FF5500] font-barlow font-bold tracking-widest text-sm uppercase">PROVEN RECONSTRUCTION</span>
            <h2 className="font-bebas text-6xl sm:text-7xl text-white mt-2">REAL RESULTS. REAL PEOPLE.</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              Our community logs consistent progress. These are certified testimonials of true athletic transformations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialTestimonials.slice(0, 6).map((test) => (
              <div key={test.id} className="bg-[#121A36] border border-white/5 p-8 relative border-bevel">
                <div className="flex text-[#FFD60A] gap-1 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="font-bebas text-3xl text-[#FF5500] tracking-wide mb-2">{test.stat}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-medium">
                  "{test.quote}"
                </p>
                <div className="flex items-center justify-between text-xs font-barlow tracking-wider uppercase text-gray-500 font-bold border-t border-white/5 pt-4">
                  <span className="text-white">{test.name}</span>
                  <span className="text-[#FFD60A]">{test.location} Suite</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* h) APP PREVIEW SECTION */}
      <section className="bg-[#0A1128] py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[300px] h-[600px] bg-[#111111] border-4 border-gray-800 rounded-[40px] shadow-[0_0_40px_rgba(255,85,0,0.15)] overflow-hidden flex flex-col">
              {/* Speaker & Camera notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20 flex items-center justify-center gap-1.5">
                <div className="w-12 h-1 bg-gray-800 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-gray-900 rounded-full"></div>
              </div>

              {/* Internal Screen Content */}
              <div className="flex-1 flex flex-col justify-between p-6 pt-10 select-none text-left">
                {/* App Header */}
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div>
                    <span className="text-[9px] text-[#FF5500] font-bold tracking-widest font-barlow">ACTIVE STATUS</span>
                    <p className="font-bebas text-xl text-white">EPSILON PRO</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse"></div>
                </div>

                {/* Performance Chart Simulation */}
                <div className="bg-[#121A36] p-4 border border-white/5 rounded-xl my-4">
                  <p className="text-[10px] text-gray-400 font-barlow tracking-wider">WEEKLY REPS LOGGED</p>
                  <p className="text-2xl font-bebas text-[#FFD60A] mt-1">1,840 REPS</p>
                  <div className="h-16 flex items-end gap-1.5 mt-3">
                    <div className="flex-1 bg-gray-800 h-6 rounded-sm"></div>
                    <div className="flex-1 bg-gray-800 h-10 rounded-sm"></div>
                    <div className="flex-1 bg-[#FF5500] h-14 rounded-sm shadow-[0_0_8px_rgba(255,85,0,0.5)]"></div>
                    <div className="flex-1 bg-gray-800 h-8 rounded-sm"></div>
                    <div className="flex-1 bg-[#FFD60A] h-12 rounded-sm shadow-[0_0_8px_rgba(255,214,10,0.5)]"></div>
                    <div className="flex-1 bg-gray-800 h-5 rounded-sm"></div>
                    <div className="flex-1 bg-[#FF5500] h-16 rounded-sm shadow-[0_0_8px_rgba(255,85,0,0.5)]"></div>
                  </div>
                </div>

                {/* AI recommendation block */}
                <div className="bg-[#121A36] p-3 border-l-2 border-[#FF5500] rounded-r-lg">
                  <p className="text-[9px] text-[#FF5500] font-bold tracking-widest uppercase">AI COACHING SUGGESTION</p>
                  <p className="text-[11px] text-gray-300 mt-1">Increase clean volume by 5% next Monday. Target recovery indices score is 89.</p>
                </div>

                {/* App footer button */}
                <div className="mt-auto pt-4">
                  <button className="w-full bg-[#FF5500] text-white font-bebas py-2.5 rounded-lg text-sm tracking-widest uppercase">
                    BOOK NEXT SESSION
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Features */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-[#FF5500] font-barlow font-bold tracking-widest text-sm uppercase">HIGH-TECH BIOMETRIC INTEGRATION</span>
              <h2 className="font-bebas text-6xl sm:text-7xl text-white mt-2">THE EPSILON PRO APP</h2>
              <p className="text-gray-400 mt-4 text-lg">
                Your performance does not end when you leave the club. Epsilon Pro coordinates with your wearable and health metrics to map out real-time recovery profiles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="text-[#FF5500] shrink-0 mt-1"><Trophy size={20} /></div>
                <div>
                  <h4 className="font-bebas text-xl text-white tracking-wide">Track every workout</h4>
                  <p className="text-gray-400 text-xs mt-1">Log weights, sets, and cardio metrics with custom workout templates.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#FF5500] shrink-0 mt-1"><AppWindow size={20} /></div>
                <div>
                  <h4 className="font-bebas text-xl text-white tracking-wide">Book classes in 10s</h4>
                  <p className="text-gray-400 text-xs mt-1">Instant priority seat selection for all dark high-intensity group training classes.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#FF5500] shrink-0 mt-1"><Flame size={20} /></div>
                <div>
                  <h4 className="font-bebas text-xl text-white tracking-wide">Performance Metrics</h4>
                  <p className="text-gray-400 text-xs mt-1">Track caloric metrics and power performance indices in a detailed interface.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#FF5500] shrink-0 mt-1"><Shield size={20} /></div>
                <div>
                  <h4 className="font-bebas text-xl text-white tracking-wide">Macro Tracking</h4>
                  <p className="text-gray-400 text-xs mt-1">Input nutritional plans and cross-reference with body composition goals automatically.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4 items-center">
              <div className="text-xs font-barlow text-gray-500 font-bold uppercase tracking-widest">DOWNLOAD COMPANION APP</div>
              <div className="flex gap-3">
                <span className="bg-[#121A36] hover:bg-white/10 text-white font-barlow font-bold text-xs uppercase px-5 py-2.5 border border-white/10 rounded-sm cursor-pointer tracking-wider select-none">
                  APP STORE
                </span>
                <span className="bg-[#121A36] hover:bg-white/10 text-white font-barlow font-bold text-xs uppercase px-5 py-2.5 border border-white/10 rounded-sm cursor-pointer tracking-wider select-none">
                  GOOGLE PLAY
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* i) LOCATIONS SECTION */}
      <section className="bg-black py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[#FF5500] font-barlow font-bold tracking-widest text-sm uppercase">CHAMPIONSHIP FACILITIES</span>
              <h2 className="font-bebas text-6xl sm:text-7xl text-white mt-2">FIND YOUR EPSILON SUITE</h2>
              <p className="text-gray-400 mt-2 max-w-xl">
                12 highly equipped sanctuaries designed for intense output, luxury recovery, and premium athletic growth.
              </p>
            </div>
            <button 
              onClick={() => onNavigate("locations")}
              className="mt-4 md:mt-0 text-[#FFD60A] hover:text-white font-barlow font-bold tracking-widest text-sm uppercase flex items-center gap-2 group cursor-pointer"
            >
              EXPLORE ALL SUITES <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {initialLocations.slice(0, 4).map((loc) => (
              <div key={loc.id} className="bg-[#121A36] border border-white/5 p-6 relative border-bevel hover:border-white/20 transition-all duration-300">
                <span className="text-[#FFD60A] font-barlow text-xs font-bold uppercase tracking-widest">{loc.area}</span>
                <h3 className="font-bebas text-3xl text-white mt-1">{loc.city}</h3>
                <div className="h-[1px] bg-white/5 my-4"></div>
                <p className="text-gray-400 text-xs line-clamp-2">{loc.address}</p>
                <p className="text-gray-500 text-xs mt-2 font-mono">{loc.phone}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {loc.amenities.slice(0, 3).map((am, i) => (
                    <span key={i} className="text-[9px] font-barlow uppercase font-bold tracking-wider text-gray-400 border border-white/5 bg-white/5 px-2 py-0.5">
                      {am}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => onNavigate("locations")}
                  className="mt-6 w-full bg-[#0A1128] hover:bg-[#FF5500] text-white font-barlow text-xs py-2 uppercase tracking-widest font-bold transition-all border border-white/5 cursor-pointer"
                >
                  VIEW SUITE DETAILS
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* j) FREE TRIAL CTA: Full-width red section */}
      <section className="bg-[#FF5500] text-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center">
        <div className="film-grain"></div>
        <div className="max-w-4xl mx-auto z-10 relative">
          <span className="text-black font-barlow font-bold tracking-[0.3em] text-sm uppercase bg-white px-4 py-1.5 rounded-sm">
            LIMITED TIME PROMO
          </span>
          <h2 className="font-bebas text-6xl sm:text-8xl md:text-9xl leading-[0.9] text-white mt-6 uppercase">
            YOUR FIRST CLASS IS FREE
          </h2>
          <p className="text-white/90 mt-4 max-w-lg mx-auto text-lg sm:text-xl font-medium">
            No commitment. No credit card required. Just outstanding high performance physical results.
          </p>

          {trialSuccess ? (
            <div className="mt-10 p-6 bg-black/30 border border-white/20 max-w-xl mx-auto border-bevel">
              <p className="font-bebas text-3xl text-[#FFD60A]">YOU ARE BOOKED FOR THE TRIAL</p>
              <p className="text-sm mt-1">We have sent the VIP invitation details and access code directly to your email inbox. Welcome to the elite squad.</p>
            </div>
          ) : (
            <form onSubmit={handleTrialSubmit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto items-stretch">
              <input 
                type="email" 
                required
                placeholder="ENTER YOUR ACTIVE EMAIL"
                value={trialEmail}
                onChange={(e) => setTrialEmail(e.target.value)}
                className="flex-grow bg-black/20 border-2 border-white/40 focus:border-white text-white font-barlow tracking-wider placeholder-white/50 text-sm uppercase px-5 py-4 focus:outline-none focus:ring-0"
              />
              <button 
                type="submit"
                disabled={trialLoading}
                className="bg-[#FFD60A] text-black hover:bg-white font-bebas text-2xl px-8 py-4 tracking-wider transition-all border-bevel shrink-0 cursor-pointer disabled:opacity-50"
              >
                {trialLoading ? "SENDING..." : "CLAIM FREE TRIAL"}
              </button>
            </form>
          )}

          <p className="text-white/70 text-[11px] font-barlow font-bold tracking-widest uppercase mt-6">
            Limited spots available this week. New users only. Must show valid government ID.
          </p>
        </div>
      </section>

      {/* k) INSTAGRAM FEED SIMULATION */}
      <section className="bg-black py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-bebas text-4xl text-white">#EpsilonFitness</h3>
            <p className="text-gray-500 font-barlow text-xs tracking-widest uppercase mt-1">FOLLOW OUR ELITE COMMUNITY ONLINE</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="relative group aspect-square overflow-hidden border border-white/5 bg-[#121A36] border-bevel">
              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400')` }}
              ></div>
              <div className="absolute inset-0 bg-[#FF5500]/80 flex flex-col justify-center items-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-bebas text-2xl text-white">NO REPS WAISTED</p>
                <p className="font-barlow text-[10px] uppercase font-bold tracking-widest text-white/80 mt-1">@alex_lifts</p>
              </div>
            </div>

            <div className="relative group aspect-square overflow-hidden border border-white/5 bg-[#121A36] border-bevel">
              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400')` }}
              ></div>
              <div className="absolute inset-0 bg-[#FF5500]/80 flex flex-col justify-center items-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-bebas text-2xl text-white">5AM CLUB HEAT</p>
                <p className="font-barlow text-[10px] uppercase font-bold tracking-widest text-white/80 mt-1">@zara_fitness</p>
              </div>
            </div>

            <div className="relative group aspect-square overflow-hidden border border-white/5 bg-[#121A36] border-bevel">
              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400')` }}
              ></div>
              <div className="absolute inset-0 bg-[#FF5500]/80 flex flex-col justify-center items-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-bebas text-2xl text-white">RECOVERY MATTERS</p>
                <p className="font-barlow text-[10px] uppercase font-bold tracking-widest text-white/80 mt-1">@elena_sprints</p>
              </div>
            </div>

            <div className="relative group aspect-square overflow-hidden border border-white/5 bg-[#121A36] border-bevel">
              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400')` }}
              ></div>
              <div className="absolute inset-0 bg-[#FF5500]/80 flex flex-col justify-center items-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-bebas text-2xl text-white">WARRIOR FLOW</p>
                <p className="font-barlow text-[10px] uppercase font-bold tracking-widest text-white/80 mt-1">@sarah_yoga</p>
              </div>
            </div>

            <div className="relative group aspect-square overflow-hidden border border-white/5 bg-[#121A36] border-bevel">
              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400')` }}
              ></div>
              <div className="absolute inset-0 bg-[#FF5500]/80 flex flex-col justify-center items-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-bebas text-2xl text-white">SQUAT DEPTHS</p>
                <p className="font-barlow text-[10px] uppercase font-bold tracking-widest text-white/80 mt-1">@marcus_iron</p>
              </div>
            </div>

            <div className="relative group aspect-square overflow-hidden border border-white/5 bg-[#121A36] border-bevel">
              <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?w=400')` }}
              ></div>
              <div className="absolute inset-0 bg-[#FF5500]/80 flex flex-col justify-center items-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-bebas text-2xl text-white">GOLD LIMITS</p>
                <p className="font-barlow text-[10px] uppercase font-bold tracking-widest text-white/80 mt-1">@damon_cross</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
