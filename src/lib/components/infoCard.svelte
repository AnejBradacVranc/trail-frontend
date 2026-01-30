<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import { onMount } from 'svelte';
	import CardHeader from './ui/card/card-header.svelte';
	import CardTitle from './ui/card/card-title.svelte';
	import { quintOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import { cn } from '$lib/utils';
	import type { StatisticSummary } from '$lib/types/statistics';
	import { ChartColumnDecreasing, ChartColumnIncreasing, Info } from '@lucide/svelte';
	import CardDescription from './ui/card/card-description.svelte';
	import CardFooter from './ui/card/card-footer.svelte';

	const {
		name,
		value,
		delta,
		unit,
		period,
		trend = 'flat',
		summary_text
	}: StatisticSummary = $props();

	let animatedValue = new Tween(0, { duration: 2000, easing: quintOut });

	let formatted = $derived(
		value % 1 != 0 ? animatedValue.current.toFixed(2) : animatedValue.current.toFixed()
	);

	onMount(() => {
		animatedValue.set(value);
	});
</script>

<Card class={cn(trend === 'new' && 'border-primary/50')}>
	<CardHeader>
		<div class="flex w-full items-center justify-between">
			<CardTitle class="font-normal text-muted-foreground">
				{name}
			</CardTitle>
			{#if trend === 'new'}
				<CardDescription class="text-sm text-accent-foreground">New</CardDescription>
			{/if}
		</div>
	</CardHeader>
	<CardContent class="space-y-4">
		<p class="text-3xl font-bold">{formatted}{unit}</p>

		{#if delta}
			<p
				class={cn(
					'flex items-center gap-2 text-sm font-semibold',
					trend === 'up' && 'text-success',
					trend === 'down' && 'text-destructive'
				)}
			>
				{#if trend == 'up'}
					<ChartColumnIncreasing class="h-4 w-4 shrink-0" />
				{:else if trend === 'down'}
					<ChartColumnDecreasing class="h-4 w-4 shrink-0" />
				{/if}
				{delta}%
			</p>
		{/if}
	</CardContent>
	<CardFooter>
		{#if summary_text}
			<div class="flex items-center gap-2">
				<Info class="h-4 w-4 shrink-0" color="var(--primary)" />

				<p class="text-xs text-muted-foreground">{summary_text}</p>
			</div>
		{/if}
	</CardFooter>
</Card>
