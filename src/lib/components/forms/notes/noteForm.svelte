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
	import { createForm } from '@tanstack/svelte-form';
	import { noteSchema } from './noteSchema';
	import { Save } from '@lucide/svelte';
	import FormSubmissionAlert from '$lib/components/formSubmissionAlert.svelte';
	import { addNote } from '$lib/api/note';
	import type Quill from 'quill';
	import 'quill/dist/quill.snow.css';
	import { onMount } from 'svelte';

	const { jobApplicationId, onSuccess }: { jobApplicationId: number; onSuccess?: () => void } =
		$props();

	let isSubmitSuccessful: boolean | null = $state(null);
	let isLoading = $state(false);

	let quillInstance: Quill | null = null;
	let editorElement = $state<HTMLDivElement | null>(null);

	const form = createForm(() => ({
		defaultValues: {
			noteContent: '',
			jobApplicationId
		},
		validators: {
			onSubmit: noteSchema
		},
		onSubmit: async ({ value }) => {
			isLoading = true;

			try {
				const { data } = await addNote(value);

				if (data.success) {
					console.log('Success! Note ID:', data.data?.id);
					isSubmitSuccessful = true;

					// Clear the editor
					if (quillInstance) {
						quillInstance.setContents([]);
					}

					// Call onSuccess callback if provided
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

	onMount(() => {
		if (editorElement) {
			(async () => {
				const QuillModule = await import('quill');
				const Quill = QuillModule.default;

				quillInstance = new Quill(editorElement, {
					theme: 'snow',
					placeholder: 'Write your note here...',
					modules: {
						toolbar: [
							[{ header: [1, 2, 3, false] }],
							['bold', 'italic', 'underline', 'strike'],
							[{ list: 'ordered' }, { list: 'bullet' }],
							['blockquote', 'code-block'],
							['link'],
							['clean']
						]
					}
				});

				quillInstance.on('text-change', () => {
					const html = quillInstance?.root.innerHTML || '';
					form.setFieldValue('noteContent', html);
				});
			})();
		}

		return () => {
			quillInstance = null;
		};
	});
</script>

<Card>
	<CardHeader>
		<div class="flex items-center justify-between">
			<div class="space-y-2">
				<CardTitle>Add New Note</CardTitle>
				<CardDescription>Add a note to track your thoughts and updates.</CardDescription>
			</div>
		</div>
	</CardHeader>
	<CardContent>
		<form
			id="noteForm"
			onsubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<FieldGroup class="space-y-6">
				<FieldSet disabled={isLoading}>
					<form.Field name="noteContent">
						{#snippet children(field)}
							<Field>
								<FieldLabel for="noteContent"
									>Note Content <span class="text-destructive">*</span></FieldLabel
								>
								<div class="rounded-md border border-input bg-background">
									<div bind:this={editorElement} class="min-h-48"></div>
								</div>
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
		<Button type="submit" form="noteForm" disabled={isLoading}>
			<Save />
			{isLoading ? 'Saving...' : 'Save Note'}
		</Button>
	</CardFooter>

	{#if isSubmitSuccessful !== null}
		<FormSubmissionAlert
			{isSubmitSuccessful}
			successTitle="Note added successfully!"
			successDescription="Your note has been saved to this job application."
			errorTitle="Unable to add note"
			errorDescription="Try again later. If the problem persists, contact support."
		/>
	{/if}
</Card>
