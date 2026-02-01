<script lang="ts">
	import {
		NavigationMenuRoot as NavigationMenu,
		NavigationMenuItem,
		NavigationMenuLink,
		NavigationMenuList
	} from '$lib/components/ui/navigation-menu';
	import { Plus } from '@lucide/svelte';
	import { Button, buttonVariants } from '../ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import JobApplicationForm from '../forms/jobApplication/jobApplicationForm.svelte';
	import { logout } from '$lib/api/user';
	import { goto } from '$app/navigation';

	const navItems: { href: string; label: string }[] = [];

	const { formFieldData } = $props();

	const handleLogout = async () => {
		try {
			const { data } = await logout();
			if (!data.success) {
				console.error('Error when logging out user', data.data.message);
			}
		} catch (error) {
			console.error('Error when logging out user', error);
		}

		goto('/login');
	};
</script>

<NavigationMenu class=" justify-end">
	<NavigationMenuList>
		{#each navItems as item}
			<NavigationMenuItem>
				<NavigationMenuLink href={item.href}>{item.label}</NavigationMenuLink>
			</NavigationMenuItem>
		{/each}
		<NavigationMenuItem>
			<Dialog.Root>
				<Dialog.Trigger>
					<Button><Plus /><span>Add Application</span></Button>
				</Dialog.Trigger>
				<Dialog.Content class="max-h-[95vh] overflow-y-auto sm:max-w-250">
					<JobApplicationForm {formFieldData} />
					<Dialog.Footer>
						<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</NavigationMenuItem>
		<NavigationMenuItem>
			<Button variant="outline" onclick={handleLogout}>Logout</Button>
		</NavigationMenuItem>
	</NavigationMenuList>
</NavigationMenu>
