import { z } from "zod";

// ----->> Auth Schema <<-----
export const loginSchema = z.object({
  email:
    z.string()
      .min(1, "Email is required")
      .email("Invalid email format"),
  password:
    z.string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
});
export type LoginFormType = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  email: z.string().email("Invalid email format"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(25, "Password cannot exceed 25 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)"
    ),

  role: z
    .enum(["student", "teacher", "admin"], {
      errorMap: () => ({ message: "Role must be either 'student', 'teacher', or 'admin'" }),
    })
    .default("student"),

  otp: z
    .string()
    .length(8, "OTP must be exactly 8 characters long")
    .regex(/^[a-zA-Z0-9]{8}$/, "OTP must contain only numbers and letters"),
});
export type SignupFormType = z.infer<typeof signupSchema>;

// ----->> Admin Schema <<-----
export const userSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  email:
    z.string()
      .min(1, "Email is required")
      .email("Invalid email format")
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
  role:
    z.enum(["student", "teacher", "admin"], {
      errorMap: () => ({ message: "Role must be either 'Student', 'Teacher', or 'Admin'" }),
    }),
  status:
    z.enum(["none", "applied", "accepted", "rejected"], {
      errorMap: () => ({ message: "Status must be either 'None', 'Applied', 'Accepted', or 'Rejected'" }),
    }),
});
export type UserFormType = z.infer<typeof userSchema>;