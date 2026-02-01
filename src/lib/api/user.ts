import type { AuthUser } from '$lib/types/auth';
import type { GenericResponse, Message } from '$lib/types/genericResponse';
import { axiosInstance } from './axios';

export const login = async (email: string, password: string) => {
	const payload = {
		email: email,
		password: password
	};

	return axiosInstance.post<GenericResponse<Message>>(`/user/login`, payload).catch((error) => {
		console.error('Error fetching application statuses:', error);
		throw error;
	});
};

export const check = async () => {
	return axiosInstance.get<GenericResponse<AuthUser>>(`/user/check`).catch((error) => {
		console.error('Error fetching application statuses:', error);
		throw error;
	});
};

export const logout = async () => {
	return axiosInstance.post<GenericResponse<Message>>(`/user/logout`).catch((error) => {
		console.error('Error fetching application statuses:', error);
		throw error;
	});
};
