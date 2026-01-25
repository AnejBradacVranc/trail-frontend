import { z } from 'zod';




export const statusLabels = {
	applied: 'Applied',
	interviewing: 'Interviewing',
	offer: 'Offer',
	rejected: 'Rejected',
	accepted: 'Accepted',
	withdrawn: 'Withdrawn'
} as const;


export const jobApplicationSchema = z.object({
	jobTitle: z.string().min(1, 'Job title is required'),
	companyName: z.string().min(1, 'Company name is required'),
	jobUrl: z.string(),
	location: z.string(),
	minSalary: z.string(),
	maxSalary: z.string(),
	applicationStatus: z.string(),
	dateApplied: z.string().min(1, 'Date applied is required'),
	files: z.string(),
	notes: z.string()
});

export type JobApplicationFormValues = z.infer<typeof jobApplicationSchema>;


