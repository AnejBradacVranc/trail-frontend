<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import {
		Card,
		CardAction,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import {
		Field,
		FieldDescription,
		FieldGroup,
		FieldLabel,
		FieldLegend,
		FieldSeparator,
		FieldSet
	} from '$lib/components/ui/field';
	import FieldError from '$lib/components/ui/field/field-error.svelte';
	import { Input } from '$lib/components/ui/input';
	import { createForm } from '@tanstack/svelte-form';
	import { registerSchema } from './registerFormSchema';

	const form = createForm(() => ({
		defaultValues: {
			email: '',
			name: '',
			surname: '',
			password: ''
		},
		validators: {
			onSubmit: registerSchema
		},
		onSubmit: (values) => {
			console.log('Form submitted with values:', values);
		}
	}));
</script>

<Card class="w-full max-w-md">
	<CardHeader>
		<CardTitle>Create your account</CardTitle>
		<CardDescription>Enter your information to create your account</CardDescription>
		<CardAction>
			<Button variant="link" href="/login">Log in</Button>
		</CardAction>
	</CardHeader>
	<CardContent>
		<form
			id="registerForm"
			onsubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<FieldGroup>
				<form.Field name="email">
					{#snippet children(field)}
						<Field>
							<FieldLabel for="email">Email</FieldLabel>
							<Input
								bind:value={field.state.value}
								oninput={(e) => {
									const target = e.target as HTMLInputElement;
									field.handleChange(target.value);
								}}
								id="email"
								type="email"
								placeholder="Enter your email"
							/>
							{#if field.state.meta.isTouched && !field.state.meta.isValid}
								<FieldError errors={field.state.meta.errors as any} />
							{/if}
						</Field>
					{/snippet}
				</form.Field>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<form.Field name="name">
						{#snippet children(field)}
							<Field>
								<FieldLabel for="name">Name</FieldLabel>
								<Input
									bind:value={field.state.value}
									oninput={(e) => {
										const target = e.target as HTMLInputElement;
										field.handleChange(target.value);
									}}
									id="name"
									type="text"
									placeholder="Enter your name"
								/>
								{#if field.state.meta.isTouched && !field.state.meta.isValid}
									<FieldError errors={field.state.meta.errors as any} />
								{/if}
							</Field>
						{/snippet}
					</form.Field>
					<form.Field name="surname">
						{#snippet children(field)}
							<Field>
								<FieldLabel for="surname">Surname</FieldLabel>
								<Input
									bind:value={field.state.value}
									oninput={(e) => {
										const target = e.target as HTMLInputElement;
										field.handleChange(target.value);
									}}
									id="surname"
									type="text"
									placeholder="Enter your surname"
								/>
								{#if field.state.meta.isTouched && !field.state.meta.isValid}
									<FieldError errors={field.state.meta.errors as any} />
								{/if}
							</Field>
						{/snippet}
					</form.Field>
				</div>
				<form.Field name="password">
					<!-- validators={{
						onChange: ({ value }) => (value.length < 3 ? { message: 'Not long enough' } : undefined)
					}}
						-->
					{#snippet children(field)}
						<Field>
							<FieldLabel for="password">Password</FieldLabel>
							<Input
								bind:value={field.state.value}
								oninput={(e) => {
									const target = e.target as HTMLInputElement;
									field.handleChange(target.value);
								}}
								id="password"
								type="password"
								placeholder="Enter your password"
							/>
							{#if field.state.meta.isTouched && !field.state.meta.isValid}
								<FieldError errors={field.state.meta.errors as any} />
							{/if}
						</Field>
					{/snippet}
				</form.Field>
			</FieldGroup>
		</form>
	</CardContent>
	<CardFooter>
		<Button type="submit" form="registerForm">Register</Button>
	</CardFooter>
</Card>
