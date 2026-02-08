export interface Reminder {
	reminder_id: number;
	application_id: number;
	title: string;
	description: string | null;
	remind_at: string;
	is_completed: boolean;
	created_at: string;
	modified_at: string;
}
