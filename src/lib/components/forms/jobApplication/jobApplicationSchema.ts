import { z } from 'zod';

export const jobApplicationSchema = z.object({
	userId: z.number(),
	jobTitle: z.string().min(1, 'Job title is required'),
	companyName: z.string().min(1, 'Company name is required'),
	jobUrl: z.string(),
	location: z.string().min(1, 'Location is required'),
	employeeCount: z.number(),
	minSalary: z.string(),
	maxSalary: z.string(),
	applicationStatusId: z.string(),
	platformId: z.string(),
	dateApplied: z.string().min(1, 'Date applied is required'),
	files: z.string(),
	notes: z.string()
});

export type JobApplicationFormValues = z.infer<typeof jobApplicationSchema>;
