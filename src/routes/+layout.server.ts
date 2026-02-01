import { check } from '$lib/api/user';
import type { AuthUser } from '$lib/types/auth';
import type { SEO } from '$lib/types/seo';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url }): Promise<{ seo: SEO }> => {
	return {
		seo: {
			title: 'Trail',
			description: 'A intuitive job application tracker to help you land your next role.',
			url: url.href,
			image: 'https://example.com/og-image.jpg'
		}
	};
};
