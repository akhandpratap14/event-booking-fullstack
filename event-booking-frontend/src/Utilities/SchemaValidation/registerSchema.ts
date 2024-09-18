import { z } from "zod";

export const RegisterFormDataSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  type: z.enum(["Host", "Joiner"], {
    errorMap: () => ({ message: "Please select either Host or Joiner" }),
  }),
});
