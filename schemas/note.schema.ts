import { z } from 'zod'

export const createNoteSchema = z.object({
  title: z.string().min(1, 'El título no puede estar vacío').max(100, 'Máximo 100 caracteres'),
  content: z.string().min(1, 'El contenido no puede estar vacío'),
})

export const updateNoteSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  content: z.string().min(1).optional(),
})

export type CreateNoteInput = z.infer<typeof createNoteSchema>
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>
