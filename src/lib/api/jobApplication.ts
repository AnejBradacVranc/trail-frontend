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

	console.log({
		job_title: data.jobTitle,
		company_name: data.companyName,
		job_url: data.jobUrl,
		location: data.location,
		salary_min: parseInt(data.minSalary) || 0,
		salary_max: parseInt(data.maxSalary) || 0,
		application_status: data.applicationStatus,
		applied_at: data.dateApplied,
		notes: data.notes
	})
	return axiosInstance
		.post<GenericResponse<{id: number}>>('/applications', {
			job_title: data.jobTitle,
			company_name: data.companyName,
			job_url: data.jobUrl,
			location: data.location,
			salary_min: parseInt(data.minSalary) || 0,
			salary_max: parseInt(data.maxSalary) || 0,
			application_status: data.applicationStatus,
			applied_at: data.dateApplied,
			notes: data.notes
		})
		.catch((error) => {
			console.error('Error adding job application:', error);
			throw error;
		});
};
