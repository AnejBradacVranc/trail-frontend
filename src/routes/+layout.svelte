<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/navigation/sidebar.svelte';
	import Navbar from '$lib/components/navigation/navbar.svelte';
	import { SidebarProvider, SidebarTrigger } from '$lib/components/ui/sidebar';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	const { seo, formFieldData, user } = $derived(data);
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
	<main class="flex w-full">
		{#if user}
			<SidebarTrigger />
		{/if}
		<div class="flex w-full flex-col items-center gap-8 px-4 py-8 md:px-6 lg:px-8">
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
