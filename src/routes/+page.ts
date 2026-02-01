import type { PageLoad } from './$types';
import { getStatsSummary } from '$lib/api/statistics';
import type { StatisticSummary } from '$lib/types/statistics';

export const load: PageLoad = async (): Promise<{
	statistics: { summary: StatisticSummary[] };
}> => {
	let response;
	try {
		response = await getStatsSummary();
	} catch (error) {
		console.error('Error fetching statistics summaries:', error);
	}

	return {
		statistics: {
			summary: response?.data.success ? response.data.data || [] : []
		}
	};
};
