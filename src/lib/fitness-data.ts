export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  image: string;
  certifications: string[];
  quote: string;
  socials: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface ClassSchedule {
  id: string;
  className: string;
  trainer: string;
  day: string; // Monday, Tuesday, etc.
  time: string; // e.g. 06:00 AM
  duration: string;
  intensity: number; // 1 to 5 flames
  spotsLeft: number;
  spotsTotal: number;
}

export interface FitnessLocation {
  id: string;
  city: string;
  area: string;
  address: string;
  phone: string;
  hoursWeekdays: string;
  hoursWeekends: string;
  amenities: string[];
  classesOffered: string[];
  parkingInfo: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  stat: string;
  quote: string;
  rating: number;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  duration: string;
  rules: string[];
  totalParticipants: number;
  progressPct: number;
  prize: string;
  topMembers: { name: string; score: number }[];
}

export interface NutritionPlan {
  id: string;
  name: string;
  subtitle: string;
  calories: string;
  macros: {
    carbs: string;
    protein: string;
    fat: string;
  };
  meals: {
    time: string;
    name: string;
    details: string;
  }[];
  supplementRecs: string[];
}

export interface Announcement {
  id: string;
  text: string;
  category: string;
  date: string;
  active: boolean;
}

// 8 core trainer profiles
export const initialTrainers: Trainer[] = [
  {
    id: "trainer-marcus",
    name: "Marcus Williams",
    role: "Head of Strength & Conditioning",
    specialty: "Olympic Lifting & Powerbuilding",
    bio: "Former NFL strength coach. 15 years elite training experience working with professional athletes and Olympic competitors. Marcus believes that building strength is the ultimate foundation of human performance.",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80",
    certifications: ["CSCS *D", "USAW Level 2", "FMS Level 2", "BS Exercise Science"],
    quote: "Build a foundation that cannot be shaken.",
    socials: { instagram: "@marcus_iron", twitter: "@marcus_lifts" }
  },
  {
    id: "trainer-zara",
    name: "Zara Johnson",
    role: "Director of Group Fitness",
    specialty: "Championship Boxing & Conditioning",
    bio: "Golden Gloves champion boxer turned world-renowned fitness instructor. Zara has spent a decade refining class formats that push mental boundaries. Her sessions combine fight-ready physical preparation with high-octane energy.",
    image: "https://images.unsplash.com/photo-1609899537878-48b93a7c9e45?w=600&q=80",
    certifications: ["PES", "NASM CPT", "USA Boxing Coach", "CPR/AED"],
    quote: "Gloves on, ego off. We fight for who we want to become.",
    socials: { instagram: "@zara_box", linkedin: "zara-johnson-fitness" }
  },
  {
    id: "trainer-alex",
    name: "Alex Torres",
    role: "Recovery & Mobility Specialist",
    specialty: "Sports Physiotherapy & Deep Tissue Restore",
    bio: "Licensed sports physiotherapist who has worked with European soccer giants and Olympic gymnasts. Alex focuses on functional patterns, muscle activation, joint longevity, and systemic recovery protocols.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
    certifications: ["DPT", "ART Certified", "CES", "PRI Practitioner"],
    quote: "True champions respect recovery as much as they respect the iron.",
    socials: { instagram: "@alex_recovery", linkedin: "alex-torres-dpt" }
  },
  {
    id: "trainer-kai",
    name: "Kai Park",
    role: "Cardio & HIIT Director",
    specialty: "Metabolic Conditioning & Endurance",
    bio: "Ultra-marathon competitor and elite hybrid athlete. Kai redefined high-intensity training with scientifically backed heart-rate zone strategies. He runs our signature interval formats with uncompromising precision.",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&q=80",
    certifications: ["NASM PES", "Oxygen Advantage Coach", "Endurance Specialist"],
    quote: "Do not negotiate with your own fatigue.",
    socials: { instagram: "@kai_machine", twitter: "@kai_runs" }
  },
  {
    id: "trainer-sarah",
    name: "Sarah Chen",
    role: "Lead Yoga Flow Guide",
    specialty: "Hot Vinyasa & Deep Athletic Stretching",
    bio: "Formally trained in India and spent 8 years teaching high-performance yoga to collegiate athletic departments. Sarah brings a powerful, challenging, and deeply restoring yoga practice designed for tight lifters.",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80",
    certifications: ["RYT 500", "YACEP", "Myofascial Release Certified"],
    quote: "Melt away the tension to reveal your true capacity.",
    socials: { instagram: "@sarah_flow" }
  },
  {
    id: "trainer-damon",
    name: "Damon Cross",
    role: "Elite Tier 4 Coach",
    specialty: "Hypertrophy & Body Recomposition",
    bio: "A master of muscle development and aesthetic conditioning. Damon uses precision programming and high-volume methodologies to build symmetry, dense muscle tissue, and extreme power.",
    image: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?w=600&q=80",
    certifications: ["NASM CPT", "FNS", "Hypertrophy Mastery Level 3"],
    quote: "Discipline is the bridge between goals and accomplishments.",
    socials: { instagram: "@damon_iron" }
  },
  {
    id: "trainer-elena",
    name: "Elena Rostova",
    role: "Lead Cycling Presenter",
    specialty: "High-RPM Surge & Aerobic Engine",
    bio: "Former competitive velodrome cyclist and club DJ. Elena designs cycle rides that feel like a theatrical journey, combining perfect audio sync with intense metabolic sprint intervals.",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600&q=80",
    certifications: ["Schwinn Cycling Master", "AFAA Group Exercise", "PES"],
    quote: "Lose yourself in the beat, find yourself in the speed.",
    socials: { instagram: "@elena_surges" }
  },
  {
    id: "trainer-victor",
    name: "Victor Vance",
    role: "Combat Performance Specialist",
    specialty: "Kickboxing & Tactical Mobility",
    bio: "Ex-military combat instructor and mixed martial arts competitor. Victor focuses on reactive power, rotational force generation, and lightning-fast agility work.",
    image: "https://images.unsplash.com/photo-1491756906593-95163e72dc40?w=600&q=80",
    certifications: ["Krav Maga Expert", "WKF Black Belt", "CSCS"],
    quote: "Preparation breeds confidence. Confidence guarantees victory.",
    socials: { instagram: "@victor_combat", twitter: "@v_vance" }
  }
];

