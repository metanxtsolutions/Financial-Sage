export interface ItrDocumentCategory {
  label: string;
  isMandatory: boolean;
}

export const itrDocumentCategories: ItrDocumentCategory[] = [
  { label: "PAN Card", isMandatory: true },
  { label: "Aadhaar Card", isMandatory: true },
  { label: "Bank Statement (Financial Year)", isMandatory: true },
  { label: "Form 16 (if salaried)", isMandatory: true },
  { label: "Cancelled Cheque / Bank Passbook", isMandatory: true },
  { label: "Capital Gain Statement", isMandatory: false },
  { label: "Broker Statement", isMandatory: false },
  { label: "Home Loan Certificate", isMandatory: false },
  { label: "Interest Certificate", isMandatory: false },
  { label: "Rent Receipts", isMandatory: false },
  { label: "80C Investments", isMandatory: false },
  { label: "80D Medical Insurance", isMandatory: false },
  { label: "Donation Receipts", isMandatory: false },
  { label: "Other Supporting Documents", isMandatory: false },
];

export const itrMandatoryDocumentLabels = itrDocumentCategories
  .filter((c) => c.isMandatory)
  .map((c) => c.label);
