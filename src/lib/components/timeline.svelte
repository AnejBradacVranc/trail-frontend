<script lang="ts">
	import { getEventConfig } from '$lib/componentUtils';
	import { type ApplicationEvent } from '$lib/types/jobApplication';
	import { cn } from '$lib/utils';
	import moment from 'moment';
	import { m } from '$lib/paraglide/messages.js';

	interface Props {
		timeline: ApplicationEvent[];
	}

	const { timeline }: Props = $props();
</script>

<div class="flex flex-col">
	{#if timeline.length > 0}
		{#each timeline as event, index}
			{@const { Icon, color, bgColor } = getEventConfig(event.event_type)}
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-6">
					<div class="flex flex-col items-center justify-center">
						<div
							class="flex items-center justify-center rounded-full border-[3px] border-secondary p-4"
						>
							<Icon class={color} />
						</div>
						{#if index < timeline.length - 1}
							<div class="h-10 w-0.75 bg-secondary"></div>
						{/if}
					</div>
					<div class="flex flex-col gap-2">
						<p class="font-semibold">{event.note}</p>
						<p class="text-muted-foreground">
							{moment(event.event_start_time).format('MMM D, YYYY, h:mm A')}
						</p>
					</div>
				</div>

				<div>
					<p class={cn('rounded-xl bg-primary/10 p-2 font-bold uppercase', color, bgColor)}>
						{m[`application_status.${event.event_type}`]()}
					</p>
				</div>
			</div>
		{/each}
	{:else}
		<p class="text-muted-foreground">No events yet</p>
	{/if}
</div>
