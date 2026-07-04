import { useState } from "react";
import { 
  initialClassSchedules, 
  daysOfWeek 
} from "../../lib/fitness-data";
import { Flame, Clock, User, Users, MapPin, Check } from "lucide-react";

interface ClassesViewProps {
  onOpenMembershipModal: (planName?: string) => void;
}

interface ClassDetail {
  name: string;
  category: string;
  description: string;
  image: string;
  intensity: number;
}

const classDescriptions: Record<string, ClassDetail> = {
  "Epsilon Dark": {
    name: "Epsilon Dark",
    category: "Signature",
    description: "The premier signature class of Epsilon Fitness. 60 minutes of high-intensity circuit training held in a near-pitch-black theater with customized rhythmic red lighting and high-fidelity sound. Push past failure. No compromise.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    intensity: 5
  },
  "Power Lift": {
    name: "Power Lift",
    category: "Strength",
    description: "Olympic weightlifting mechanics fused with dynamic interval training. Designed for individuals looking to build maximum power, thick functional muscle fiber, and master safe lifting cues under master guidance.",
    image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=800",
    intensity: 5
  },
  "Cardio Inferno": {
    name: "Cardio Inferno",
    category: "Cardio",
    description: "A highly challenging 45-minute treadmill interval program engineered to push cardiovascular parameters. Uses zoned heart-rate tracking to ensure optimized oxygenation and continuous fat utilization.",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc172052?w=800",
    intensity: 4
  },
  "Yoga Flow": {
    name: "Yoga Flow",
    category: "Mind + Body",
    description: "High-performance hot vinyasa designed specifically for elite lifters and athletic recovery. Relieve tight muscle structures, align posture, and establish powerful core breathing mechanics.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    intensity: 2
  },
  "Boxing Fury": {
    name: "Boxing Fury",
    category: "Boxing",
    description: "Championship-style conditioning combining bag work, tactical footwork, and high-intensity bodyweight routines. Leave your ego outside the heavy bag room. Total exhaustion guaranteed.",
    image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800",
    intensity: 5
  },
  "Cycle Surge": {
    name: "Cycle Surge",
    category: "Cycling",
    description: "A sensory-driven immersive cycling format inside an ultra-dark theater. Powered by heavy electronic beats and led by expert cyclist presenters who synchronize speed, resistance, and maximum output.",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800",
    intensity: 4
  },
  "Functional Fire": {
    name: "Functional Fire",
    category: "Strength",
    description: "Kettlebells, battle ropes, weighted sleds, and plyometrics. High-density metabolic conditioning that targets overall physical longevity, stamina, and rotational muscle output.",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800",
    intensity: 5
  },
  "Stretch & Recover": {
    name: "Stretch & Recover",
    category: "Recovery",
    description: "Your training is only as good as your systemic recovery. Focuses on targeted foam rolling, deep myofascial stretches, static breathing protocols, and guidance on optimal cold therapy timing.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    intensity: 1
  }
};

