import type { PageLoad } from './$types';
import { getStatsSummary } from '$lib/api/statistics';

export const load: PageLoad = async () => {
	let summaryStatistics;

	try {
		summaryStatistics = await getStatsSummary('alice@example.com');
		if (!summaryStatistics.data.success) {
			console.error(
				'Server error when fetching statistics summaries',
				summaryStatistics.data.data.message
			);
		}
	} catch (error) {
		console.error('Error fetching statistics summaries:', error);
	}
	return {
		statistics: {
			summary: summaryStatistics?.data.success ? summaryStatistics.data.data || [] : []
		}
	};
};
