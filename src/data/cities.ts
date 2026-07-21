// Single source of truth for programmatic city pages at
// /gst-registration/[state]/[city]. Add more entries here to scale.
// No template changes needed.

export interface CityEntry {
  state: string;
  stateSlug: string;
  city: string;
  citySlug: string;
  // One unique, locally-flavoured sentence used in the page intro.
  localNote: string;
  // A second differentiator: the business sectors in this city that most
  // commonly cross the registration threshold. Used in the "Who Needs GST
  // Registration" section so that section isn't identical prose with only
  // the city name swapped in.
  localSectors: string;
  // FAQ id swapped in for "who-needs-gst-registration" (already covered by
  // this page's own content), picked to match the city's real business mix.
  featuredFaqId: string;
}

export const cities: CityEntry[] = [
  {
    state: "West Bengal",
    stateSlug: "west-bengal",
    city: "Kolkata",
    citySlug: "kolkata",
    localNote:
      "From Burrabazar traders to Salt Lake IT firms, Kolkata's business mix spans nearly every GST use case we handle.",
    localSectors:
      "Wholesale traders, jute and tea exporters, and the city's growing logistics and warehousing operators are among the first to cross the registration threshold here.",
    featuredFaqId: "gst-for-exporters",
  },
  {
    state: "Delhi",
    stateSlug: "delhi",
    city: "Delhi",
    citySlug: "delhi",
    localNote:
      "Delhi's dense mix of trading businesses, exporters, and service firms makes correct GST classification especially important.",
    localSectors:
      "Wholesale traders in markets like Chandni Chowk and Karol Bagh, along with corporate service providers and export houses, tend to register early simply because so much of their business is inter-state by default.",
    featuredFaqId: "multiple-state-registration",
  },
  {
    state: "Maharashtra",
    stateSlug: "maharashtra",
    city: "Mumbai",
    citySlug: "mumbai",
    localNote:
      "Mumbai's fast-moving trading and finance businesses need GST registration turned around quickly, which is exactly what our 24-hour filing timeline is built for.",
    localSectors:
      "Textile and diamond trading firms in South Mumbai, along with the city's finance, media, and import-export businesses, typically cross the turnover threshold well before most other sectors.",
    featuredFaqId: "multiple-state-registration",
  },
  {
    state: "Karnataka",
    stateSlug: "karnataka",
    city: "Bangalore",
    citySlug: "bangalore",
    localNote:
      "Bangalore's startup and IT-services ecosystem often needs GST registration ahead of the turnover threshold, for investor and client due-diligence.",
    localSectors:
      "Software and SaaS startups, IT-services consultancies, and biotech firms across the city commonly register voluntarily well before the mandatory threshold, mainly to work with GST-registered enterprise clients.",
    featuredFaqId: "voluntary-gst-registration",
  },
  {
    state: "Telangana",
    stateSlug: "telangana",
    city: "Hyderabad",
    citySlug: "hyderabad",
    localNote:
      "Hyderabad's pharma, IT, and trading businesses each come with slightly different documentation needs, so we tailor the checklist to each one.",
    localSectors:
      "Pharmaceutical manufacturers and exporters, IT-services firms in HITEC City, and long-established trading businesses in the old city each tend to hit the threshold at different points, depending on how much of their business is domestic versus export.",
    featuredFaqId: "gst-for-exporters",
  },
  {
    state: "Maharashtra",
    stateSlug: "maharashtra",
    city: "Pune",
    citySlug: "pune",
    localNote:
      "Pune's manufacturing and auto-ancillary businesses frequently need multi-state GST registration alongside their home registration.",
    localSectors:
      "Auto-component manufacturers, IT parks along Hinjewadi and Kharadi, and education-adjacent service businesses make up much of Pune's registration volume.",
    featuredFaqId: "multiple-state-registration",
  },
  {
    state: "Tamil Nadu",
    stateSlug: "tamil-nadu",
    city: "Chennai",
    citySlug: "chennai",
    localNote:
      "Chennai's export-oriented manufacturers and IT firms often combine GST registration with LUT filing for zero-rated exports.",
    localSectors:
      "Automotive and auto-component exporters, IT-services companies, and the city's textile and leather trading businesses account for much of the registration activity here.",
    featuredFaqId: "gst-for-exporters",
  },
  {
    state: "Gujarat",
    stateSlug: "gujarat",
    city: "Ahmedabad",
    citySlug: "ahmedabad",
    localNote:
      "Ahmedabad's textile and trading businesses are among the most GST-active in India, so we know the common HSN classifications here well.",
    localSectors:
      "Textile mills and traders, chemical and pharma manufacturers, and diamond and gem exporters are some of the most consistently GST-active business categories in the city.",
    featuredFaqId: "gst-for-exporters",
  },
  {
    state: "Odisha",
    stateSlug: "odisha",
    city: "Bhubaneswar",
    citySlug: "bhubaneswar",
    localNote:
      "Bhubaneswar's growing services and MSME sector is exactly who our Starter and Business plans are built for.",
    localSectors:
      "IT-services and BPO firms in the city's tech park corridor, along with retail and trading businesses serving the wider Odisha market, make up most of our Bhubaneswar client base.",
    featuredFaqId: "gst-for-home-business",
  },
];

export function getCity(stateSlug: string, citySlug: string): CityEntry | undefined {
  return cities.find((c) => c.stateSlug === stateSlug && c.citySlug === citySlug);
}
