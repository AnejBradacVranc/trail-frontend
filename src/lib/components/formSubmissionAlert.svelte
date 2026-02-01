<script lang="ts">
	import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
	import { CircleAlert, CircleCheck } from '@lucide/svelte';

	interface Props {
		isSubmitSuccessful: boolean | null;
		successTitle?: string;
		successDescription?: string;
		errorTitle?: string;
		errorDescription?: string;
	}

	const {
		isSubmitSuccessful,
		successTitle = 'Success!',
		successDescription = 'Your submission was completed successfully.',
		errorTitle = 'Error',
		errorDescription = 'Something went wrong. Please try again later.'
	}: Props = $props();
</script>

{#if isSubmitSuccessful !== null}
	<div class="max-w-xl space-y-4 self-end p-4">
		{#if isSubmitSuccessful}
			<Alert variant="default" class="border-success/50">
				<CircleCheck color="var(--success)" />
				<AlertTitle>{successTitle}</AlertTitle>
				<AlertDescription>{successDescription}</AlertDescription>
			</Alert>
		{:else}
			<Alert class="border-destructive/50">
				<CircleAlert color="var(--destructive)" />
				<AlertTitle>{errorTitle}</AlertTitle>
				<AlertDescription>
					<p>{errorDescription}</p>
				</AlertDescription>
			</Alert>
		{/if}
	</div>
{/if}
