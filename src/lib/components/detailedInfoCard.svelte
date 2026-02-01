<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import type { ApplicationSummary } from '$lib/types/jobApplication';

	import { Button } from './ui/button';
	import AvatarFallback from './ui/avatar/avatar-fallback.svelte';
	import Avatar from './ui/avatar/avatar.svelte';
	import { goto } from '$app/navigation';
	import moment from 'moment';
	import { Banknote, CalendarIcon } from '@lucide/svelte';
	const {
		application_id,
		job_title,
		applied_at,
		status_name,
		salary_max,
		salary_min,
		location,
		status_id,
		status_color,
		interview_at,
		company_name
	}: ApplicationSummary = $props();
</script>

<Card>
	<CardHeader class="flex w-full items-center justify-between">
		<div class="flex flex-row items-center gap-4">
			<Avatar>
				<AvatarFallback>{company_name.charAt(0)}</AvatarFallback>
			</Avatar>
			<div class="flex flex-col gap-1">
				<CardTitle class="flex flex-row items-center gap-2">
					{job_title}
				</CardTitle>
				<CardDescription><span>{company_name}</span> - <span>{location}</span></CardDescription>
			</div>
		</div>
		<p
			class="w-fit rounded-md p-2 text-sm font-bold"
			style={`color: ${status_color};background-color: color-mix(in oklab, ${status_color} 10%, transparent);`}
		>
			{status_name}
		</p>
	</CardHeader>
	<CardContent class="flex flex-col gap-3 text-sm">
		<div
			class="flex flex-row items-center gap-4 rounded-md border border-success/5 bg-success/5 p-2"
		>
			<Banknote class="size-6" color="var(--success)" />
			<div class="flex gap-1 text-success">
				<span>{salary_max} $ - {salary_min}</span> $
			</div>
		</div>
		{#if interview_at}
			<div
				class="flex flex-row items-center gap-4 rounded-md border border-primary/5 bg-primary/5 p-2"
			>
				<CalendarIcon class="size-6" color="var(--primary)" />
				<div class="flex flex-col text-primary">
					<p class="font-semibold">{status_name}</p>
					<span class="text-sm"> {moment(interview_at).format('MMM D, YYYY')}</span>
				</div>
			</div>
		{/if}
	</CardContent>
	<CardFooter class="flex justify-between border-t">
		<div class="flex flex-col gap-1">
			<p class="text-sm text-muted-foreground">
				Applied on {moment(applied_at).format('MMM D, YYYY')}
			</p>
		</div>

		<Button variant="outline" onclick={() => goto(`/applications/${application_id}`)}
			>View Application</Button
		>
	</CardFooter>
</Card>
