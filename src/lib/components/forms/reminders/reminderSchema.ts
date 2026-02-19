import { z } from 'zod';

export const reminderSchema = z.object({
	applicationId: z.number(),
	title: z.string().min(1, 'Title is required'),
	description: z.string(),
	remindAt: z.string().min(1, 'Reminder date and time is required'),
	isCompleted: z.boolean()
});

export type ReminderFormValues = z.infer<typeof reminderSchema>;
