import { z } from 'zod';

export const noteSchema = z.object({
	noteContent: z.string().min(1, 'Note content is required'),
	jobApplicationId: z.number()
});

export type NoteFormValues = z.infer<typeof noteSchema>;
