import * as z from "zod";

export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Minimum of 2 characters" }),
  username: z.string().min(2, { message: "Minimum of 2 characters" }).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(3, { message: "Password must contain at least 3 characters" }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(3, { message: "Password must contain at least 3 characters" }),
});

export const PostValidation = z.object({
  caption: z.string().min(2).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});

export const ProfileValidation = z.object({
  name: z.string().min(2, { message: "Minimum of 2 characters" }),
  username: z.string().min(2, { message: "Minimum of 2 characters" }).max(50),
  email: z.string().email(),
  bio: z.string(),
  file: z.custom<File[]>(),
});