// 12 Premium Locations
export const initialLocations: FitnessLocation[] = [
  {
    id: "loc-nyc",
    city: "New York City",
    area: "Upper West Side",
    address: "2140 Broadway, New York, NY 10023",
    phone: "(212) 555-0190",
    hoursWeekdays: "5:00 AM - 11:00 PM",
    hoursWeekends: "6:00 AM - 9:00 PM",
    amenities: ["Olympic Pool", "Sauna & Steam Room", "VIP Locker Suite", "Juice Bar", "Valet Parking", "Cryotherapy Lab"],
    classesOffered: ["Epsilon Dark", "Power Lift", "Cardio Inferno", "Yoga Flow", "Boxing Fury", "Cycle Surge"],
    parkingInfo: "Complimentary valet parking available for members. Garage access via 75th street."
  },
  {
    id: "loc-la",
    city: "Los Angeles",
    area: "Beverly Hills",
    address: "9830 Wilshire Blvd, Beverly Hills, CA 90212",
    phone: "(310) 555-0145",
    hoursWeekdays: "5:00 AM - 11:00 PM",
    hoursWeekends: "6:00 AM - 10:00 PM",
    amenities: ["Rooftop Turf Arena", "Cold Plunges & Spa", "VIP Locker Suite", "Juice Bar", "Childcare Lounge", "Physiotherapy Hub"],
    classesOffered: ["Epsilon Dark", "Power Lift", "Cardio Inferno", "Yoga Flow", "Cycle Surge", "Stretch & Recover"],
    parkingInfo: "Secure multi-level parking on-site with 3 hours of free validation for members."
  },
  {
    id: "loc-chicago",
    city: "Chicago",
    area: "River North",
    address: "440 N Wells St, Chicago, IL 60654",
    phone: "(312) 555-0112",
    hoursWeekdays: "5:00 AM - 10:00 PM",
    hoursWeekends: "7:00 AM - 8:00 PM",
    amenities: ["Olympic Pool", "Sauna & Steam Room", "Juice Bar", "Valet Parking", "Ice Bath Chambers", "Private Co-working Suite"],
    classesOffered: ["Epsilon Dark", "Power Lift", "Cardio Inferno", "Boxing Fury", "Cycle Surge", "Functional Fire"],
    parkingInfo: "Indoor heated parking with direct club elevator access. Validation at front desk."
  },
  {
    id: "loc-miami",
    city: "Miami",
    area: "South Beach",
    address: "1100 Lincoln Rd, Miami Beach, FL 33139",
    phone: "(305) 555-0177",
    hoursWeekdays: "5:00 AM - 11:00 PM",
    hoursWeekends: "6:00 AM - 9:00 PM",
    amenities: ["Rooftop Turf Arena", "Cold Plunges & Spa", "Juice Bar", "Cryotherapy Lab", "Outdoor Sunset Yoga Studio"],
    classesOffered: ["Epsilon Dark", "Power Lift", "Yoga Flow", "Boxing Fury", "Functional Fire", "Stretch & Recover"],
    parkingInfo: " Lincoln Road garage validation available. Designated scooter and bike parking spots."
  },
  {
    id: "loc-houston",
    city: "Houston",
    area: "River Oaks",
    address: "3015 Westheimer Rd, Houston, TX 77098",
    phone: "(713) 555-0133",
    hoursWeekdays: "5:00 AM - 10:00 PM",
    hoursWeekends: "6:00 AM - 8:00 PM",
    amenities: ["Olympic Pool", "Sauna & Steam Room", "VIP Locker Suite", "Juice Bar", "Childcare Lounge"],
    classesOffered: ["Epsilon Dark", "Power Lift", "Cardio Inferno", "Boxing Fury", "Cycle Surge", "Functional Fire"],
    parkingInfo: "Complimentary self-parking in the private multi-level retail garage."
  },
  {
    id: "loc-dallas",
    city: "Dallas",
    area: "Uptown",
    address: "2900 McKinney Ave, Dallas, TX 75204",
    phone: "(214) 555-0188",
    hoursWeekdays: "5:00 AM - 11:00 PM",
    hoursWeekends: "6:00 AM - 9:00 PM",
    amenities: ["Rooftop Turf Arena", "Sauna & Steam Room", "VIP Locker Suite", "Juice Bar", "Valet Parking", "Recovery Lounges"],
    classesOffered: ["Epsilon Dark", "Power Lift", "Cardio Inferno", "Yoga Flow", "Cycle Surge", "Stretch & Recover"],
    parkingInfo: "Valet parking available during peak hours. Self-parking free for 2.5 hours."
  },
  {
    id: "loc-sf",
    city: "San Francisco",
    area: "SOMA",
    address: "650 Mission St, San Francisco, CA 94105",
    phone: "(415) 555-0166",
    hoursWeekdays: "5:00 AM - 10:00 PM",
    hoursWeekends: "7:00 AM - 8:00 PM",
    amenities: ["Cold Plunges & Spa", "VIP Locker Suite", "Juice Bar", "Physiotherapy Hub", "Infrared Heat Pods"],
    classesOffered: ["Epsilon Dark", "Power Lift", "Cardio Inferno", "Yoga Flow", "Cycle Surge", "Functional Fire"],
    parkingInfo: "Discounted parking validation at the Hearst Garage located one block away."
  },
  {
    id: "loc-boston",
    city: "Boston",
    area: "Back Bay",
    address: "350 Boylston St, Boston, MA 02116",
    phone: "(617) 555-0122",
    hoursWeekdays: "5:00 AM - 10:00 PM",
    hoursWeekends: "6:00 AM - 8:00 PM",
    amenities: ["Olympic Pool", "Sauna & Steam Room", "Juice Bar", "Recovery Lounges", "Indoor Athletic Track"],
    classesOffered: ["Epsilon Dark", "Power Lift", "Cardio Inferno", "Yoga Flow", "Boxing Fury", "Stretch & Recover"],
    parkingInfo: "Metered street parking or direct access validation at the Boston Common Garage."
  },
  {
    id: "loc-atlanta",
    city: "Atlanta",
    area: "Buckhead",
    address: "3300 Peachtree Rd NE, Atlanta, GA 30326",
    phone: "(404) 555-0144",
    hoursWeekdays: "5:00 AM - 10:00 PM",
    hoursWeekends: "6:00 AM - 9:00 PM",
    amenities: ["Rooftop Turf Arena", "Sauna & Steam Room", "VIP Locker Suite", "Juice Bar", "Valet Parking", "Childcare Lounge"],
    classesOffered: ["Epsilon Dark", "Power Lift", "Cardio Inferno", "Boxing Fury", "Cycle Surge", "Functional Fire"],
    parkingInfo: "Free secure deck parking with validation. Direct skybridge from parking level 2."
  },
  {
    id: "loc-seattle",
    city: "Seattle",
    area: "Capitol Hill",
    address: "1201 E Pine St, Seattle, WA 98122",
    phone: "(206) 555-0155",
    hoursWeekdays: "5:00 AM - 10:00 PM",
    hoursWeekends: "7:00 AM - 8:00 PM",
    amenities: ["Cold Plunges & Spa", "VIP Locker Suite", "Juice Bar", "Cryotherapy Lab", "Hyperbaric Oxygen Chambers"],
    classesOffered: ["Epsilon Dark", "Power Lift", "Cardio Inferno", "Yoga Flow", "Cycle Surge", "Stretch & Recover"],
    parkingInfo: "Underground parking garage with 15 designated Epsilon charging stations."
  },
  {
    id: "loc-austin",
    city: "Austin",
    area: "Domain",
    address: "11410 Century Oaks Terrace, Austin, TX 78758",
    phone: "(512) 555-0129",
    hoursWeekdays: "5:00 AM - 11:00 PM",
    hoursWeekends: "6:00 AM - 9:00 PM",
    amenities: ["Rooftop Turf Arena", "Olympic Pool", "Sauna & Steam Room", "Juice Bar", "Outdoor Training Zone"],
    classesOffered: ["Epsilon Dark", "Power Lift", "Yoga Flow", "Cycle Surge", "Functional Fire", "Stretch & Recover"],
    parkingInfo: "Abundant open-air and garage parking available within the Domain shopping district."
  },
  {
    id: "loc-denver",
    city: "Denver",
    area: "LoDo",
    address: "1601 Wewatta St, Denver, CO 80202",
    phone: "(303) 555-0199",
    hoursWeekdays: "5:00 AM - 10:00 PM",
    hoursWeekends: "6:00 AM - 8:00 PM",
    amenities: ["Sauna & Steam Room", "VIP Locker Suite", "Juice Bar", "Cryotherapy Lab", "Altitude Conditioning Room"],
    classesOffered: ["Epsilon Dark", "Power Lift", "Cardio Inferno", "Boxing Fury", "Functional Fire", "Stretch & Recover"],
    parkingInfo: "Reserved garage spaces for members. Elevator direct to club check-in desk."
  }
];

