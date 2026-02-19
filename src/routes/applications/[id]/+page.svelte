<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import moment from 'moment';
	import type { PageProps } from './$types';
	import Avatar from '$lib/components/ui/avatar/avatar.svelte';
	import AvatarFallback from '$lib/components/ui/avatar/avatar-fallback.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import {
		Calendar,
		Globe,
		Mail,
		MapPin,
		Pencil,
		PersonStanding,
		Phone,
		Briefcase,
		CircleCheck,
		CircleSlash,
		Bell,
		History,
		Plus
	} from '@lucide/svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import ApplicationFileCard from '$lib/components/applicationFileCard.svelte';
	import Timeline from '$lib/components/timeline.svelte';
	import NoteForm from '$lib/components/forms/notes/noteForm.svelte';
	import ReminderForm from '$lib/components/forms/reminders/reminderForm.svelte';
	import { invalidateAll } from '$app/navigation';
	import {
		Select,
		SelectContent,
		SelectGroup,
		SelectItem,
		SelectTrigger
	} from '$lib/components/ui/select';
	import { cn } from '$lib/utils';
	import { updateReminderStatus } from '$lib/api/reminders';
	import type { Reminder } from '$lib/types/reminders';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import FormSubmissionAlert from '$lib/components/formSubmissionAlert.svelte';

	const { data }: PageProps = $props();

	const { application } = $derived(data);

	let isNoteDialogOpen = $state(false);
	let isReminderDialogOpen = $state(false);

	const reminderStatuses = [
		{ value: 'false', label: 'Pending' },
		{ value: 'true', label: 'Completed' }
	];

	let reminderStatusValues: Record<number, string> = $state({});
	let updateReminderSuccess: boolean | null = $state(null);

	const handleUpdateReminderStatus = async (value: string, reminder: Reminder) => {
		const isCompleted = value === 'true';
		try {
			const { data } = await updateReminderStatus(reminder.reminder_id, isCompleted);

			if (data.success) {
				await invalidateAll();
				updateReminderSuccess = true;
			} else {
				console.error('Failed to update reminder status', data.data.message);
				reminderStatusValues[reminder.reminder_id] = reminder.is_completed.toString();
			}
		} catch (error) {
			console.error('Error updating reminder status:', error);
			reminderStatusValues[reminder.reminder_id] = reminder.is_completed.toString();
		}
	};

	$effect(() => {
		if (application?.reminders) {
			const newValues: Record<number, string> = {};
			application.reminders.forEach((reminder) => {
				newValues[reminder.reminder_id] = reminder.is_completed.toString();
			});
			reminderStatusValues = newValues;
		}
		if (updateReminderSuccess) {
			const timer = setTimeout(() => {
				updateReminderSuccess = null;
			}, 2000);

			return () => {
				clearTimeout(timer);
			};
		}
	});
</script>

<FormSubmissionAlert
	variant="popup"
	isSubmitSuccessful={updateReminderSuccess}
	successTitle="Reminder status updated successfully"
	errorTitle="Unable to update reminder"
	errorDescription="Try again later. If the problem persists, contact support."
/>

