import { z } from "zod";

const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
const phoneRegex = /^[6-9]\d{9}$/;

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

// ----->> Admin Panel <<-----

// ----->> User Schema <<-----
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

// ----->> Institute Schema <<-----
export const instituteSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
});
export type InstituteFormType = z.infer<typeof instituteSchema>;

// ----->> Department Schema <<-----
export const departmentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  institute: z.string().min(1, "Institute is required"),
  batch: z.string().min(1, "Batch is required"),
});
export type DepartmentFormType = z.infer<typeof departmentSchema>;

// ----->> Class Schema <<-----
export const classSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  department: z.string().min(1, "Department is required"),
});
export type ClassFormType = z.infer<typeof classSchema>;

// ----->> Profile Schema <<-----
export const profileSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().min(1, "Middle Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  gender: z.string().min(1, "Gender is required"),
  birthDate: z.string().min(1, "Birth Date is required").regex(dateRegex, "Birth Date must be in DD-MM-YYYY format"),
  bloodGroup: z.string().min(1, "Blood Group is required"),
  address: z.string().min(1, "Address is required"),
  contact: z.string().min(1, "Contact is required").regex(phoneRegex, "Contact must be a valid 10-digit number"),
  fatherName: z.string().min(1, "Father Name is required"),
  fatherContact: z.string().min(1, "Father Contact is required").regex(phoneRegex, "Father Contact must be a valid 10-digit number"),
  motherName: z.string().min(1, "Mother Name is required"),
  motherContact: z.string().min(1, "Mother Contact is required").regex(phoneRegex, "Mother Contact must be a valid 10-digit number"),
});
export type ProfileFormType = z.infer<typeof profileSchema>;