// 20 Member Testimonials (No apostrophes in quotes/names)
export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "James M.",
    location: "Chicago",
    stat: "Lost 47 lbs in 4 months",
    quote: "Epsilon completely reshaped my perspective on fitness. The dark lighting and music make every workout feel like an elite arena battle. You dont have time to make excuses.",
    rating: 5
  },
  {
    id: "test-2",
    name: "Sarah K.",
    location: "NYC",
    stat: "Triathlete in 6 months",
    quote: "The coaching here is absolute class. I transitioned from basic training to completing my first full distance event. Epsilon is the gold standard of luxury athletic conditioning.",
    rating: 5
  },
  {
    id: "test-3",
    name: "David R.",
    location: "LA",
    stat: "Gained 22 lbs of muscle",
    quote: "Marcus Williams strength classes helped me break plateaus I have struggled with for years. The culture in this building motivates you to crush your previous records every day.",
    rating: 5
  },
  {
    id: "test-4",
    name: "Linda C.",
    location: "Miami",
    stat: "Ran first marathon at 52",
    quote: "I thought my best running years were behind me. Under Kais cardio direction, my endurance reached levels I never thought possible. Outstanding facility and staff.",
    rating: 5
  },
  {
    id: "test-5",
    name: "Marcus T.",
    location: "Houston",
    stat: "Lost 80 lbs, became coach",
    quote: "Epsilon saved my life. I went from being entirely sedentary to hitting physical benchmarks that allowed me to transition into training others. Truly where legends are built.",
    rating: 5
  },
  {
    id: "test-6",
    name: "Tom W.",
    location: "Dallas",
    stat: "Transformed at age 60",
    quote: "The coaches customized recovery protocols for my joints. I am lifting heavier and running faster than I did in my thirties. Age is just a metric here.",
    rating: 5
  },
  {
    id: "test-7",
    name: "Rachel G.",
    location: "Boston",
    stat: "Reformed posture & mobility",
    quote: "Alex Torres mobility work cured my chronic lower back issues. I can train fully again without fear. The recovery suite alone is worth the premium membership.",
    rating: 5
  },
  {
    id: "test-8",
    name: "Chris L.",
    location: "San Francisco",
    stat: "Bench press went 225 to 315",
    quote: "Power Lift format is brutal but highly effective. The energy of the other members is infectious. If you want to remain average, this is not the place for you.",
    rating: 5
  },
  {
    id: "test-9",
    name: "Amanda P.",
    location: "Austin",
    stat: "Elite Core member 2 years",
    quote: "Every single detail has been thought of. From the premium luxury locker suites to the cold plunges and high-intensity boxing rooms. Best investment in myself ever.",
    rating: 5
  },
  {
    id: "test-10",
    name: "Brandon K.",
    location: "Atlanta",
    stat: "Dropped 12% body fat",
    quote: "Epsilon Dark format is the most intense hour of fitness on the planet. You sweat, you fight, and you leave feeling completely indestructible. I am absolutely hooked.",
    rating: 5
  },
  {
    id: "test-11",
    name: "Jessica V.",
    location: "Denver",
    stat: "Increased squat by 90 lbs",
    quote: "I love the tracking tech. Being able to analyze metabolic performance on the app helps me target exact intensity zones during my lifting and running.",
    rating: 5
  },
  {
    id: "test-12",
    name: "Tyler S.",
    location: "Seattle",
    stat: "Mastered Olympic clean & jerk",
    quote: "You receive elite athletic guidance without the pretentiousness. The trainers are experts who genuinely care about structural safety and heavy loading.",
    rating: 5
  },
  {
    id: "test-13",
    name: "Nadia R.",
    location: "Beverly Hills",
    stat: "Recovered from ACL surgery",
    quote: "The team here worked in tandem with my physical therapists to design a functional conditioning model. My knee feels more stable now than before the injury.",
    rating: 5
  },
  {
    id: "test-14",
    name: "Jordan P.",
    location: "Upper West Side",
    stat: "Gained 15 lbs lean mass",
    quote: "The nutrition coaching combined with elite lifting programs is unbeatable. They break down macros and deliver direct meal guides that make muscle gains simple.",
    rating: 5
  },
  {
    id: "test-15",
    name: "Elena M.",
    location: "SOMA SF",
    stat: "Found mental clarity & power",
    quote: "Hot Vinyasa classes build immense core stability while providing a mental escape. The environment feels sacred, premium, and intensely challenging.",
    rating: 5
  },
  {
    id: "test-16",
    name: "Kevin D.",
    location: "River North",
    stat: "Completed 100-mile ultra",
    quote: "Endurance zones require perfect pacing. Kai helped me master respiratory control and lactic thresholds. I chopped two full hours off my ultra finish time.",
    rating: 5
  },
  {
    id: "test-17",
    name: "Sofia H.",
    location: "South Beach",
    stat: "Boxing champion amateur",
    quote: "Zaras boxing conditioning class is legendary. It replicates actual professional boxing camps. It taught me grit, lightning speed, and relentless cardio output.",
    rating: 5
  },
  {
    id: "test-18",
    name: "Derrick J.",
    location: "Uptown Dallas",
    stat: "Deadlift reached 500 lbs",
    quote: "The heavy iron setups here are immaculate. Pristine platforms, calibrated plates, and coaches who know how to cue properly. Best athletic club in Texas.",
    rating: 5
  },
  {
    id: "test-19",
    name: "Nicolette B.",
    location: "Domain Austin",
    stat: "Eliminated chronic pain",
    quote: "The infrared heat pods and compression gear in the recovery lounge changed everything. I can load heavy weight multiple times a week with zero joint stiffness.",
    rating: 5
  },
  {
    id: "test-20",
    name: "Gregory T.",
    location: "LoDo Denver",
    stat: "Altitude training master",
    quote: "The simulated altitude conditioning room is incredible. Preparing for mountain runs inside Epsilon gave me an enormous competitive edge this summer.",
    rating: 5
  }
];

