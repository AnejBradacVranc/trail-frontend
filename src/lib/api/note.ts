import { axiosInstance } from './axios';
import type { GenericResponse } from '$lib/types/genericResponse';
import type { NoteFormValues } from '$lib/components/forms/notes/noteSchema';

export const addNote = async (data: NoteFormValues) => {
	const payload = {
		note_content: data.noteContent,
		application_id: data.jobApplicationId
	};

	return axiosInstance.post<GenericResponse<{ id: number }>>('/notes', payload).catch((error) => {
		console.error('Error adding note:', error);
		throw error;
	});
};
