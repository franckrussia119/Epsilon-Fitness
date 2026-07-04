import { useState } from "react";
import { initialNutritionPlans, NutritionPlan } from "../../lib/fitness-data";
import { Flame, Apple, Sparkles, Scale, Info, Check } from "lucide-react";

export default function NutritionView() {
  const [selectedPlan, setSelectedPlan] = useState<NutritionPlan>(initialNutritionPlans[0]);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("fat-loss");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    setErrorMsg("");

    try {
      // Send to Telegram using /api/contact endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone || "Not specified",
          subject: "Nutrition Coaching Request",
          message: `🎯 NUTRITION DIET COACHING INQUIRY
Weight: ${weight || "Not specified"} lbs
Primary Goal Focus: ${goal.toUpperCase()}
Preferred Diet Protocol: ${selectedPlan.name.toUpperCase()}`
        })
      });

      if (response.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setWeight("");
      } else {
        setErrorMsg("Failed to log request. Please check entry parameters.");
      }
    } catch (err) {
      setErrorMsg("Connection failure. Please submit again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0A1128] text-white min-h-screen relative py-12">
      <div className="film-grain"></div>

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16 text-center">
        <span className="text-[#FF5500] font-barlow font-bold tracking-[0.3em] text-xs uppercase">ATHLETIC CELLULAR FUEL DESIGN</span>
        <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl leading-none text-white uppercase tracking-wide">
          FUEL YOUR <span className="text-stroke-orange">PERFORMANCE</span>
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Uncompromising physical progress is 80 percent nutritional. Align your metabolic engine with specialized cellular fuel profiles engineered by clinical performance dietitians.
        </p>
      </section>

      {/* DIET SELECTOR BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {initialNutritionPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className={`p-6 text-left border-bevel border transition-all duration-300 cursor-pointer ${
                selectedPlan.id === plan.id
                  ? "bg-[#121A36] border-[#FF5500] shadow-[0_0_15px_rgba(255,85,0,0.2)]"
                  : "bg-black/30 border-white/5 hover:border-white/10 hover:bg-[#121A36]/40"
              }`}
            >
              <span className="text-[#FFD60A] font-barlow text-[10px] font-bold uppercase tracking-widest block mb-1">
                {plan.calories}
              </span>
              <h3 className="font-bebas text-2xl text-white uppercase tracking-wide">
                {plan.name.split(" ")[0]} <span className="text-stroke-orange">{plan.name.split(" ").slice(1).join(" ")}</span>
              </h3>
            </button>
          ))}
        </div>
      </section>

      {/* PLAN DETAILS CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Plan Description & Macros */}
        <div className="lg:col-span-4 bg-[#121A36] border border-white/5 p-8 border-bevel">
          <span className="text-[#FF5500] font-barlow text-[10px] font-bold uppercase tracking-widest block">
            SELECTED METABOLIC MODEL
          </span>
          <h2 className="font-bebas text-4xl text-white mt-1 uppercase">{selectedPlan.name}</h2>
          <p className="text-gray-400 text-xs mt-3 leading-relaxed font-sans">
            {selectedPlan.subtitle}
          </p>

          <div className="h-[1px] bg-white/10 my-6"></div>

          {/* Macros Visual Circles/Bars */}
          <div>
            <span className="text-xs font-barlow font-bold tracking-widest text-gray-400 uppercase block mb-4">
              MACRONUTRIENT ALLOCATION
            </span>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-barlow font-bold uppercase mb-1">
                  <span>PROTEIN (AMINO AMMUNITION)</span>
                  <span className="text-[#FF5500]">{selectedPlan.macros.protein}</span>
                </div>
                <div className="h-2 bg-black rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF5500]" style={{ width: selectedPlan.macros.protein }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-barlow font-bold uppercase mb-1">
                  <span>CARBOHYDRATES (GLYCOGEN FUEL)</span>
                  <span className="text-[#FFD60A]">{selectedPlan.macros.carbs}</span>
                </div>
                <div className="h-2 bg-black rounded-full overflow-hidden">
                  <div className="h-full bg-[#FFD60A]" style={{ width: selectedPlan.macros.carbs }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-barlow font-bold uppercase mb-1">
                  <span>HEALTHY FATS (HORMONAL STABILITY)</span>
                  <span className="text-white">{selectedPlan.macros.fat}</span>
                </div>
                <div className="h-2 bg-black rounded-full overflow-hidden">
                  <div className="h-full bg-white" style={{ width: selectedPlan.macros.fat }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-white/10 my-6"></div>

          {/* Supplement Recommendations */}
          <div>
            <span className="text-xs font-barlow font-bold tracking-widest text-gray-400 uppercase block mb-3">
              SUPPLEMENT PROTOCOL
            </span>
            <ul className="space-y-2">
              {selectedPlan.supplementRecs.map((supp, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                  <Check size={12} className="text-[#FF5500]" />
                  <span>{supp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Daily Meal Schedule Timeline */}
        <div className="lg:col-span-8 bg-[#121A36] border border-white/5 p-8 border-bevel relative">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <Apple className="text-[#FF5500]" size={24} />
            <div>
              <h3 className="font-bebas text-3xl text-white">CHAMPION DIET METABOLIC TIMELINE</h3>
              <p className="text-[10px] text-gray-500 font-barlow tracking-widest uppercase">Precision cellular feeding schedule</p>
            </div>
          </div>

          <div className="space-y-6">
            {selectedPlan.meals.map((meal, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 bg-black/20 border border-white/5 hover:border-white/10 transition-colors">
                <div className="font-bebas text-xl text-[#FFD60A] tracking-wider sm:w-28 shrink-0 border-b sm:border-b-0 sm:border-r border-white/10 pb-2 sm:pb-0 sm:pr-4">
                  {meal.time}
                </div>
                <div>
                  <h4 className="font-barlow font-bold tracking-wider text-base uppercase text-white">{meal.name}</h4>
                  <p className="text-xs text-gray-400 mt-1 font-sans leading-relaxed">{meal.details}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-[#FF5500]/5 border border-[#FF5500]/20 flex items-start gap-3 border-bevel">
            <Info size={16} className="text-[#FF5500] shrink-0 mt-0.5" />
            <p className="text-[11px] text-gray-300 font-sans leading-relaxed">
              <strong>Macro Tuning Notice:</strong> This schedule represents a standardized sample profile. Caloric and macronutrient parameters must be adjusted dynamically to match your lean muscle mass index, body temperature variables, and physical training load.
            </p>
          </div>
        </div>
      </section>

      {/* NUTRITION COACHING BOOKING FORM */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121A36] border-2 border-[#FF5500] p-8 sm:p-12 border-bevel shadow-[0_0_40px_rgba(255,85,0,0.15)]">
          <div className="text-center mb-8">
            <span className="text-[#FF5500] font-barlow font-bold tracking-widest text-xs uppercase">DIRECT DIETETIC INTERVENTION</span>
            <h2 className="font-bebas text-4xl sm:text-5xl text-white mt-1">BOOK DIETETIC COACHING</h2>
            <p className="text-gray-400 text-xs mt-2 font-sans">
              Schedule a precise 1 on 1 metabolic diagnostic analysis. Receive personalized glycogen loading schedules, blood sugar diagnostics, and customized meal preparation metrics.
            </p>
          </div>

          {success ? (
            <div className="p-8 bg-black/40 border border-[#FFD60A] text-center border-bevel">
              <span className="text-[#FFD60A] font-bebas text-4xl">REQUEST REGISTERED</span>
              <p className="text-gray-300 text-sm mt-3 font-sans leading-relaxed">
                Thank you. We have successfully logged your coaching inquiry. A clinical athletic dietitian from our nutrition department will contact you within 24 hours to schedule your bio-impedance body scan.
              </p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-6 bg-[#FF5500] hover:bg-[#D44700] text-white font-bebas text-lg px-6 py-2.5 tracking-wider uppercase border-bevel cursor-pointer"
              >
                SUBMIT ANOTHER FORM
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
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
                    required
                    placeholder="ENTER YOUR FULL NAME"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-3 focus:outline-none focus:border-[#FF5500] placeholder-white/20"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-barlow text-xs tracking-wider uppercase font-bold mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="ENTER YOUR EMAIL COORDINATES"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-3 focus:outline-none focus:border-[#FF5500] placeholder-white/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-400 font-barlow text-xs tracking-wider uppercase font-bold mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-3 focus:outline-none focus:border-[#FF5500] placeholder-white/20"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-barlow text-xs tracking-wider uppercase font-bold mb-2">Current Weight (lbs)</label>
                  <input 
                    type="number" 
                    placeholder="185"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-3 focus:outline-none focus:border-[#FF5500] placeholder-white/20"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-barlow text-xs tracking-wider uppercase font-bold mb-2">Primary Goal Focus</label>
                  <select 
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-3 focus:outline-none focus:border-[#FF5500]"
                  >
                    <option value="fat-loss">Fat Loss / Body Shred</option>
                    <option value="muscle-hypertrophy">Muscle Hypertrophy</option>
                    <option value="athletic-endurance">Athletic Endurance</option>
                    <option value="cellular-rejuvenation">Systemic Longevity</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF5500] hover:bg-[#D44700] text-white font-bebas text-2xl py-4 tracking-wider transition-colors border-bevel shadow-lg glow-orange cursor-pointer disabled:opacity-50"
              >
                {loading ? "PROVISING CONSULTANT..." : "SUBMIT METABOLIC APPLICATION"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
