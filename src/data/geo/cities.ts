// Geography layer: city facts only. Copy that uses these facts lives in
// src/data/cities.ts (GST) and src/data/service-locations.ts (everything else).
//
// `tier` drives the rollout ladder from the roadmap and must not be inflated to
// justify a page: 1 = metro, 2 = tier-2 city with real search demand, 3 =
// district HQ or tier-3 town, built only on GSC evidence in the last phase.
//
// `hubs` and `sectors` are the raw material for the "≥3 proper nouns unique to
// this place" rule. An entry with an empty `hubs` array is NOT ready for a page
// — it is a row on its state hub until someone fills it in with real markets,
// industrial estates or IT parks. Never invent them.

export interface GeoCity {
  name: string;
  slug: string;
  stateSlug: string;
  /** The district this city sits in. Where they share a name, the district needs no page of its own. */
  districtName: string;
  /** 1 = metro, 2 = tier-2 city, 3 = district HQ / tier-3 town. */
  tier: 1 | 2 | 3;
  isMetro: boolean;
  /** Alternate spellings people search, each needing a permanent redirect. */
  aliases: string[];
  /** Real named markets, industrial estates, IT parks or corridors. Empty = not page-ready. */
  hubs: string[];
  /** Industries here that actually cross our services' thresholds. Empty = not page-ready. */
  sectors: string;
  verify?: string[];
}

