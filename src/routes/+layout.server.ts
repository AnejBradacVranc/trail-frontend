import type { AuthUser } from '$lib/types/auth';
import type { SEO } from '$lib/types/seo';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

const PUBLIC_ROUTES = ['/login', '/register'];

export const load: LayoutServerLoad = async ({
	url,
	fetch
}): Promise<{ seo: SEO; user: AuthUser | null }> => {
	let user: AuthUser | null = null;

	try {
		const response = await fetch('/api/user/check');

		if (response.ok) {
			const data = await response.json();
			if (data.success && data.data) {
				user = data.data;
			}
		}
	} catch (error) {
		console.error('Error checking authentication:', error);
	}

	const isPublicRoute = PUBLIC_ROUTES.some((route) => url.pathname === route);
	if (!user && !isPublicRoute) {
		throw redirect(303, '/login');
	}

	return {
		seo: {
			title: 'Trail',
			description: 'A intuitive job application tracker to help you land your next role.',
			url: url.href,
			image: 'https://example.com/og-image.jpg'
		},
		user
	};
};
