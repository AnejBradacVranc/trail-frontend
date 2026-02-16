<script lang="ts">
	import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
	import { cn } from '$lib/utils';
	import { CircleAlert, CircleCheck } from '@lucide/svelte';
	import { fade, fly } from 'svelte/transition';

	interface Props {
		isSubmitSuccessful: boolean | null;
		successTitle?: string;
		successDescription?: string;
		errorTitle?: string;
		errorDescription?: string;
		variant?: 'inline' | 'popup';
	}

	const {
		isSubmitSuccessful,
		successTitle = 'Success!',
		successDescription = 'Your submission was completed successfully.',
		errorTitle = 'Error',
		errorDescription = 'Something went wrong. Please try again later.',
		variant = 'inline'
	}: Props = $props();

	const isPopup = $derived(variant === 'popup');
</script>

{#if isSubmitSuccessful !== null}
	{#key isSubmitSuccessful}
		<div class={isPopup ? 'fixed right-4 bottom-4 w-fit' : 'max-w-xl space-y-4 self-end p-4'}>
			{#if isSubmitSuccessful}
				<Alert variant="default" class={cn('border-success/50', isPopup && 'shadow-md')}>
					<CircleCheck color="var(--success)" />
					<AlertTitle>{successTitle}</AlertTitle>
					<AlertDescription>{successDescription}</AlertDescription>
				</Alert>
			{:else}
				<Alert class={cn('border-destructive/50', isPopup && 'shadow-md')}>
					<CircleAlert color="var(--destructive)" />
					<AlertTitle>{errorTitle}</AlertTitle>
					<AlertDescription>
						<p>{errorDescription}</p>
					</AlertDescription>
				</Alert>
			{/if}
		</div>
	{/key}
{/if}
