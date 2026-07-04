import { useState } from "react";
import { Announcement, ClassSchedule, initialAnnouncements, daysOfWeek } from "../../lib/fitness-data";
import { ShieldAlert, LogOut, CheckCircle, Plus, ToggleLeft, ToggleRight, Trash, BarChart, Settings, Sliders } from "lucide-react";

interface AdminViewProps {
  announcements: Announcement[];
  onUpdateAnnouncements: (anns: Announcement[]) => void;
  classSchedules: ClassSchedule[];
  onUpdateClassSchedules: (schedules: ClassSchedule[]) => void;
  onResetData: () => void;
}

export default function AdminView({ 
  announcements, 
  onUpdateAnnouncements, 
  classSchedules, 
  onUpdateClassSchedules,
  onResetData
}: AdminViewProps) {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Manage Announcements State
  const [newAnnText, setNewAnnText] = useState("");
  const [newAnnCategory, setNewAnnCategory] = useState("General");

  // Manage Class Schedules state (for fast edits)
  const [selectedSchId, setSelectedSchId] = useState<string | null>(null);
  const [editingTrainer, setEditingTrainer] = useState("");
  const [editingSpotsLeft, setEditingSpotsLeft] = useState<number>(0);
  const [editingTime, setEditingTime] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("AUTHENTICATION DENIED. VERIFY METRICS AND PASSWORDS.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  // Add Announcement
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnText) return;

    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      text: newAnnText.toUpperCase(),
      category: newAnnCategory,
      date: new Date().toISOString().split("T")[0],
      active: true
    };

    onUpdateAnnouncements([newAnn, ...announcements]);
    setNewAnnText("");
  };

  // Toggle active announcement
  const handleToggleAnnActive = (id: string) => {
    const updated = announcements.map(a => {
      if (a.id === id) {
        return { ...a, active: !a.active };
      }
      return a;
    });
    onUpdateAnnouncements(updated);
  };

  // Delete Announcement
  const handleDeleteAnn = (id: string) => {
    const updated = announcements.filter(a => a.id !== id);
    onUpdateAnnouncements(updated);
  };

  // Select class for fast edit
  const handleSelectClassEdit = (sch: ClassSchedule) => {
    setSelectedSchId(sch.id);
    setEditingTrainer(sch.trainer);
    setEditingSpotsLeft(sch.spotsLeft);
    setEditingTime(sch.time);
  };

  // Save class edit
  const handleSaveClassEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSchId) return;

    const updated = classSchedules.map(sch => {
      if (sch.id === selectedSchId) {
        return {
          ...sch,
          trainer: editingTrainer,
          spotsLeft: Number(editingSpotsLeft),
          time: editingTime
        };
      }
      return sch;
    });

    onUpdateClassSchedules(updated);
    setSelectedSchId(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-[#0A1128] text-white min-h-screen relative flex items-center justify-center p-4">
        <div className="film-grain"></div>
        <div className="bg-[#121A36] border-2 border-[#FF5500] max-w-md w-full border-bevel p-8 sm:p-10 shadow-[0_0_50px_rgba(255,85,0,0.3)]">
          <div className="text-center mb-8 border-b border-white/5 pb-6">
            <ShieldAlert size={48} className="mx-auto text-[#FF5500] mb-4 animate-pulse" />
            <span className="text-[#FF5500] font-barlow font-bold tracking-[0.3em] text-xs uppercase block">SECURE CONCIERGE TERMINAL</span>
            <h2 className="font-bebas text-4xl text-white mt-1">OPERATIONS ENTRY GATE</h2>
            <p className="text-gray-500 text-[10px] mt-2 font-mono uppercase">ACCESS RESTRICTED TO CLUB CONCIERGE STAFF</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            {loginError && (
              <div className="p-3 bg-orange-950/80 border border-orange-500 text-orange-200 text-[11px] font-mono uppercase text-center">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1.5">Staff Identifier</label>
              <input 
                type="text" 
                required
                placeholder="ENTER USERNAME (admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-3 focus:outline-none focus:border-[#FF5500] placeholder-white/10 font-mono"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1.5">Security Code</label>
              <input 
                type="password" 
                required
                placeholder="ENTER PASSPHRASE (admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-sm uppercase p-3 focus:outline-none focus:border-[#FF5500] placeholder-white/10 font-mono"
              />
            </div>

            <div className="p-3 bg-white/5 border border-white/5 text-[10px] text-gray-400 font-mono leading-relaxed">
              <strong>OPERATIONS WARNING:</strong> All actions logged. Unauthorized access attempts violate security guidelines. Check developers manuals for credentials.
            </div>

            <button 
              type="submit"
              className="w-full bg-[#FF5500] hover:bg-[#D44700] text-white font-bebas text-2xl py-3 tracking-wider transition-colors border-bevel shadow-lg glow-orange cursor-pointer"
            >
              AUTHENTICATE CONSOLE
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate some simple metrics
  const totalSpotsScheduled = classSchedules.reduce((acc, c) => acc + c.spotsTotal, 0);
  const totalSpotsLeft = classSchedules.reduce((acc, c) => acc + c.spotsLeft, 0);
  const bookedPercentage = Math.round(((totalSpotsScheduled - totalSpotsLeft) / totalSpotsScheduled) * 100);

  return (
    <div className="bg-[#0A1128] text-white min-h-screen relative py-12">
      <div className="film-grain"></div>

      {/* HEADER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-500 font-barlow font-bold tracking-[0.2em] text-xs uppercase">ONLINE STABILITY TERMINAL CONNECTED</span>
          </div>
          <h1 className="font-bebas text-5xl sm:text-7xl text-white uppercase mt-1">
            CONCIERGE <span className="text-stroke-orange">OPERATIONS</span>
          </h1>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onResetData}
            className="bg-black hover:bg-white/5 text-xs text-[#FFD60A] font-barlow font-bold tracking-widest uppercase border border-[#FFD60A]/30 px-5 py-3 border-bevel cursor-pointer"
          >
            RESET ALL SYSTEM DATA
          </button>
          <button 
            onClick={handleLogout}
            className="bg-[#FF5500] hover:bg-[#D44700] text-xs text-white font-barlow font-bold tracking-widest uppercase px-5 py-3 border-bevel cursor-pointer flex items-center gap-2"
          >
            <LogOut size={14} />
            <span>TERMINATE TERMINAL</span>
          </button>
        </div>
      </section>

      {/* CONSOLE METRICS GAUGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#121A36] border border-white/5 p-6 border-bevel">
            <span className="font-barlow text-[10px] tracking-widest text-gray-500 uppercase font-bold">TOTAL REGISTERED ATHLETES</span>
            <p className="font-bebas text-4xl text-[#FFD60A] mt-1">50,845 MEMBERS</p>
            <p className="text-[10px] text-gray-400 mt-2 font-mono">Simulated growth (+14% monthly index)</p>
          </div>

          <div className="bg-[#121A36] border border-white/5 p-6 border-bevel">
            <span className="font-barlow text-[10px] tracking-widest text-gray-500 uppercase font-bold">CLASS CAPACITY OCCUPANCY</span>
            <p className="font-bebas text-4xl text-white mt-1">{bookedPercentage}% RESERVED</p>
            <div className="w-full bg-black h-1.5 rounded-full overflow-hidden mt-3">
              <div className="h-full bg-[#FF5500]" style={{ width: `${bookedPercentage}%` }}></div>
            </div>
          </div>

          <div className="bg-[#121A36] border border-white/5 p-6 border-bevel">
            <span className="font-barlow text-[10px] tracking-widest text-gray-500 uppercase font-bold">ACTIVE GENERAL MARQUEES</span>
            <p className="font-bebas text-4xl text-[#FFD60A] mt-1">
              {announcements.filter(a => a.active).length} / {announcements.length} ACTIVE
            </p>
            <p className="text-[10px] text-gray-400 mt-2 font-mono">Ticker scrolls automatically in live layout</p>
          </div>

          <div className="bg-[#121A36] border border-white/5 p-6 border-bevel">
            <span className="font-barlow text-[10px] tracking-widest text-gray-500 uppercase font-bold">TELEGRAM NOTIFICATION MODULE</span>
            <p className="font-bebas text-4xl text-emerald-500 mt-1">STANDBY MODE</p>
            <p className="text-[10px] text-gray-400 mt-2 font-mono">Messages routed via container server.ts</p>
          </div>
        </div>
      </section>

      {/* CORE CONTROLS LAYOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Manage Announcements */}
        <div className="lg:col-span-5 bg-[#121A36] border border-white/5 p-6 border-bevel">
          <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
            <Settings className="text-[#FF5500]" size={20} />
            <h3 className="font-bebas text-2xl uppercase tracking-wide">MARQUEE BROADCASTS CONTROL</h3>
          </div>

          {/* Add Form */}
          <form onSubmit={handleAddAnnouncement} className="mb-8 space-y-4">
            <div>
              <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1.5">Add Broadcast Marquee Notice</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  required
                  placeholder="ENTER NEW MARQUEE TEXT..."
                  value={newAnnText}
                  onChange={(e) => setNewAnnText(e.target.value)}
                  className="flex-grow bg-[#0A1128] border border-white/10 text-white font-barlow text-xs uppercase p-3 focus:outline-none focus:border-[#FF5500] placeholder-white/20 font-mono"
                />
                <button 
                  type="submit"
                  className="bg-[#FF5500] hover:bg-[#D44700] text-white px-4 border-bevel cursor-pointer"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 font-barlow text-[10px] tracking-wider uppercase font-bold mb-1.5">Select Category Category</label>
              <select 
                value={newAnnCategory}
                onChange={(e) => setNewAnnCategory(e.target.value)}
                className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-xs uppercase p-2 focus:outline-none focus:border-[#FF5500]"
              >
                <option value="Classes">Classes</option>
                <option value="App">App Companion</option>
                <option value="Challenges">Challenges</option>
                <option value="Events">Live Events</option>
                <option value="Amenities">Amenities & Spas</option>
                <option value="General">General Broadcast</option>
              </select>
            </div>
          </form>

          {/* List existing */}
          <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-2">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-4 bg-black/40 border border-white/5 flex justify-between items-center gap-4">
                <div className="flex-grow min-w-0">
                  <span className="text-[9px] font-barlow font-bold tracking-widest text-[#FFD60A] uppercase block">
                    {ann.category} • {ann.date}
                  </span>
                  <p className="text-xs text-white truncate uppercase font-mono tracking-wider mt-1">{ann.text}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Toggle Active status */}
                  <button 
                    onClick={() => handleToggleAnnActive(ann.id)}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title={ann.active ? "Click to Deactivate" : "Click to Activate"}
                  >
                    {ann.active ? (
                      <ToggleRight className="text-emerald-500" size={24} />
                    ) : (
                      <ToggleLeft className="text-gray-600" size={24} />
                    )}
                  </button>
                  {/* Delete notice */}
                  <button 
                    onClick={() => handleDeleteAnn(ann.id)}
                    className="text-gray-500 hover:text-[#FF5500] transition-colors cursor-pointer"
                    title="Delete notice"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Manage Class Schedules */}
        <div className="lg:col-span-7 bg-[#121A36] border border-white/5 p-6 border-bevel">
          <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
            <Sliders className="text-[#FF5500]" size={20} />
            <h3 className="font-bebas text-2xl uppercase tracking-wide">GROUP SCHEDULE SLOTS MODIFIER</h3>
          </div>

          {/* Edit Slot panel if selected */}
          {selectedSchId ? (
            <div className="mb-8 p-6 bg-black/40 border-2 border-[#FF5500] border-bevel">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bebas text-xl text-[#FFD60A]">MODIFY SCHEDULE SLOT</h4>
                <button 
                  onClick={() => setSelectedSchId(null)}
                  className="text-gray-500 hover:text-white font-bebas text-xs cursor-pointer"
                >
                  CANCEL [X]
                </button>
              </div>

              <form onSubmit={handleSaveClassEdit} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-400 font-barlow text-[9px] uppercase font-bold mb-1">Time Slot</label>
                  <input 
                    type="text"
                    required
                    value={editingTime}
                    onChange={(e) => setEditingTime(e.target.value)}
                    className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-xs uppercase p-2 focus:outline-none focus:border-[#FF5500]"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-barlow text-[9px] uppercase font-bold mb-1">Trainer</label>
                  <input 
                    type="text"
                    required
                    value={editingTrainer}
                    onChange={(e) => setEditingTrainer(e.target.value)}
                    className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-xs uppercase p-2 focus:outline-none focus:border-[#FF5500]"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-barlow text-[9px] uppercase font-bold mb-1">Spots Left</label>
                  <input 
                    type="number"
                    required
                    value={editingSpotsLeft}
                    onChange={(e) => setEditingSpotsLeft(Number(e.target.value))}
                    className="w-full bg-[#0A1128] border border-white/10 text-white font-barlow text-xs uppercase p-2 focus:outline-none focus:border-[#FF5500]"
                  />
                </div>

                <button 
                  type="submit"
                  className="sm:col-span-3 w-full bg-[#FF5500] hover:bg-[#D44700] text-white font-bebas text-lg py-2.5 uppercase tracking-wider border-bevel cursor-pointer mt-2"
                >
                  SAVE SCHEDULE SLOT MODIFICATIONS
                </button>
              </form>
            </div>
          ) : (
            <div className="mb-4 text-xs text-gray-400 font-sans p-3 bg-black/20 border border-white/5">
              💡 Select any class schedule block from the directory index below to modify its spots count, trainer, or schedule time slots in real time.
            </div>
          )}

          {/* List slots */}
          <div className="space-y-3.5 max-h-[480px] overflow-y-auto pr-2">
            {classSchedules.map((sch) => (
              <div 
                key={sch.id} 
                className="p-4 bg-black/40 border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-white/15 transition-all"
              >
                <div>
                  <div className="flex gap-2 items-center">
                    <span className="text-[10px] font-barlow font-bold text-gray-500 uppercase tracking-widest">{sch.day}</span>
                    <span className="text-[#FFD60A] text-[9px] font-mono">[{sch.time}]</span>
                  </div>
                  <h4 className="font-bebas text-xl text-white tracking-wide uppercase mt-0.5">{sch.className}</h4>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5">Trainer: {sch.trainer} | Spots Left: {sch.spotsLeft} / {sch.spotsTotal}</p>
                </div>

                <button 
                  onClick={() => handleSelectClassEdit(sch)}
                  className="bg-black hover:bg-[#FF5500] text-white hover:text-white font-barlow text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest border border-white/5 transition-colors cursor-pointer select-none"
                >
                  FAST MODIFY
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
