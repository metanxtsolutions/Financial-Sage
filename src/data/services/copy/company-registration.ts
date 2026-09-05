import type { StateCopy } from "./types";

// State-level copy for company registration.
//
// This is the strongest state layer we have, because incorporation stamp duty
// is set by the state rather than centrally: the same company genuinely costs a
// different amount to incorporate in Maharashtra than in Gujarat. That makes
// these pages non-duplicative by construction — but only once the figures are
// real. Every rupee amount below is a VERIFY, and no entry may become "ready"
// while its cost figures are unconfirmed. A wrong stamp duty number quoted to a
// founder is worse than no page.

export const companyRegistrationStateCopy: StateCopy[] = [
  {
    stateSlug: "west-bengal",
    intro:
      "Companies incorporated from anywhere in West Bengal file with the Registrar of Companies at Kolkata, which also serves the North Eastern states routed through it. A large share of the incorporations we handle here are conversions rather than fresh starts: family partnerships and long-running proprietorships in the Burrabazar trade turning private limited because a bank or a large customer has begun asking for one. Conversions carry a documentation problem a fresh incorporation does not — the existing business's assets and contracts have to move across cleanly.",
    statutory: [
      "Incorporations file with the Registrar of Companies at Kolkata.",
      "VERIFY: stamp duty payable on the MOA and on authorised share capital in West Bengal, and how it scales with capital.",
      "West Bengal levies professional tax, so a newly incorporated company needs an enrolment certificate alongside its incorporation. VERIFY: current slabs and the window for enrolling.",
      "Shops and Establishments registration under the West Bengal Shops and Establishments Act, 1963, applies once the company has a commercial premises. VERIFY: current fee.",
    ],
    jurisdiction:
      "Name approval, SPICe+ filing and the Certificate of Incorporation all run through the MCA portal centrally, but the file sits with RoC Kolkata, and any resubmission or clarification comes from there.",
    costNote:
      "VERIFY: the all-in figure for West Bengal — our fee plus MCA filing fees plus state stamp duty at the authorised capital most clients choose — and how it compares with an equivalent incorporation in a neighbouring state.",
    proof: null,
    faqIds: ["cr-conversion", "cr-registered-office", "cr-timeline"],
    contentStatus: "draft",
    verify: [
      "stamp duty on MOA and authorised capital in West Bengal",
      "professional tax enrolment window and slabs for a new company",
      "Shops & Establishments fee",
      "all-in cost figure and the comparison claim",
    ],
  },
  {
    stateSlug: "maharashtra",
    intro:
      "Maharashtra is the state where incorporation cost most visibly diverges from the rest of India, because stamp duty on the memorandum and on authorised share capital is set by the Maharashtra Stamp Act rather than centrally. Two founders incorporating identical companies on the same day, one in Mumbai and one in Ahmedabad, do not pay the same total. Founders here also tend to be planning a priced round, which argues for sizing authorised capital against the first raise rather than filing the minimum and paying again to increase it later.",
    statutory: [
      "Incorporations file with the Registrar of Companies at Mumbai.",
      "VERIFY: stamp duty payable on the MOA and on authorised share capital under the Maharashtra Stamp Act, including how it scales and whether a cap applies.",
      "A new company needs professional tax registration under the Maharashtra act — PTEC on incorporation, and PTRC once it has payroll. VERIFY: current slabs and enrolment deadlines.",
      "Shops and Establishments registration under the 2017 Maharashtra act applies once there is a commercial premises. VERIFY: current fee bands by headcount.",
    ],
    jurisdiction:
      "RoC Mumbai handles the filing. A registered office in Pune, Thane or Navi Mumbai is still RoC Mumbai — the state has one Registrar — but the professional tax and Shops and Establishments registrations that follow are handled by the local authority for that address.",
    costNote:
      "VERIFY: the all-in figure for Maharashtra at typical authorised capital, and the size of the stamp duty gap against Gujarat and Karnataka. This comparison is the page's main reason to exist, so it must be right.",
    proof: null,
    faqIds: ["cr-capital", "cr-timeline", "cr-registered-office"],
    contentStatus: "draft",
    verify: [
      "stamp duty on MOA and authorised capital under the Maharashtra Stamp Act, including any cap",
      "PTEC and PTRC slabs and enrolment deadlines for a new company",
      "Shops & Establishments fee bands",
      "all-in cost figure and the Gujarat/Karnataka comparison",
    ],
  },
  {
    stateSlug: "karnataka",
    intro:
      "Incorporating in Karnataka is rarely about compliance. Most founders filing through RoC Bangalore are doing it because an investor, an accelerator or an enterprise customer will not contract with a proprietorship or an LLP, which means the incorporation has to survive due diligence rather than merely complete. That changes what matters at filing: the MOA objects need to cover what the company will actually do after a raise, and the shareholding needs to accommodate an ESOP pool without an amendment six months later.",
    statutory: [
      "Incorporations file with the Registrar of Companies at Bangalore.",
      "VERIFY: stamp duty payable on the MOA and on authorised share capital under the Karnataka Stamp Act.",
      "Karnataka levies professional tax, and a new company needs both enrolment and, once it employs staff, registration. VERIFY: current slabs and the enrolment window after incorporation.",
      "Shops and Establishments registration under the Karnataka Shops and Commercial Establishments Act, 1961, is filed through the state labour portal. VERIFY: current fee and renewal cycle.",
    ],
    jurisdiction:
      "RoC Bangalore serves the whole state. Where a startup intends to apply for DPIIT recognition after incorporation, the objects clause and the entity type both have to satisfy that scheme's criteria, so it is worth settling before the SPICe+ goes in rather than after.",
    costNote:
      "VERIFY: the all-in figure for Karnataka at typical authorised capital, and whether the state's stamp duty makes an ESOP-sized authorised capital materially more expensive here than elsewhere.",
    proof: null,
    faqIds: ["cr-startup-india", "cr-objects", "cr-capital"],
    contentStatus: "draft",
    verify: [
      "stamp duty on MOA and authorised capital under the Karnataka Stamp Act",
      "professional tax slabs and enrolment window for a new company",
      "Shops & Establishments fee and renewal cycle",
      "current DPIIT recognition criteria",
      "all-in cost figure",
    ],
  },
  {
    stateSlug: "delhi",
    intro:
      "Delhi files more new incorporations than almost anywhere else in India, and the volume works against you at exactly one step: name approval. A proposed name that resembles an existing company or a registered trademark is rejected, and in a register this crowded that happens more often here than elsewhere — costing a resubmission and roughly a week. The offsetting advantage is that Delhi levies no professional tax, so a company incorporated here has one fewer state registration to make and maintain than one in Mumbai or Bengaluru.",
    statutory: [
      "Incorporations file with the Registrar of Companies at Delhi.",
      "VERIFY: stamp duty payable on the MOA and on authorised share capital as applied in Delhi.",
      "Delhi levies no professional tax, so there is no enrolment to make after incorporation. VERIFY: current status.",
      "Shops and Establishments registration under the Delhi Shops and Establishments Act, 1954, applies once there is a commercial premises. VERIFY: current fee and renewal cycle.",
    ],
    jurisdiction:
      "RoC Delhi handles the filing. A registered office in Noida, Ghaziabad, Gurugram or Faridabad is not a Delhi address for this purpose — it falls under Uttar Pradesh or Haryana, with that state's stamp duty and its own Registrar, which is the most common assumption we have to correct for NCR founders.",
    costNote:
      "VERIFY: the all-in figure for Delhi at typical authorised capital, and quantify the saving from having no professional tax registration to maintain.",
    proof: null,
    faqIds: ["cr-name-approval", "cr-registered-office", "cr-timeline"],
    contentStatus: "draft",
    verify: [
      "stamp duty on MOA and authorised capital in Delhi",
      "that Delhi still levies no professional tax",
      "Shops & Establishments fee and renewal cycle",
      "all-in cost figure and the professional tax saving claim",
    ],
  },
  {
    stateSlug: "gujarat",
    intro:
      "Gujarat incorporations file with RoC Ahmedabad, and a good share of them are export-facing from the start — Surat's textile and diamond trade, the chemicals and pharma corridor around Ahmedabad and Vadodara. That front-loads work a domestic incorporation can defer: the Import Export Code, the LUT and the AD Code all want a company that already exists, so the sequencing between incorporation and the first shipment is what usually determines whether a founder's timeline holds.",
    statutory: [
      "Incorporations file with the Registrar of Companies at Ahmedabad.",
      "VERIFY: stamp duty payable on the MOA and on authorised share capital under the Gujarat Stamp Act.",
      "Gujarat levies professional tax, but it is collected by the municipal body rather than a single state portal, so where the registered office sits determines who the company enrols with. VERIFY: current slabs and collecting bodies.",
      "Shops and Establishments registration under the Gujarat act of 2019 applies once there is a commercial premises. VERIFY: current fee and renewal cycle.",
    ],
    jurisdiction:
      "RoC Ahmedabad serves the whole state. For an exporting company, the AD Code has to be registered against the specific port it ships from, which is a separate registration from anything the RoC handles and is regularly left too late.",
    costNote:
      "VERIFY: the all-in figure for Gujarat at typical authorised capital, and whether it is genuinely lower than Maharashtra for the same company. Do not publish the comparison until both figures are confirmed.",
    proof: null,
    faqIds: ["cr-objects", "cr-timeline", "cr-capital"],
    contentStatus: "draft",
    verify: [
      "stamp duty on MOA and authorised capital under the Gujarat Stamp Act",
      "professional tax slabs and collecting municipal bodies",
      "Shops & Establishments fee and renewal cycle",
      "all-in cost figure and the Maharashtra comparison",
    ],
  },
  {
    stateSlug: "tamil-nadu",
    intro:
      "Companies incorporated anywhere in Tamil Nadu file with RoC Chennai. The state's incorporation mix leans manufacturing — auto components around Chennai and Coimbatore, textiles around Tiruppur — and manufacturing incorporations carry a step that service companies skip: the registered office is usually also a factory or a unit, so the address proof has to satisfy the RoC and then support a separate set of state licences afterwards. Professional tax here is a local-body matter, so which corporation the office sits in determines who the company enrols with.",
    statutory: [
      "Incorporations file with the Registrar of Companies at Chennai.",
      "VERIFY: stamp duty payable on the MOA and on authorised share capital in Tamil Nadu.",
      "Professional tax is levied by the municipal corporation or town panchayat rather than the state, so a Chennai company and a Coimbatore company enrol with different bodies. VERIFY: current slabs for the major corporations.",
      "Shops and Establishments registration under the Tamil Nadu Shops and Establishments Act, 1947, applies to commercial premises. VERIFY: current fee and renewal cycle.",
    ],
    jurisdiction:
      "RoC Chennai serves the whole state. A manufacturing company will typically need factory licensing and pollution-control consent after incorporation, neither of which the RoC touches, and both of which depend on the same address the SPICe+ declared.",
    costNote:
      "VERIFY: the all-in figure for Tamil Nadu at typical authorised capital.",
    proof: null,
    faqIds: ["cr-registered-office", "cr-objects", "cr-timeline"],
    contentStatus: "draft",
    verify: [
      "stamp duty on MOA and authorised capital in Tamil Nadu",
      "professional tax slabs and collecting bodies for Chennai, Coimbatore and Tiruppur",
      "Shops & Establishments fee and renewal cycle",
      "all-in cost figure",
    ],
  },
  {
    stateSlug: "telangana",
    intro:
      "Telangana companies file with RoC Hyderabad, which has served the state as a separate jurisdiction since the 2014 bifurcation. That history still surfaces at incorporation: founders converting an older Andhra Pradesh business, or reusing a name associated with one, run into records split across two states. The incorporation mix here is pharma and IT services, and both tend to incorporate with an eye to export or to enterprise procurement rather than because a turnover threshold forced it.",
    statutory: [
      "Incorporations file with the Registrar of Companies at Hyderabad, distinct from RoC Vijayawada which serves Andhra Pradesh.",
      "VERIFY: stamp duty payable on the MOA and on authorised share capital in Telangana.",
      "Telangana levies professional tax under its 1987 act, so a new company needs enrolment after incorporation. VERIFY: current slabs and the enrolment window.",
      "Shops and Establishments registration under the Telangana Shops and Establishments Act, 1988, applies to commercial premises. VERIFY: current fee and renewal cycle.",
    ],
    jurisdiction:
      "RoC Hyderabad serves Telangana. A company with operations in both Telangana and Andhra Pradesh has one incorporation but will need separate GST registrations, and VERIFY whether separate professional tax enrolments are also required.",
    costNote:
      "VERIFY: the all-in figure for Telangana at typical authorised capital.",
    proof: null,
    faqIds: ["cr-objects", "cr-capital", "cr-timeline"],
    contentStatus: "draft",
    verify: [
      "stamp duty on MOA and authorised capital in Telangana",
      "professional tax slabs and enrolment window",
      "Shops & Establishments fee and renewal cycle",
      "whether cross-state operations need separate professional tax enrolments",
      "all-in cost figure",
    ],
  },
  {
    stateSlug: "odisha",
    intro:
      "Odisha incorporations file with RoC Cuttack. Most of what we handle here is a first company rather than a founder's second or third — an MSME around Bhubaneswar or Cuttack incorporating because a customer, a tender or a lender has made it a condition. First-time founders tend to under-size authorised capital to keep the immediate cost down, which is reasonable until the first outside investment arrives and the increase has to be filed and stamped separately.",
    statutory: [
      "Incorporations file with the Registrar of Companies at Cuttack.",
      "VERIFY: stamp duty payable on the MOA and on authorised share capital in Odisha.",
      "Odisha levies professional tax under its 2000 act, so a new company needs enrolment after incorporation. VERIFY: current slabs and the enrolment window.",
      "Shops and Establishments registration under the Odisha Shops and Commercial Establishments Act applies to commercial premises. VERIFY: statute year, current fee and renewal cycle.",
    ],
    jurisdiction:
      "RoC Cuttack serves the whole state. For a company whose registered office is a residential or family-owned address, which is common among first-time incorporations here, the ownership documentation and the owner's no-objection are what the filing turns on.",
    costNote:
      "VERIFY: the all-in figure for Odisha at typical authorised capital, and the cost of increasing authorised capital later, since that is the trade-off first-time founders here are actually making.",
    proof: null,
    faqIds: ["cr-registered-office", "cr-capital", "cr-timeline"],
    contentStatus: "draft",
    verify: [
      "stamp duty on MOA and authorised capital in Odisha",
      "professional tax slabs and enrolment window",
      "Shops & Establishments statute year and fee",
      "cost of a later authorised capital increase",
      "all-in cost figure",
    ],
  },
];
