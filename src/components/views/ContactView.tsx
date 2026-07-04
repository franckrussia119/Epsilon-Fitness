import { useState } from "react";
import { initialLocations } from "../../lib/fitness-data";
import { Send, MapPin, Phone, Clock, Mail, Shield, Building2 } from "lucide-react";

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: ""
        });
      } else {
        const data = await response.json();
        setErrorMsg(data.error || "Failed to transmit message. Check field settings.");
      }
    } catch (err) {
      setErrorMsg("Network timeout. Please retry shortly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0A1128] text-white min-h-screen relative py-12">
      <div className="film-grain"></div>

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16 text-center">
        <span className="text-[#FF5500] font-barlow font-bold tracking-[0.3em] text-xs uppercase">DIRECT CHANNELS OF INTERVENTION</span>
        <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl leading-none text-white uppercase tracking-wide">
          CONTACT <span className="text-stroke-orange">EPSILON</span>
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Connect immediately with our concierge coordinators. We operate high-priority feedback loops to address membership, coaching, and corporate sponsorships.
        </p>
      </section>

      {/* LAYOUT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 bg-[#121A36] border-2 border-[#FF5500] p-8 sm:p-12 border-bevel shadow-[0_0_40px_rgba(255,85,0,0.15)] relative">
          <div className="mb-8">
            <span className="text-[#FFD60A] font-barlow font-bold tracking-widest text-xs uppercase">SECURE TRANSMISSION NODE</span>
            <h3 className="font-bebas text-3xl text-white mt-1">SUBMIT VIP ENQUIRY</h3>
          </div>

          {success ? (
            <div className="p-8 bg-black/40 border border-[#FFD60A] text-center border-bevel">
              <span className="text-[#FFD60A] font-bebas text-4xl">TRANSMISSION SECURED</span>
              <p className="text-gray-300 text-sm mt-3 font-sans leading-relaxed">
                We have received your secure submission. Your tracking code is active. Our concierge division will call or email you within 2 hours.
              </p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-6 bg-[#FF5500] hover:bg-[#D44700] text-white font-bebas text-lg px-6 py-2.5 tracking-wider uppercase border-bevel cursor-pointer"
              >
                SUBMIT ANOTHER ENQUIRY
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
                    placeholder="ENTER YOUR EMAIL"
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
                  <label className="block text-gray-400 font-barlow text-xs tracking-wider uppercase font-bold mb-2">Inquiry Department Focus</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-3 focus:outline-none focus:border-[#FF5500]"
                  >
                    <option value="General Inquiry">General Club Inquiry</option>
                    <option value="Membership Program">Membership & Pricing Program</option>
                    <option value="Personal Coaching">Personalized Master Coaching</option>
                    <option value="Corporate Partnership">Corporate Partnership Accounts</option>
                    <option value="Media Inquiry">Media & Communications</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-barlow text-xs tracking-wider uppercase font-bold mb-2">Secure Message Content</label>
                <textarea 
                  name="message"
                  required
                  rows={5}
                  placeholder="PROVIDE COMPREHENSIVE SUBMISSION PARAGRAPHS..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-3 focus:outline-none focus:border-[#FF5500] placeholder-white/20"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF5500] hover:bg-[#D44700] text-white font-bebas text-2xl py-4 tracking-wider transition-colors border-bevel shadow-lg glow-orange cursor-pointer disabled:opacity-50 flex items-center justify-center gap-3"
              >
                <Send size={18} />
                <span>{loading ? "TRANSMITING DATA..." : "TRANSMIT MESSAGE SECURELY"}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Support Details & Corporate */}
        <div className="lg:col-span-5 space-y-8 text-left">
          
          {/* Operations Hours */}
          <div className="bg-[#121A36] border border-white/5 p-6 border-bevel">
            <div className="flex items-center gap-3 text-[#FFD60A] mb-4">
              <Clock size={20} />
              <h4 className="font-bebas text-2xl uppercase tracking-wide">CONCIERGE OPERATIONS</h4>
            </div>
            <div className="space-y-2 text-xs font-sans text-gray-400 leading-relaxed">
              <p><strong className="text-white uppercase tracking-wider font-barlow">Club hours:</strong> Mon to Fri, 5:00 AM - 11:00 PM | Sat & Sun, 6:00 AM - 10:00 PM</p>
              <p><strong className="text-white uppercase tracking-wider font-barlow">Telephone lines:</strong> Mon to Sun, 6:00 AM - 9:00 PM (Direct Line Support)</p>
              <p><strong className="text-white uppercase tracking-wider font-barlow">Digital desk:</strong> 24 hours (Responses logged within 2 hours peak)</p>
            </div>
          </div>

          {/* Corporate CTA */}
          <div className="bg-[#121A36] border border-[#FFD60A] p-6 border-bevel shadow-[0_0_15px_rgba(255,214,10,0.05)]">
            <div className="flex items-center gap-3 text-[#FFD60A] mb-4">
              <Building2 size={20} />
              <h4 className="font-bebas text-2xl uppercase tracking-wide">CORPORATE INTEGRATION</h4>
            </div>
            <p className="text-xs text-gray-400 font-sans leading-relaxed mb-4">
              We provide highly structured wellness and physical fitness packages tailored specifically for premium executive entities. Access elite corporate tiers with custom tracking analytics for teams.
            </p>
            <button 
              onClick={() => {
                setFormData({
                  ...formData,
                  subject: "Corporate Partnership",
                  message: "Inquiry on behalf of [Company Name]. We are requesting specialized premium wellness and keycard access programs."
                });
                const element = document.getElementById("name");
                element?.focus();
              }}
              className="w-full bg-[#FFD60A] text-black hover:bg-white font-barlow text-xs font-extrabold py-2 px-4 uppercase tracking-widest transition-colors border-bevel cursor-pointer"
            >
              REQUEST CORPORATE PROSPECTUS
            </button>
          </div>

          {/* Urgent Support Note */}
          <div className="bg-black border border-white/5 p-6 border-bevel text-xs text-gray-400 font-sans leading-relaxed">
            <span className="text-[#FF5500] font-barlow font-bold tracking-widest uppercase block mb-1">VIP MEMBER EMERGENCY RECOVERY</span>
            <p>If you have lost your keycard or require immediate medical recovery desk assistance, please telephone your local suite directly instead of utilizing web inquiry channels. Local telephone numbers are monitored 24 hours.</p>
          </div>
        </div>
      </section>

      {/* ALL 12 LOCATIONS PHONE INDEX LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="border-t border-white/5 pt-12 mb-10">
          <h2 className="font-bebas text-4xl text-white">NATIONAL TELEPHONE DIRECTORY</h2>
          <p className="text-gray-400 font-barlow text-xs tracking-widest uppercase mt-1">Direct coordinates to local front desk suites</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {initialLocations.map((loc) => (
            <div key={loc.id} className="p-4 bg-[#121A36] border border-white/5 border-bevel flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-barlow uppercase font-bold text-gray-500 tracking-wider block">{loc.area}</span>
                <span className="font-bebas text-xl text-white tracking-wide uppercase block">{loc.city}</span>
              </div>
              <p className="text-[#FFD60A] font-mono text-xs mt-3">{loc.phone}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
