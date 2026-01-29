import type { ApplicationStatus } from '$lib/types/applicationStatuses';
import type { GenericResponse } from '$lib/types/genericResponse';
import { axiosInstance } from './axios';

export const getApplicationStatuses = async () => {
	return axiosInstance
		.get<GenericResponse<ApplicationStatus[]>>(`/applications/statuses`)
		.catch((error) => {
			console.error('Error fetching application statuses:', error);
			throw error;
		});
};
