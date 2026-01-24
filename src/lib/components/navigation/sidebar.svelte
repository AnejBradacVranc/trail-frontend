<script lang="ts">
	import { Briefcase, Calendar, ChartNetwork, LayoutDashboard, Settings } from '@lucide/svelte';

	import {
		Sidebar,
		SidebarContent,
		SidebarGroup,
		SidebarGroupContent,
		SidebarGroupLabel,
		SidebarMenu,
		SidebarMenuButton,
		SidebarMenuItem,
		SidebarSeparator,
		SidebarTrigger
	} from '$lib/components/ui/sidebar';
	import SidebarHeader from '../ui/sidebar/sidebar-header.svelte';
	import SidebarFooter from '../ui/sidebar/sidebar-footer.svelte';
	import logo from '$lib/assets/logo.png';
	import { page } from '$app/state';

	const pages = [
		{
			title: 'Dashboard',
			url: '/',
			icon: LayoutDashboard
		},
		{
			title: 'Applications',
			url: '/applications',
			icon: Briefcase
		},
		{
			title: 'Analytics',
			url: '/analytics',
			icon: ChartNetwork
		},
		{
			title: 'Reminders',
			url: '/reminders',
			icon: Calendar
		}
	];
</script>

<Sidebar>
	<SidebarHeader class="flex flex-row items-center gap-5">
		<img src={logo} alt="logo" class="h-auto w-10" />
		<span class="text-4xl font-semibold">Trail</span>
	</SidebarHeader>
	<SidebarContent>
		<SidebarGroup>
			<SidebarGroupLabel>For you</SidebarGroupLabel>

			<SidebarGroupContent>
				<SidebarMenu>
					{#each pages as item (item.title)}
						<SidebarMenuItem>
							<SidebarMenuButton variant={`${item.url === page.route.id ? 'outline' : 'default'}`}>
								<a href={item.url} class="flex items-center gap-4">
									<svelte:component this={item.icon} />
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					{/each}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
		<SidebarGroup>
			<SidebarGroupLabel>Account</SidebarGroupLabel>
			<SidebarMenuItem>
				<SidebarMenuButton variant={`${page.route.id === '/settings' ? 'outline' : 'default'}`}>
					<a href="/settings" class="flex gap-4">
						<svelte:component this={Settings} />
						<span>Settings</span>
					</a>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarGroup>
	</SidebarContent>
	<SidebarSeparator />

	<SidebarFooter>
		<p class="text-sm text-sidebar-foreground">© 2024 Trail Inc.</p>
	</SidebarFooter>
</Sidebar>
