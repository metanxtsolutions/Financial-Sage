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
}

export const cities: CityEntry[] = [
  {
    state: "West Bengal",
    stateSlug: "west-bengal",
    city: "Kolkata",
    citySlug: "kolkata",
    localNote:
      "From Burrabazar traders to Salt Lake IT firms, Kolkata's business mix spans nearly every GST use case we handle.",
  },
  {
    state: "Delhi",
    stateSlug: "delhi",
    city: "Delhi",
    citySlug: "delhi",
    localNote:
      "Delhi's dense mix of trading businesses, exporters, and service firms makes correct GST classification especially important.",
  },
  {
    state: "Maharashtra",
    stateSlug: "maharashtra",
    city: "Mumbai",
    citySlug: "mumbai",
    localNote:
      "Mumbai's fast-moving trading and finance businesses need GST registration turned around quickly, which is exactly what our 24-hour filing timeline is built for.",
  },
  {
    state: "Karnataka",
    stateSlug: "karnataka",
    city: "Bangalore",
    citySlug: "bangalore",
    localNote:
      "Bangalore's startup and IT-services ecosystem often needs GST registration ahead of the turnover threshold, for investor and client due-diligence.",
  },
  {
    state: "Telangana",
    stateSlug: "telangana",
    city: "Hyderabad",
    citySlug: "hyderabad",
    localNote:
      "Hyderabad's pharma, IT, and trading businesses each come with slightly different documentation needs, so we tailor the checklist to each one.",
  },
  {
    state: "Maharashtra",
    stateSlug: "maharashtra",
    city: "Pune",
    citySlug: "pune",
    localNote:
      "Pune's manufacturing and auto-ancillary businesses frequently need multi-state GST registration alongside their home registration.",
  },
  {
    state: "Tamil Nadu",
    stateSlug: "tamil-nadu",
    city: "Chennai",
    citySlug: "chennai",
    localNote:
      "Chennai's export-oriented manufacturers and IT firms often combine GST registration with LUT filing for zero-rated exports.",
  },
  {
    state: "Gujarat",
    stateSlug: "gujarat",
    city: "Ahmedabad",
    citySlug: "ahmedabad",
    localNote:
      "Ahmedabad's textile and trading businesses are among the most GST-active in India, so we know the common HSN classifications here well.",
  },
  {
    state: "Odisha",
    stateSlug: "odisha",
    city: "Bhubaneswar",
    citySlug: "bhubaneswar",
    localNote:
      "Bhubaneswar's growing services and MSME sector is exactly who our Starter and Business plans are built for.",
  },
];

export function getCity(stateSlug: string, citySlug: string): CityEntry | undefined {
  return cities.find((c) => c.stateSlug === stateSlug && c.citySlug === citySlug);
}
