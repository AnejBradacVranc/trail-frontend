import type { PageLoad } from './$types';
import { getJobApplicationsForUserByEmail } from '$lib/api/jobApplication';
import { isSuccessResponse } from '$lib/types/genericResponse';

export const load: PageLoad = async () => {
	try {
		const response = await getJobApplicationsForUserByEmail('alice@example.com');
		
		if (isSuccessResponse(response.data)) {
			return response.data;
		} else {
			console.error('Error response:', response.data.message);
			return {
				code: response.data.code,
				data: []
			};
		}
	} catch (error) {
		console.error('Error in load function:', error);
		return {
			code: 500,
			data: []
		};
	}
};
