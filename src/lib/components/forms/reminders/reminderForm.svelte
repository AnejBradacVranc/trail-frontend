<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Field, FieldGroup, FieldSet, FieldLabel } from '$lib/components/ui/field';
	import FieldError from '$lib/components/ui/field/field-error.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { createForm } from '@tanstack/svelte-form';
	import { reminderSchema, type ReminderFormValues } from './reminderSchema';
	import { Bell, CalendarIcon, Save } from '@lucide/svelte';
	import { Popover, PopoverTrigger } from '$lib/components/ui/popover';
	import PopoverContent from '$lib/components/ui/popover/popover-content.svelte';
	import { Calendar } from '$lib/components/ui/calendar';
	import { type DateValue, parseDate, parseDateTime } from '@internationalized/date';
	import { cn } from '$lib/utils';
	import { addReminder } from '$lib/api/reminders';
	import FormSubmissionAlert from '$lib/components/formSubmissionAlert.svelte';

	const { applicationId, onSuccess }: { applicationId: number; onSuccess?: () => void } =
		$props();

	let isSubmitSuccessful: boolean | null = $state(null);
	let isLoading = $state(false);

	const form = createForm(() => ({
		defaultValues: {
			applicationId,
			title: '',
			description: '',
			remindAt: '',
			isCompleted: false
		} as ReminderFormValues,
		validators: {
			onSubmit: reminderSchema
		},
		onSubmit: async ({ value }) => {
			isLoading = true;

			try {
				const { data } = await addReminder(value);

				if (data.success) {
					console.log('Success! Reminder ID:', data.data?.id);
					isSubmitSuccessful = true;

					if (onSuccess) {
						onSuccess();
					}
				} else {
					console.error('Error:', data.data.message);
					isSubmitSuccessful = false;
				}
			} catch (error) {
				console.error('Submission error:', error);
				isSubmitSuccessful = false;
			}

			isLoading = false;
		}
	}));
</script>

<Card>
	<CardHeader>
		<div class="flex items-center justify-between">
			<div class="space-y-2">
				<CardTitle>Create New Reminder</CardTitle>
				<CardDescription>Set up a reminder to stay on top of your application process.</CardDescription>
			</div>
		</div>
	</CardHeader>
	<CardContent>
		<form
			id="reminderForm"
			onsubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<FieldGroup class="space-y-6">
				<FieldSet disabled={isLoading}>
					<div class="grid grid-cols-1 gap-4">
						<form.Field name="title">
							{#snippet children(field)}
								<Field>
									<FieldLabel for="title"
										>Title <span class="text-destructive">*</span></FieldLabel
									>
									<Input
										bind:value={field.state.value}
										oninput={(e) => {
											const target = e.target as HTMLInputElement;
											field.handleChange(target.value);
										}}
										id="title"
										type="text"
										placeholder="e.g. Follow up with recruiter"
									/>
									{#if field.state.meta.isTouched && !field.state.meta.isValid}
										<FieldError errors={field.state.meta.errors as any} />
									{/if}
								</Field>
							{/snippet}
						</form.Field>

						<form.Field name="remindAt">
							{#snippet children(field)}
								<Field>
									<FieldLabel for="remindAt"
										>Remind me at <span class="text-destructive">*</span></FieldLabel
									>
									<div class="grid grid-cols-2 gap-2">
										<Popover>
											<PopoverTrigger class="bg-background">
												{#snippet child({ props })}
													<Button
														{...props}
														variant="outline"
														class={cn(
															'justify-between bg-background font-normal',
															field.state.value ? 'text-foreground' : 'text-muted-foreground'
														)}
													>
														{field.state.value ? field.state.value.split(' ')[0] : 'Select date'}
														<CalendarIcon />
													</Button>
												{/snippet}
											</PopoverTrigger>
											<PopoverContent>
												<Calendar
													type="single"
													captionLayout="dropdown"
													value={field.state.value ? parseDate(field.state.value.split(' ')[0]) : undefined}
													onValueChange={(value: DateValue | undefined) => {
														const dateStr = value?.toString() || '';
														const timeStr = field.state.value?.split(' ')[1] || '09:00:00';
														field.handleChange(dateStr ? `${dateStr} ${timeStr}` : '');
													}}
												/>
											</PopoverContent>
										</Popover>
										<Input
											id="time"
											type="time"
											value={field.state.value ? field.state.value.split(' ')[1]?.substring(0, 5) : '09:00'}
											oninput={(e) => {
												const target = e.target as HTMLInputElement;
												const dateStr = field.state.value?.split(' ')[0] || new Date().toISOString().split('T')[0];
												field.handleChange(`${dateStr} ${target.value}:00`);
											}}
										/>
									</div>
									{#if field.state.meta.isTouched && !field.state.meta.isValid}
										<FieldError errors={field.state.meta.errors as any} />
									{/if}
								</Field>
							{/snippet}
						</form.Field>

						<form.Field name="description">
							{#snippet children(field)}
								<Field>
									<FieldLabel for="description">Description (optional)</FieldLabel>
									<Textarea
										bind:value={field.state.value}
										oninput={(e) => {
											const target = e.target as HTMLTextAreaElement;
											field.handleChange(target.value);
										}}
										id="description"
										placeholder="Add details about what you need to do..."
										class="min-h-24"
									/>
									{#if field.state.meta.isTouched && !field.state.meta.isValid}
										<FieldError errors={field.state.meta.errors as any} />
									{/if}
								</Field>
							{/snippet}
						</form.Field>
					</div>
				</FieldSet>
			</FieldGroup>
		</form>
	</CardContent>
	<CardFooter class="flex justify-end gap-3">
		<Button type="submit" form="reminderForm" disabled={isLoading}>
			<Save />
			{isLoading ? 'Saving...' : 'Create Reminder'}
		</Button>
	</CardFooter>

	{#if isSubmitSuccessful !== null}
		<FormSubmissionAlert
			{isSubmitSuccessful}
			successTitle="Reminder created successfully!"
			successDescription="You'll be notified when it's time."
			errorTitle="Unable to create reminder"
			errorDescription="Try again later. If the problem persists, contact support."
		/>
	{/if}
</Card>
