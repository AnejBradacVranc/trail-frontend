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
		Notebook
	} from '@lucide/svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import ApplicationFileCard from '$lib/components/applicationFileCard.svelte';
	import Timeline from '$lib/components/timeline.svelte';
	import NoteForm from '$lib/components/forms/notes/noteForm.svelte';
	import { invalidate, invalidateAll } from '$app/navigation';

	const { data }: PageProps = $props();

	const { application } = $derived(data);

	let isNoteDialogOpen = $state(false);
</script>

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
							<span
								>{application?.company.name} - {application?.company.headquarters_location} -
								<span class="italic"
									>applied {moment(application?.applied_at).format('MMM D, YYYY')}</span
								></span
							>
						</CardDescription>
					</div>
				</div>
				<div class="flex gap-2">
					<Button variant="secondary"><Calendar /> Create reminder</Button>
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
				<!--<CardFooter>
					<p class="text-sm text-muted-foreground">Some description</p>
				</CardFooter>-->
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
						<Tabs.List class="bg-card">
							<Tabs.Trigger
								value="timeline"
								class="p-4 text-lg hover:shadow-sm data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
								>Timeline</Tabs.Trigger
							>
							<Tabs.Trigger
								value="reminders"
								class="p-4 text-lg hover:shadow-sm data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
								>Reminders</Tabs.Trigger
							>
						</Tabs.List>
						<Tabs.Content value="timeline">
							<Card class="border-none shadow-none">
								<CardContent class="flex flex-col gap-6">
									<Timeline timeline={application?.events || []} />
									<div class="flex flex-col gap-6">
										<div class="flex w-full items-center justify-between">
											<h4>Attached notes</h4>
											<Dialog.Root bind:open={isNoteDialogOpen}>
												<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
													<Notebook /> Add note
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
														{#if reminder.is_completed}
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
														{#if reminder.is_completed}
															<p
																class="rounded-xl bg-green-50 p-2 font-bold text-green-600 uppercase"
															>
																Completed
															</p>
														{:else}
															<p
																class="rounded-xl bg-blue-50 p-2 font-bold text-blue-600 uppercase"
															>
																Pending
															</p>
														{/if}
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
