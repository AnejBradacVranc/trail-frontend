import { axiosInstance } from './axios';
import type { ApplicationSummary } from '$lib/types/jobApplication';
import type { GenericResponse } from '$lib/types/genericResponse';
import type { JobApplicationFormValues } from '$lib/components/forms/jobApplication/jobApplicationSchema';

export const getJobApplicationsForUserByEmail = async (email: string) => {
	return axiosInstance
		.get<GenericResponse<ApplicationSummary[]>>(`/user/applications?user_email=${email}`)
		.catch((error) => {
			console.error('Error fetching job applications:', error);
			throw error;
		});
};

export const addJobApplication = async (data: JobApplicationFormValues) => {
	const payload = {
		job_title: data.jobTitle,
		company_name: data.companyName,
		job_url: data.jobUrl,
		location: data.location,
		salary_min: parseInt(data.minSalary) || 0,
		salary_max: parseInt(data.maxSalary) || 0,
		status_id: parseInt(data.applicationStatusId) || 1,
		applied_at: data.dateApplied,
		note_content: data.notes,
		user_id: data.userId,
		platform_id: parseInt(data.platformId) || 1
	};

	console.log(payload);
	return axiosInstance
		.post<GenericResponse<{ id: number }>>('/applications', payload)
		.catch((error) => {
			console.error('Error adding job application:', error);
			throw error;
		});
};
