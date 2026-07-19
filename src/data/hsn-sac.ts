// Reference subset of common HSN (goods) and SAC (services) codes with
// indicative GST rates. Not exhaustive. For exact classification of a
// specific product, cross-check the official CBIC rate finder.

export interface HsnSacEntry {
  code: string;
  type: "HSN" | "SAC";
  description: string;
  gstRate: string;
}

export const hsnSacCodes: HsnSacEntry[] = [
  { code: "1006", type: "HSN", description: "Rice", gstRate: "5%" },
  { code: "1101", type: "HSN", description: "Wheat or meslin flour", gstRate: "5%" },
  { code: "1701", type: "HSN", description: "Cane or beet sugar", gstRate: "5%" },
  { code: "2106", type: "HSN", description: "Food preparations, not elsewhere specified", gstRate: "18%" },
  { code: "3004", type: "HSN", description: "Medicaments (packaged)", gstRate: "12%" },
  { code: "3304", type: "HSN", description: "Beauty/make-up preparations, cosmetics", gstRate: "18%" },
  { code: "4901", type: "HSN", description: "Printed books", gstRate: "0%" },
  { code: "5208", type: "HSN", description: "Woven cotton fabrics", gstRate: "5%" },
  { code: "6109", type: "HSN", description: "T-shirts, vests, knitted or crocheted", gstRate: "5%/12%*" },
  { code: "6403", type: "HSN", description: "Footwear, leather upper", gstRate: "12%/18%*" },
  { code: "7113", type: "HSN", description: "Articles of jewellery, precious metal", gstRate: "3%" },
  { code: "8471", type: "HSN", description: "Computers and laptops", gstRate: "18%" },
  { code: "8517", type: "HSN", description: "Mobile phones", gstRate: "18%" },
  { code: "8703", type: "HSN", description: "Motor cars (passenger vehicles)", gstRate: "28%+cess" },
  { code: "9403", type: "HSN", description: "Furniture, not elsewhere specified", gstRate: "18%" },
  { code: "9503", type: "HSN", description: "Toys", gstRate: "12%" },
  { code: "0910", type: "HSN", description: "Spices (ginger, turmeric, etc.)", gstRate: "5%" },
  { code: "2202", type: "HSN", description: "Waters, including mineral & aerated, with sugar", gstRate: "28%+cess" },
  { code: "4819", type: "HSN", description: "Cartons, boxes, packing containers of paper", gstRate: "18%" },
  { code: "8544", type: "HSN", description: "Insulated wire and cable", gstRate: "18%" },
  { code: "998311", type: "SAC", description: "Management consulting services", gstRate: "18%" },
  { code: "998312", type: "SAC", description: "Business consulting services", gstRate: "18%" },
  { code: "998313", type: "SAC", description: "Information technology (IT) consulting services", gstRate: "18%" },
  { code: "998314", type: "SAC", description: "IT design and development services (software)", gstRate: "18%" },
  { code: "998315", type: "SAC", description: "Hosting and IT infrastructure provisioning services", gstRate: "18%" },
  { code: "998316", type: "SAC", description: "IT infrastructure and network management services", gstRate: "18%" },
  { code: "998361", type: "SAC", description: "Advertising services", gstRate: "18%" },
  { code: "998362", type: "SAC", description: "Purchase or sale of advertising space or time, on commission", gstRate: "18%" },
  { code: "998399", type: "SAC", description: "Other professional, technical, and business services", gstRate: "18%" },
  { code: "9963", type: "SAC", description: "Accommodation, food and beverage services (hotels/restaurants)", gstRate: "5%/12%/18%*" },
  { code: "996331", type: "SAC", description: "Services provided by restaurants (standalone)", gstRate: "5%*" },
  { code: "9964", type: "SAC", description: "Passenger transport services", gstRate: "0%/5%/12%*" },
  { code: "9965", type: "SAC", description: "Goods transport services", gstRate: "5%/12%*" },
  { code: "9971", type: "SAC", description: "Financial and related services", gstRate: "18%" },
  { code: "9972", type: "SAC", description: "Real estate services", gstRate: "varies*" },
  { code: "9973", type: "SAC", description: "Leasing or rental services without operator", gstRate: "18%*" },
  { code: "9982", type: "SAC", description: "Legal and accounting services", gstRate: "18%" },
  { code: "9983", type: "SAC", description: "Other professional, technical and business services", gstRate: "18%" },
  { code: "9984", type: "SAC", description: "Telecommunication, broadcasting and information supply services", gstRate: "18%" },
  { code: "9985", type: "SAC", description: "Support services (agencies, freelance business support)", gstRate: "18%" },
  { code: "9987", type: "SAC", description: "Maintenance, repair and installation services", gstRate: "18%" },
  { code: "9992", type: "SAC", description: "Education services", gstRate: "0%/18%*" },
  { code: "9993", type: "SAC", description: "Human health and social care services", gstRate: "0%*" },
  { code: "9996", type: "SAC", description: "Recreational, cultural and sporting services", gstRate: "18%*" },
  { code: "9997", type: "SAC", description: "Other services (freelance, personal services)", gstRate: "18%" },
];

export function searchHsnSac(query: string): HsnSacEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return hsnSacCodes.filter(
    (entry) => entry.code.includes(q) || entry.description.toLowerCase().includes(q),
  );
}
