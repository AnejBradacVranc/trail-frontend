// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

const API_URL = 'http://localhost:8080';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api')) {
		const url = API_URL + event.url.pathname.replace('/api', '');

		return fetch(url, {
			method: event.request.method,
			headers: event.request.headers,
			body: event.request.body,
			credentials: 'include'
		});
	}

	return resolve(event);
};
