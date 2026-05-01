import { z } from "zod";

// Helper for URL validation (handles empty strings as optional)
const optionalUrl = z.union([z.string().url().nullish(), z.literal("")]);

export const candidateApplicationSchema = z.object({
  // --- Personal Information ---
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100),

  email: z
    .string()
    .email("Invalid email address"),

  phoneNumber: z
    .string()
    .min(10, "Phone number is too short")
    .regex(/^\+?[0-9\s\-]+$/, "Invalid phone format"),

  location: z.object({
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
  }),

  // --- Professional Profile ---
  resumeUrl: z
    .string()
    .url("Please upload a valid resume file"),

  portfolioUrl: optionalUrl,
  linkedInUrl: optionalUrl,

  professionalSummary: z
    .string()
    .max(1000, "Summary must be under 1000 characters")
    .optional(),

  // --- Technical & Experience ---
  skills: z
    .array(z.string())
    .min(1, "Please add at least one skill"),

  workHistory: z.array(
    z.object({
      jobTitle: z.string().min(1, "Job title is required"),
      company: z.string().min(1, "Company name is required"),
      startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid start date",
      }),
      endDate: z.string().optional(), // Nullable if "Currently Working Here"
      isCurrent: z.boolean().default(false),
      description: z.string().max(2000).optional(),
    })
  ).min(1, "Please add at least one previous role"),

  // --- Education ---
  education: z.array(
    z.object({
      institution: z.string().min(1, "Institution name is required"),
      degree: z.string().min(1, "Degree/Field of study is required"),
      graduationYear: z.number().int().min(1900).max(new Date().getFullYear() + 10),
    })
  ),

  // --- Compliance ---
  agreedToPrivacyPolicy: z.boolean().refine((value) => value === true, {
    message: "You must accept the privacy policy",
  }),
});

// Infer the TypeScript type from the schema
export type CandidateApplication = z.infer<typeof candidateApplicationSchema>;