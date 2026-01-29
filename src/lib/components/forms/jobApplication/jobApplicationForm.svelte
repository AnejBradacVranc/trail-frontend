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
	import { Field, FieldGroup, FieldLabel, FieldSet, FieldLegend } from '$lib/components/ui/field';
	import FieldError from '$lib/components/ui/field/field-error.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { createForm } from '@tanstack/svelte-form';
	import { jobApplicationSchema } from './jobApplicationSchema';
	import {
		Briefcase,
		Building2,
		CalendarIcon,
		CircleAlert,
		CircleCheck,
		Link,
		MapPin,
		PersonStanding,
		Save
	} from '@lucide/svelte';
	import { InputGroup, InputGroupAddon, InputGroupInput } from '$lib/components/ui/input-group';
	import {
		Select,
		SelectContent,
		SelectGroup,
		SelectItem,
		SelectTrigger
	} from '$lib/components/ui/select';
	import { Popover, PopoverTrigger } from '$lib/components/ui/popover';
	import PopoverContent from '$lib/components/ui/popover/popover-content.svelte';
	import { Calendar } from '$lib/components/ui/calendar';
	import { type DateValue, parseDate } from '@internationalized/date';
	import { cn } from '$lib/utils';
	import { Slider } from '$lib/components/ui/slider';
	import { addJobApplication } from '$lib/api/jobApplication';
	import type { FormFieldData } from '$lib/types/formFieldData';
	import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
	import { is, th } from 'zod/v4/locales';

	const form = createForm(() => ({
		defaultValues: {
			userId: 1, //TODO replace with actual user id
			jobTitle: '',
			companyName: '',
			jobUrl: '',
			location: '',
			minSalary: '50000',
			maxSalary: '150000',
			applicationStatusId: '1',
			platformId: '1',
			dateApplied: new Date().toISOString().split('T')[0],
			employeeCount: 50,
			files: '',
			notes: ''
		},
		validators: {
			onSubmit: jobApplicationSchema
		},
		onSubmit: async ({ value }) => {
			isLoading = true;

			try {
				const { data } = await addJobApplication(value);

				if (data.success) {
					console.log('Success! Application ID:', data.data?.id);
					isSubmitSuccessful = true;
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

	//TODO for application status there needs to be id
	//TODO get user id and add it to payload

	const { formFieldData }: { formFieldData: FormFieldData } = $props();

	const statusLabels = $derived(formFieldData.applicationStatuses.iterable);
	const statusLabelsMap = $derived(formFieldData.applicationStatuses.keyValue);

	const platformLabels = $derived(formFieldData.platforms.iterable);
	const platformLabelsMap = $derived(formFieldData.platforms.keyValue);

	const minSalary = form.useStore((state) => state.values.minSalary);
	const maxSalary = form.useStore((state) => state.values.maxSalary);

	let isSubmitSuccessful: boolean | null = $state(null);
	let isLoading = $state(false);
</script>

<Card>
	<CardHeader>
		<div class="flex items-center justify-between">
			<div class="space-y-2">
				<CardTitle>Add New Application</CardTitle>
				<CardDescription>Fill in the details to track your job application process.</CardDescription
				>
			</div>
		</div>
	</CardHeader>
	<CardContent>
		<form
			id="jobApplicationForm"
			onsubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<FieldGroup class="space-y-6">
				<FieldSet disabled={isLoading}>
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
						<form.Field name="applicationStatusId">
							{#snippet children(field)}
								<Field>
									<FieldLabel for="applicationStatusId">Application Status</FieldLabel>
									<Select
										type="single"
										bind:value={field.state.value}
										onValueChange={(value) => field.handleChange(value)}
									>
										<SelectTrigger class="bg-background">
											{statusLabelsMap.get(field.state.value) || 'Select status'}
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{#each statusLabels as status}
													<SelectItem value={status.status_id.toString()}
														>{status.status_name}</SelectItem
													>
												{/each}
											</SelectGroup>
										</SelectContent>
									</Select>
									{#if field.state.meta.isTouched && !field.state.meta.isValid}
										<FieldError errors={field.state.meta.errors as any} />
									{/if}
								</Field>
							{/snippet}
						</form.Field>
						<form.Field name="dateApplied">
							{#snippet children(field)}
								<Field>
									<FieldLabel for="dateApplied">Date Applied</FieldLabel>
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
													{field.state.value ? field.state.value : 'Select date'}
													<CalendarIcon />
												</Button>
											{/snippet}
										</PopoverTrigger>
										<PopoverContent>
											<Calendar
												type="single"
												captionLayout="dropdown"
												value={field.state.value ? parseDate(field.state.value) : undefined}
												onValueChange={(value: DateValue | undefined) =>
													field.handleChange(value?.toString() || '')}
											/>
										</PopoverContent>
									</Popover>
									{#if field.state.meta.isTouched && !field.state.meta.isValid}
										<FieldError errors={field.state.meta.errors as any} />
									{/if}
								</Field>
							{/snippet}
						</form.Field>
						<form.Field name="platformId">
							{#snippet children(field)}
								<Field>
									<FieldLabel for="platformId">Platform</FieldLabel>
									<Select
										type="single"
										bind:value={field.state.value}
										onValueChange={(value) => field.handleChange(value)}
									>
										<SelectTrigger class="bg-background">
											{platformLabelsMap.get(field.state.value) || 'Select platform'}
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{#each platformLabels as status}
													<SelectItem value={status.platform_id.toString()}
														>{status.name}</SelectItem
													>
												{/each}
											</SelectGroup>
										</SelectContent>
									</Select>
									{#if field.state.meta.isTouched && !field.state.meta.isValid}
										<FieldError errors={field.state.meta.errors as any} />
									{/if}
								</Field>
							{/snippet}
						</form.Field>
					</div>
				</FieldSet>
				<FieldSet disabled={isLoading}>
					<FieldLegend class="flex items-center gap-2 text-base font-semibold">
						<Briefcase />
						Job Details
					</FieldLegend>
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
						<form.Field name="jobTitle">
							{#snippet children(field)}
								<Field>
									<FieldLabel for="jobTitle"
										>Job Title <span class="text-destructive">*</span></FieldLabel
									>
									<Input
										bind:value={field.state.value}
										oninput={(e) => {
											const target = e.target as HTMLInputElement;
											field.handleChange(target.value);
										}}
										id="jobTitle"
										type="text"
										placeholder="e.g. Senior Product Designer"
									/>
									{#if field.state.meta.isTouched && !field.state.meta.isValid}
										<FieldError errors={field.state.meta.errors as any} />
									{/if}
								</Field>
							{/snippet}
						</form.Field>
						<form.Field name="jobUrl">
							{#snippet children(field)}
								<Field>
									<FieldLabel for="jobUrl">Job URL</FieldLabel>
									<Field orientation="horizontal">
										<InputGroup class="bg-background">
											<InputGroupAddon align="inline-start">
												<Link />
											</InputGroupAddon>
											<InputGroupInput
												bind:value={field.state.value}
												oninput={(e) => {
													const target = e.target as HTMLInputElement;
													field.handleChange(target.value);
												}}
												id="jobUrl"
												type="text"
												placeholder="https://www.linkedin.com/jobs/..."
											/>
										</InputGroup>
									</Field>
									{#if field.state.meta.isTouched && !field.state.meta.isValid}
										<FieldError errors={field.state.meta.errors as any} />
									{/if}
								</Field>
							{/snippet}
						</form.Field>
					</div>
					<Field>
						<FieldLabel class="flex items-center gap-2">Salary Range</FieldLabel>
						<div class="space-y-4">
							<div class="flex items-center justify-between text-sm">
								<span class="text-muted-foreground"
									>Min: <span class="font-medium text-foreground">${minSalary.current || '0'}</span
									></span
								>
								<span class="text-muted-foreground"
									>Max: <span class="font-medium text-foreground">${maxSalary.current || '0'}</span
									></span
								>
							</div>
							<Slider
								type="multiple"
								value={[parseInt(minSalary.current), parseInt(maxSalary.current)]}
								onValueChange={(values: number[]) => {
									form.setFieldValue('minSalary', values[0]?.toString() || '0');
									form.setFieldValue('maxSalary', values[1]?.toString() || '0');
								}}
								min={0}
								max={300000}
								step={5000}
							/>
						</div>
						{#if (form.getFieldMeta('minSalary')?.isTouched && !form.getFieldMeta('minSalary')?.isValid) || (form.getFieldMeta('maxSalary')?.isTouched && !form.getFieldMeta('maxSalary')?.isValid)}
							<FieldError
								errors={[
									...(form.getFieldMeta('minSalary')?.errors || []),
									...(form.getFieldMeta('maxSalary')?.errors || [])
								] as any}
							/>
						{/if}
					</Field>
				</FieldSet>
				<FieldSet disabled={isLoading}>
					<FieldLegend class="flex items-center gap-2 text-base font-semibold">
						<Building2 />
						Company information
					</FieldLegend>
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
						<form.Field name="companyName">
							{#snippet children(field)}
								<Field>
									<FieldLabel for="companyName"
										>Company Name <span class="text-destructive">*</span></FieldLabel
									>
									<Input
										bind:value={field.state.value}
										oninput={(e) => {
											const target = e.target as HTMLInputElement;
											field.handleChange(target.value);
										}}
										id="companyName"
										type="text"
										placeholder="e.g. Google"
									/>
									{#if field.state.meta.isTouched && !field.state.meta.isValid}
										<FieldError errors={field.state.meta.errors as any} />
									{/if}
								</Field>
							{/snippet}
						</form.Field>
						<form.Field name="location">
							{#snippet children(field)}
								<Field>
									<FieldLabel for="location"
										>Company Location<span class="text-destructive">*</span></FieldLabel
									>
									<Field orientation="horizontal">
										<InputGroup class="bg-background">
											<InputGroupAddon align="inline-start">
												<MapPin />
											</InputGroupAddon>
											<InputGroupInput
												bind:value={field.state.value}
												oninput={(e) => {
													const target = e.target as HTMLInputElement;
													field.handleChange(target.value);
												}}
												id="location"
												type="text"
												placeholder="e.g. New York, NY"
											/>
										</InputGroup>
									</Field>
									{#if field.state.meta.isTouched && !field.state.meta.isValid}
										<FieldError errors={field.state.meta.errors as any} />
									{/if}
								</Field>
							{/snippet}
						</form.Field>
						<form.Field name="employeeCount">
							{#snippet children(field)}
								<Field>
									<FieldLabel for="employeeCount">Number of Employees</FieldLabel>
									<Field orientation="horizontal">
										<InputGroup class="bg-background">
											<InputGroupAddon align="inline-start">
												<PersonStanding />
											</InputGroupAddon>
											<InputGroupInput
												bind:value={field.state.value}
												oninput={(e) => {
													const target = e.target as HTMLInputElement;
													field.handleChange(parseInt(target.value));
												}}
												id="employeeCount"
												type="number"
												min={1}
											/>
										</InputGroup>
									</Field>
									{#if field.state.meta.isTouched && !field.state.meta.isValid}
										<FieldError errors={field.state.meta.errors as any} />
									{/if}
								</Field>
							{/snippet}
						</form.Field>
					</div>
				</FieldSet>
				<FieldSet disabled={isLoading}>
					<FieldLegend class="flex items-center gap-2 text-base font-semibold">
						Documents & Notes
					</FieldLegend>
					<Field>
						<FieldLabel for="files">Upload files related to the application (optional)</FieldLabel>
						<Input
							id="files"
							class="bg-background"
							type="file"
							multiple
							accept=".pdf,.doc,.docx,image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
						/>
					</Field>
					<form.Field name="notes">
						{#snippet children(field)}
							<Field>
								<FieldLabel for="notes">Initial notes</FieldLabel>
								<Textarea
									bind:value={field.state.value}
									oninput={(e) => {
										const target = e.target as HTMLTextAreaElement;
										field.handleChange(target.value);
									}}
									id="notes"
									placeholder="Add initial thoughts, research notes, or contact person details..."
									class="min-h-24"
								/>
								{#if field.state.meta.isTouched && !field.state.meta.isValid}
									<FieldError errors={field.state.meta.errors as any} />
								{/if}
							</Field>
						{/snippet}
					</form.Field>
				</FieldSet>
			</FieldGroup>
		</form>
	</CardContent>
	<CardFooter class="flex justify-end gap-3">
		<Button type="submit" form="jobApplicationForm">
			<Save />
			Save Application
		</Button>
	</CardFooter>

	{#if isSubmitSuccessful !== null}
		<div class="max-w-xl space-y-4 self-end p-4">
			{#if isSubmitSuccessful}
				<Alert variant="default" class="border-success/50">
					<CircleCheck color="var(--success)" />
					<AlertTitle>New application added successfully!</AlertTitle>
					<AlertDescription
						>You can now view and manage this application in the job applications list.</AlertDescription
					>
				</Alert>
			{/if}
			{#if !isSubmitSuccessful}
				<Alert class="border-destructive/50">
					<CircleAlert color="var(--destructive)" />
					<AlertTitle>Unable to add application</AlertTitle>
					<AlertDescription>
						<p>Try again later. If the problem persists, contact support.</p>
					</AlertDescription>
				</Alert>
			{/if}
		</div>
	{/if}
</Card>
