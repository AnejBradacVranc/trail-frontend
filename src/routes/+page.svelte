<script lang="ts">
	import type { InfoCardProps } from '$lib/components/infoCard.svelte';
	import InfoCard from '$lib/components/infoCard.svelte';
	import { ChartColumnDecreasing, ChartColumnIncreasing, Send } from '@lucide/svelte';

	const infoCardsData: InfoCardProps[] = [
		{
			title: 'Total Applications',
			value: 42,
			subContent: 'Submitted this month',
			Icon: Send
		},
		{
			title: 'Pending Interviews',
			value: 7,
			subContent: 'Need scheduling'
		},
		{
			title: 'Offer Rate',
			value: 35,
			subContent: '+2.5% average',
			suffix: '%',
			type: 'success',
			SubContentIcon: ChartColumnIncreasing
		},
		{
			title: 'Days Since Last Application',
			value: 5,
			subContent: '-2% from last week',
			suffix: 'd',
			type: 'destructive',
			SubContentIcon: ChartColumnDecreasing
		}
	];
</script>

<section class="container">
	<h1>Good morning,</h1>
	<p class="text-muted-foreground">
		You have some things scheduled this week (dynamic summary text ?)
	</p>
</section>

<section class="container">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
		{#each infoCardsData as card (card.title)}
			<InfoCard
				title={card.title}
				value={card.value}
				subContent={card.subContent}
				suffix={card.suffix}
				type={card.type}
				Icon={card.Icon}
				SubContentIcon={card.SubContentIcon}
			/>
		{/each}
	</div>
</section>
