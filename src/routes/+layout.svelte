<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/navigation/sidebar.svelte';
	import Navbar from '$lib/components/navigation/navbar.svelte';
	import { SidebarProvider, SidebarTrigger } from '$lib/components/ui/sidebar';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Navbar />
<SidebarProvider open={true}>
	<Sidebar />
	<main class="flex w-full">
		<SidebarTrigger />
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