export const geoCities: GeoCity[] = [
  // ---- T1: the eight metros ----
  {
    name: "Delhi",
    slug: "delhi",
    stateSlug: "delhi",
    districtName: "Delhi",
    tier: 1,
    isMetro: true,
    aliases: ["new-delhi"],
    hubs: ["Chandni Chowk", "Karol Bagh", "Nehru Place", "Okhla Industrial Area"],
    sectors: "Wholesale trading, export houses, corporate and professional services",
  },
  {
    name: "Mumbai",
    slug: "mumbai",
    stateSlug: "maharashtra",
    districtName: "Mumbai",
    tier: 1,
    isMetro: true,
    aliases: ["bombay"],
    hubs: ["Bandra Kurla Complex", "SEEPZ", "Zaveri Bazaar", "Lower Parel"],
    sectors: "Finance, media, textile and diamond trading, import-export",
  },
  {
    name: "Bangalore",
    slug: "bangalore",
    stateSlug: "karnataka",
    districtName: "Bengaluru Urban",
    tier: 1,
    isMetro: true,
    // Canonical slug is the higher-volume spelling; "Bengaluru" is the official
    // name and is what body copy should use.
    aliases: ["bengaluru"],
    hubs: ["Whitefield", "Electronic City", "Peenya Industrial Area", "Koramangala"],
    sectors: "Software and SaaS, IT services, biotech, deep-tech startups",
  },
  {
    name: "Hyderabad",
    slug: "hyderabad",
    stateSlug: "telangana",
    districtName: "Hyderabad",
    tier: 1,
    isMetro: true,
    aliases: [],
    hubs: ["HITEC City", "Gachibowli", "Genome Valley", "Begum Bazaar"],
    sectors: "Pharmaceuticals, IT services, long-established wholesale trading",
  },
  {
    name: "Chennai",
    slug: "chennai",
    stateSlug: "tamil-nadu",
    districtName: "Chennai",
    tier: 1,
    isMetro: true,
    aliases: ["madras"],
    hubs: ["Ambattur Industrial Estate", "Guindy", "Tidel Park", "George Town"],
    sectors: "Automotive and auto components, IT services, textile and leather trading",
  },
  {
    name: "Kolkata",
    slug: "kolkata",
    stateSlug: "west-bengal",
    districtName: "Kolkata",
    tier: 1,
    isMetro: true,
    aliases: ["calcutta"],
    hubs: ["Burrabazar", "Salt Lake Sector V", "Park Street", "Taratala"],
    sectors: "Wholesale trading, jute and tea export, logistics and warehousing",
  },
  {
    name: "Pune",
    slug: "pune",
    stateSlug: "maharashtra",
    districtName: "Pune",
    tier: 1,
    isMetro: true,
    aliases: ["poona"],
    hubs: ["Hinjewadi", "Kharadi", "Pimpri-Chinchwad", "Chakan MIDC"],
    sectors: "Auto components and manufacturing, IT services, education-adjacent services",
  },
  {
    name: "Ahmedabad",
    slug: "ahmedabad",
    stateSlug: "gujarat",
    districtName: "Ahmedabad",
    tier: 1,
    isMetro: true,
    aliases: [],
    hubs: ["Naroda GIDC", "Vatva GIDC", "Ashram Road", "GIFT City"],
    sectors: "Textiles, chemicals and pharma, diamond and gem export",
  },

  // ---- T3 ladder: tier-2 cities ----
  // Geography (state and district) is asserted; hubs and sectors are the
  // page-readiness gate. Do not publish an entry whose hubs array is empty.
  {
    name: "Bhubaneswar",
    slug: "bhubaneswar",
    stateSlug: "odisha",
    districtName: "Khordha",
    tier: 2,
    isMetro: false,
    aliases: [],
    hubs: ["Infocity", "Chandaka Industrial Estate"],
    sectors: "IT services and BPO, retail and trading serving the wider Odisha market",
    verify: ["additional named hubs"],
  },
  { name: "Jaipur", slug: "jaipur", stateSlug: "rajasthan", districtName: "Jaipur", tier: 2, isMetro: false, aliases: [], hubs: ["Sitapura Industrial Area", "Malviya Nagar", "Johari Bazaar"], sectors: "Gems and jewellery, handicraft export, tourism services", verify: ["sector mix"] },
  { name: "Lucknow", slug: "lucknow", stateSlug: "uttar-pradesh", districtName: "Lucknow", tier: 2, isMetro: false, aliases: [], hubs: ["Aminabad", "Gomti Nagar", "Amausi Industrial Area"], sectors: "Trading, chikankari and handicraft export, government-adjacent services", verify: ["sector mix"] },
  { name: "Surat", slug: "surat", stateSlug: "gujarat", districtName: "Surat", tier: 2, isMetro: false, aliases: [], hubs: ["Ring Road textile market", "Hazira", "Sachin GIDC"], sectors: "Textile trading and processing, diamond cutting and polishing", verify: ["sector mix"] },
  { name: "Indore", slug: "indore", stateSlug: "madhya-pradesh", districtName: "Indore", tier: 2, isMetro: false, aliases: [], hubs: ["Pithampur Industrial Area", "Sanwer Road", "Vijay Nagar"], sectors: "Pharmaceuticals, automobile components, wholesale trading", verify: ["sector mix"] },
  { name: "Nagpur", slug: "nagpur", stateSlug: "maharashtra", districtName: "Nagpur", tier: 2, isMetro: false, aliases: [], hubs: ["MIHAN", "Butibori MIDC", "Itwari"], sectors: "Logistics and warehousing, agri-produce trading, manufacturing", verify: ["sector mix"] },
  { name: "Kochi", slug: "kochi", stateSlug: "kerala", districtName: "Ernakulam", tier: 2, isMetro: false, aliases: ["cochin"], hubs: ["Infopark", "Cochin Port", "Kalamassery"], sectors: "IT services, marine and spice export, shipping and logistics", verify: ["sector mix"] },
  { name: "Coimbatore", slug: "coimbatore", stateSlug: "tamil-nadu", districtName: "Coimbatore", tier: 2, isMetro: false, aliases: [], hubs: ["Peelamedu", "SIDCO Industrial Estate", "Tidel Park Coimbatore"], sectors: "Textile machinery, pumps and motors manufacturing, IT services", verify: ["sector mix"] },
  { name: "Noida", slug: "noida", stateSlug: "uttar-pradesh", districtName: "Gautam Buddha Nagar", tier: 2, isMetro: false, aliases: [], hubs: ["Sector 18", "Sector 62", "Noida SEZ"], sectors: "IT and BPO services, electronics manufacturing, media", verify: ["sector mix"] },
  { name: "Gurgaon", slug: "gurgaon", stateSlug: "haryana", districtName: "Gurugram", tier: 2, isMetro: false, aliases: ["gurugram"], hubs: ["Cyber City", "Udyog Vihar", "Golf Course Road"], sectors: "Corporate services, IT and consulting, auto components", verify: ["sector mix"] },
  { name: "Ghaziabad", slug: "ghaziabad", stateSlug: "uttar-pradesh", districtName: "Ghaziabad", tier: 2, isMetro: false, aliases: [], hubs: ["Sahibabad Industrial Area", "Kavi Nagar"], sectors: "Light engineering and manufacturing, wholesale trading", verify: ["sector mix", "additional hubs"] },
  { name: "Faridabad", slug: "faridabad", stateSlug: "haryana", districtName: "Faridabad", tier: 2, isMetro: false, aliases: [], hubs: ["NIT Faridabad", "Ballabgarh industrial belt"], sectors: "Auto components, engineering and manufacturing", verify: ["sector mix", "additional hubs"] },
  { name: "Thane", slug: "thane", stateSlug: "maharashtra", districtName: "Thane", tier: 2, isMetro: false, aliases: [], hubs: ["Wagle Estate", "Ghodbunder Road"], sectors: "Manufacturing, logistics, professional services", verify: ["sector mix", "additional hubs"] },
  { name: "Navi Mumbai", slug: "navi-mumbai", stateSlug: "maharashtra", districtName: "Thane", tier: 2, isMetro: false, aliases: [], hubs: ["Turbhe APMC market", "Airoli", "JNPT corridor"], sectors: "Wholesale agri trading, logistics and port services, IT parks", verify: ["sector mix"] },
  { name: "Howrah", slug: "howrah", stateSlug: "west-bengal", districtName: "Howrah", tier: 2, isMetro: false, aliases: [], hubs: ["Howrah engineering cluster", "Salkia"], sectors: "Light engineering, foundries, wholesale distribution", verify: ["sector mix", "additional hubs"] },
  { name: "Ludhiana", slug: "ludhiana", stateSlug: "punjab", districtName: "Ludhiana", tier: 2, isMetro: false, aliases: [], hubs: ["Focal Point", "Gill Road"], sectors: "Hosiery and knitwear, bicycle and auto parts manufacturing", verify: ["sector mix", "additional hubs"] },
  { name: "Chandigarh", slug: "chandigarh", stateSlug: "chandigarh", districtName: "Chandigarh", tier: 2, isMetro: false, aliases: [], hubs: ["Industrial Area Phase I", "Sector 17", "Rajiv Gandhi IT Park"], sectors: "IT services, professional and corporate services, retail", verify: ["sector mix"] },
  { name: "Vadodara", slug: "vadodara", stateSlug: "gujarat", districtName: "Vadodara", tier: 2, isMetro: false, aliases: ["baroda"], hubs: ["Makarpura GIDC", "Nandesari"], sectors: "Chemicals and petrochemicals, engineering, pharma", verify: ["sector mix", "additional hubs"] },
  { name: "Rajkot", slug: "rajkot", stateSlug: "gujarat", districtName: "Rajkot", tier: 2, isMetro: false, aliases: [], hubs: ["Aji GIDC", "Shapar-Veraval industrial belt"], sectors: "Casting and forging, engineering, auto components", verify: ["sector mix"] },
  { name: "Visakhapatnam", slug: "visakhapatnam", stateSlug: "andhra-pradesh", districtName: "Visakhapatnam", tier: 2, isMetro: false, aliases: ["vizag"], hubs: ["Visakhapatnam Port", "Rushikonda IT Park", "Autonagar"], sectors: "Port and shipping, steel and heavy industry, IT services", verify: ["sector mix"] },
  { name: "Patna", slug: "patna", stateSlug: "bihar", districtName: "Patna", tier: 2, isMetro: false, aliases: [], hubs: ["Bahadurpur industrial area", "Maurya Lok"], sectors: "Wholesale distribution, agri trading, professional services", verify: ["sector mix", "additional hubs"] },
  { name: "Bhopal", slug: "bhopal", stateSlug: "madhya-pradesh", districtName: "Bhopal", tier: 2, isMetro: false, aliases: [], hubs: ["Govindpura Industrial Area", "MP Nagar"], sectors: "Electrical equipment manufacturing, trading, government-adjacent services", verify: ["sector mix", "additional hubs"] },
  { name: "Guwahati", slug: "guwahati", stateSlug: "assam", districtName: "Kamrup Metropolitan", tier: 2, isMetro: false, aliases: [], hubs: ["Fancy Bazar", "Bamunimaidan industrial area"], sectors: "Tea trading and export, wholesale distribution for the North East, logistics", verify: ["sector mix", "additional hubs"] },
  { name: "Ranchi", slug: "ranchi", stateSlug: "jharkhand", districtName: "Ranchi", tier: 2, isMetro: false, aliases: [], hubs: ["Kokar Industrial Area", "Main Road"], sectors: "Heavy engineering, mining-adjacent services, trading", verify: ["sector mix", "additional hubs"] },
  { name: "Raipur", slug: "raipur", stateSlug: "chhattisgarh", districtName: "Raipur", tier: 2, isMetro: false, aliases: [], hubs: ["Urla Industrial Area", "Bhanpuri"], sectors: "Steel and sponge iron, rice milling and agri trading", verify: ["sector mix", "additional hubs"] },
  { name: "Dehradun", slug: "dehradun", stateSlug: "uttarakhand", districtName: "Dehradun", tier: 2, isMetro: false, aliases: [], hubs: ["Selaqui Industrial Area", "Rajpur Road"], sectors: "Pharma and FMCG manufacturing, education services, tourism", verify: ["sector mix", "additional hubs"] },
  { name: "Jodhpur", slug: "jodhpur", stateSlug: "rajasthan", districtName: "Jodhpur", tier: 2, isMetro: false, aliases: [], hubs: ["Boranada Industrial Area", "Sardarpura"], sectors: "Handicraft and furniture export, guar gum and agri processing", verify: ["sector mix", "additional hubs"] },
  { name: "Amritsar", slug: "amritsar", stateSlug: "punjab", districtName: "Amritsar", tier: 2, isMetro: false, aliases: [], hubs: ["Hall Bazaar", "Focal Point Amritsar"], sectors: "Textile and fabric trading, food processing, tourism-adjacent services", verify: ["sector mix", "additional hubs"] },
  { name: "Madurai", slug: "madurai", stateSlug: "tamil-nadu", districtName: "Madurai", tier: 2, isMetro: false, aliases: [], hubs: ["Kappalur SIDCO Industrial Estate", "Puthu Mandapam"], sectors: "Textile trading, rubber and auto components, healthcare services", verify: ["sector mix", "additional hubs"] },
  { name: "Mysore", slug: "mysore", stateSlug: "karnataka", districtName: "Mysuru", tier: 2, isMetro: false, aliases: ["mysuru"], hubs: ["Hebbal Industrial Area", "Devaraja Market"], sectors: "IT services, silk and handicraft trading, light manufacturing", verify: ["sector mix", "additional hubs"] },
  { name: "Nashik", slug: "nashik", stateSlug: "maharashtra", districtName: "Nashik", tier: 2, isMetro: false, aliases: [], hubs: ["Satpur MIDC", "Ambad MIDC"], sectors: "Auto and engineering components, wine and agri processing", verify: ["sector mix", "additional hubs"] },
  { name: "Kanpur", slug: "kanpur", stateSlug: "uttar-pradesh", districtName: "Kanpur Nagar", tier: 2, isMetro: false, aliases: [], hubs: ["Panki Industrial Area", "Jajmau leather cluster"], sectors: "Leather and tanning, textiles, wholesale trading", verify: ["sector mix", "additional hubs"] },
  { name: "Varanasi", slug: "varanasi", stateSlug: "uttar-pradesh", districtName: "Varanasi", tier: 2, isMetro: false, aliases: ["banaras"], hubs: ["Ramnagar Industrial Estate", "Vishwanath Gali market"], sectors: "Silk weaving and handicraft export, tourism services, trading", verify: ["sector mix", "additional hubs"] },
  { name: "Vijayawada", slug: "vijayawada", stateSlug: "andhra-pradesh", districtName: "NTR", tier: 2, isMetro: false, aliases: [], hubs: ["Autonagar", "Gandhi Nagar market"], sectors: "Agri and commodity trading, distribution, construction materials", verify: ["sector mix", "additional hubs", "district name after AP reorganisation"] },
  { name: "Jamshedpur", slug: "jamshedpur", stateSlug: "jharkhand", districtName: "East Singhbhum", tier: 2, isMetro: false, aliases: [], hubs: ["Adityapur Industrial Area", "Bistupur"], sectors: "Steel and auto ancillaries, engineering contracting", verify: ["sector mix", "additional hubs"] },
  { name: "Siliguri", slug: "siliguri", stateSlug: "west-bengal", districtName: "Darjeeling", tier: 2, isMetro: false, aliases: [], hubs: ["Sevoke Road", "Matigara"], sectors: "Tea trading, transport and logistics gateway to the North East, wholesale distribution", verify: ["sector mix", "additional hubs"] },
  { name: "Durgapur", slug: "durgapur", stateSlug: "west-bengal", districtName: "Paschim Bardhaman", tier: 2, isMetro: false, aliases: [], hubs: ["Durgapur Industrial Area", "City Centre"], sectors: "Steel and heavy engineering, mining-adjacent services", verify: ["sector mix", "additional hubs"] },
  { name: "Asansol", slug: "asansol", stateSlug: "west-bengal", districtName: "Paschim Bardhaman", tier: 2, isMetro: false, aliases: [], hubs: [], sectors: "", verify: ["hubs", "sectors"] },
  { name: "Tiruppur", slug: "tiruppur", stateSlug: "tamil-nadu", districtName: "Tiruppur", tier: 2, isMetro: false, aliases: ["tirupur"], hubs: ["Tiruppur knitwear cluster", "SIDCO Industrial Estate"], sectors: "Knitwear manufacturing and garment export", verify: ["sector mix", "additional hubs"] },
  { name: "Salem", slug: "salem", stateSlug: "tamil-nadu", districtName: "Salem", tier: 2, isMetro: false, aliases: [], hubs: [], sectors: "", verify: ["hubs", "sectors"] },
  { name: "Hubli", slug: "hubli", stateSlug: "karnataka", districtName: "Dharwad", tier: 2, isMetro: false, aliases: ["hubballi"], hubs: [], sectors: "", verify: ["hubs", "sectors"] },
  { name: "Mangalore", slug: "mangalore", stateSlug: "karnataka", districtName: "Dakshina Kannada", tier: 2, isMetro: false, aliases: ["mangaluru"], hubs: ["New Mangalore Port", "Baikampady Industrial Area"], sectors: "Port and logistics, banking, cashew and marine export", verify: ["sector mix", "additional hubs"] },
  { name: "Thiruvananthapuram", slug: "thiruvananthapuram", stateSlug: "kerala", districtName: "Thiruvananthapuram", tier: 2, isMetro: false, aliases: ["trivandrum"], hubs: ["Technopark", "Chalai Market"], sectors: "IT services, government-adjacent services, trading", verify: ["sector mix", "additional hubs"] },
  { name: "Kozhikode", slug: "kozhikode", stateSlug: "kerala", districtName: "Kozhikode", tier: 2, isMetro: false, aliases: ["calicut"], hubs: [], sectors: "", verify: ["hubs", "sectors"] },
  { name: "Agra", slug: "agra", stateSlug: "uttar-pradesh", districtName: "Agra", tier: 2, isMetro: false, aliases: [], hubs: ["Agra footwear cluster", "Sikandra Industrial Area"], sectors: "Footwear manufacturing and export, handicrafts, tourism services", verify: ["sector mix", "additional hubs"] },
  { name: "Meerut", slug: "meerut", stateSlug: "uttar-pradesh", districtName: "Meerut", tier: 2, isMetro: false, aliases: [], hubs: [], sectors: "", verify: ["hubs", "sectors"] },
  { name: "Aurangabad", slug: "aurangabad", stateSlug: "maharashtra", districtName: "Chhatrapati Sambhajinagar", tier: 2, isMetro: false, aliases: ["chhatrapati-sambhajinagar"], hubs: ["Waluj MIDC", "Shendra MIDC"], sectors: "Auto components, pharma, brewing and packaging", verify: ["sector mix", "current official city name"] },
  { name: "Bhilai", slug: "bhilai", stateSlug: "chhattisgarh", districtName: "Durg", tier: 2, isMetro: false, aliases: [], hubs: [], sectors: "", verify: ["hubs", "sectors"] },
  { name: "Gwalior", slug: "gwalior", stateSlug: "madhya-pradesh", districtName: "Gwalior", tier: 2, isMetro: false, aliases: [], hubs: [], sectors: "", verify: ["hubs", "sectors"] },
  { name: "Jabalpur", slug: "jabalpur", stateSlug: "madhya-pradesh", districtName: "Jabalpur", tier: 2, isMetro: false, aliases: [], hubs: [], sectors: "", verify: ["hubs", "sectors"] },
  { name: "Udaipur", slug: "udaipur", stateSlug: "rajasthan", districtName: "Udaipur", tier: 2, isMetro: false, aliases: [], hubs: [], sectors: "", verify: ["hubs", "sectors"] },
  { name: "Kota", slug: "kota", stateSlug: "rajasthan", districtName: "Kota", tier: 2, isMetro: false, aliases: [], hubs: [], sectors: "", verify: ["hubs", "sectors"] },
  { name: "Jalandhar", slug: "jalandhar", stateSlug: "punjab", districtName: "Jalandhar", tier: 2, isMetro: false, aliases: [], hubs: ["Sports goods cluster", "Focal Point Jalandhar"], sectors: "Sports goods and leather manufacturing, hand tools", verify: ["sector mix", "additional hubs"] },
  { name: "Cuttack", slug: "cuttack", stateSlug: "odisha", districtName: "Cuttack", tier: 2, isMetro: false, aliases: [], hubs: [], sectors: "", verify: ["hubs", "sectors"] },
  { name: "Warangal", slug: "warangal", stateSlug: "telangana", districtName: "Hanamkonda", tier: 2, isMetro: false, aliases: [], hubs: [], sectors: "", verify: ["hubs", "sectors", "district name after Telangana reorganisation"] },
  { name: "Puducherry", slug: "puducherry", stateSlug: "puducherry", districtName: "Puducherry", tier: 2, isMetro: false, aliases: ["pondicherry"], hubs: [], sectors: "", verify: ["hubs", "sectors"] },
];

export function getGeoCity(stateSlug: string, citySlug: string): GeoCity | undefined {
  return geoCities.find((c) => c.stateSlug === stateSlug && c.slug === citySlug);
}

export function citiesInState(stateSlug: string): GeoCity[] {
  return geoCities.filter((c) => c.stateSlug === stateSlug);
}

/** Cities with enough real local material to justify a page at all. */
export function pageReadyCities(): GeoCity[] {
  return geoCities.filter((c) => c.hubs.length > 0 && c.sectors.length > 0);
}

/** Alias slug -> canonical slug, for generating permanent redirects. */
export const cityAliasRedirects: { stateSlug: string; from: string; to: string }[] =
  geoCities.flatMap((c) => c.aliases.map((alias) => ({ stateSlug: c.stateSlug, from: alias, to: c.slug })));
