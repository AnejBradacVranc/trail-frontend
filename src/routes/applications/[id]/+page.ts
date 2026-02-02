import { getJobApplication } from '$lib/api/jobApplication';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	let response;
	try {
		response = await getJobApplication(parseInt(params.id));
	} catch (error) {
		console.error('Error fetching application:', error);
	}

	return {
		application: response?.data.success ? response.data.data || null : null
	};
};
