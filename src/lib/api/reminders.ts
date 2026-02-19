import { axiosInstance } from './axios';
import type { GenericResponse } from '$lib/types/genericResponse';
import type { ReminderFormValues } from '$lib/components/forms/reminders/reminderSchema';

export const addReminder = async (data: ReminderFormValues) => {
	// Convert "YYYY-MM-DD HH:MM:SS" format to RFC3339
	const remindAtRFC3339 = new Date(data.remindAt.replace(' ', 'T')).toISOString();
	
	const payload = {
		application_id: data.applicationId,
		title: data.title,
		description: data.description ? data.description : null,
		remind_at: remindAtRFC3339,
		is_completed: data.isCompleted ? data.isCompleted : null
	};

	return axiosInstance
		.post<GenericResponse<{ id: number }>>('/reminders', payload)
		.catch((error) => {
			console.error('Error creating reminder:', error);
			throw error;
		});
};

export const updateReminderStatus = async (reminderId: number, isComplete: boolean) => {
	const payload = {
		is_completed: isComplete
	};

	return axiosInstance
		.put<GenericResponse<{ id: number }>>(`/reminders/${reminderId}`, payload)
		.catch((error) => {
			console.error('Error updating reminder status:', error);
			throw error;
		});
};
