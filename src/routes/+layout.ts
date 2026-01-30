import { getApplicationStatuses } from '$lib/api/applicationStatuses';
import { getPlatforms } from '$lib/api/platforms';
import type { FormFieldData } from '$lib/types/formFieldData';
import type { SEO } from '$lib/types/seo';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({
	data
}): Promise<{ seo: SEO; formFieldData: FormFieldData }> => {
	let statuses;
	let statusLabelsMap = new Map<string, string>();

	let platforms;
	let platformsMap = new Map<string, string>();

	try {
		statuses = await getApplicationStatuses();
		platforms = await getPlatforms();

		if (statuses?.data.success && statuses.data.data) {
			statusLabelsMap = new Map(
				statuses.data.data.map((status) => [status.status_id.toString(), status.status_name])
			);
		}

		if (platforms?.data.success && platforms.data.data) {
			platformsMap = new Map(
				platforms.data.data.map((platform) => [platform.platform_id.toString(), platform.name])
			);
		}
	} catch (error) {
		console.error('Error fetching application statuses in layout load:', error);
	}

	return {
		seo: data.seo,
		formFieldData: {
			applicationStatuses: {
				keyValue: statusLabelsMap,
				iterable: statuses?.data.success ? statuses.data.data || [] : []
			},
			platforms: {
				keyValue: platformsMap,
				iterable: platforms?.data.success ? platforms.data.data || [] : []
			}
		}
	};
};
