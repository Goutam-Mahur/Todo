const z = require("zod");

const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "title is required - zod" })
    .max(100, { message: "title can have max 100 chars - zod" }),
  description: z
    .string()
    .min(1, { message: "description is required - zod" })
    .max(1000, { message: "description can have max 1000 chars - zod" }),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "invalid date format - zod",
  }),
  category: z
    .string()
    .min(1, { message: "category is required - zod" })
    .max(50, { message: "category can have max 50 chars - zod" }),
  completed: z.boolean().optional(),
});

const updateTaskSchema = createTaskSchema.partial();

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
