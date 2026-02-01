import { getApplicationStatuses } from '$lib/api/applicationStatuses';
import { getPlatforms } from '$lib/api/platforms';
import type { FormFieldData } from '$lib/types/formFieldData';
import type { SEO } from '$lib/types/seo';
import type { LayoutLoad } from './$types';
import type { AuthUser } from '$lib/types/auth';
import { check } from '$lib/api/user';
import { goto } from '$app/navigation';

export const load: LayoutLoad = async ({
	data,
	url
}): Promise<{ seo: SEO; formFieldData: FormFieldData; user: AuthUser | null }> => {
	const PUBLIC_ROUTES = ['/login', '/register'];

	let statusLabelsMap = new Map<string, string>();
	let platformsMap = new Map<string, string>();
	let statuses;
	let platforms;
	let authUser;

	try {
		statuses = await getApplicationStatuses();
		platforms = await getPlatforms();
		authUser = await check();

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

		const isPublicRoute = PUBLIC_ROUTES.some((route) => url.pathname === route);

		if (authUser.status === 401 && !isPublicRoute) {
			goto('/login');
		}
	} catch (error) {
		console.error('Error fetching data in root layout:', error);
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
		},
		user: authUser?.data.success ? authUser?.data.data : null
	};
};
