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
	import { Field, FieldError, FieldGroup, FieldLabel } from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { createForm } from '@tanstack/svelte-form';
	import { loginSchema } from './loginFormSchema';
	import { login } from '$lib/api/user';
	import FormSubmissionAlert from '$lib/components/formSubmissionAlert.svelte';
	import { goto } from '$app/navigation';

	let isSubmitSuccessful: boolean | null = $state(null);

	const form = createForm(() => ({
		defaultValues: {
			email: '',
			password: ''
		},
		validators: {
			onSubmit: loginSchema
		},
		onSubmit: async ({ value }) => {
			try {
				const { data } = await login(value.email, value.password);

				if (data.success) {
					//console.log('Success! Application ID:', data.data?.id);

					isSubmitSuccessful = true;
					setTimeout(() => {
						goto('/');
					}, 2000);
				} else {
					console.error('Error:', data.data.message);
					isSubmitSuccessful = false;
				}
			} catch (error) {
				console.error('Submission error:', error);
				isSubmitSuccessful = false;
			}
		}
	}));
</script>

<Card class="w-full max-w-md">
	<CardHeader>
		<CardTitle>Sign in to your account</CardTitle>
		<CardDescription>Enter your credentials to login</CardDescription>
		<CardAction>
			<Button variant="link" href="/register">Register</Button>
		</CardAction>
	</CardHeader>
	<CardContent>
		<form
			id="loginForm"
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
						</Field>
						{#if field.state.meta.isTouched && !field.state.meta.isValid}
							<FieldError errors={field.state.meta.errors as any} />
						{/if}
					{/snippet}
				</form.Field>
				<form.Field name="password">
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
						</Field>
						{#if field.state.meta.isTouched && !field.state.meta.isValid}
							<FieldError errors={field.state.meta.errors as any} />
						{/if}
					{/snippet}
				</form.Field>
			</FieldGroup>
		</form>
	</CardContent>
	<CardFooter>
		<Button type="submit" form="loginForm">Login</Button>
	</CardFooter>

	{#if isSubmitSuccessful !== null}
		<FormSubmissionAlert
			{isSubmitSuccessful}
			successTitle="Welcome back!"
			successDescription="You've successfully logged in. Redirecting to your dashboard..."
			errorTitle="Login failed"
			errorDescription="Invalid email or password. Please check your credentials and try again."
		/>
	{/if}
</Card>
