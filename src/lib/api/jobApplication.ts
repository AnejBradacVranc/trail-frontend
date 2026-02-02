import { axiosInstance } from './axios';
import type { ApplicationDetail, ApplicationSummary } from '$lib/types/jobApplication';
import type { GenericResponse } from '$lib/types/genericResponse';
import type { JobApplicationFormValues } from '$lib/components/forms/jobApplication/jobApplicationSchema';

export const getJobApplications = async (...statusIds: number[]) => {
	const params = new URLSearchParams();

	statusIds.forEach((id) => {
		params.append('status_id', id.toString());
	});

	return axiosInstance
		.get<GenericResponse<ApplicationSummary[]>>(`/applications?${params.toString()}`)
		.catch((error) => {
			console.error('Error fetching job applications:', error);
			throw error;
		});
};
export const getJobApplication = async (applicationId: number) => {
	return axiosInstance
		.get<GenericResponse<ApplicationDetail>>(`/applications/${applicationId}`)
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