// 5 Active Challenges
export const initialChallenges: Challenge[] = [
  {
    id: "chal-1",
    name: "30-Day Transformation Challenge",
    description: "Our signature physical and mental evolution event. Track body composition, sleep quality, and strength metrics over 30 days.",
    duration: "30 Days (Active)",
    rules: [
      "Attend minimum 4 classes per week",
      "Log all workouts inside the Epsilon Pro App",
      "Participate in weekly recovery diagnostics",
      "Complete initial and final body scans"
    ],
    totalParticipants: 1845,
    progressPct: 65,
    prize: "1 Year Gold Elite Membership + Epsilon Premium Apparel Kit",
    topMembers: [
      { name: "John Miller", score: 98.4 },
      { name: "Clara Smith", score: 97.2 },
      { name: "Robert Davies", score: 95.9 }
    ]
  },
  {
    id: "chal-2",
    name: "Iron Warrior Squat Series",
    description: "A pure strength test. Build maximum lower body force and track total squat volume output across three testing cycles.",
    duration: "14 Days Remaining",
    rules: [
      "Record certified lifts under coach supervision",
      "Weekly volume must increase by at least 2 percent",
      "Perfect depth mechanics required on all counted reps"
    ],
    totalParticipants: 620,
    progressPct: 40,
    prize: "Epsilon Custom Barbell + 4 Personal Coaching Sessions",
    topMembers: [
      { name: "Mark Peterson", score: 14200 },
      { name: "David Vance", score: 13950 },
      { name: "Teresa Garcia", score: 13100 }
    ]
  },
  {
    id: "chal-3",
    name: "Metabolic Burn 5000",
    description: "Endurance and speed challenge. Achieve the maximum heart rate zone output while logging treadmill and cycle intervals.",
    duration: "7 Days Remaining",
    rules: [
      "Use official club heart rate strap during runs",
      "Complete designated incline interval profiles",
      "Maximum of 500 points logged per session"
    ],
    totalParticipants: 1240,
    progressPct: 80,
    prize: "Hyperice Hypervolt Go + 10 Epsilon Juice Bar Passes",
    topMembers: [
      { name: "Sarah Jenkins", score: 4850 },
      { name: "Alex K.", score: 4720 },
      { name: "Linda C.", score: 4690 }
    ]
  },
  {
    id: "chal-4",
    name: "The Century Ride Surge",
    description: "Cycling challenge targeting cumulative distance. Spin your way through custom sound-synced rides to reach 100 miles.",
    duration: "Starts August 1",
    rules: [
      "All sessions must be performed on club spin bikes",
      "Track distances through app integration",
      "Maximum of 2 recorded rides per day"
    ],
    totalParticipants: 950,
    progressPct: 0,
    prize: "Premium Epsilon Cycling Shoes + Heart Rate Monitor",
    topMembers: [
      { name: "Gregory Cole", score: 0 },
      { name: "Samantha Lee", score: 0 },
      { name: "Tom Watson", score: 0 }
    ]
  },
  {
    id: "chal-5",
    name: "Recovery Master Protocol",
    description: "Focus on sleep, mobility, and cold therapy. The champion knows that recovery is where tissue is rebuilt and mind is cleared.",
    duration: "Active This Week",
    rules: [
      "Attend 2 Stretch and Recover sessions",
      "Perform 3 cold plunge cycles (minimum 3 minutes each)",
      "Log 8 hours of sleep for 5 consecutive nights"
    ],
    totalParticipants: 712,
    progressPct: 90,
    prize: "Theragun Prime + Complete Recovery Suite Day Pass",
    topMembers: [
      { name: "Clara Smith", score: 100 },
      { name: "James Mercer", score: 100 },
      { name: "Patricia Lopez", score: 98 }
    ]
  }
];

