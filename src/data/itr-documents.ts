import type { ItrType } from "@/components/itr/ItrWizard";

export interface ItrDocumentCategory {
  label: string;
  isMandatory: boolean;
}

const allItrTypes: ItrType[] = ["ITR_1", "ITR_2", "ITR_3", "ITR_4"];

interface ItrDocumentDef {
  label: string;
  // ITR types that see this document at all; other types don't show it.
  appliesTo: ItrType[];
  // Subset of appliesTo where the document is mandatory rather than optional.
  mandatoryFor: ItrType[];
}

const itrDocumentDefs: ItrDocumentDef[] = [
  { label: "PAN Card", appliesTo: allItrTypes, mandatoryFor: allItrTypes },
  { label: "Aadhaar Card", appliesTo: allItrTypes, mandatoryFor: allItrTypes },
  { label: "Bank Statement (Financial Year)", appliesTo: allItrTypes, mandatoryFor: allItrTypes },
  { label: "Cancelled Cheque / Bank Passbook", appliesTo: allItrTypes, mandatoryFor: allItrTypes },
  { label: "Form 16 (if salaried)", appliesTo: allItrTypes, mandatoryFor: ["ITR_1"] },
  { label: "Capital Gain Statement", appliesTo: ["ITR_2", "ITR_3"], mandatoryFor: ["ITR_2"] },
  { label: "Broker Statement", appliesTo: ["ITR_2", "ITR_3"], mandatoryFor: [] },
  { label: "Profit & Loss Statement", appliesTo: ["ITR_3"], mandatoryFor: ["ITR_3"] },
  { label: "Balance Sheet", appliesTo: ["ITR_3"], mandatoryFor: ["ITR_3"] },
  { label: "Business Turnover / Gross Receipts Details", appliesTo: ["ITR_4"], mandatoryFor: ["ITR_4"] },
  { label: "GST Returns (if registered)", appliesTo: ["ITR_3", "ITR_4"], mandatoryFor: [] },
  { label: "Home Loan Certificate", appliesTo: allItrTypes, mandatoryFor: [] },
  { label: "Interest Certificate", appliesTo: allItrTypes, mandatoryFor: [] },
  { label: "Rent Receipts", appliesTo: allItrTypes, mandatoryFor: [] },
  { label: "80C Investments", appliesTo: allItrTypes, mandatoryFor: [] },
  { label: "80D Medical Insurance", appliesTo: allItrTypes, mandatoryFor: [] },
  { label: "Donation Receipts", appliesTo: allItrTypes, mandatoryFor: [] },
  { label: "Other Supporting Documents", appliesTo: allItrTypes, mandatoryFor: [] },
];

export function getItrDocumentCategories(itrType: ItrType): ItrDocumentCategory[] {
  return itrDocumentDefs
    .filter((doc) => doc.appliesTo.includes(itrType))
    .map((doc) => ({ label: doc.label, isMandatory: doc.mandatoryFor.includes(itrType) }));
}

export function getItrMandatoryDocumentLabels(itrType: ItrType): string[] {
  return getItrDocumentCategories(itrType)
    .filter((doc) => doc.isMandatory)
    .map((doc) => doc.label);
}
