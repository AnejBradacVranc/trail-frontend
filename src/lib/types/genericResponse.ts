export interface SuccessResponse<T> {
	success: true;
	code: number;
	data: T | null;
}

export interface ErrorResponse {
	success: false;
	code: number;
	data: {
		message: string;
	};
}

export type GenericResponse<T> = SuccessResponse<T> | ErrorResponse;