// 4 Premium Nutrition Plans
export const initialNutritionPlans: NutritionPlan[] = [
  {
    id: "nut-lean",
    name: "Lean Cut Protocol",
    subtitle: "Accelerate fat loss while preserving elite athletic muscle mass.",
    calories: "1,800 - 2,200 kcal/day",
    macros: { carbs: "30%", protein: "45%", fat: "25%" },
    meals: [
      { time: "07:30 AM", name: "Pro-Breakfast Pot", details: "Egg whites, fresh spinach, turkey breast, half avocado." },
      { time: "11:30 AM", name: "Epsilon Shred Bowl", details: "Grilled chicken breast, riced cauliflower, steamed broccoli, olive oil drizzle." },
      { time: "03:30 PM", name: "Midday Fuel Shake", details: "Whey protein isolate, water, unsweetened almond butter, organic chia seeds." },
      { time: "07:30 PM", name: "Ocean Recovery Platter", details: "Seared wild salmon fillet, asparagus spears, fresh green salad with lemon." }
    ],
    supplementRecs: ["Whey Protein Isolate", "L-Carnitine", "Omega-3 Fish Oil", "Multivitamin Complex"]
  },
  {
    id: "nut-build",
    name: "Muscle Build System",
    subtitle: "Maximize muscle hypertrophy and strength recovery parameters.",
    calories: "3,000 - 3,500 kcal/day",
    macros: { carbs: "45%", protein: "35%", fat: "20%" },
    meals: [
      { time: "07:00 AM", name: "Power Oats Bowl", details: "Organic rolled oats, whey protein, whole banana, raw honey, almond butter." },
      { time: "11:00 AM", name: "Iron Builder Lunch", details: "Lean grass-fed ground beef, white jasmine rice, roasted sweet potato cubes." },
      { time: "03:00 PM", name: "Anabolic Pre-Workout Snack", details: "Sourdough toast, sliced turkey breast, organic liquid egg whites." },
      { time: "08:00 PM", name: "Champion Dinner", details: "Sirloin steak, red potatoes, roasted green beans, dark chocolate squares." }
    ],
    supplementRecs: ["Creatine Monohydrate", "Whey Protein Concentrate", "Beta-Alanine", "ZMA Sleeping Agent"]
  },
  {
    id: "nut-perf",
    name: "High Performance Fuel",
    subtitle: "Optimized for extreme cardio, endurance, and rapid recovery.",
    calories: "2,500 - 2,800 kcal/day",
    macros: { carbs: "50%", protein: "30%", fat: "20%" },
    meals: [
      { time: "07:30 AM", name: "Energy Grid Waffles", details: "Protein buckwheat waffles, berry compote, pure maple syrup, scrambled eggs." },
      { time: "12:00 PM", name: "Endurance Fuel Lunch", details: "Sliced chicken breast, quinoa pilaf, roasted beets, pumpkin seeds." },
      { time: "04:00 PM", name: "Intra-Workout Carb", details: "Cyclic dextrin beverage and branched chain amino acids (BCAAs)." },
      { time: "07:30 PM", name: "Metabolic Restorer Dinner", details: "Grilled cod fillet, large sweet potato, steamed kale, slice of sourdough." }
    ],
    supplementRecs: ["Electrolyte Recovery Salts", "Branched Chain Amino Acids (BCAA)", "Glutamine", "CoQ10"]
  },
  {
    id: "nut-plant",
    name: "Plant Power Protocol",
    subtitle: "Premium 100% plant-based formulation for clean cellular performance.",
    calories: "2,200 - 2,400 kcal/day",
    macros: { carbs: "40%", protein: "35%", fat: "25%" },
    meals: [
      { time: "08:00 AM", name: "Green Cellular Smoothie", details: "Vegan pea protein, baby spinach, spirulina, almond milk, frozen organic berries." },
      { time: "12:00 PM", name: "Tempeh Power Plate", details: "Pan-seared organic tempeh, brown rice, black beans, avocado salsa." },
      { time: "03:30 PM", name: "Almond Crunch Pot", details: "Plant protein yogurt, hemp seeds, raw walnut halves, mixed berries." },
      { time: "07:00 PM", name: "Lentil Champion Stew", details: "Thick brown lentil stew with carrots, potatoes, garlic, organic tofu cubes." }
    ],
    supplementRecs: ["Vegan Pea/Rice Protein", "Vitamin B12 Drops", "Algae-Based Omega-3", "Iron Complex"]
  }
];

