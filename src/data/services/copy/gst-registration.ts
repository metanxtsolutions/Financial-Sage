import type { StateCopy } from "./types";

// State-level copy for GST registration.
//
// Every entry is contentStatus "draft" and therefore has no route. Read the
// `verify` list before moving one to "ready": the qualitative claims here
// (which state levies professional tax, which RoC office serves the state, the
// two-digit GST state code) are asserted; every rupee figure is not.
//
// The rule these entries are written against: no sentence may be produced by
// find-replacing a state name in another entry. Run `npm run check:similarity`
// after editing.

export const gstRegistrationStateCopy: StateCopy[] = [
  {
    stateSlug: "west-bengal",
    intro:
      "A GSTIN issued in West Bengal begins 19, and the application is assessed by the state's own jurisdictional officer rather than a central queue — which is why the ward and charge you declare at registration decides who you deal with for years afterwards. Most of the registrations we file here are for businesses that already have a West Bengal professional tax enrolment, so the entity details have to match across both or the officer raises a clarification.",
    statutory: [
      "GST state code 19. Every GSTIN issued in West Bengal starts with these two digits.",
      "West Bengal levies professional tax under the State Tax on Professions, Trades, Callings and Employments Act, 1979. Businesses need an enrolment certificate, and an additional registration certificate once they employ salaried staff. VERIFY: current slab figures.",
      "Shops and Establishments registration is handled under the West Bengal Shops and Establishments Act, 1963. VERIFY: current fee and renewal cycle.",
      "VERIFY: whether the state's Labour Welfare Fund contribution applies to the entity types we most commonly register.",
    ],
    jurisdiction:
      "Applications are processed by the West Bengal Directorate of Commercial Taxes, which splits the state into circles and charges. Kolkata alone spans several, and picking the wrong one at registration means a transfer request later rather than a quick correction.",
    costNote: null,
    proof: null,
    faqIds: ["gst-registration-threshold-states", "multiple-state-registration", "how-long-gst-registration-takes"],
    contentStatus: "draft",
    verify: [
      "professional tax slabs and whether both enrolment and registration certificates are still required",
      "Shops & Establishments fee and renewal cycle",
      "Labour Welfare Fund applicability",
      "current circle/charge structure at the Directorate of Commercial Taxes",
    ],
  },
  {
    stateSlug: "maharashtra",
    intro:
      "Maharashtra is the state where a GST registration most often arrives bundled with two other obligations. A GSTIN here starts 27, and businesses registering in Mumbai, Pune or Nashik almost always need professional tax alongside it — PTEC for the entity, PTRC once there is payroll. Filing the three separately, weeks apart, is the usual reason a Maharashtra business ends up with mismatched addresses across its registrations and a clarification notice to answer.",
    statutory: [
      "GST state code 27. Every GSTIN issued in Maharashtra starts with these two digits.",
      "Professional tax is levied under the Maharashtra State Tax on Professions, Trades, Callings and Employments Act, 1975, and most registering businesses need both PTEC and PTRC. VERIFY: current slab figures for each.",
      "Shops and Establishments registration falls under the Maharashtra Shops and Establishments (Regulation of Employment and Conditions of Service) Act, 2017. VERIFY: current fee bands by headcount and renewal cycle.",
      "VERIFY: whether the Maharashtra Labour Welfare Fund contribution applies at the headcount our typical client registers at.",
    ],
    jurisdiction:
      "Registrations are assessed by the Maharashtra GST Department, whose Mumbai jurisdiction is divided across nodal divisions that do not map neatly onto postal areas. A Navi Mumbai or Thane address falls outside the Mumbai divisions entirely, which catches out businesses that treat the whole conurbation as one place.",
    costNote: null,
    proof: null,
    faqIds: ["multiple-state-registration", "address-proof-options", "how-long-gst-registration-takes"],
    contentStatus: "draft",
    verify: [
      "PTEC and PTRC slab figures",
      "Shops & Establishments fee bands and renewal cycle",
      "Labour Welfare Fund applicability threshold",
      "current nodal division boundaries for Mumbai, Thane and Navi Mumbai",
    ],
  },
  {
    stateSlug: "karnataka",
    intro:
      "Karnataka produces an unusual share of voluntary GST registrations: a GSTIN starting 29 is routinely asked for by enterprise customers and investors long before a Bengaluru software company is anywhere near the turnover threshold. That changes what registration is for here. It is a procurement document as much as a tax one, which means the trade name and the declared business objects matter more than they would for a business registering because it had to.",
    statutory: [
      "GST state code 29. Every GSTIN issued in Karnataka starts with these two digits.",
      "Professional tax is levied under the Karnataka Tax on Professions, Trades, Callings and Employments Act, 1976, requiring both an enrolment and a registration certificate. VERIFY: current slab figures.",
      "Shops and Establishments registration is governed by the Karnataka Shops and Commercial Establishments Act, 1961, and is administered through the state labour department portal. VERIFY: current fee and renewal cycle.",
      "VERIFY: whether registration under the Karnataka Labour Welfare Fund Act is triggered at our typical client's headcount.",
    ],
    jurisdiction:
      "The Karnataka Commercial Taxes Department assesses registrations through division and ward offices concentrated in Bengaluru. A co-working or virtual-office address, which is common here, is the single most frequent trigger for physical verification.",
    costNote: null,
    proof: null,
    faqIds: ["voluntary-gst-registration", "address-proof-options", "physical-verification-needed"],
    contentStatus: "draft",
    verify: [
      "professional tax slabs",
      "Shops & Establishments fee and renewal cycle",
      "Labour Welfare Fund applicability threshold",
      "whether co-working addresses currently attract mandatory physical verification in Karnataka",
    ],
  },
  {
    stateSlug: "delhi",
    intro:
      "Delhi is one of the few places in India where a business registering for GST has no professional tax to register for at the same time — the territory does not levy it. That makes the running cost of a Delhi registration genuinely lower than an equivalent one in Maharashtra or Karnataka. What Delhi gives back is inter-state exposure: a trader in Chandni Chowk or Karol Bagh supplying into Haryana or Uttar Pradesh crosses a state line within a few kilometres, and inter-state supply forces registration regardless of turnover.",
    statutory: [
      "GST state code 07. Every GSTIN issued in Delhi starts with these two digits.",
      "Delhi does not levy professional tax, so there is no parallel enrolment to make alongside the GST registration. VERIFY: current status.",
      "Shops and Establishments registration falls under the Delhi Shops and Establishments Act, 1954. VERIFY: current fee and renewal cycle.",
      "Delhi is a single GST jurisdiction with no city-versus-state distinction, so there is one registration for the whole territory.",
    ],
    jurisdiction:
      "Registrations are assessed by the Delhi Department of Trade and Taxes, divided into wards. Businesses operating from Noida, Ghaziabad, Gurugram or Faridabad are not in Delhi's jurisdiction at all — they register under Uttar Pradesh or Haryana — which is the most common misconception we correct for clients who think of themselves as being in the NCR.",
    costNote: null,
    proof: null,
    faqIds: ["multiple-state-registration", "who-needs-gst-registration", "how-long-gst-registration-takes"],
    contentStatus: "draft",
    verify: [
      "that Delhi still levies no professional tax",
      "Shops & Establishments fee and renewal cycle",
      "current ward structure at the Department of Trade and Taxes",
    ],
  },
  {
    stateSlug: "gujarat",
    intro:
      "Gujarat's registration profile is dominated by businesses that were always going to be GST-heavy from day one: Surat's textile and diamond trade, Ahmedabad's chemicals and pharma, the export houses along the coast. A GSTIN here starts 24, and a large share of the applications we file are paired with an LUT so the business can export zero-rated without blocking working capital in refund claims. Professional tax in Gujarat is collected by the local body rather than the state directly, which trips up businesses expecting one state portal.",
    statutory: [
      "GST state code 24. Every GSTIN issued in Gujarat starts with these two digits.",
      "Professional tax is levied under the Gujarat State Tax on Professions, Trades, Callings and Employments Act, 1976, but collected by the municipal corporation or local body rather than a single state portal. VERIFY: current slab figures and which body collects in each major city.",
      "Shops and Establishments registration is governed by the Gujarat Shops and Establishments (Regulation of Employment and Conditions of Service) Act, 2019. VERIFY: current fee and renewal cycle.",
      "VERIFY: whether an LUT filing is still an annual requirement for exporters registering here.",
    ],
    jurisdiction:
      "The Gujarat Commercial Tax Department assesses registrations through divisions covering Ahmedabad, Surat, Vadodara and Rajkot. Exporters additionally need an AD Code registered at the port they actually ship from, which is a separate step from the GST registration and is frequently left until it delays a first shipment.",
    costNote: null,
    proof: null,
    faqIds: ["gst-for-exporters", "multiple-state-registration", "documents-partnership"],
    contentStatus: "draft",
    verify: [
      "professional tax slabs and collecting local bodies by city",
      "Shops & Establishments fee and renewal cycle",
      "current LUT filing frequency for exporters",
      "AD Code registration process at Gujarat ports",
    ],
  },
  {
    stateSlug: "tamil-nadu",
    intro:
      "Professional tax in Tamil Nadu is not a state-portal affair — it is levied by the municipal corporation or town panchayat the business sits in, so a Chennai business and a Coimbatore business register with different bodies under different rules. A GSTIN here starts 33. For the auto-component and textile exporters that make up much of our Tamil Nadu work, the registration itself is the straightforward part; the LUT and the AD Code that follow it are what determine whether the first export shipment moves on time.",
    statutory: [
      "GST state code 33. Every GSTIN issued in Tamil Nadu starts with these two digits.",
      "Professional tax is levied by municipal corporations, municipalities and town panchayats rather than by a single state authority, so the slab and the registering body depend on the local body. VERIFY: current slabs for Chennai, Coimbatore and Madurai.",
      "Shops and Establishments registration falls under the Tamil Nadu Shops and Establishments Act, 1947. VERIFY: current fee and renewal cycle.",
      "VERIFY: whether the Tamil Nadu Labour Welfare Fund contribution applies at our typical client's headcount.",
    ],
    jurisdiction:
      "The Tamil Nadu Commercial Taxes Department assesses registrations through divisional and assessment circles. Exporters shipping through Chennai or Tuticorin need an AD Code registered against that specific port, and a business shipping through both needs both.",
    costNote: null,
    proof: null,
    faqIds: ["gst-for-exporters", "gst-registration-threshold-states", "documents-private-limited"],
    contentStatus: "draft",
    verify: [
      "professional tax slabs for Chennai, Coimbatore and Madurai and the collecting bodies",
      "Shops & Establishments fee and renewal cycle",
      "Labour Welfare Fund applicability threshold",
      "AD Code registration requirements at Chennai and Tuticorin",
    ],
  },
  {
    stateSlug: "telangana",
    intro:
      "Telangana has existed as a GST jurisdiction only since the state was formed, and businesses with pre-2014 history sometimes still hold Andhra Pradesh records that do not match their current address — a mismatch the officer will pick up. A GSTIN here starts 36, distinct from Andhra Pradesh's 37. The pharma manufacturers and IT-services firms around HITEC City that make up most of our Telangana work usually register for export-linked reasons rather than domestic turnover.",
    statutory: [
      "GST state code 36, distinct from Andhra Pradesh's 37. Businesses that operated before the 2014 bifurcation should check which state their older records sit under.",
      "Professional tax is levied under the Telangana Tax on Professions, Trades, Callings and Employments Act, 1987. VERIFY: current slab figures.",
      "Shops and Establishments registration falls under the Telangana Shops and Establishments Act, 1988. VERIFY: current fee and renewal cycle.",
      "VERIFY: whether a business operating across both Telangana and Andhra Pradesh needs separate professional tax enrolments as well as separate GSTINs.",
    ],
    jurisdiction:
      "The Telangana Commercial Taxes Department assesses registrations through divisions and circles concentrated around Hyderabad. Businesses in Secunderabad and the wider Hyderabad district fall under the same state jurisdiction, so there is no separate registration for them.",
    costNote: null,
    proof: null,
    faqIds: ["gst-for-exporters", "multiple-state-registration", "documents-private-limited"],
    contentStatus: "draft",
    verify: [
      "professional tax slabs",
      "Shops & Establishments fee and renewal cycle",
      "professional tax treatment for businesses operating in both Telangana and Andhra Pradesh",
      "current division and circle structure",
    ],
  },
  {
    stateSlug: "odisha",
    intro:
      "Most GST registrations we file in Odisha are first registrations rather than additions to an existing compliance stack — MSMEs in and around Bhubaneswar and Cuttack registering because a customer, a marketplace or a bank has asked for a GSTIN. A number here starts 21. That profile matters, because a first-time registrant has no prior filing history for the officer to check against, and the documentation on the application has to carry the whole weight of the verification.",
    statutory: [
      "GST state code 21. Every GSTIN issued in Odisha starts with these two digits.",
      "Professional tax is levied under the Odisha State Tax on Professions, Trades, Callings and Employments Act, 2000. VERIFY: current slab figures.",
      "Shops and Establishments registration falls under the Odisha Shops and Commercial Establishments Act. VERIFY: exact statute year, current fee and renewal cycle.",
      "VERIFY: whether first-time registrants in Odisha currently face a higher rate of physical verification than the national average.",
    ],
    jurisdiction:
      "The Odisha Commercial Tax and GST Organisation assesses registrations through circles covering Bhubaneswar, Cuttack and the district headquarters. For a business operating from a residential address, which is common for the MSMEs registering here, the ownership or rent documentation is what the circle office scrutinises first.",
    costNote: null,
    proof: null,
    faqIds: ["gst-for-home-business", "address-proof-options", "documents-proprietorship"],
    contentStatus: "draft",
    verify: [
      "professional tax slabs",
      "Shops & Establishments statute year, fee and renewal cycle",
      "physical verification rate for first-time registrants",
      "current circle structure",
    ],
  },
];
