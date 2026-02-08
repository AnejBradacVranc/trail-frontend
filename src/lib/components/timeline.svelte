<script lang="ts">
	import { getEventConfig } from '$lib/componentUtils';
	import { type ApplicationEvent } from '$lib/types/jobApplication';
	import { cn } from '$lib/utils';
	import moment from 'moment';

	interface Props {
		timeline: ApplicationEvent[];
	}

	const { timeline }: Props = $props();
</script>

<div class="flex flex-col gap-8">
	{#if timeline.length > 0}
		{#each timeline as event}
			{@const { Icon, color, bgColor } = getEventConfig(event.event_type)}

			<div class="flex items-center justify-between border-b border-border pb-4">
				<div class="flex items-center gap-6">
					<Icon class={color} />
					<div class="flex flex-col gap-2">
						<p class="font-semibold">{event.note}</p>
						<p class="text-muted-foreground">
							{moment(event.event_start_time).format('MMM D, YYYY, h:mm A')}
						</p>
					</div>
				</div>

				<div>
					<p class={cn('rounded-xl bg-primary/10 p-2 font-bold uppercase', color, bgColor)}>
						{event.event_type}
					</p>
				</div>
			</div>
		{/each}
	{:else}
		<p class="text-muted-foreground">No events yet</p>
	{/if}
</div>
