<script lang="ts">
	import ApplicationCard from '$lib/components/applicationCard.svelte';
	import InfoCard from '$lib/components/infoCard.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const { statistics, user, applications } = $derived(data);
	const { inProgress, interviewing, offer } = $derived(applications);
</script>

<section class="container">
	<h1>Good morning, {user?.name}</h1>
	<p class="text-muted-foreground">
		{#if inProgress.length > 0 || interviewing.length > 0 || offer.length > 0}
			You have {inProgress.length}
			{inProgress.length === 1 ? 'application' : 'applications'} in progress,
			{interviewing.length} at the interview stage, and {offer.length}
			{offer.length === 1 ? 'offer' : 'offers'} waiting for you.
		{:else}
			No applications yet. Start by adding your first job application!
		{/if}
	</p>
</section>

<section class="container">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
		{#each statistics.summary as summary}
			<InfoCard {...summary} />
		{/each}
	</div>
</section>

<section class="container">
	<h2>Overview</h2>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		<div class="flex flex-col gap-4">
			{#each inProgress as aplInProg}
				<ApplicationCard {...aplInProg} />
			{/each}
		</div>
		<div class="flex flex-col gap-4">
			{#each interviewing as aplInterview}
				<ApplicationCard {...aplInterview} />
			{/each}
		</div>
		<div class="flex flex-col gap-4">
			{#each offer as aplOffer}
				<ApplicationCard {...aplOffer} />
			{/each}
		</div>
	</div>
</section>
