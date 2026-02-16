import { axiosInstance } from './axios';
import type { GenericResponse } from '$lib/types/genericResponse';

export const updateReminderStatus = async (reminderId: number, isComplete: boolean) => {
	const payload = {
		is_completed: isComplete
	};

	return axiosInstance
		.put<GenericResponse<{ id: number }>>(`/reminders/${reminderId}`, payload)
		.catch((error) => {
			console.error('Error adding note:', error);
			throw error;
		});
};