export default function ClassesView({ onOpenMembershipModal }: ClassesViewProps) {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedClassDetail, setSelectedClassDetail] = useState<ClassDetail | null>(null);

  const tabs = ["All", "Strength", "Cardio", "Mind + Body", "Recovery", "Boxing", "Cycling"];

  // Helper map to match tab filter with data structures
  const matchesFilter = (className: string, tab: string) => {
    if (tab === "All") return true;
    const detail = classDescriptions[className] || { category: "Other" };
    return detail.category.toLowerCase() === tab.toLowerCase();
  };

  const filteredSchedules = initialClassSchedules.filter(sch => {
    const matchesDay = sch.day === selectedDay;
    const matchesTab = matchesFilter(sch.className, activeTab);
    return matchesDay && matchesTab;
  });

  const handleOpenDetail = (className: string) => {
    const detail = classDescriptions[className];
    if (detail) {
      setSelectedClassDetail(detail);
    } else {
      setSelectedClassDetail({
        name: className,
        category: "General",
        description: "An elite training session designed by Epsilon master coaches to test and maximize your physical attributes.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
        intensity: 4
      });
    }
  };

  return (
    <div className="bg-[#0A1128] text-white min-h-screen relative py-12">
      <div className="film-grain"></div>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <span className="text-[#FF5500] font-barlow font-bold tracking-[0.3em] text-xs uppercase">HIGH DEFINITION TRAINING SCHEDULE</span>
        <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl leading-none text-white tracking-wide uppercase">
          EPSILON <span className="text-stroke-orange">CLASSES</span>
        </h1>
        <p className="text-gray-400 mt-4 max-w-xl text-sm sm:text-base">
          Filter by training category and day of the week. Bookings are open to Epsilon Pro and Epsilon Elite members 7 days in advance.
        </p>
      </div>

      {/* CATEGORIES / FILTER TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5 pb-6 mb-10 overflow-x-auto whitespace-nowrap">
        <div className="flex gap-2 sm:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-barlow font-bold tracking-widest text-xs uppercase px-5 py-3 border-bevel transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "bg-[#FF5500] text-white glow-orange"
                  : "bg-[#121A36] text-gray-400 hover:text-white hover:bg-[#252525]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* DAYS OF THE WEEK FILTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 overflow-x-auto whitespace-nowrap">
        <div className="flex gap-2 p-1 bg-[#121A36]/60 rounded-md border border-white/5">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`font-barlow font-bold tracking-widest text-xs uppercase px-4 py-2.5 rounded-sm transition-all duration-300 cursor-pointer flex-1 text-center ${
                selectedDay === day
                  ? "bg-[#FFD60A] text-black font-extrabold"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* WEEKLY SCHEDULE GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {filteredSchedules.length === 0 ? (
          <div className="text-center py-20 border border-white/5 bg-[#121A36]/40 border-bevel">
            <Flame size={48} className="mx-auto text-gray-600 mb-4 animate-pulse" />
            <p className="font-bebas text-3xl text-gray-400">NO CLASSES SCHEDULED FOR {selectedDay.toUpperCase()}</p>
            <p className="text-gray-500 font-barlow text-xs tracking-widest uppercase mt-1">Please try choosing another category tab or day</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchedules.map((sch) => (
              <div 
                key={sch.id} 
                className="bg-[#121A36] border border-white/5 p-6 hover:border-white/20 transition-all duration-300 flex flex-col justify-between border-bevel relative"
              >
                {/* Hot slot indicator */}
                {sch.spotsLeft <= 3 && sch.spotsLeft > 0 && (
                  <div className="absolute top-4 right-4 bg-amber-600 text-white font-barlow text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">
                    ONLY {sch.spotsLeft} SPOTS LEFT
                  </div>
                )}
                {sch.spotsLeft === 0 && (
                  <div className="absolute top-4 right-4 bg-[#FF5500] text-white font-barlow text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">
                    CLASS FULL
                  </div>
                )}

                <div>
                  {/* Category, flame, intensity indicator */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-barlow tracking-widest uppercase text-gray-500 font-bold">
                      {(classDescriptions[sch.className] || { category: "General" }).category}
                    </span>
                    <div className="flex gap-0.5 text-[#FF5500]">
                      {[...Array(5)].map((_, idx) => (
                        <Flame 
                          key={idx} 
                          size={12} 
                          fill={idx < sch.intensity ? "currentColor" : "none"} 
                          className={idx < sch.intensity ? "opacity-100" : "opacity-20"}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 
                    onClick={() => handleOpenDetail(sch.className)}
                    className="font-bebas text-3xl text-white hover:text-[#FF5500] cursor-pointer transition-colors"
                  >
                    {sch.className}
                  </h3>

                  <div className="h-[1px] bg-white/5 my-4"></div>

                  <div className="space-y-2 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-500" />
                      <span>{sch.time} ({sch.duration})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-gray-500" />
                      <span>Coach: <strong className="text-gray-300 font-medium">{sch.trainer}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-gray-500" />
                      <span>Capacity: <strong className="text-gray-300 font-medium">{sch.spotsTotal - sch.spotsLeft} / {sch.spotsTotal} Booked</strong></span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
                  <button 
                    onClick={() => handleOpenDetail(sch.className)}
                    className="flex-1 bg-black hover:bg-white/5 text-gray-300 hover:text-white font-barlow text-xs font-bold py-2.5 uppercase tracking-wider transition-colors border border-white/5 cursor-pointer"
                  >
                    DETAILS
                  </button>
                  <button 
                    disabled={sch.spotsLeft === 0}
                    onClick={() => onOpenMembershipModal("Epsilon Pro")}
                    className={`flex-1 font-barlow text-xs font-bold py-2.5 uppercase tracking-wider transition-all cursor-pointer ${
                      sch.spotsLeft === 0 
                        ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                        : "bg-[#FF5500] text-white hover:bg-[#D44700] glow-orange"
                    }`}
                  >
                    BOOK SESSION
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CLASS DETAIL MODAL */}
      {selectedClassDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121A36] border-2 border-[#FF5500] max-w-2xl w-full border-bevel overflow-hidden shadow-[0_0_50px_rgba(255,85,0,0.3)] relative">
            <div className="h-64 overflow-hidden relative">
              <img src={selectedClassDetail.image} alt={selectedClassDetail.name} className="w-full h-full object-cover grayscale" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121A36] via-[#121A36]/40 to-transparent"></div>
              <button 
                onClick={() => setSelectedClassDetail(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-[#FF5500] text-white font-bebas text-lg px-3 py-1 cursor-pointer transition-colors"
              >
                CLOSE [X]
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="text-[#FFD60A] font-barlow text-xs font-bold uppercase tracking-widest">
                  {selectedClassDetail.category} Class Format
                </span>
                <h3 className="font-bebas text-4xl text-white mt-1 uppercase">{selectedClassDetail.name}</h3>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-4 text-xs font-barlow tracking-wider uppercase text-gray-400 font-bold border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#FF5500]" />
                  <span>Available times daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame size={14} className="text-[#FF5500]" />
                  <span>Intensity Level: {selectedClassDetail.intensity} / 5</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6 font-sans">
                {selectedClassDetail.description}
              </p>

              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    setSelectedClassDetail(null);
                    onOpenMembershipModal("Epsilon Pro");
                  }}
                  className="flex-1 bg-[#FF5500] hover:bg-[#D44700] text-white font-bebas text-xl py-3 tracking-wider transition-colors border-bevel cursor-pointer"
                >
                  UPGRADE MEMBERSHIP TO BOOK
                </button>
                <button 
                  onClick={() => setSelectedClassDetail(null)}
                  className="border border-gray-600 hover:border-white text-gray-400 hover:text-white font-barlow text-xs font-bold px-6 py-3 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  BACK TO SCHEDULE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
