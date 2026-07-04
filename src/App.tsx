import { useState, useEffect } from "react";
import { 
  initialAnnouncements, 
  initialClassSchedules, 
  initialLocations,
  Announcement,
  ClassSchedule
} from "./lib/fitness-data";

// Views
import HomeView from "./components/views/HomeView";
import ClassesView from "./components/views/ClassesView";
import MembershipView from "./components/views/MembershipView";
import TrainersView from "./components/views/TrainersView";
import LocationsView from "./components/views/LocationsView";
import NutritionView from "./components/views/NutritionView";
import ChallengesView from "./components/views/ChallengesView";
import ContactView from "./components/views/ContactView";
import AdminView from "./components/views/AdminView";

import { 
  Flame, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Shield, 
  Check, 
  Smartphone, 
  Lock 
} from "lucide-react";

export default function App() {
  // Navigation & State Routing
  const [currentView, setCurrentView] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global lifted states for real-time propagation from Admin
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [classSchedules, setClassSchedules] = useState<ClassSchedule[]>(initialClassSchedules);

  // Modals
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [trialSuccess, setTrialSuccess] = useState(false);
  const [trialLoading, setTrialLoading] = useState(false);
  const [trialForm, setTrialForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    day: "Monday",
    comments: ""
  });

  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState("Epsilon Pro");
  const [membershipSuccess, setMembershipSuccess] = useState(false);
  const [membershipLoading, setMembershipLoading] = useState(false);
  const [membershipForm, setMembershipForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    startDate: "",
    motivation: ""
  });

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  }, [currentView]);

  // Actions
  const handleResetData = () => {
    setAnnouncements(initialAnnouncements);
    setClassSchedules(initialClassSchedules);
  };

  const handleOpenTrialModal = () => {
    setTrialSuccess(false);
    setTrialModalOpen(true);
  };

  const handleOpenMembershipModal = (planName?: string) => {
    if (planName) {
      setSelectedPlanName(planName);
    }
    setMembershipSuccess(false);
    setMembershipModalOpen(true);
  };

  const handleTrialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrialLoading(true);

    try {
      const response = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trialForm.name,
          email: trialForm.email,
          phone: trialForm.phone,
          location: trialForm.location || "Any Club Location",
          preferredClass: "Free Session Protocol",
          goal: trialForm.comments || "General High Performance Transformation"
        })
      });

      if (response.ok) {
        setTrialSuccess(true);
        setTrialForm({
          name: "",
          email: "",
          phone: "",
          location: "",
          day: "Monday",
          comments: ""
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTrialLoading(false);
    }
  };

  const handleMembershipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMembershipLoading(true);

    try {
      const response = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: membershipForm.name,
          email: membershipForm.email,
          phone: membershipForm.phone,
          plan: selectedPlanName,
          location: membershipForm.location || "Preferred Home Suite",
          startDate: membershipForm.startDate,
          message: membershipForm.motivation
        })
      });

      if (response.ok) {
        setMembershipSuccess(true);
        setMembershipForm({
          name: "",
          email: "",
          phone: "",
          location: "",
          startDate: "",
          motivation: ""
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setMembershipLoading(false);
    }
  };

  // Render proper View
  const renderView = () => {
    switch (currentView) {
      case "home":
        return (
          <HomeView 
            onNavigate={setCurrentView} 
            onOpenTrialModal={handleOpenTrialModal} 
            onOpenMembershipModal={handleOpenMembershipModal} 
          />
        );
      case "classes":
        return (
          <ClassesView 
            onOpenMembershipModal={handleOpenMembershipModal} 
          />
        );
      case "membership":
        return (
          <MembershipView 
            preselectedPlan={selectedPlanName} 
            onOpenTrialModal={handleOpenTrialModal} 
          />
        );
      case "trainers":
        return (
          <TrainersView 
            onOpenMembershipModal={handleOpenMembershipModal} 
          />
        );
      case "locations":
        return (
          <LocationsView 
            onOpenTrialModal={handleOpenTrialModal} 
          />
        );
      case "nutrition":
        return <NutritionView />;
      case "challenges":
        return <ChallengesView />;
      case "contact":
        return <ContactView />;
      case "admin":
        return (
          <AdminView 
            announcements={announcements} 
            onUpdateAnnouncements={setAnnouncements} 
            classSchedules={classSchedules} 
            onUpdateClassSchedules={setClassSchedules} 
            onResetData={handleResetData}
          />
        );
      default:
        return (
          <HomeView 
            onNavigate={setCurrentView} 
            onOpenTrialModal={handleOpenTrialModal} 
            onOpenMembershipModal={handleOpenMembershipModal} 
          />
        );
    }
  };

  const activeAnnouncements = announcements.filter(a => a.active);

  return (
    <div className="bg-[#0A1128] text-white min-h-screen flex flex-col justify-between font-sans relative overflow-x-hidden selection:bg-[#FF5500] selection:text-white">
      
      {/* 1. PERSISTENT HORIZONTAL SCROLLING MARQUEE */}
      {activeAnnouncements.length > 0 && (
        <div className="bg-[#FF5500] text-white font-barlow text-xs font-bold py-2 overflow-hidden relative select-none border-b border-black/40 z-50">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(4)].map((_, repeatIdx) => (
              <div key={repeatIdx} className="flex gap-12 items-center px-4 shrink-0">
                {activeAnnouncements.map((ann) => (
                  <span key={ann.id + "-" + repeatIdx} className="flex items-center gap-2">
                    <span className="bg-[#FFD60A] text-black font-extrabold px-1.5 py-0.5 text-[9px] uppercase tracking-wider rounded-sm">
                      {ann.category}
                    </span>
                    <span className="uppercase tracking-widest">{ann.text}</span>
                    <span className="text-[#FFD60A]">★</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. STICKY NAVBAR */}
      <nav className="sticky top-0 z-40 bg-[#0A1128]/90 backdrop-blur-md border-b border-white/5 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setCurrentView("home")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-[#FF5500] p-1.5 rounded-sm glow-orange group-hover:scale-105 transition-transform">
              <Flame size={20} className="text-white fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-bebas text-2xl leading-none tracking-wider text-white">
                EPSILON <span className="text-[#FF5500]">FITNESS</span>
              </span>
              <span className="text-[8px] font-barlow font-bold tracking-[0.3em] uppercase text-gray-500 leading-none mt-0.5">
                WHERE LEGENDS ARE BUILT
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {[
              { id: "home", label: "HOME" },
              { id: "classes", label: "CLASSES" },
              { id: "membership", label: "MEMBERSHIP" },
              { id: "trainers", label: "COACHES" },
              { id: "locations", label: "SUITES" },
              { id: "nutrition", label: "NUTRITION" },
              { id: "challenges", label: "CHALLENGES" },
              { id: "contact", label: "CONTACT" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentView(link.id)}
                className={`text-xs font-barlow font-bold tracking-widest px-3 py-2 transition-all cursor-pointer ${
                  currentView === link.id
                    ? "text-[#FF5500] border-b-2 border-[#FF5500]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Action Callbacks */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setCurrentView("admin")}
              className={`flex items-center gap-1.5 text-[10px] font-barlow font-extrabold tracking-widest uppercase border px-3 py-2 transition-all cursor-pointer ${
                currentView === "admin"
                  ? "bg-[#FFD60A] border-[#FFD60A] text-black"
                  : "border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              <Lock size={12} />
              <span>STAFF</span>
            </button>
            <button
              onClick={handleOpenTrialModal}
              className="bg-[#FF5500] hover:bg-[#D44700] text-white font-barlow font-bold tracking-wider text-xs px-5 py-2.5 border-bevel transition-all glow-orange cursor-pointer"
            >
              FREE TRIAL
            </button>
          </div>

          {/* Mobile Hamburguer */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-400 hover:text-white p-1 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#0A1128] border-b border-white/10 py-6 px-6 space-y-4 shadow-2xl">
            <div className="flex flex-col gap-2">
              {[
                { id: "home", label: "HOME VIEW" },
                { id: "classes", label: "SCHEDULED CLASSES" },
                { id: "membership", label: "MEMBERSHIP PLANS" },
                { id: "trainers", label: "CHAMPION COACHES" },
                { id: "locations", label: "CLUB LOCATIONS" },
                { id: "nutrition", label: "CELLULAR NUTRITION" },
                { id: "challenges", label: "ACTIVE CHALLENGES" },
                { id: "contact", label: "VIP CONTACT" }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => setCurrentView(link.id)}
                  className={`text-left text-sm font-barlow font-bold tracking-widest py-2 px-3 border-l-2 transition-all cursor-pointer ${
                    currentView === link.id
                      ? "text-[#FF5500] border-[#FF5500] bg-white/5"
                      : "text-gray-400 border-transparent hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="h-[1px] bg-white/5 my-4"></div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setCurrentView("admin")}
                className="w-full flex items-center justify-center gap-2 bg-black border border-white/10 text-gray-300 font-barlow text-xs font-bold py-3 uppercase tracking-widest cursor-pointer"
              >
                <Lock size={12} />
                <span>SECURE CONCIERGE ACCESS</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenTrialModal();
                }}
                className="w-full bg-[#FF5500] text-white font-barlow text-xs font-bold py-3 uppercase tracking-widest border-bevel text-center block cursor-pointer"
              >
                BOOK COMPLIMENTARY TRIAL
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 3. CORE VIEW COMPONENT SCREEN */}
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* 4. PREMIUM FOOTER */}
      <footer className="bg-[#040817] border-t border-white/5 pt-16 pb-8 px-4 sm:px-6 lg:px-8 text-gray-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Pitch */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#FF5500] p-1 rounded-sm">
                <Flame size={16} className="text-white fill-current" />
              </div>
              <span className="font-bebas text-2xl text-white tracking-wider">EPSILON</span>
            </div>
            <p className="text-xs leading-relaxed mb-4">
              A premium national fitness destination designed to test human capability. Dark luxury atmospheres fused with ex-tactical coaches and high-density performance gear.
            </p>
            <div className="text-[10px] font-mono uppercase bg-white/5 p-3 rounded-sm border border-white/5 inline-block text-[#FFD60A]">
              STATUS CODE: 200 SECURE
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-bebas text-lg text-white mb-4 uppercase tracking-wide">DEPARTMENTS</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => setCurrentView("home")} className="text-left hover:text-white cursor-pointer transition-colors">Home Page</button>
              <button onClick={() => setCurrentView("classes")} className="text-left hover:text-white cursor-pointer transition-colors">Class List</button>
              <button onClick={() => setCurrentView("membership")} className="text-left hover:text-white cursor-pointer transition-colors">Pricing Plans</button>
              <button onClick={() => setCurrentView("trainers")} className="text-left hover:text-white cursor-pointer transition-colors">Our Coaches</button>
              <button onClick={() => setCurrentView("locations")} className="text-left hover:text-white cursor-pointer transition-colors">Locations</button>
              <button onClick={() => setCurrentView("nutrition")} className="text-left hover:text-white cursor-pointer transition-colors">Metabolics</button>
              <button onClick={() => setCurrentView("challenges")} className="text-left hover:text-white cursor-pointer transition-colors">Challenges</button>
              <button onClick={() => setCurrentView("contact")} className="text-left hover:text-white cursor-pointer transition-colors">Help Desk</button>
            </div>
          </div>

          {/* Col 3: Key Locations */}
          <div>
            <h4 className="font-bebas text-lg text-white mb-4 uppercase tracking-wide">ACTIVE SUITES</h4>
            <div className="grid grid-cols-2 gap-2 text-xs uppercase font-barlow tracking-wider">
              <span>NYC - Upper West</span>
              <span>LA - Beverly Hills</span>
              <span>Chicago - Wells</span>
              <span>Miami - South Beach</span>
              <span>Dallas - Uptown</span>
              <span>Austin - Domain</span>
              <span>SF - SOMA</span>
              <span>Denver - LoDo</span>
            </div>
          </div>

          {/* Col 4: Help & Contacts */}
          <div>
            <h4 className="font-bebas text-lg text-white mb-4 uppercase tracking-wide">SECURE CONCIERGE</h4>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#FF5500]" />
                <span className="font-mono text-gray-300">+1 (800) EPSILON</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#FF5500]" />
                <span className="text-gray-300">concierge@epsilonfitness.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#FF5500] shrink-0 mt-0.5" />
                <span className="text-gray-300">742 Fifth Avenue, Suite 10, New York, NY 10019</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Base bar */}
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-mono">
          <span>© 2026 EPSILON FITNESS CO. ALL PERFORMANCE RIGHTS RESERVED.</span>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY PROTOCOL</span>
            <span className="hover:text-white transition-colors cursor-pointer">MEMBERSHIP GUIDELINES</span>
            <span className="hover:text-white transition-colors cursor-pointer">LIABILITY WAIVERS</span>
          </div>
        </div>
      </footer>


      {/* 5. TRIAL MODAL OVERLAY */}
      {trialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#121A36] border-2 border-[#FF5500] max-w-md w-full border-bevel overflow-hidden shadow-[0_0_50px_rgba(255,85,0,0.3)]">
            
            <div className="p-6 border-b border-white/10 bg-black/40 flex justify-between items-center">
              <div>
                <span className="text-[#FF5500] font-barlow text-xs font-bold uppercase tracking-widest">COMPLIMENTARY ACCESS PROGRAM</span>
                <h3 className="font-bebas text-3xl text-white mt-1">FREE TRIAL RESERVATION</h3>
              </div>
              <button 
                onClick={() => setTrialModalOpen(false)}
                className="text-gray-500 hover:text-white font-bebas text-xl cursor-pointer"
              >
                [X]
              </button>
            </div>

            <div className="p-6">
              {trialSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} />
                  </div>
                  <span className="font-bebas text-3xl text-white">ACCESS GRANTED</span>
                  <p className="text-gray-300 text-xs mt-3 font-sans leading-relaxed">
                    We have logged your trial application coordinates. Our membership desk will contact you via phone or email within 2 hours to activate your temporary suite keycard.
                  </p>
                  <button 
                    onClick={() => setTrialModalOpen(false)}
                    className="mt-6 w-full bg-[#FF5500] text-white font-bebas text-lg py-2.5 uppercase tracking-wider border-bevel cursor-pointer"
                  >
                    DISMISS SCREEN
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTrialSubmit} className="space-y-4">
                  <p className="text-gray-400 text-[11px] font-sans leading-relaxed">
                    Enter your physical metrics below to schedule your complimentary session. Photo credentials required at check-in.
                  </p>

                  <div>
                    <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="ENTER FULL NAME"
                      value={trialForm.name}
                      onChange={(e) => setTrialForm({ ...trialForm, name: e.target.value })}
                      className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-xs uppercase p-2.5 focus:outline-none focus:border-[#FF5500] placeholder-white/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="EMAIL ADDRESS"
                        value={trialForm.email}
                        onChange={(e) => setTrialForm({ ...trialForm, email: e.target.value })}
                        className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-xs uppercase p-2.5 focus:outline-none focus:border-[#FF5500] placeholder-white/20"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="PHONE NUMBER"
                        value={trialForm.phone}
                        onChange={(e) => setTrialForm({ ...trialForm, phone: e.target.value })}
                        className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-xs uppercase p-2.5 focus:outline-none focus:border-[#FF5500] placeholder-white/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1">Preferred Location</label>
                      <select 
                        required
                        value={trialForm.location}
                        onChange={(e) => setTrialForm({ ...trialForm, location: e.target.value })}
                        className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-xs uppercase p-2 focus:outline-none focus:border-[#FF5500]"
                      >
                        <option value="">SELECT CLUB</option>
                        {initialLocations.map(loc => (
                          <option key={loc.id} value={loc.city}>{loc.city.toUpperCase()}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1">Day of Visit</label>
                      <select 
                        value={trialForm.day}
                        onChange={(e) => setTrialForm({ ...trialForm, day: e.target.value })}
                        className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-xs uppercase p-2 focus:outline-none focus:border-[#FF5500]"
                      >
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1">Comments or Goals</label>
                    <textarea 
                      placeholder="ENTER COMMENTS OR SPECIFIC TRAINING GOALS..."
                      rows={2}
                      value={trialForm.comments}
                      onChange={(e) => setTrialForm({ ...trialForm, comments: e.target.value })}
                      className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-xs uppercase p-2 focus:outline-none focus:border-[#FF5500] placeholder-white/20"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={trialLoading}
                    className="w-full bg-[#FF5500] hover:bg-[#D44700] text-white font-bebas text-xl py-3 tracking-wider transition-colors border-bevel glow-orange cursor-pointer disabled:opacity-50"
                  >
                    {trialLoading ? "LOGGING APPLICANT..." : "CONFIRM TRIAL RESERVATION"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}


      {/* 6. MEMBERSHIP MODAL OVERLAY */}
      {membershipModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#121A36] border-2 border-[#FF5500] max-w-md w-full border-bevel overflow-hidden shadow-[0_0_50px_rgba(255,85,0,0.3)]">
            
            <div className="p-6 border-b border-white/10 bg-black/40 flex justify-between items-center">
              <div>
                <span className="text-[#FFD60A] font-barlow text-xs font-bold uppercase tracking-widest">SECURE PAYMENT PROTOCOL</span>
                <h3 className="font-bebas text-3xl text-white mt-1">ENLIST: {selectedPlanName.toUpperCase()}</h3>
              </div>
              <button 
                onClick={() => setMembershipModalOpen(false)}
                className="text-gray-500 hover:text-white font-bebas text-xl cursor-pointer"
              >
                [X]
              </button>
            </div>

            <div className="p-6">
              {membershipSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} />
                  </div>
                  <span className="font-bebas text-3xl text-white">ENLISTMENT SECURED</span>
                  <p className="text-gray-300 text-xs mt-3 font-sans leading-relaxed">
                    Thank you. Your request for <strong className="text-white">{selectedPlanName.toUpperCase()}</strong> has been submitted. Our concierge representative will contact you within 2 hours to authorize credentials.
                  </p>
                  <button 
                    onClick={() => setMembershipModalOpen(false)}
                    className="mt-6 w-full bg-[#FF5500] text-white font-bebas text-lg py-2.5 uppercase tracking-wider border-bevel cursor-pointer"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              ) : (
                <form onSubmit={handleMembershipSubmit} className="space-y-4">
                  <p className="text-gray-400 text-[11px] font-sans leading-relaxed">
                    Review and complete your secure application details. No payment is charged until keycard handoff at preferred club suite.
                  </p>

                  <div className="bg-black/30 p-3 border border-white/5 flex justify-between items-center">
                    <span className="font-barlow text-xs font-bold uppercase text-gray-400">Selected plan</span>
                    <span className="font-bebas text-xl text-[#FFD60A]">{selectedPlanName.toUpperCase()}</span>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="ENTER FULL NAME"
                      value={membershipForm.name}
                      onChange={(e) => setMembershipForm({ ...membershipForm, name: e.target.value })}
                      className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-xs uppercase p-2.5 focus:outline-none focus:border-[#FF5500] placeholder-white/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="EMAIL ADDRESS"
                        value={membershipForm.email}
                        onChange={(e) => setMembershipForm({ ...membershipForm, email: e.target.value })}
                        className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-xs uppercase p-2.5 focus:outline-none focus:border-[#FF5500] placeholder-white/20"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="PHONE NUMBER"
                        value={membershipForm.phone}
                        onChange={(e) => setMembershipForm({ ...membershipForm, phone: e.target.value })}
                        className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-xs uppercase p-2.5 focus:outline-none focus:border-[#FF5500] placeholder-white/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1">Home Suite Location</label>
                      <select 
                        required
                        value={membershipForm.location}
                        onChange={(e) => setMembershipForm({ ...membershipForm, location: e.target.value })}
                        className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-xs uppercase p-2 focus:outline-none focus:border-[#FF5500]"
                      >
                        <option value="">SELECT CLUB</option>
                        {initialLocations.map(loc => (
                          <option key={loc.id} value={loc.city}>{loc.city.toUpperCase()}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1">Target Start Date</label>
                      <input 
                        type="date" 
                        required
                        value={membershipForm.startDate}
                        onChange={(e) => setMembershipForm({ ...membershipForm, startDate: e.target.value })}
                        className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-xs uppercase p-2 focus:outline-none focus:border-[#FF5500]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1">Athletic Motivation</label>
                    <textarea 
                      placeholder="DESCRIBE REASON FOR ENLISTING WITH EPSILON..."
                      rows={2}
                      value={membershipForm.motivation}
                      onChange={(e) => setMembershipForm({ ...membershipForm, motivation: e.target.value })}
                      className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-xs uppercase p-2 focus:outline-none focus:border-[#FF5500] placeholder-white/20"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={membershipLoading}
                    className="w-full bg-[#FF5500] hover:bg-[#D44700] text-white font-bebas text-xl py-3 tracking-wider transition-colors border-bevel glow-orange cursor-pointer disabled:opacity-50"
                  >
                    {membershipLoading ? "TRANSMITING PROTOCOLS..." : `CONFIRM ${selectedPlanName.toUpperCase()} PLAN`}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
