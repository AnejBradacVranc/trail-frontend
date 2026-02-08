import type { PageLoad } from './$types';
import { getStatsSummary } from '$lib/api/statistics';
import type { StatisticSummary } from '$lib/types/statistics';
import { getJobApplications } from '$lib/api/jobApplication';
import type { ApplicationSummary } from '$lib/types/jobApplication';

export const load: PageLoad = async (): Promise<{
	statistics: { summary: StatisticSummary[] };
	applications: ApplicationSummary[][];
}> => {
	const STATUS_IDS = [1, 2, 3];

	let statisticsResp;
	let applicationsResp;
	try {
		statisticsResp = await getStatsSummary();
		applicationsResp = await getJobApplications(...STATUS_IDS);
	} catch (error) {
		console.error('Error fetching statistics summaries:', error);
	}

	const allApplications = applicationsResp?.data.success ? applicationsResp.data.data || [] : [];

	//TODO maybe add so BE already returns grouped if ids provided
	const groupedApplications = STATUS_IDS.map((statusId) =>
		allApplications.filter((el) => el.status_id === statusId)
	);

	return {
		statistics: {
			summary: statisticsResp?.data.success ? statisticsResp.data.data || [] : []
		},
		applications: groupedApplications
	};
};
