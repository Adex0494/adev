import { z } from 'zod'

export const projectIntakeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'form.name.required' })
    .min(2, { message: 'form.name.min' })
    .max(100, { message: 'form.tooLong' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'form.email.required' })
    .email({ message: 'form.email.invalid' })
    .max(254, { message: 'form.tooLong' }),
  company: z.string().trim().max(150, { message: 'form.tooLong' }).optional(),
  budget: z.enum(['small', 'medium', 'large', 'enterprise', 'unsure'], { message: 'form.budget.required' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'form.description.required' })
    .min(10, { message: 'form.description.min' })
    .max(4000, { message: 'form.tooLong' }),
  website: z.string().max(200).optional(),
})

export type ProjectIntakeFormValues = z.infer<typeof projectIntakeSchema>
