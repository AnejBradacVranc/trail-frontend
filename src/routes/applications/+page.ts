import type { PageLoad } from './$types';
import { getJobApplicationsForUserByEmail } from '$lib/api/jobApplication';

export const load: PageLoad = async () => {
	try {
		//TODO get user email from session
		const response = await getJobApplicationsForUserByEmail('alice@example.com');

		if (response.data.success) {
			return {
				applications: response.data.data
			};
		} else {
			console.error('Error response:', response.data.data.message);
			return {
				applications: []
			};
		}
	} catch (error) {
		console.error('Error in load function:', error);
		return {
			applications: []
		};
	}
};
