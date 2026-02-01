import type { GenericResponse } from '$lib/types/genericResponse';
import type { StatisticSummary } from '$lib/types/statistics';
import { axiosInstance } from './axios';

export const getStatsSummary = async () => {
	return axiosInstance
		.get<GenericResponse<StatisticSummary[]>>(`/user/statistics/summary`)
		.catch((error) => {
			console.error('Error fetching application statuses:', error);
			throw error;
		});
};
