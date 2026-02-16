import { getApplicationStatuses } from '$lib/api/applicationStatuses';
import { getJobApplication } from '$lib/api/jobApplication';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	let jobApplication;
	let jobApplicationStatuses;
	try {
		jobApplication = await getJobApplication(parseInt(params.id));
		jobApplicationStatuses = await getApplicationStatuses();
	} catch (error) {
		console.error('Error fetching application:', error);
	}

	return {
		application: jobApplication?.data.success ? jobApplication.data.data || null : null,
		applicationStatuses: jobApplicationStatuses?.data.success
			? jobApplicationStatuses.data.data || null
			: null
	};
};