// 10 Admin-managed announcements
export const initialAnnouncements: Announcement[] = [
  { id: "ann-1", text: "NEW: 5AM ULTRA DARK CLASSES NOW AVAILABLE AT ALL LOCATIONS", category: "Classes", date: "2026-07-01", active: true },
  { id: "ann-2", text: "EPSILON PRO APP - LOG EVERY REP & TRACK PERFORMANCE VIA AI COACHING", category: "App", date: "2026-07-02", active: true },
  { id: "ann-3", text: "SPRING CHALLENGE: 30 DAYS TO ULTRA TRANSFORMATION STARTS MONDAY", category: "Challenges", date: "2026-07-03", active: true },
  { id: "ann-4", text: "NEW PREMIUM LOCATION OPENING: MIAMI BEACH - COMING JULY 2026", category: "Locations", date: "2026-07-04", active: true },
  { id: "ann-5", text: "CHAMPIONS CUP SQUAT COMPETITION RECORDED LIVE ON INSTAGRAM", category: "Events", date: "2026-06-28", active: true },
  { id: "ann-6", text: "CRYOTHERAPY LABS NOW OPEN IN CHICAGO & BEVERLY HILLS SUITES", category: "Amenities", date: "2026-06-25", active: true },
  { id: "ann-7", text: "MARCUS WILLIAMS POWER SEMINAR: OPTIMAL MECHANICS FOR MAXIMUM LIFTS", category: "Education", date: "2026-06-22", active: true },
  { id: "ann-8", text: "VIP LOCKER SUITE UPGRADES COMPLETED FOR PREMIUM ELITE MEMBERS", category: "Facilities", date: "2026-06-20", active: true },
  { id: "ann-9", text: "COLD PLUNGE CHAMBERS INSTALLED AT BOTH DALLAS AND AUSTIN HEAVY ZONES", category: "Amenities", date: "2026-06-18", active: true },
  { id: "ann-10", text: "JUICE BAR SPECIAL: COLD PRESSED GOLD SHIELD IMMUNITY SURGES", category: "Menu", date: "2026-06-15", active: true }
];

