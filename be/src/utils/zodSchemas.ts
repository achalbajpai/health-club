import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(5, { message: "Username must be 5 or more characters long" })
    .max(20, { message: "Username must be 20 or fewer characters long" }),
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, { message: "First name must be 5 or more characters long" })
    .max(20, { message: "First name must be 20 or fewer characters long" }),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(0, { message: "Last name must be 5 or more characters long" })
    .max(20, { message: "Last name must be 20 or fewer characters long" }),
  email: z
    .string({ required_error: "Last name is required" })
    .email({ message: "Invalid email address" }),
  phonenumber: z
    .string({ required_error: "Phone number is required" })
    .length(10, { message: "Invalid phone number" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(5, { message: "Password must be 5 or more characters long" })
    .max(30, "Password must be 30 or fewer characters long"),
  profession: z.string({
    required_error: "Professtion is required",
  }),
});

export const loginSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(5, { message: "Username must be 5 or more characters long" })
    .max(20, { message: "Username must be 20 or fewer characters long" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(5, { message: "Password must be 5 or more characters long" })
    .max(30, "Password must be 30 or fewer characters long"),
});

export const postSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .max(30, { message: "Title must be 30 or fewer characters long" }),
  description: z
    .string()
    .max(280, { message: "Description must be 280 or fewer characters long" }),
  tag: z.string().optional().nullable().default(null),
});
