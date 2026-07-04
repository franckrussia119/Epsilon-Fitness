@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-bebas: "Bebas Neue", sans-serif;
  --font-barlow: "Barlow Condensed", sans-serif;
  --font-sans: "Inter", sans-serif;
  
  --color-brand-orange: #FF5500;
  --color-brand-dark: #0A1128;
  --color-brand-gold: #FFD60A;
  --color-brand-surface: #121A36;
  --color-brand-card: #1C2A5E;
  --color-brand-text: #9CA3AF;
  
  --animate-marquee: marquee 30s linear infinite;
  --animate-marquee-reverse: marquee-reverse 30s linear infinite;
}

@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}

/* Custom Cinematic Stroke and Grain Layer */
.text-stroke-orange {
  -webkit-text-stroke: 2px #FF5500;
  color: transparent;
}

.text-stroke-gold {
  -webkit-text-stroke: 1.5px #FFD60A;
  color: transparent;
}

.text-stroke-white {
  -webkit-text-stroke: 2px #FFFFFF;
  color: transparent;
}

/* Film Grain Simulation */
.film-grain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.05;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* Scrollbar customization */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0A1128;
}
::-webkit-scrollbar-thumb {
  background: #1C2A5E;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #FF5500;
}

/* Custom glowing shadows */
.glow-orange {
  box-shadow: 0 10px 25px rgba(255, 85, 0, 0.3), 0 0 15px rgba(255, 85, 0, 0.15);
}

.glow-gold {
  box-shadow: 0 10px 25px rgba(255, 214, 10, 0.3), 0 0 15px rgba(255, 214, 10, 0.15);
}

.border-bevel {
  border-radius: 1rem !important;
  box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 85, 0, 0.12) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
}

.glass-panel {
  background: rgba(18, 26, 54, 0.75);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1rem !important;
  box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.6) !important;
}

/* Global rounded shapes with elegant shadows */
input, select, textarea {
  border-radius: 0.75rem !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), inset 0 2px 4px 0 rgba(0, 0, 0, 0.3) !important;
  transition: all 0.2s ease-in-out;
}

input:focus, select:focus, textarea:focus {
  box-shadow: 0 0 0 2px rgba(255, 85, 0, 0.5), 0 4px 6px -1px rgba(0, 0, 0, 0.2) !important;
}

button {
  border-radius: 0.75rem !important;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
}

button:active {
  transform: translateY(1px);
}