<section class="container">
	<Card>
		<CardHeader>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-4">
					<Avatar class="size-10 md:size-15"
						><AvatarFallback>{application?.company.name.charAt(0)}</AvatarFallback></Avatar
					>
					<div class="flex flex-col gap-1">
						<CardTitle><h1>{application?.job_title}</h1></CardTitle>
						<CardDescription>
							<span>{application?.company.name} - {application?.company.headquarters_location}</span
							></CardDescription
						>
					</div>
				</div>
				<div class="flex gap-2">
					<Dialog.Root bind:open={isReminderDialogOpen}>
						<Dialog.Trigger class={buttonVariants({ variant: 'secondary' })}>
							<Calendar /> Create reminder
						</Dialog.Trigger>
						<Dialog.Content class="max-h-[95vh] overflow-y-auto sm:max-w-250">
							{#if application}
								<ReminderForm
									applicationId={application.application_id}
									onSuccess={() => {
										isReminderDialogOpen = false;
										invalidateAll();
									}}
								/>
							{/if}
							<Dialog.Footer>
								<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
							</Dialog.Footer>
						</Dialog.Content>
					</Dialog.Root>
					<Button><Pencil /> Edit application</Button>
				</div>
			</div>
		</CardHeader>
	</Card>
</section>

<section class="container">
	<div class="grid grid-cols-1 items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
		<div class="col-span-2 grid grid-cols-1 gap-4 md:grid-cols-2">
			<Card class="gap-2">
				<CardHeader>
					<CardTitle class="text-base text-muted-foreground">CURRENT STATUS</CardTitle>
				</CardHeader>
				<CardContent>
					<span class="rounded-md text-2xl font-bold" style={`color: ${application?.status_color};`}
						>{application?.status_name}</span
					>
				</CardContent>
				<CardFooter>
					<p class="text-sm text-muted-foreground">
						Applied {moment(application?.applied_at).format('MMM D, YYYY')}
					</p>
				</CardFooter>
			</Card>
			<Card class="gap-2">
				<CardHeader>
					<CardTitle class="text-base text-muted-foreground">ESTIMATED SALARY</CardTitle>
				</CardHeader>
				<CardContent class="text-2xl font-bold text-success">
					{application?.salary_min}$ - {application?.salary_max}$
				</CardContent>
				<CardFooter>
					<p class="text-sm text-muted-foreground">Yearly estimated salary</p>
				</CardFooter>
			</Card>

			<Card class="col-span-2">
				<CardContent>
					<Tabs.Root value="timeline">
						<Tabs.List class="w-full">
							<Tabs.Trigger
								value="timeline"
								class="p-4 text-lg hover:shadow-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
								><History /> Timeline</Tabs.Trigger
							>
							<Tabs.Trigger
								value="reminders"
								class="p-4 text-lg hover:shadow-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
							>
								<Calendar />
								Reminders</Tabs.Trigger
							>
						</Tabs.List>
						<Tabs.Content value="timeline">
							<Card class="border-none shadow-none">
								<CardContent class="flex flex-col gap-12">
									<Timeline timeline={application?.events || []} />
									<div class="flex flex-col gap-6">
										<div class="flex w-full items-center justify-between">
											<h4>Attached notes</h4>
											<Dialog.Root bind:open={isNoteDialogOpen}>
												<Dialog.Trigger class={buttonVariants({ variant: 'secondary' })}>
													<Plus /> Add note
												</Dialog.Trigger>
												<Dialog.Content class="max-h-[95vh] overflow-y-auto sm:max-w-250">
													{#if application}
														<NoteForm
															jobApplicationId={application.application_id}
															onSuccess={() => {
																isNoteDialogOpen = false;
																invalidateAll();
															}}
														/>
													{/if}
													<Dialog.Footer>
														<Dialog.Close class={buttonVariants({ variant: 'outline' })}
															>Cancel</Dialog.Close
														>
													</Dialog.Footer>
												</Dialog.Content>
											</Dialog.Root>
										</div>
										{#if application?.notes && application?.notes.length > 0}
											{#each application?.notes as note}
												<div class="rounded-md bg-secondary p-4 text-secondary-foreground">
													{@html note.note_content}
												</div>
											{/each}
										{:else}
											<p class="text-muted-foreground">No notes yet. Add your first note!</p>
										{/if}
									</div>
								</CardContent>
							</Card>
						</Tabs.Content>
						<Tabs.Content value="reminders">
							<Card class="border-none shadow-none">
								<CardContent class="flex flex-col gap-6">
									<div class="flex flex-col gap-8">
										{#if application?.reminders && application?.reminders.length > 0}
											{#each application?.reminders as reminder}
												<div class="flex items-center justify-between border-b border-border pb-4">
													<div class="flex items-center gap-6">
														{#if (reminderStatusValues[reminder.reminder_id] || reminder.is_completed.toString()) === 'true'}
															<CircleCheck class="text-success" />
														{:else}
															<Bell class="text-blue-600" />
														{/if}
														<div class="flex flex-col gap-2">
															<p class="font-semibold">{reminder.title}</p>
															{#if reminder.description}
																<p class="text-sm text-muted-foreground">
																	{reminder.description}
																</p>
															{/if}
															<p class="text-muted-foreground">
																{moment(reminder.remind_at).format('MMM D, YYYY, h:mm A')}
															</p>
														</div>
													</div>
													<div>
														<Select
															type="single"
															value={reminderStatusValues[reminder.reminder_id] ||
																reminder.is_completed.toString()}
															onValueChange={(value) => {
																reminderStatusValues[reminder.reminder_id] = value;
																handleUpdateReminderStatus(value, reminder);
															}}
														>
															<SelectTrigger
																class={cn(
																	'rounded-xl  bg-green-50 p-2 font-bold uppercase',
																	(reminderStatusValues[reminder.reminder_id] ||
																		reminder.is_completed.toString()) === 'true'
																		? 'bg-green-50 text-green-600'
																		: 'bg-blue-50 text-blue-600'
																)}
															>
																{(reminderStatusValues[reminder.reminder_id] ||
																	reminder.is_completed.toString()) === 'true'
																	? 'Completed'
																	: 'Pending'}
															</SelectTrigger>
															<SelectContent>
																<SelectGroup>
																	{#each reminderStatuses as reminderStatus}
																		<SelectItem value={reminderStatus.value}
																			>{reminderStatus.label}</SelectItem
																		>
																	{/each}
																</SelectGroup>
															</SelectContent>
														</Select>
													</div>
												</div>
											{/each}
										{:else}
											<p class="text-muted-foreground">No reminders yet</p>
										{/if}
									</div>
								</CardContent>
							</Card>
						</Tabs.Content>
					</Tabs.Root>
				</CardContent>
			</Card>
		</div>
		<div class="grid grid-cols-1 gap-4">
			{#if application?.files && application?.files.length > 0}
				<Card class="gap-2">
					<CardHeader>
						<CardTitle class="text-base text-muted-foreground">APPLIED ASSETS</CardTitle>
					</CardHeader>
					<CardContent class="flex flex-col gap-3">
						{#each application?.files as file}
							<ApplicationFileCard {file} />
						{/each}
					</CardContent>
				</Card>
			{/if}
			{#if application?.platform}
				<Card class="gap-2">
					<CardHeader class="flex items-center justify-between">
						<CardTitle class="text-base text-muted-foreground">FOUND ON</CardTitle>
						{#if application?.platform.is_active}
							<div class="flex items-center gap-1.5">
								<CircleCheck class="size-6" color="var(--success)" />
								<span class="text-sm text-muted-foreground">Active</span>
							</div>
						{:else}
							<div class="flex items-center gap-1.5">
								<CircleSlash class="size-6" color="var(--destructive)" />
								<span class="text-sm text-muted-foreground">Inactive</span>
							</div>
						{/if}
					</CardHeader>
					<CardContent class="flex flex-col gap-3">
						<div class="flex items-center gap-3">
							<Briefcase class="size-8" />
							<div class="flex flex-col">
								<p class="text-xl font-bold">{application.platform.name}</p>
								{#if application.platform.website}
									<a
										class="text-sm text-primary hover:underline"
										href={application.platform.website}
										target="_blank"
										rel="noopener noreferrer">{application.platform.website}</a
									>
								{/if}
							</div>
						</div>
					</CardContent>
					{#if application?.job_url}
						<CardFooter class="flex flex-col items-start gap-2 border-t">
							<p class="text-sm font-semibold">Job Posting</p>
							<a
								class="text-sm text-primary hover:underline"
								href={application.job_url}
								target="_blank"
								rel="noopener noreferrer"
							>
								View original posting
							</a>
						</CardFooter>
					{/if}
				</Card>
			{/if}

			<Card>
				<CardHeader>
					<CardTitle class="text-3xl font-bold">{application?.company.name}</CardTitle>
				</CardHeader>
				<CardContent class="flex flex-col gap-3">
					<div class="flex items-center gap-3">
						<MapPin />
						<div class="flex flex-col">
							<p class="font-semibold">Headquarters</p>
							<p class="text-muted-foreground">{application?.company.headquarters_location}</p>
						</div>
					</div>
					{#if application?.company.employees_count}
						<div class="flex items-center gap-3">
							<PersonStanding />
							<div class="flex flex-col">
								<p class="font-semibold">Employees</p>
								<p class="text-muted-foreground">{application.company.employees_count}</p>
							</div>
						</div>
					{/if}
					{#if application?.company.website}
						<div class="flex items-center gap-3">
							<Globe />
							<div class="flex flex-col">
								<p class="font-semibold">Website</p>
								<a
									class="px-0 py-0 text-base text-primary hover:underline"
									href={application.company.website}>{application.company.website}</a
								>
							</div>
						</div>
					{/if}
				</CardContent>
				{#if application?.company_contact}
					<CardFooter class="flex flex-col items-start gap-4 border-t">
						<CardTitle>Contacts</CardTitle>
						<div class="flex w-full items-center justify-between">
							<div class="flex items-center gap-3">
								<Avatar
									><AvatarFallback
										>{application?.company_contact.name.charAt(
											0
										)}{application?.company_contact.surname.charAt(0)}</AvatarFallback
									></Avatar
								>
								<div class="flex flex-col">
									<p class="font-semibold">
										{application?.company_contact.name}
										{application?.company_contact.surname}
									</p>
									<p class="text-muted-foreground">{application?.company_contact.role}</p>
								</div>
							</div>
							<div class="flex items-center gap-2">
								<Button
									variant="outline"
									type="button"
									href={`mailto:${application?.company_contact.email}`}
								>
									<Mail />
								</Button>
								<Button
									variant="outline"
									type="button"
									href={`tel:${application?.company_contact.phone}`}><Phone /></Button
								>
							</div>
						</div>
					</CardFooter>
				{/if}
			</Card>

			{#if application?.interview_at}
				<Card class="bg-secondary text-secondary-foreground">
					<CardHeader>
						<CardTitle class="text-xl font-bold text-primary">UPCOMING INTERVIEW</CardTitle>
					</CardHeader>
					<CardContent class="flex flex-col gap-6 text-lg font-semibold">
						<div class="flex w-full items-center gap-4">
							<Calendar />
							<p>{moment(application?.interview_at).format('MMM D, YYYY')}</p>
						</div>
						<Button variant="default">View reminder</Button>
					</CardContent>
				</Card>
			{/if}
		</div>
	</div>
</section>
