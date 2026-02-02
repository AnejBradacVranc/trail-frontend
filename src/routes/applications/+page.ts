import type { PageLoad } from './$types';
import { getJobApplications } from '$lib/api/jobApplication';

export const load: PageLoad = async () => {
	let response;
	try {
		response = await getJobApplications();
	} catch (error) {
		console.error('Error fetching applications:', error);
	}

	return {
		applications: response?.data.success ? response.data.data || [] : []
	};
};
