<script lang="ts">
	import ApplicationCard from '$lib/components/applicationCard.svelte';
	import InfoCard from '$lib/components/infoCard.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const { statistics, user, applications } = $derived(data);
	
	const totalApplications = $derived(
		applications.reduce((sum, group) => sum + group.length, 0)
	);
</script>

<section class="container">
	<h1>Good morning, {user?.name}</h1>
	<p class="text-muted-foreground">
		{#if totalApplications > 0}
			You have {totalApplications}
			{totalApplications === 1 ? 'application' : 'applications'} across {applications.length}
			{applications.length === 1 ? 'status' : 'statuses'}.
		{:else}
			No applications yet. Start by adding your first job application!
		{/if}
	</p>
</section>

<section class="container">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
		{#each statistics.summary as summary (summary.name)}
			<InfoCard {...summary} />
		{/each}
	</div>
</section>

<section class="container">
	<h2>Overview</h2>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each applications as applicationGroup, index (index)}
			<div class="flex flex-col gap-4">
				{#each applicationGroup as application (application.application_id)}
					<ApplicationCard {...application} />
				{/each}
			</div>
		{/each}
	</div>
</section>
