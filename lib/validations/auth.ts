import { z } from "zod";

/**
 * Returns the list of permitted college email domains from the ALLOWED_EMAIL_DOMAINS env var.
 * If ALLOWED_EMAIL_DOMAINS is not set, empty, or "*", domain restriction is disabled (all domains allowed).
 */
export function getAllowedEmailDomains(): string[] {
  const env =
    process.env.ALLOWED_EMAIL_DOMAINS ||
    process.env.NEXT_PUBLIC_ALLOWED_EMAIL_DOMAINS;

  if (!env || env.trim() === "" || env.trim() === "*") {
    return []; // No domain restriction active
  }

  return env
    .split(",")
    .map((d) => d.trim().toLowerCase())
    .map((d) => (d.startsWith("@") ? d : `@${d}`))
    .filter(Boolean);
}

/**
 * Validates whether an email complies with the ALLOWED_EMAIL_DOMAINS restriction.
 */
export function isEmailDomainAllowed(email: string): { allowed: boolean; error?: string } {
  const allowedDomains = getAllowedEmailDomains();
  if (allowedDomains.length === 0) {
    return { allowed: true };
  }

  const normalized = email.trim().toLowerCase();
  const isMatch = allowedDomains.some((domain) => normalized.endsWith(domain));

  if (!isMatch) {
    return {
      allowed: false,
      error: `Access restricted: Email must end with ${allowedDomains.join(" or ")}.`,
    };
  }

  return { allowed: true };
}

// Fallback constant for backwards compatibility
export const COLLEGE_EMAIL_DOMAIN = "@msruas.ac.in";

const flexibleEmailValidation = z
  .string()
  .email("Please enter a valid email address")
  .refine(
    (val) => {
      const check = isEmailDomainAllowed(val);
      return check.allowed;
    },
    (val) => {
      const check = isEmailDomainAllowed(val);
      return { message: check.error || "Email domain is not permitted." };
    }
  );

export const loginSchema = z.object({
  email: flexibleEmailValidation,
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    full_name: z.string().min(2, "Full name must be at least 2 characters"),
    email: flexibleEmailValidation,
    roll_number: z.string().min(3, "Roll number must be at least 3 characters"),
    hostel_block: z.string().min(1, "Please select or enter your hostel block"),
    room_number: z.string().min(1, "Please enter your room number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(6, "Confirm password must match password"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
