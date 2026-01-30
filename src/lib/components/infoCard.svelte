<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import { onMount } from 'svelte';
	import CardHeader from './ui/card/card-header.svelte';
	import CardTitle from './ui/card/card-title.svelte';
	import { quintOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import { cn } from '$lib/utils';

	export interface InfoCardProps {
		title: string;
		value: number;
		Icon?: any;
		subContent?: string;
		SubContentIcon?: any;
		suffix?: string;
		type?: 'normal' | 'success' | 'destructive';
	}

	const {
		title,
		Icon,
		value,
		subContent,
		suffix,
		SubContentIcon,
		type = 'normal'
	}: InfoCardProps = $props();

	let animatedValue = new Tween(0, { duration: 2000, easing: quintOut });

	let formatted = $derived(
		value % 1 != 0 ? animatedValue.current.toFixed(2) : animatedValue.current.toFixed()
	);

	onMount(() => {
		animatedValue.set(value);
	});
</script>

<Card>
	<CardHeader>
		<div class="flex w-full justify-between">
			<CardTitle class="font-normal text-muted-foreground">
				{title}
			</CardTitle>
			<Icon />
		</div>
	</CardHeader>
	<CardContent class="space-y-4">
		<p class="text-3xl font-bold">{formatted}{suffix}</p>

		{#if subContent}
			<p
				class={cn(
					'flex items-center gap-2 text-sm font-semibold',
					type === 'success' && 'text-success',
					type === 'destructive' && 'text-destructive'
				)}
			>
				<SubContentIcon />{subContent}
			</p>
		{/if}
	</CardContent>
</Card>
