<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Card, CardContent } from '$lib/components/ui/card';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import { Field } from '$lib/components/ui/field';
	import { InputGroup, InputGroupAddon } from '$lib/components/ui/input-group';
	import InputGroupInput from '$lib/components/ui/input-group/input-group-input.svelte';
	import moment from 'moment';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { SearchIcon, Sheet } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import JobApplicationForm from '$lib/components/forms/jobApplication/jobApplicationForm.svelte';
	import { goto } from '$app/navigation';

	const { data }: PageProps = $props();

	const { applications, formFieldData } = $derived(data);
</script>

<!-- Heading Section -->
<section class="container flex w-full justify-between">
	<div class="flex flex-col gap-4">
		<h1>All Applications</h1>
	</div>
	<div class="flex items-center gap-4">
		<Button variant="outline"><Sheet /> Export</Button>
	</div>
</section>

<!-- Table Section -->
<section class="container flex flex-col gap-8">
	<!-- Search -->
	<Card>
		<CardContent>
			<Field orientation="horizontal">
				<InputGroup>
					<InputGroupInput
						id="search-applications"
						type="search"
						placeholder="Search by company, job title, or keywords..."
					/>
					<InputGroupAddon align="inline-start">
						<SearchIcon />
					</InputGroupAddon>
				</InputGroup>
			</Field>
		</CardContent>
		<CardFooter class="border-t text-sm">
			<!-- Filters -->
			<div class="flex w-full justify-between">
				<div>TODO FILTERS</div>
				<span class="text-muted-foreground"> TODO PAGINATION </span>
			</div>
		</CardFooter>
	</Card>

	<Card>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead class="font-black">Company</TableHead>
						<TableHead class="font-black">Job Title</TableHead>
						<TableHead class="font-black">Date applied</TableHead>
						<TableHead class="font-black">Status</TableHead>
						<TableHead class="text-right font-black">Price Range</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{#each applications as application}
						<TableRow
							class="cursor-pointer "
							onclick={() => {
								goto(`/applications/${application.application_id}`);
							}}
						>
							<TableCell>{application.company_name}</TableCell>
							<TableCell>{application.job_title}</TableCell>
							<TableCell>{moment(application.applied_at).format('L')}</TableCell>
							<TableCell>{application.status_name}</TableCell>
							<TableCell class="text-right"
								>{application.salary_min}€ - {application.salary_max}€</TableCell
							>
						</TableRow>
					{/each}
				</TableBody>
				<!--<TableFooter>
					Pagination
					<TableRow>
						<TableCell colspan={5}>TODO Pagination</TableCell>
					</TableRow>
				</TableFooter>-->
			</Table>
		</CardContent>
	</Card>
	<!--Table-->
</section>

<section class="container">
	<JobApplicationForm {formFieldData} />
</section>