// 7 days schedule helper
export const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const initialClassSchedules: ClassSchedule[] = [
  // Monday
  { id: "sch-1", className: "Epsilon Dark", trainer: "Zara Johnson", day: "Monday", time: "06:00 AM", duration: "60 min", intensity: 5, spotsLeft: 4, spotsTotal: 25 },
  { id: "sch-2", className: "Power Lift", trainer: "Marcus Williams", day: "Monday", time: "08:30 AM", duration: "60 min", intensity: 5, spotsLeft: 0, spotsTotal: 15 },
  { id: "sch-3", className: "Cardio Inferno", trainer: "Kai Park", day: "Monday", time: "12:00 PM", duration: "45 min", intensity: 4, spotsLeft: 12, spotsTotal: 30 },
  { id: "sch-4", className: "Yoga Flow", trainer: "Sarah Chen", day: "Monday", time: "05:30 PM", duration: "60 min", intensity: 2, spotsLeft: 18, spotsTotal: 25 },
  { id: "sch-5", className: "Boxing Fury", trainer: "Victor Vance", day: "Monday", time: "07:00 PM", duration: "60 min", intensity: 5, spotsLeft: 8, spotsTotal: 20 },

  // Tuesday
  { id: "sch-6", className: "Cycle Surge", trainer: "Elena Rostova", day: "Tuesday", time: "06:00 AM", duration: "45 min", intensity: 4, spotsLeft: 15, spotsTotal: 30 },
  { id: "sch-7", className: "Functional Fire", trainer: "Kai Park", day: "Tuesday", time: "08:30 AM", duration: "60 min", intensity: 5, spotsLeft: 2, spotsTotal: 20 },
  { id: "sch-8", className: "Stretch & Recover", trainer: "Alex Torres", day: "Tuesday", time: "12:00 PM", duration: "60 min", intensity: 1, spotsLeft: 22, spotsTotal: 25 },
  { id: "sch-9", className: "Power Lift", trainer: "Damon Cross", day: "Tuesday", time: "05:30 PM", duration: "60 min", intensity: 5, spotsLeft: 5, spotsTotal: 15 },
  { id: "sch-10", className: "Epsilon Dark", trainer: "Zara Johnson", day: "Tuesday", time: "07:00 PM", duration: "60 min", intensity: 5, spotsLeft: 1, spotsTotal: 25 },

  // Wednesday
  { id: "sch-11", className: "Epsilon Dark", trainer: "Zara Johnson", day: "Wednesday", time: "06:00 AM", duration: "60 min", intensity: 5, spotsLeft: 3, spotsTotal: 25 },
  { id: "sch-12", className: "Power Lift", trainer: "Marcus Williams", day: "Wednesday", time: "08:30 AM", duration: "60 min", intensity: 5, spotsLeft: 1, spotsTotal: 15 },
  { id: "sch-13", className: "Cardio Inferno", trainer: "Kai Park", day: "Wednesday", time: "12:00 PM", duration: "45 min", intensity: 4, spotsLeft: 10, spotsTotal: 30 },
  { id: "sch-14", className: "Yoga Flow", trainer: "Sarah Chen", day: "Wednesday", time: "05:30 PM", duration: "60 min", intensity: 2, spotsLeft: 15, spotsTotal: 25 },
  { id: "sch-15", className: "Boxing Fury", trainer: "Victor Vance", day: "Wednesday", time: "07:00 PM", duration: "60 min", intensity: 5, spotsLeft: 6, spotsTotal: 20 },

  // Thursday
  { id: "sch-16", className: "Cycle Surge", trainer: "Elena Rostova", day: "Thursday", time: "06:00 AM", duration: "45 min", intensity: 4, spotsLeft: 11, spotsTotal: 30 },
  { id: "sch-17", className: "Functional Fire", trainer: "Kai Park", day: "Thursday", time: "08:30 AM", duration: "60 min", intensity: 5, spotsLeft: 7, spotsTotal: 20 },
  { id: "sch-18", className: "Stretch & Recover", trainer: "Alex Torres", day: "Thursday", time: "12:00 PM", duration: "60 min", intensity: 1, spotsLeft: 20, spotsTotal: 25 },
  { id: "sch-19", className: "Power Lift", trainer: "Damon Cross", day: "Thursday", time: "05:30 PM", duration: "60 min", intensity: 5, spotsLeft: 3, spotsTotal: 15 },
  { id: "sch-20", className: "Epsilon Dark", trainer: "Zara Johnson", day: "Thursday", time: "07:00 PM", duration: "60 min", intensity: 5, spotsLeft: 0, spotsTotal: 25 },

  // Friday
  { id: "sch-21", className: "Epsilon Dark", trainer: "Zara Johnson", day: "Friday", time: "06:00 AM", duration: "60 min", intensity: 5, spotsLeft: 2, spotsTotal: 25 },
  { id: "sch-22", className: "Power Lift", trainer: "Marcus Williams", day: "Friday", time: "08:30 AM", duration: "60 min", intensity: 5, spotsLeft: 4, spotsTotal: 15 },
  { id: "sch-23", className: "Cardio Inferno", trainer: "Kai Park", day: "Friday", time: "12:00 PM", duration: "45 min", intensity: 4, spotsLeft: 14, spotsTotal: 30 },
  { id: "sch-24", className: "Yoga Flow", trainer: "Sarah Chen", day: "Friday", time: "05:30 PM", duration: "60 min", intensity: 2, spotsLeft: 12, spotsTotal: 25 },
  { id: "sch-25", className: "Boxing Fury", trainer: "Victor Vance", day: "Friday", time: "07:00 PM", duration: "60 min", intensity: 5, spotsLeft: 9, spotsTotal: 20 },

  // Saturday
  { id: "sch-26", className: "Cycle Surge", trainer: "Elena Rostova", day: "Saturday", time: "08:00 AM", duration: "45 min", intensity: 4, spotsLeft: 8, spotsTotal: 30 },
  { id: "sch-27", className: "Power Lift", trainer: "Marcus Williams", day: "Saturday", time: "09:30 AM", duration: "60 min", intensity: 5, spotsLeft: 0, spotsTotal: 15 },
  { id: "sch-28", className: "Epsilon Dark", trainer: "Zara Johnson", day: "Saturday", time: "11:00 AM", duration: "60 min", intensity: 5, spotsLeft: 1, spotsTotal: 25 },
  { id: "sch-29", className: "Yoga Flow", trainer: "Sarah Chen", day: "Saturday", time: "01:00 PM", duration: "60 min", intensity: 2, spotsLeft: 16, spotsTotal: 25 },

  // Sunday
  { id: "sch-30", className: "Functional Fire", trainer: "Kai Park", day: "Sunday", time: "08:30 AM", duration: "60 min", intensity: 5, spotsLeft: 6, spotsTotal: 20 },
  { id: "sch-31", className: "Stretch & Recover", trainer: "Alex Torres", day: "Sunday", time: "10:00 AM", duration: "60 min", intensity: 1, spotsLeft: 18, spotsTotal: 25 },
  { id: "sch-32", className: "Epsilon Dark", trainer: "Zara Johnson", day: "Sunday", time: "11:30 AM", duration: "60 min", intensity: 5, spotsLeft: 5, spotsTotal: 25 }
];
