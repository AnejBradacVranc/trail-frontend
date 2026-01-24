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
	import { Button } from '../ui/button';

	const navItems = [{ href: '/', label: 'Home' }];
</script>

<NavigationMenu class=" justify-end">
	<NavigationMenuList>
		{#each navItems as item}
			<NavigationMenuItem>
				<NavigationMenuLink href={item.href}>{item.label}</NavigationMenuLink>
			</NavigationMenuItem>
		{/each}
		<NavigationMenuItem>
			<Button href={'/add-application'}><Plus /><span>Add Application</span></Button>
		</NavigationMenuItem>
	</NavigationMenuList>
</NavigationMenu>
