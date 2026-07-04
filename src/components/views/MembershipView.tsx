import { useState } from "react";
import { initialLocations } from "../../lib/fitness-data";
import { Check, X, Shield, HelpCircle, ArrowRight } from "lucide-react";

interface MembershipViewProps {
  preselectedPlan?: string;
  onOpenTrialModal: () => void;
}

export default function MembershipView({ preselectedPlan = "Epsilon Pro", onOpenTrialModal }: MembershipViewProps) {
  const [selectedPlan, setSelectedPlan] = useState(preselectedPlan);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    startDate: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const faqs = [
    {
      question: "Can I use multiple locations with my membership?",
      answer: "Yes, Epsilon Pro and Epsilon Elite members have complete unrestricted access to all 12 premium national club locations worldwide. Epsilon Core is restricted to a single home club location selected during signup."
    },
    {
      question: "Is there a contract or commitment period?",
      answer: "We offer maximum flexibility. All memberships operate on a month to month basis with no minimum commitment contract. If you wish to suspend or terminate, simply provide a written 30 days notice."
    },
    {
      question: "What is the policy for booking classes?",
      answer: "Members can book group fitness classes up to 7 days in advance through the companion app. Elite tier members receive priority booking, allowing them access to peak times 48 hours before other tiers."
    },
    {
      question: "What amenities are included in the recovery suite?",
      answer: "Our premium recovery suite includes full dry heat saunas, eucalyptus steam chambers, sub zero cold plunges, compression therapy gear, and professional cryotherapy chambers."
    },
    {
      question: "Can I bring guests with me?",
      answer: "Epsilon Pro members receive 2 complimentary guest passes per calendar month. Epsilon Elite members can bring 1 guest free of charge during any visit."
    },
    {
      question: "How do I book personal training sessions?",
      answer: "Elite members can book their 4 monthly sessions directly through the app or by speaking with the concierge. Additional sessions can be purchased separately at a member discount rate."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          plan: selectedPlan,
          location: formData.location || "Any Location",
          startDate: formData.startDate,
          message: formData.message
        })
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          location: "",
          startDate: "",
          message: ""
        });
      } else {
        const data = await response.json();
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Connection error. Our team will be notified shortly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0A1128] text-white min-h-screen relative py-12">
      <div className="film-grain"></div>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16 text-center">
        <span className="text-[#FF5500] font-barlow font-bold tracking-[0.3em] text-xs uppercase">SELECT YOUR MEMBERSHIP PROGRAM</span>
        <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl leading-none text-white uppercase tracking-wide">
          INVEST IN <span className="text-stroke-orange">YOURSELF</span>
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Premium high volume classes, master coaching, and state of the art luxury recovery amenities. Choose your level of access and build your legendary athletic capability.
        </p>
      </section>

      {/* PRICING CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Core Plan */}
          <div className="bg-[#121A36] border border-white/10 p-8 flex flex-col justify-between relative border-bevel hover:border-white/25 transition-all">
            <div>
              <span className="font-barlow text-xs tracking-widest text-gray-500 uppercase font-bold">Access Level 01</span>
              <h3 className="font-bebas text-4xl text-white mt-1">EPSILON CORE</h3>
              <p className="text-gray-400 text-xs mt-2">Single location access with clean essential training amenities.</p>
              
              <div className="my-6 flex items-baseline gap-1">
                <span className="font-bebas text-6xl text-[#FFD60A]">$49</span>
                <span className="text-gray-400 font-barlow tracking-wider uppercase text-sm">/ month</span>
              </div>
              <div className="h-[1px] bg-white/5 my-6"></div>
              
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#FF5500]" />
                  <span>Single location access</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#FF5500]" />
                  <span>2 group fitness classes per week</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#FF5500]" />
                  <span>Locker room access</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#FF5500]" />
                  <span>Basic companion digital app</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => {
                setSelectedPlan("Epsilon Core");
                const element = document.getElementById("signup-section");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-8 w-full border border-gray-600 hover:border-white text-white font-bebas text-xl py-3 tracking-wider transition-colors cursor-pointer border-bevel"
            >
              SELECT CORE PLAN
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-[#121A36] border-2 border-[#FF5500] p-8 flex flex-col justify-between relative border-bevel scale-100 lg:scale-105 z-10 shadow-[0_0_30px_rgba(255,85,0,0.2)]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF5500] text-white font-barlow text-xs font-bold uppercase tracking-[0.2em] px-4 py-1 rounded-sm">
              MOST POPULAR
            </div>
            <div>
              <span className="font-barlow text-xs tracking-widest text-[#FF5500] uppercase font-bold">Access Level 02</span>
              <h3 className="font-bebas text-4xl text-white mt-1">EPSILON PRO</h3>
              <p className="text-gray-400 text-xs mt-2">Unlimited access, group classes, and complete luxury recovery suites.</p>
              
              <div className="my-6 flex items-baseline gap-1">
                <span className="font-bebas text-6xl text-[#FF5500]">$99</span>
                <span className="text-gray-400 font-barlow tracking-wider uppercase text-sm">/ month</span>
              </div>
              <div className="h-[1px] bg-white/10 my-6"></div>
              
              <ul className="space-y-4 text-sm text-gray-200">
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#FF5500]" />
                  <span>All 12 premium national locations</span>
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
                  <span>Full companion app with rep tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#FF5500]" />
                  <span>Custom macro nutrition guidance</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#FF5500]" />
                  <span>Full access to recovery & sauna suites</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => {
                setSelectedPlan("Epsilon Pro");
                const element = document.getElementById("signup-section");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-8 w-full bg-[#FF5500] hover:bg-[#D44700] text-white font-bebas text-xl py-3 tracking-wider transition-colors glow-orange border-bevel cursor-pointer"
            >
              SELECT PRO PLAN
            </button>
          </div>

          {/* Elite Plan */}
          <div className="bg-[#121A36] border border-[#FFD60A] p-8 flex flex-col justify-between relative border-bevel hover:border-[#FFD60A]/80 transition-all">
            <div>
              <span className="font-barlow text-xs tracking-widest text-[#FFD60A] uppercase font-bold">Access Level 03</span>
              <h3 className="font-bebas text-4xl text-white mt-1">EPSILON ELITE</h3>
              <p className="text-gray-400 text-xs mt-2">The absolute pinnacle. Highly customized with master coaching.</p>
              
              <div className="my-6 flex items-baseline gap-1">
                <span className="font-bebas text-6xl text-[#FFD60A]">$199</span>
                <span className="text-gray-400 font-barlow tracking-wider uppercase text-sm">/ month</span>
              </div>
              <div className="h-[1px] bg-white/5 my-6"></div>
              
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
                  <span>Exclusive invitations to elite events</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => {
                setSelectedPlan("Epsilon Elite");
                const element = document.getElementById("signup-section");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-8 w-full bg-gradient-to-r from-[#FFD60A] to-yellow-500 hover:brightness-110 text-black font-bebas text-xl py-3 tracking-wider transition-all glow-gold border-bevel cursor-pointer"
            >
              SELECT ELITE PLAN
            </button>
          </div>
        </div>
      </section>

      {/* FEATURE COMPARISON TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="font-bebas text-4xl sm:text-5xl text-white">PLAN FEATURES COMPARISON</h2>
          <p className="text-gray-400 font-barlow text-xs tracking-widest uppercase mt-1">Verify every detail side by side</p>
        </div>

        <div className="overflow-x-auto glass-panel p-4 border-bevel border border-white/5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 font-barlow tracking-widest text-xs uppercase font-bold">
                <th className="py-4 px-6">FITNESS ACCESS BENEFITS</th>
                <th className="py-4 px-6 text-center">CORE</th>
                <th className="py-4 px-6 text-center text-[#FF5500]">PRO</th>
                <th className="py-4 px-6 text-center text-[#FFD60A]">ELITE</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-300">
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 font-medium">Home Location Access</td>
                <td className="py-4 px-6 text-center"><Check size={16} className="mx-auto text-emerald-500" /></td>
                <td className="py-4 px-6 text-center"><Check size={16} className="mx-auto text-emerald-500" /></td>
                <td className="py-4 px-6 text-center"><Check size={16} className="mx-auto text-emerald-500" /></td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 font-medium">All 12 National Locations Access</td>
                <td className="py-4 px-6 text-center"><X size={16} className="mx-auto text-orange-500" /></td>
                <td className="py-4 px-6 text-center"><Check size={16} className="mx-auto text-emerald-500" /></td>
                <td className="py-4 px-6 text-center"><Check size={16} className="mx-auto text-emerald-500" /></td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 font-medium">High Volume Group Classes</td>
                <td className="py-4 px-6 text-center text-xs">2 per week</td>
                <td className="py-4 px-6 text-center text-xs text-[#FF5500]">Unlimited</td>
                <td className="py-4 px-6 text-center text-xs text-[#FFD60A]">Unlimited</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 font-medium">Premium Locker Room & Saunas</td>
                <td className="py-4 px-6 text-center"><Check size={16} className="mx-auto text-emerald-500" /></td>
                <td className="py-4 px-6 text-center"><Check size={16} className="mx-auto text-emerald-500" /></td>
                <td className="py-4 px-6 text-center"><Check size={16} className="mx-auto text-emerald-500" /></td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 font-medium">Cryotherapy & Ice Plunges Suite</td>
                <td className="py-4 px-6 text-center"><X size={16} className="mx-auto text-orange-500" /></td>
                <td className="py-4 px-6 text-center"><Check size={16} className="mx-auto text-emerald-500" /></td>
                <td className="py-4 px-6 text-center"><Check size={16} className="mx-auto text-emerald-500" /></td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 font-medium">Guest Passes Per Month</td>
                <td className="py-4 px-6 text-center text-xs">None</td>
                <td className="py-4 px-6 text-center text-xs">2 passes</td>
                <td className="py-4 px-6 text-center text-xs text-[#FFD60A]">1 guest always free</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 font-medium">Dedicated Master Coach Sessions</td>
                <td className="py-4 px-6 text-center"><X size={16} className="mx-auto text-orange-500" /></td>
                <td className="py-4 px-6 text-center"><X size={16} className="mx-auto text-orange-500" /></td>
                <td className="py-4 px-6 text-center text-xs text-[#FFD60A]">4 per month</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 font-medium">Priority 48-Hour Class Bookings</td>
                <td className="py-4 px-6 text-center"><X size={16} className="mx-auto text-orange-500" /></td>
                <td className="py-4 px-6 text-center"><X size={16} className="mx-auto text-orange-500" /></td>
                <td className="py-4 px-6 text-center"><Check size={16} className="mx-auto text-emerald-500" /></td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-6 font-medium">VIP Personalized Locker Suite</td>
                <td className="py-4 px-6 text-center"><X size={16} className="mx-auto text-orange-500" /></td>
                <td className="py-4 px-6 text-center"><X size={16} className="mx-auto text-orange-500" /></td>
                <td className="py-4 px-6 text-center"><Check size={16} className="mx-auto text-emerald-500" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="font-bebas text-4xl sm:text-5xl text-white">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="text-gray-400 font-barlow text-xs tracking-widest uppercase mt-1">Clear insights on Epsilon guidelines</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-[#121A36] border border-white/5 overflow-hidden transition-all duration-300 border-bevel"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span className="font-barlow font-bold tracking-wider text-base sm:text-lg text-white">
                  {faq.question.toUpperCase()}
                </span>
                <span className="text-[#FF5500] font-bebas text-2xl">
                  {activeFaq === index ? "[-]" : "[+]"}
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 overflow-hidden ${
                  activeFaq === index ? "max-h-96 border-t border-white/5" : "max-h-0"
                }`}
              >
                <p className="p-6 text-gray-300 text-sm leading-relaxed font-sans">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MONEY BACK GUARANTEE BADGE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
        <div className="glass-panel p-8 border-2 border-[#FFD60A] border-bevel inline-flex flex-col sm:flex-row items-center gap-6 text-left max-w-2xl shadow-[0_0_20px_rgba(255,214,10,0.1)]">
          <div className="text-[#FFD60A] bg-[#FFD60A]/10 p-4 rounded-full">
            <Shield size={48} />
          </div>
          <div>
            <h3 className="font-bebas text-3xl text-white">100% EXCELLENCE GUARANTEE</h3>
            <p className="text-gray-300 text-sm mt-2 font-sans leading-relaxed">
              If you attend at least 3 sessions in your first 14 days and find that the Epsilon experience is not aligned with your performance style, we will process a complete membership refund. No questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* JOIN NOW FORM SECTION */}
      <section id="signup-section" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-[#121A36] border-2 border-[#FF5500] p-8 sm:p-12 border-bevel shadow-[0_0_40px_rgba(255,85,0,0.15)] relative">
          <div className="text-center mb-8">
            <span className="text-[#FF5500] font-barlow font-bold tracking-widest text-xs uppercase">SECURE REGISTRATION PORTAL</span>
            <h2 className="font-bebas text-4xl sm:text-5xl text-white mt-1">APPLY FOR MEMBERSHIP</h2>
            <p className="text-gray-400 text-xs mt-2 font-sans">
              Enter your active coordinates below to establish your profile. Our concierge desk will contact you within 2 hours to activate your keycard.
            </p>
          </div>

          {success ? (
            <div className="p-8 bg-black/40 border border-[#FFD60A] text-center border-bevel">
              <span className="text-[#FFD60A] font-bebas text-4xl">APPLICATION LOGGED</span>
              <p className="text-gray-300 text-sm mt-3 font-sans leading-relaxed">
                Thank you for choosing Epsilon Fitness. We have logged your request for the <strong className="text-white">{selectedPlan.toUpperCase()}</strong> tier. Check your inbox for the immediate activation confirmation details.
              </p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-6 bg-[#FF5500] hover:bg-[#D44700] text-white font-bebas text-lg px-6 py-2.5 tracking-wider uppercase border-bevel cursor-pointer"
              >
                SUBMIT ANOTHER APPLICATION
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-4 bg-orange-950/80 border border-orange-500/50 text-orange-200 text-xs rounded-sm">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 font-barlow text-xs tracking-wider uppercase font-bold mb-2">Selected Program Tier</label>
                  <select 
                    name="plan"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-3 focus:outline-none focus:border-[#FF5500]"
                  >
                    <option value="Epsilon Core">Epsilon Core - $49/mo</option>
                    <option value="Epsilon Pro">Epsilon Pro - $99/mo</option>
                    <option value="Epsilon Elite">Epsilon Elite - $199/mo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 font-barlow text-xs tracking-wider uppercase font-bold mb-2">Preferred Club Location</label>
                  <select 
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-3 focus:outline-none focus:border-[#FF5500]"
                  >
                    <option value="">SELECT A SUITE LOCATION</option>
                    {initialLocations.map(loc => (
                      <option key={loc.id} value={`${loc.city} - ${loc.area}`}>
                        {loc.city.toUpperCase()} ({loc.area.toUpperCase()})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 font-barlow text-xs tracking-wider uppercase font-bold mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="ENTER YOUR FULL NAME"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-3 focus:outline-none focus:border-[#FF5500] placeholder-white/20"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-barlow text-xs tracking-wider uppercase font-bold mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="ENTER YOUR EMAIL COORDINATES"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-3 focus:outline-none focus:border-[#FF5500] placeholder-white/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 font-barlow text-xs tracking-wider uppercase font-bold mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-3 focus:outline-none focus:border-[#FF5500] placeholder-white/20"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-barlow text-xs tracking-wider uppercase font-bold mb-2">Target Start Date</label>
                  <input 
                    type="date" 
                    name="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-3 focus:outline-none focus:border-[#FF5500]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-barlow text-xs tracking-wider uppercase font-bold mb-2">Custom Goals or Comments</label>
                <textarea 
                  name="message"
                  rows={4}
                  placeholder="DESCRIBE YOUR ATHLETIC MOTIVATION OR SPECIAL CONDITIONS..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-3 focus:outline-none focus:border-[#FF5500] placeholder-white/20"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF5500] hover:bg-[#D44700] text-white font-bebas text-2xl py-4 tracking-wider transition-colors border-bevel shadow-lg glow-orange cursor-pointer disabled:opacity-50"
              >
                {loading ? "PROVISING ACCOUNT..." : `CONFIRM ${selectedPlan.toUpperCase()} TIER`}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
