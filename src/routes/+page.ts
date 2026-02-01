import type { PageLoad } from './$types';
import { getStatsSummary } from '$lib/api/statistics';
import type { StatisticSummary } from '$lib/types/statistics';
import { getJobApplicationsForUser } from '$lib/api/jobApplication';
import type { ApplicationSummary } from '$lib/types/jobApplication';

export const load: PageLoad = async (): Promise<{
	statistics: { summary: StatisticSummary[] };
	applications: {
		inProgress: ApplicationSummary[];
		interviewing: ApplicationSummary[];
		offer: ApplicationSummary[];
	};
}> => {
	let statisticsResp;
	let applicationsResp;
	try {
		statisticsResp = await getStatsSummary();
		applicationsResp = await getJobApplicationsForUser(2, 3, 4);
	} catch (error) {
		console.error('Error fetching statistics summaries:', error);
	}

	return {
		statistics: {
			summary: statisticsResp?.data.success ? statisticsResp.data.data || [] : []
		},
		applications: {
			inProgress: applicationsResp?.data.success
				? applicationsResp.data.data?.filter((el) => el.status_id === 2) || []
				: [],
			interviewing: applicationsResp?.data.success
				? applicationsResp.data.data?.filter((el) => el.status_id === 3) || []
				: [],
			offer: applicationsResp?.data.success
				? applicationsResp.data.data?.filter((el) => el.status_id === 4) || []
				: []
		}
	};
};
