import { useState } from "react";
import { initialLocations, FitnessLocation } from "../../lib/fitness-data";
import { MapPin, Phone, Clock, Compass, Dumbbell, Shield, Sparkles, Search } from "lucide-react";

interface LocationsViewProps {
  onOpenTrialModal: () => void;
}

export default function LocationsView({ onOpenTrialModal }: LocationsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<FitnessLocation | null>(null);

  const filteredLocations = initialLocations.filter(loc => 
    loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#0A1128] text-white min-h-screen relative py-12">
      <div className="film-grain"></div>

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <span className="text-[#FF5500] font-barlow font-bold tracking-[0.3em] text-xs uppercase">NATIONAL CO-LOCATED PERFORMANCE SUITES</span>
        <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl leading-none text-white uppercase tracking-wide">
          FIND YOUR <span className="text-stroke-orange">EPSILON</span>
        </h1>
        <p className="text-gray-400 mt-4 max-w-xl text-sm sm:text-base leading-relaxed">
          12 highly secure athletic sanctuaries equipped with premium powerbuilding rigs, Olympic platforms, recovery saunas, and immersive cycling chambers.
        </p>
      </section>

      {/* SEARCH BAR BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text"
            placeholder="SEARCH BY CITY OR STATE SUITE..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#121A36] border border-white/10 rounded-sm text-white font-barlow text-sm uppercase px-12 py-4 focus:outline-none focus:border-[#FF5500] focus:ring-0 placeholder-white/20"
          />
        </div>
      </section>

      {/* LOCATIONS LIST GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {filteredLocations.length === 0 ? (
          <div className="text-center py-20 border border-white/5 bg-[#121A36]/40 border-bevel">
            <MapPin size={48} className="mx-auto text-gray-600 mb-4 animate-pulse" />
            <p className="font-bebas text-3xl text-gray-400">NO LOCATIONS MATCH YOUR SEARCH</p>
            <p className="text-gray-500 font-barlow text-xs tracking-widest uppercase mt-1">Please double check your spellings or type another city</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLocations.map((loc) => (
              <div 
                key={loc.id} 
                className="bg-[#121A36] border border-white/5 p-8 flex flex-col justify-between border-bevel hover:border-white/20 transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[#FFD60A] font-barlow text-xs font-bold uppercase tracking-widest">
                        {loc.area}
                      </span>
                      <h3 className="font-bebas text-4xl text-white mt-1 uppercase group-hover:text-[#FF5500] transition-colors">{loc.city}</h3>
                    </div>
                    <MapPin className="text-[#FF5500] group-hover:animate-bounce mt-1" size={20} />
                  </div>

                  <div className="h-[1px] bg-white/5 my-4"></div>

                  {/* Operation Coordinates */}
                  <div className="space-y-3.5 text-xs text-gray-400 font-sans mb-6">
                    <p className="flex items-start gap-2.5">
                      <Compass size={14} className="text-gray-500 shrink-0 mt-0.5" />
                      <span className="text-gray-300">{loc.address}</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Phone size={14} className="text-gray-500 shrink-0" />
                      <span className="text-gray-300 font-mono">{loc.phone}</span>
                    </p>
                    <p className="flex items-start gap-2.5">
                      <Clock size={14} className="text-gray-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Mon-Fri:</strong> {loc.hoursWeekdays} <br />
                        <strong className="text-white">Sat-Sun:</strong> {loc.hoursWeekends}
                      </span>
                    </p>
                  </div>

                  {/* Amenities Tags */}
                  <div className="mb-6">
                    <span className="text-[10px] font-barlow font-bold tracking-widest text-gray-500 uppercase block mb-2">CLUB SUITE AMENITIES</span>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.amenities.map((am, i) => (
                        <span key={i} className="text-[9px] font-barlow uppercase font-bold tracking-wider bg-black/40 text-[#FFD60A] border border-[#FFD60A]/10 px-2.5 py-1">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Classes offered list */}
                  <div>
                    <span className="text-[10px] font-barlow font-bold tracking-widest text-gray-500 uppercase block mb-2">CLASSES SCHEDULED HERE</span>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.classesOffered.map((cl, i) => (
                        <span key={i} className="text-[9px] font-barlow uppercase font-bold tracking-wider bg-white/5 text-gray-300 border border-white/5 px-2 py-0.5">
                          {cl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex gap-3">
                  <button 
                    onClick={() => setSelectedLocation(loc)}
                    className="flex-1 bg-black hover:bg-white/5 text-gray-300 hover:text-white font-barlow text-xs font-bold py-2.5 uppercase tracking-wider transition-all border border-white/5 cursor-pointer"
                  >
                    ACCESS DETAILS
                  </button>
                  <button 
                    onClick={onOpenTrialModal}
                    className="flex-grow bg-[#FF5500] hover:bg-[#D44700] text-white font-barlow text-xs font-bold py-2.5 uppercase tracking-widest transition-all glow-orange border-bevel cursor-pointer"
                  >
                    VISIT SUITE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* DETAILS MODAL */}
      {selectedLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#121A36] border-2 border-[#FF5500] max-w-2xl w-full border-bevel overflow-hidden shadow-[0_0_50px_rgba(255,85,0,0.3)]">
            <div className="p-6 border-b border-white/10 bg-black/40 flex justify-between items-center">
              <div>
                <span className="text-[#FF5500] font-barlow text-xs font-bold uppercase tracking-widest">DETAILED SUITE SCHEMATICS</span>
                <h3 className="font-bebas text-3xl text-white mt-1">EPSILON - {selectedLocation.city.toUpperCase()}</h3>
              </div>
              <button 
                onClick={() => setSelectedLocation(null)}
                className="text-gray-500 hover:text-white font-bebas text-xl cursor-pointer"
              >
                [X]
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Address Map mock info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-barlow text-xs tracking-wider uppercase font-bold text-gray-400 mb-2">Club Location coordinates</h4>
                  <p className="text-sm font-medium">{selectedLocation.address}</p>
                  <p className="text-xs text-gray-500 font-mono mt-1">Direct line: {selectedLocation.phone}</p>
                  
                  <div className="h-[1px] bg-white/5 my-4"></div>

                  <h4 className="font-barlow text-xs tracking-wider uppercase font-bold text-gray-400 mb-2">Hours of Operation</h4>
                  <div className="text-xs space-y-1 text-gray-300">
                    <p><span className="text-white font-medium">Monday to Friday:</span> {selectedLocation.hoursWeekdays}</p>
                    <p><span className="text-white font-medium">Saturday to Sunday:</span> {selectedLocation.hoursWeekends}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-barlow text-xs tracking-wider uppercase font-bold text-gray-400 mb-2">Parking & Transit Guidelines</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans bg-black/30 p-4 border border-white/5 border-bevel">
                    {selectedLocation.parkingInfo}
                  </p>
                </div>
              </div>

              {/* Complete Premium Amenities layout */}
              <div className="border-t border-white/5 pt-4">
                <h4 className="font-barlow text-xs tracking-wider uppercase font-bold text-gray-400 mb-3">Premium Suite Amenities Include</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedLocation.amenities.map((am, i) => (
                    <div key={i} className="flex items-center gap-2 bg-black/30 p-2.5 border border-white/5">
                      <Sparkles size={12} className="text-[#FFD60A]" />
                      <span className="text-xs uppercase font-barlow tracking-wider font-bold text-gray-300">{am}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 flex gap-4">
                <button 
                  onClick={() => {
                    setSelectedLocation(null);
                    onOpenTrialModal();
                  }}
                  className="flex-1 bg-[#FF5500] hover:bg-[#D44700] text-white font-bebas text-xl py-3 tracking-wider transition-colors border-bevel cursor-pointer"
                >
                  BOOK FREE SESSION AT THIS LOCATION
                </button>
                <button 
                  onClick={() => setSelectedLocation(null)}
                  className="border border-gray-600 hover:border-white text-gray-400 hover:text-white font-barlow text-xs font-bold px-6 py-3 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  BACK TO DIRECTORY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
