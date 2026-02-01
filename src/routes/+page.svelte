<script lang="ts">
	import DetailedInfoCard from '$lib/components/detailedInfoCard.svelte';
	import InfoCard from '$lib/components/infoCard.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const { statistics, user, applications } = $derived(data);
	const { inProgress, interviewing, offer } = $derived(applications);
</script>

<section class="container">
	<h1>Good morning, {user?.name}</h1>
	<!--<p class="text-muted-foreground">
		You have some things scheduled this week [dynamic summary text ?]
	</p>-->
</section>

<section class="container">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
		{#each statistics.summary as summary}
			<InfoCard {...summary} />
		{/each}
	</div>
</section>

<section class="container">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		<div class="flex flex-col gap-4">
			<h3>In Progress</h3>
			{#each inProgress as aplInProg}
				<DetailedInfoCard {...aplInProg} />
			{/each}
		</div>
		<div class="flex flex-col gap-4">
			<h3>Interviewing</h3>
			{#each interviewing as aplInterview}
				<DetailedInfoCard {...aplInterview} />
			{/each}
		</div>
		<div class="flex flex-col gap-4">
			<h3>Offer</h3>
			{#each offer as aplOffer}
				<DetailedInfoCard {...aplOffer} />
			{/each}
		</div>
	</div>
</section>
