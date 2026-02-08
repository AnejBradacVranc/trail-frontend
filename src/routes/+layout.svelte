<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/navigation/sidebar.svelte';
	import Navbar from '$lib/components/navigation/navbar.svelte';
	import { SidebarProvider, SidebarTrigger } from '$lib/components/ui/sidebar';
	import type { LayoutProps } from './$types';
	import { onNavigate } from '$app/navigation';
	import Breadcrumb from '$lib/components/ui/breadcrumb/breadcrumb.svelte';
	import BreadcrumbList from '$lib/components/ui/breadcrumb/breadcrumb-list.svelte';
	import BreadcrumbItem from '$lib/components/ui/breadcrumb/breadcrumb-item.svelte';
	import BreadcrumbLink from '$lib/components/ui/breadcrumb/breadcrumb-link.svelte';
	import BreadcrumbSeparator from '$lib/components/ui/breadcrumb/breadcrumb-separator.svelte';

	let { children, data }: LayoutProps = $props();

	const { seo, formFieldData, user } = $derived(data);

	function getBreadcrumbText(path: string): string {
		const breadcrumbTranslations: Record<string, () => string> = {
			applications: m['breadcrumb.applications'],
			demo: m['breadcrumb.demo'],
			paraglide: m['breadcrumb.paraglide'],
			login: m['breadcrumb.login'],
			register: m['breadcrumb.register'],
			settings: m['breadcrumb.settings'],
			analytics: m['breadcrumb.analytics'],
			reminders: m['breadcrumb.reminders']
		};

		if (breadcrumbTranslations[path]) {
			return breadcrumbTranslations[path]();
		}

		return path.toString();
	}

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:url" content={seo.url} />
	<meta property="og:image" content={seo.image} />
</svelte:head>

{#if user}
	<Navbar {formFieldData} />
{/if}
<SidebarProvider open={true}>
	{#if user}
		<Sidebar />
	{/if}
	<main class="flex min-w-0 flex-1">
		{#if user}
			<SidebarTrigger />
		{/if}
		<div class="flex min-w-0 flex-1 flex-col items-center gap-8 py-8">
			{#if user}
				<div class="container">
					<Breadcrumb>
						<BreadcrumbList>
							{@const pathnames = page.url.pathname.split('/').filter(Boolean)}
							<BreadcrumbItem>
								<BreadcrumbLink href={`/`}>{m['breadcrumb.home']()}</BreadcrumbLink>
							</BreadcrumbItem>
							{#each pathnames as path, index}
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink href={index < pathnames.length - 1 ? `/${path}` : undefined}
										>{getBreadcrumbText(path)}</BreadcrumbLink
									>
								</BreadcrumbItem>
							{/each}
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			{/if}
			{@render children()}
		</div>
	</main>
</SidebarProvider>

<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>
			{locale}
		</a>
	{/each}
</div>
