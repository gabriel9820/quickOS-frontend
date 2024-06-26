import z from "zod";

export const usersFiltersFormSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().optional(),
  roles: z
    .array(
      z.object({
        key: z.number({ required_error: "Key é obrigatório" }),
        label: z.string({ required_error: "Label é obrigatório" }),
      })
    )
    .nullable()
    .optional(),
  isActive: z
    .object({
      key: z.boolean({ required_error: "Key é obrigatório" }),
      label: z.string({ required_error: "Label é obrigatório" }),
    })
    .nullable()
    .optional(),
});

export type UsersFiltersFormData = z.infer<typeof usersFiltersFormSchema>;
