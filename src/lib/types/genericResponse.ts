export interface SuccessResponse<T> {
	code: number; // 200-299
	data: T;
}

export interface ErrorResponse {
	code: number; // 400+
	message: string;
}

export type GenericResponse<T> = SuccessResponse<T> | ErrorResponse;

// Type guard to check if response is successful
export function isSuccessResponse<T>(response: GenericResponse<T>): response is SuccessResponse<T> {
	return 'data' in response && response.code >= 200 && response.code < 300;
}

// Type guard to check if response is error
export function isErrorResponse<T>(response: GenericResponse<T>): response is ErrorResponse {
	return 'message' in response || response.code >= 400;
}
