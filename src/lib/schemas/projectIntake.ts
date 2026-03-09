import { z } from 'zod'

export const projectIntakeSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'form.name.required' })
    .min(2, { message: 'form.name.min' }),
  email: z
    .string()
    .min(1, { message: 'form.email.required' })
    .email({ message: 'form.email.invalid' }),
  company: z.string().optional(),
  budget: z.string().min(1, { message: 'form.budget.required' }),
  description: z
    .string()
    .min(1, { message: 'form.description.required' })
    .min(10, { message: 'form.description.min' }),
})

export type ProjectIntakeFormValues = z.infer<typeof projectIntakeSchema>
