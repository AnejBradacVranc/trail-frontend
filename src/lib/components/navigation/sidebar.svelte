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
	import { cn } from '$lib/utils';

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
						{@const isActive = item.url === page.route.id}
						<SidebarMenuItem class="font-base">
							<SidebarMenuButton
								variant={isActive ? 'outline' : 'default'}
								class={cn(
									'transition-colors duration-300',
									isActive
										? 'font-semibold hover:bg-sidebar-primary hover:text-sidebar-primary-foreground'
										: ''
								)}
							>
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
			{@const isSettingsActive = page.route.id === '/settings'}
			<SidebarMenuItem>
				<SidebarMenuButton
					variant={isSettingsActive ? 'outline' : 'default'}
					class={isSettingsActive ? 'hover:bg-primary hover:text-primary-foreground' : ''}
				>
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
