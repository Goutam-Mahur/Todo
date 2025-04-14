const z = require("zod");

const registerSchema = z.object({
  username: z
    .string()
    .min(4, { message: "username must be atleast 4 chars - zod" })
    .max(30, { message: "username must be contain only 30 chars - zod" }),
  email: z
    .string()
    .email()
    .min(4, { message: "email must be atleast 4 chars - zod" })
    .max(50, { message: "email must be contaon only 30 chars - zod" }),
  password: z
    .string()
    .min(4, { message: "password must be atleast 4 chars long -zod" })
    .max(20, { message: "password must only contain 20 chars - zod" }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "invalid email format - zod" }),
  password: z
    .string()
    .min(4, { message: "password must be atleast 4 chars long -zod" })
    .max(20, { message: "password must only contain 20 chars - zod" }),
});

const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(4, { message: "password must be atleast 4 chars long -zod" })
    .max(20, { message: "password must only contain 20 chars - zod" }),
  newPassword: z
    .string()
    .min(4, { message: "password must be atleast 4 chars long -zod" })
    .max(20, { message: "password must only contain 20 chars - zod" }),
});

module.exports = { registerSchema, loginSchema, changePasswordSchema };
