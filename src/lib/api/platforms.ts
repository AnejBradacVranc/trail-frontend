import type { ApplicationStatus } from '$lib/types/applicationStatuses';
import type { GenericResponse } from '$lib/types/genericResponse';
import type { Platform } from '$lib/types/platforms';
import { axiosInstance } from './axios';

export const getPlatforms = async () => {
	return axiosInstance.get<GenericResponse<Platform[]>>(`/platforms`).catch((error) => {
		console.error('Error fetching platforms:', error);
		throw error;
	});
};
