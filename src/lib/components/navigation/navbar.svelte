<script lang="ts">
	import {
		NavigationMenuRoot as NavigationMenu,
		NavigationMenuContent,
		NavigationMenuItem,
		NavigationMenuLink,
		NavigationMenuList,
		NavigationMenuTrigger
	} from '$lib/components/ui/navigation-menu';
	import { Plus } from '@lucide/svelte';
	import { Button, buttonVariants } from '../ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import JobApplicationForm from '../forms/jobApplication/jobApplicationForm.svelte';

	const navItems: { href: string; label: string }[] = [];

	const { formFieldData } = $props();
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
				<Dialog.Content class="max-h-[95vh] overflow-y-auto sm:max-w-[1000px]">
					<JobApplicationForm {formFieldData} />
					<Dialog.Footer>
						<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</NavigationMenuItem>
	</NavigationMenuList>
</NavigationMenu>
