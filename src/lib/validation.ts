import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{8,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
  businessType: z.string().trim().max(120).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  source: z.string().trim().max(200).optional().or(z.literal("")),
  pageUrl: z.string().trim().max(500).optional().or(z.literal("")),
  utmSource: z.string().trim().max(200).optional().or(z.literal("")),
  utmMedium: z.string().trim().max(200).optional().or(z.literal("")),
  utmCampaign: z.string().trim().max(200).optional().or(z.literal("")),
  // Honeypot: real users never fill this in; bots often do.
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const payuInitiateSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{8,15}$/, "Enter a valid phone number"),
  productinfo: z.string().trim().min(1).max(200).optional().default("Financial Sage Payment"),
  udf1: z.string().trim().max(200).optional(),
});

export type PayUInitiateInput = z.infer<typeof payuInitiateSchema>;

export const itrApplicationSchema = z.object({
  itrType: z.enum(["ITR_1", "ITR_2", "ITR_3", "ITR_4"]),
  name: z.string().trim().min(2, "Please enter your name").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{8,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email"),
  pan: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Enter a valid 10-character PAN"),
  state: z.string().trim().max(120).optional().or(z.literal("")),
  consent: z.literal(true, { message: "Please accept the Terms & Privacy Policy" }),
});

export type ItrApplicationInput = z.infer<typeof itrApplicationSchema>;

// Max upload size, matching the spec's "Maximum 20MB" per document.
export const ITR_MAX_FILE_BYTES = 20 * 1024 * 1024;
export const ITR_ALLOWED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png"];
