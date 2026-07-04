import { useState } from "react";
import { initialTrainers, Trainer } from "../../lib/fitness-data";
import { Shield, Sparkles, MessageSquare, Instagram, Linkedin, Twitter, Check } from "lucide-react";

interface TrainersViewProps {
  onOpenMembershipModal: (planName?: string) => void;
}

export default function TrainersView({ onOpenMembershipModal }: TrainersViewProps) {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const handleBookSession = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setBookedSuccess(false);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) return;
    setBookedSuccess(true);
  };

  return (
    <div className="bg-[#0A1128] text-white min-h-screen relative py-12">
      <div className="film-grain"></div>

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16 text-center">
        <span className="text-[#FF5500] font-barlow font-bold tracking-[0.3em] text-xs uppercase">EPSILON CHAMPIONSHIP COACHING DIRECTORY</span>
        <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl leading-none text-white uppercase tracking-wide">
          MEET YOUR <span className="text-stroke-orange">COACHES</span>
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Our coaches do not deal in casual encouragement. They are certified biomechanical practitioners, ex tactical physical instructors, and world class championship contenders.
        </p>
      </section>

      {/* COACHES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {initialTrainers.map((trainer) => (
            <div 
              key={trainer.id} 
              className="bg-[#121A36] border border-white/5 flex flex-col justify-between border-bevel group overflow-hidden hover:border-white/25 transition-all duration-300 relative"
            >
              <div>
                {/* Trainer Image */}
                <div className="h-[360px] overflow-hidden relative">
                  <img 
                    src={trainer.image} 
                    alt={trainer.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121A36] via-[#121A36]/20 to-transparent"></div>
                  
                  {/* Overlay tags */}
                  <div className="absolute top-4 left-4 bg-black/80 border border-[#FFD60A] text-[#FFD60A] font-barlow text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                    {trainer.specialty.split(" & ")[0]}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-[#FF5500] font-barlow text-xs font-bold uppercase tracking-widest block mb-1">
                    {trainer.role}
                  </span>
                  <h3 className="font-bebas text-3xl text-white tracking-wide">{trainer.name}</h3>
                  
                  <p className="text-gray-400 text-xs mt-3 leading-relaxed min-h-[64px] line-clamp-4">
                    {trainer.bio}
                  </p>

                  {/* Certifications Array */}
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
                    {trainer.certifications.map((cert, i) => (
                      <span key={i} className="text-[9px] font-barlow uppercase font-bold tracking-wider bg-black/40 text-gray-300 px-2 py-0.5 rounded-sm border border-white/5">
                        {cert}
                      </span>
                    ))}
                  </div>

                  {/* Philosophy Quote */}
                  <div className="mt-4 p-3 bg-black/30 border-l-2 border-[#FF5500] border-bevel">
                    <p className="text-xs text-gray-300 italic font-medium">
                      "{trainer.quote}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions & Socials Footer */}
              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between gap-4">
                <div className="flex gap-2.5 text-gray-500">
                  {trainer.socials.instagram && (
                    <span title={trainer.socials.instagram} className="hover:text-[#FF5500] transition-colors cursor-pointer">
                      <Instagram size={16} />
                    </span>
                  )}
                  {trainer.socials.twitter && (
                    <span title={trainer.socials.twitter} className="hover:text-[#FF5500] transition-colors cursor-pointer">
                      <Twitter size={16} />
                    </span>
                  )}
                  {trainer.socials.linkedin && (
                    <span title={trainer.socials.linkedin} className="hover:text-[#FF5500] transition-colors cursor-pointer">
                      <Linkedin size={16} />
                    </span>
                  )}
                </div>

                <button 
                  onClick={() => handleBookSession(trainer)}
                  className="bg-[#FF5500] hover:bg-[#D44700] text-white font-barlow text-xs font-bold px-4 py-2 uppercase tracking-widest border-bevel transition-colors glow-orange cursor-pointer"
                >
                  BOOK SESSION
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRAINING PHILOSOPHY SECTION */}
      <section className="bg-black py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[#FFD60A] font-barlow font-bold tracking-widest text-xs uppercase block mb-4">THE UNCOMPROMISING EPSILON STANDARD</span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white">"WE BUILD CAPABILITY, NOT JAW DROPPING LOOKS WITHOUT SUBSTANCE"</h2>
          <div className="h-1 bg-[#FF5500] w-24 mx-auto my-6"></div>
          <p className="text-gray-400 font-sans text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            At Epsilon Fitness, we recognize that structural visual symmetry is a natural byproduct of maximum capability. We focus intensely on biomechanical soundness, joint health indices, cardiovascular output thresholds, and CNS recovery management. Our coaches coordinate directly to elevate every metric of your human potential.
          </p>
        </div>
      </section>

      {/* BOOKING MODAL */}
      {selectedTrainer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121A36] border-2 border-[#FF5500] max-w-md w-full border-bevel overflow-hidden shadow-[0_0_50px_rgba(255,85,0,0.3)]">
            <div className="p-6 border-b border-white/10 bg-black/40 flex justify-between items-center">
              <div>
                <span className="text-[#FF5500] font-barlow text-xs font-bold uppercase tracking-widest">PERSONAL COACHING REQUEST</span>
                <h3 className="font-bebas text-3xl text-white mt-1">SESSION WITH {selectedTrainer.name.toUpperCase()}</h3>
              </div>
              <button 
                onClick={() => setSelectedTrainer(null)}
                className="text-gray-500 hover:text-white font-bebas text-xl cursor-pointer"
              >
                [X]
              </button>
            </div>

            <div className="p-6">
              {bookedSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} />
                  </div>
                  <span className="font-bebas text-2xl text-white">BOOKING REQUEST SENT</span>
                  <p className="text-gray-400 text-xs mt-2 font-sans leading-relaxed">
                    We have submitted your training request with <strong className="text-white">{selectedTrainer.name}</strong> for the requested slot. Our concierge representative will contact you within 2 hours to confirm calendar synchronization.
                  </p>
                  <button 
                    onClick={() => setSelectedTrainer(null)}
                    className="mt-6 w-full bg-[#FF5500] text-white font-bebas text-lg py-2 uppercase tracking-wider border-bevel cursor-pointer"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmBooking} className="space-y-4">
                  <p className="text-gray-400 text-xs font-sans leading-relaxed">
                    Personalized master athletic training session (60 minutes). Private turf access, diagnostic analysis, and advanced performance adjustments included.
                  </p>

                  <div>
                    <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1.5">Select Appointment Date</label>
                    <input 
                      type="date" 
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-2.5 focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1.5">Preferred Time Slot</label>
                    <select 
                      required
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-2.5 focus:outline-none focus:border-[#FF5500]"
                    >
                      <option value="">SELECT TIME SLOT</option>
                      <option value="06:00 AM">06:00 AM - Early Morning Surge</option>
                      <option value="08:00 AM">08:00 AM - Morning Heavy Block</option>
                      <option value="11:30 AM">11:30 AM - Midday Fuel Block</option>
                      <option value="02:30 PM">02:30 PM - Afternoon High Density</option>
                      <option value="05:30 PM">05:30 PM - Peak Sunset Circuit</option>
                      <option value="07:00 PM">07:00 PM - Dark Night Heavy Lifting</option>
                    </select>
                  </div>

                  <div className="bg-black/30 p-3 rounded-sm border border-white/5">
                    <span className="text-[10px] font-barlow font-bold tracking-widest text-[#FFD60A] uppercase block">PREMIUM NOTE</span>
                    <p className="text-[10px] text-gray-400 mt-1">This booking requires active Epsilon Elite status or a separate $120/session guest coaching credit.</p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => {
                        setSelectedTrainer(null);
                        onOpenMembershipModal("Epsilon Elite");
                      }}
                      className="flex-1 bg-black hover:bg-white/5 text-[#FFD60A] font-barlow text-xs font-bold py-3 uppercase tracking-widest border border-[#FFD60A]/30 cursor-pointer"
                    >
                      UPGRADE TO ELITE
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 bg-[#FF5500] hover:bg-[#D44700] text-white font-bebas text-xl py-3 tracking-wider border-bevel transition-colors glow-orange cursor-pointer"
                    >
                      SUBMIT BOOKING
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
