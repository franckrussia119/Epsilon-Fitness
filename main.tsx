import { useState } from "react";
import { initialChallenges, Challenge } from "../../lib/fitness-data";
import { Trophy, Award, Flame, Users, Calendar, CheckCircle } from "lucide-react";

export default function ChallengesView() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(initialChallenges[0]);
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState("");

  const leaderboardData = [
    { rank: 1, name: "John Miller", score: "98.4 pts", location: "NYC Suite", tier: "Elite" },
    { rank: 2, name: "Clara Smith", score: "97.2 pts", location: "Beverly Hills", tier: "Pro" },
    { rank: 3, name: "Robert Davies", score: "95.9 pts", location: "River North", tier: "Elite" },
    { rank: 4, name: "Marcus Mercer", score: "94.1 pts", location: "Uptown Dallas", tier: "Pro" },
    { rank: 5, name: "Samantha Lee", score: "93.8 pts", location: "South Beach", tier: "Elite" },
    { rank: 6, name: "David Vance", score: "92.4 pts", location: "Upper West Side", tier: "Pro" },
    { rank: 7, name: "Teresa Garcia", score: "91.5 pts", location: "River Oaks", tier: "Core" },
    { rank: 8, name: "Gregory Cole", score: "90.9 pts", location: "Domain Austin", tier: "Pro" },
    { rank: 9, name: "Jessica Rostova", score: "89.8 pts", location: "Denver Suite", tier: "Elite" },
    { rank: 10, name: "Patricia Lopez", score: "89.2 pts", location: "SOMA SF", tier: "Pro" }
  ];

  const pastWinners = [
    {
      year: "Winter 2025",
      name: "Derrick Vance",
      category: "30-Day Body Shred",
      achievement: "Dropped 14.5 lbs fat / Gained 6 lbs lean mass",
      image: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?w=400"
    },
    {
      year: "Autumn 2025",
      name: "Sofia H.",
      category: "Power Lift squating",
      achievement: "Increased squat 1RM by 85 lbs in 6 weeks",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400"
    },
    {
      year: "Summer 2025",
      name: "Marcus Mercer",
      category: "Century Ride endurance",
      achievement: "Completed 100 miles cycling in 3 hours 45 mins",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400"
    }
  ];

  const handleJoinChallenge = (challengeId: string) => {
    if (joinedChallenges.includes(challengeId)) return;
    setJoinedChallenges([...joinedChallenges, challengeId]);
    setSuccessMsg(`YOU HAVE OFFICIALLY ENLISTED IN THE ${selectedChallenge.name.toUpperCase()}`);
    setTimeout(() => {
      setSuccessMsg("");
    }, 5000);
  };

  return (
    <div className="bg-[#0A1128] text-white min-h-screen relative py-12">
      <div className="film-grain"></div>

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16 text-center">
        <span className="text-[#FF5500] font-barlow font-bold tracking-[0.3em] text-xs uppercase">COMMUNITY HIGH OUTPUT EVENTS</span>
        <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl leading-none text-white uppercase tracking-wide">
          ACTIVE <span className="text-stroke-orange">CHALLENGES</span>
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Test your physical stamina and structural willpower against Epsilon competitors nationwide. Track daily progress on the companion app to claim premium prizes.
        </p>
      </section>

      {/* CHALLENGES SELECTOR AND ACTIVE STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive list of Challenges */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[10px] font-barlow font-bold tracking-widest text-gray-500 uppercase block mb-2">ACTIVE EVENT CALENDAR</span>
          {initialChallenges.map((chal) => (
            <button
              key={chal.id}
              onClick={() => setSelectedChallenge(chal)}
              className={`w-full text-left p-6 border-bevel border transition-all duration-300 cursor-pointer block relative ${
                selectedChallenge.id === chal.id
                  ? "bg-[#121A36] border-[#FF5500] shadow-[0_0_15px_rgba(255,85,0,0.15)]"
                  : "bg-black/30 border-white/5 hover:border-white/10 hover:bg-[#121A36]/40"
              }`}
            >
              {joinedChallenges.includes(chal.id) && (
                <div className="absolute top-4 right-4 bg-emerald-600 text-white font-barlow text-[8px] font-bold uppercase tracking-widest px-2 py-0.5">
                  ENLISTED
                </div>
              )}
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[#FFD60A] font-barlow text-[10px] font-bold uppercase tracking-widest">
                    {chal.duration}
                  </span>
                  <h3 className="font-bebas text-2xl text-white uppercase mt-1 tracking-wide">{chal.name}</h3>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Right: Selected Challenge Details */}
        <div className="lg:col-span-7 bg-[#121A36] border border-white/5 p-8 border-bevel relative">
          <div className="flex items-center gap-3.5 border-b border-white/5 pb-6 mb-6">
            <Trophy className="text-[#FFD60A]" size={32} />
            <div>
              <span className="text-[#FF5500] font-barlow text-xs font-bold uppercase tracking-widest">ACTIVE PERFORMANCE MISSION</span>
              <h2 className="font-bebas text-4xl text-white uppercase mt-1 tracking-wide">{selectedChallenge.name}</h2>
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-6 font-sans">
            {selectedChallenge.description}
          </p>

          {/* Progress Tracker Visual */}
          <div className="bg-black/30 p-6 rounded-sm border border-white/5 mb-6">
            <div className="flex justify-between items-center mb-2.5">
              <span className="font-barlow text-xs font-bold uppercase tracking-widest text-gray-400">CHALLENGE TIMELINE STATUS</span>
              <span className="font-bebas text-xl text-[#FFD60A]">{selectedChallenge.progressPct}% COMPLETE</span>
            </div>
            <div className="h-2.5 bg-black rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#FF5500] to-[#FFD60A]" style={{ width: `${selectedChallenge.progressPct}%` }}></div>
            </div>
            <div className="flex justify-between items-center mt-3 text-[10px] font-barlow font-bold text-gray-500 uppercase tracking-widest">
              <span>DAY 01 START</span>
              <span>{selectedChallenge.totalParticipants} ACTIVE WARRIORS</span>
              <span>FINISH LINE</span>
            </div>
          </div>

          {/* Rules / Steps */}
          <div className="mb-6">
            <h4 className="font-barlow text-xs tracking-wider uppercase font-bold text-gray-400 mb-3">MANDATORY EVENT RULES</h4>
            <ul className="space-y-3">
              {selectedChallenge.rules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-gray-300 font-sans leading-relaxed">
                  <CheckCircle size={14} className="text-[#FF5500] shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Prize Allocation */}
          <div className="border-t border-white/5 pt-6 mb-8">
            <h4 className="font-barlow text-xs tracking-wider uppercase font-bold text-gray-400 mb-1">CHAMPION COVETED REWARD</h4>
            <p className="font-bebas text-2xl text-[#FFD60A] tracking-wider uppercase">{selectedChallenge.prize}</p>
          </div>

          {successMsg && (
            <div className="mb-6 p-4 bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs text-center">
              {successMsg}
            </div>
          )}

          <button
            onClick={() => handleJoinChallenge(selectedChallenge.id)}
            disabled={joinedChallenges.includes(selectedChallenge.id)}
            className={`w-full font-bebas text-2xl py-4 tracking-wider transition-colors border-bevel ${
              joinedChallenges.includes(selectedChallenge.id)
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-[#FF5500] hover:bg-[#D44700] text-white glow-orange cursor-pointer"
            }`}
          >
            {joinedChallenges.includes(selectedChallenge.id) ? "YOU ARE ALREADY ENLISTED" : "ENLIST IN CHALLENGE NOW"}
          </button>
        </div>
      </section>

      {/* LEADERBOARD TABULATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <span className="text-[#FF5500] font-barlow font-bold tracking-widest text-xs uppercase block">THE HONOR ROLL</span>
          <h2 className="font-bebas text-5xl text-white mt-1">NATIONAL LEADERBOARD</h2>
          <p className="text-gray-400 font-barlow text-xs tracking-widest uppercase mt-1">Updated in real time via digital rep sensors</p>
        </div>

        <div className="overflow-x-auto glass-panel p-4 border border-white/5 border-bevel max-w-4xl mx-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-500 font-barlow tracking-widest text-[10px] uppercase font-bold">
                <th className="py-3 px-4 text-center">RANK</th>
                <th className="py-3 px-4">WARRIOR NAME</th>
                <th className="py-3 px-4 text-center">SUITE REGISTRY</th>
                <th className="py-3 px-4 text-center">MEMBER TIER</th>
                <th className="py-3 px-4 text-right">TOTAL POINTS</th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-300 font-sans">
              {leaderboardData.map((row) => (
                <tr key={row.rank} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-center font-bebas text-lg text-white">
                    {row.rank === 1 ? "🥇 01" : row.rank === 2 ? "🥈 02" : row.rank === 3 ? "🥉 03" : `${row.rank < 10 ? '0' : ''}${row.rank}`}
                  </td>
                  <td className="py-3 px-4 font-bold text-white uppercase tracking-wide">{row.name}</td>
                  <td className="py-3 px-4 text-center uppercase text-[11px] font-barlow font-semibold">{row.location}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`text-[9px] font-barlow uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm ${
                      row.tier === "Elite" ? "bg-[#FFD60A]/10 text-[#FFD60A]" : "bg-[#FF5500]/10 text-[#FF5500]"
                    }`}>
                      {row.tier}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-bebas text-base text-[#FFD60A] tracking-wider">{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PAST CHAMPIONS GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <span className="text-[#FFD60A] font-barlow font-bold tracking-widest text-xs uppercase block">LEGENDS INDUCTED</span>
          <h2 className="font-bebas text-5xl text-white mt-1">HALL OF HEROES</h2>
          <p className="text-gray-400 font-barlow text-xs tracking-widest uppercase mt-1">Past historic physical performance winners</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pastWinners.map((win, i) => (
            <div key={i} className="bg-[#121A36] border border-white/5 overflow-hidden border-bevel group">
              <div className="h-64 overflow-hidden relative">
                <img src={win.image} alt={win.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121A36] via-[#121A36]/20 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-[#FFD60A] text-black font-barlow text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1">
                  {win.year}
                </div>
              </div>
              <div className="p-6">
                <span className="text-[#FF5500] font-barlow text-[10px] font-bold uppercase tracking-widest">{win.category}</span>
                <h3 className="font-bebas text-3xl text-white mt-1 uppercase tracking-wide">{win.name}</h3>
                <p className="text-gray-400 text-xs mt-2.5 leading-relaxed font-sans">{win.achievement}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
