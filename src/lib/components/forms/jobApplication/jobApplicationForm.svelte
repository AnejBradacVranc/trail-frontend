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
	import {
		Field,
		FieldGroup,
		FieldLabel,
		FieldSet,
		FieldLegend
	} from '$lib/components/ui/field';
	import FieldError from '$lib/components/ui/field/field-error.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { createForm } from '@tanstack/svelte-form';
	import { jobApplicationSchema, statusLabels } from './jobApplicationSchema';
	import { Banknote, Briefcase, Building2, CalendarIcon, ChevronDownIcon, DollarSign, Link, MapPin, Save, X } from '@lucide/svelte';
	import { InputGroup, InputGroupAddon, InputGroupInput } from '$lib/components/ui/input-group';
	import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '$lib/components/ui/select';
	import { Popover, PopoverTrigger } from '$lib/components/ui/popover';
	import PopoverContent from '$lib/components/ui/popover/popover-content.svelte';
	import { Calendar } from '$lib/components/ui/calendar';
	import { type DateValue,  parseDate } from '@internationalized/date';
	import { cn } from '$lib/utils';
	import { Slider } from '$lib/components/ui/slider';
	import { addJobApplication } from '$lib/api/jobApplication';
	import { isSuccessResponse, isErrorResponse } from '$lib/types/genericResponse';

	const form = createForm(() => ({
		defaultValues: {
			jobTitle: '',
			companyName: '',
			jobUrl: '',
			location: '',
			minSalary: '50000',
			maxSalary: '150000',
			applicationStatus: 'applied',
			dateApplied: new Date().toISOString().split('T')[0],
			files: '',
			notes: ''
		},
        validators: {
			onSubmit: jobApplicationSchema
		},
		onSubmit: async ({ value }) => {
			console.log('Submitting:', value);
			try {
				const response = await addJobApplication(value);
				
				if (isSuccessResponse(response.data)) {
					// TypeScript now knows response.data has 'data' property
					console.log('Success! Application ID:', response.data.data);
					// TODO: Show success toast, close modal, refresh list, etc.
				} else if (isErrorResponse(response.data)) {
					// TypeScript now knows response.data has 'message' property
					console.error('Error:', response.data.message);
					// TODO: Show error toast with message
				}
			} catch (error) {
				console.error('Submission error:', error);
				// TODO: Show error toast
			}
		}
	}));

	const minSalary = form.useStore((state) => state.values.minSalary)
	const maxSalary = form.useStore((state) => state.values.maxSalary)

</script>

<Card >
	<CardHeader>
		<div class="flex items-center justify-between">
			<div class="space-y-2">
				<CardTitle>Add New Application</CardTitle>
				<CardDescription>Fill in the details to track your job application process.</CardDescription>
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
				<FieldSet>
					<FieldLegend class="flex items-center gap-2 text-base font-semibold">
					<Briefcase/>
						Job Details
					</FieldLegend>
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
						<form.Field name="jobTitle">
							{#snippet children(field)}
								<Field>
									<FieldLabel for="jobTitle">Job Title <span class="text-destructive">*</span></FieldLabel>
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
						<form.Field name="companyName">
							{#snippet children(field)}
								<Field>
									<FieldLabel for="companyName">Company Name <span class="text-destructive">*</span></FieldLabel>
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
					</div>
					<form.Field name="jobUrl">
						{#snippet children(field)}
							<Field>
								<FieldLabel for="jobUrl">Job URL</FieldLabel>								
									<Field orientation="horizontal">
										<InputGroup class="bg-background">
											<InputGroupAddon align="inline-start">
												<Link/>
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
				</FieldSet>

				<FieldSet>
					<FieldLegend class="flex items-center gap-2 text-base font-semibold">
						<Building2/>
						Company information
					</FieldLegend>
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
						<form.Field name="location">
							{#snippet children(field)}
								<Field>
									<FieldLabel for="location">Location</FieldLabel>
									<Field orientation="horizontal">
										<InputGroup class="bg-background">
											<InputGroupAddon align="inline-start">
												<MapPin/>
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
						<Field>
							<FieldLabel class="flex items-center gap-2">												
							  Salary Range
							</FieldLabel> 
							<div class="space-y-4">
							  <div class="flex items-center justify-between text-sm">
								<span class="text-muted-foreground">Min: <span class="font-medium text-foreground">${minSalary.current || '0'}</span></span>
								<span class="text-muted-foreground">Max: <span class="font-medium text-foreground">${maxSalary.current || '0'}</span></span>
							  </div>
							  <Slider 
								type="multiple" 
								value={[
								 parseInt(minSalary.current),
								  parseInt(maxSalary.current) 
								]} 
								onValueChange={(values: number[]) => {
								  form.setFieldValue("minSalary", values[0]?.toString() || '0');
								  form.setFieldValue("maxSalary", values[1]?.toString() || '0');														
								}}
								min={0}
								max={300000}
								step={5000}
							  />
							</div>
							{#if (form.getFieldMeta("minSalary")?.isTouched && !form.getFieldMeta("minSalary")?.isValid) || (form.getFieldMeta("maxSalary")?.isTouched && !form.getFieldMeta("maxSalary")?.isValid)}
							  <FieldError errors={[...form.getFieldMeta("minSalary")?.errors || [], ...form.getFieldMeta("maxSalary")?.errors ||[]] as any} />
							{/if}
						  </Field>
						
					</div>
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
						<form.Field name="applicationStatus">
							{#snippet children(field)}
								<Field>									
									<FieldLabel for="applicationStatus">Application Status</FieldLabel>
									<Select  type="single" bind:value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
									<SelectTrigger class="bg-background">
										{statusLabels[field.state.value as keyof typeof statusLabels]}
									  </SelectTrigger>
									  <SelectContent>
										<SelectGroup>
											{#each Object.keys(statusLabels) as status}
												<SelectItem value={status}>{statusLabels[status as keyof typeof statusLabels]}</SelectItem>
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
												class={cn("justify-between font-normal bg-background", field.state.value  ? 'text-foreground' : 'text-muted-foreground')}
												>
												{field.state.value
													? field.state.value
													: "Select date"}												
												<CalendarIcon/>
												</Button>
											{/snippet}
										</PopoverTrigger>
										<PopoverContent>
											<Calendar 
												type="single" 
												captionLayout="dropdown"
												value={field.state.value ? parseDate(field.state.value) : undefined}	
												onValueChange={(value: DateValue | undefined) => field.handleChange(value?.toString() || '')}										
											/>
										</PopoverContent>
									</Popover>							
									{#if field.state.meta.isTouched && !field.state.meta.isValid}
										<FieldError errors={field.state.meta.errors as any} />
									{/if}
								</Field>
							{/snippet}
						</form.Field>
					</div>
				</FieldSet>

				<FieldSet>
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
			<Save/>
			Save Application
		</Button>
	</CardFooter>
</Card>
