<script lang="ts">
	import InfoCard from '$lib/components/infoCard.svelte';
	import { ChartColumnDecreasing, ChartColumnIncreasing, Send } from '@lucide/svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
	const { statistics } = $derived(data);
</script>

<section class="container">
	<h1>Good morning,</h1>
	<p class="text-muted-foreground">
		You have some things scheduled this week (dynamic summary text ?)
	</p>
</section>

<section class="container">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
		{#each statistics.summary as summary}
			<InfoCard {...summary} />
		{/each}
	</div>
</section>
