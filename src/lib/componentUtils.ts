import {
	Calendar,
	Phone,
	Users,
	Send,
	Star,
	UserPlus,
	type Icon,
	CircleCheck,
	CircleSlash
} from '@lucide/svelte';

export const EVENT_CONFIG: Record<string, { Icon: typeof Icon; color: string; bgColor: string }> = {
	applied: {
		Icon: Send,
		color: 'text-blue-600',
		bgColor: 'bg-blue-50'
	},
	recruiter_contacted: {
		Icon: UserPlus,
		color: 'text-purple-600',
		bgColor: 'bg-purple-50'
	},
	phone_screen: {
		Icon: Phone,
		color: 'text-green-600',
		bgColor: 'bg-green-50'
	},
	interview: {
		Icon: Users,
		color: 'text-indigo-600',
		bgColor: 'bg-indigo-50'
	},
	offer: {
		Icon: Star,
		color: 'text-yellow-600',
		bgColor: 'bg-yellow-50'
	},
	rejected: {
		Icon: CircleSlash,
		color: 'text-red-600',
		bgColor: 'bg-red-50'
	},
	withdrawn: {
		Icon: CircleSlash,
		color: 'text-gray-600',
		bgColor: 'bg-gray-50'
	},
	accepted: {
		Icon: CircleCheck,
		color: 'text-emerald-600',
		bgColor: 'bg-emerald-50'
	}
};

export function getEventConfig(eventType: string) {
	return (
		EVENT_CONFIG[eventType] || {
			Icon: Calendar,
			color: 'text-gray-600',
			bgColor: 'bg-gray-50'
		}
	);
}
