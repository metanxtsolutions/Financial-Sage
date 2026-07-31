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

export const createOrderSchema = z.object({
  amount: z.number().int().min(100, "Amount must be at least 100 paise"),
  currency: z.string().trim().length(3).optional().default("INR"),
  receipt: z.string().trim().max(200).optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string().trim().min(1, "Missing razorpay_order_id"),
  razorpay_payment_id: z.string().trim().min(1, "Missing razorpay_payment_id"),
  razorpay_signature: z.string().trim().min(1, "Missing razorpay_signature"),
});

export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;

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

export const itrMarkPaidSchema = z.object({
  applicationId: z.string().trim().min(1, "Missing applicationId"),
  razorpay_order_id: z.string().trim().min(1, "Missing razorpay_order_id"),
  razorpay_payment_id: z.string().trim().min(1, "Missing razorpay_payment_id"),
  razorpay_signature: z.string().trim().min(1, "Missing razorpay_signature"),
});

export type ItrMarkPaidInput = z.infer<typeof itrMarkPaidSchema>;

// Max upload size, matching the spec's "Maximum 20MB" per document.
export const ITR_MAX_FILE_BYTES = 20 * 1024 * 1024;
export const ITR_ALLOWED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png"];
