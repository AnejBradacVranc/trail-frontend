import type { Platform } from './platforms';

export interface ApplicationSummary {
	application_id: number;
	job_title: string;
	applied_at: string;
	interview_at: string | null;
	status_name: string;
	status_color: string;
	salary_max: number;
	salary_min: number;
	location: string;
	status_id: number;
	company_name: string;
}

export interface ApplicationDetail {
	application_id: number;
	job_title: string;
	platform: Platform;
	job_url: string | null;
	salary_min: number;
	salary_max: number;
	created_at: string;
	applied_at: string;
	modified_at: string;

	status_name: string;
	status_color: string;

	company: CompanyDetail;
	company_contact: CompanyContact | null;

	events: ApplicationEvent[];
	notes: Note[];
	files: File[];
}

interface CompanyContact {
	company_contact_id: number;
	name: string;
	surname: string;
	email: string | null;
	phone: string | null;
	role: string | null;
	created_at: string;
	modified_at: string;
}

export interface ApplicationEvent {
	event_id: number;
	application_id: number;
	event_type:
		| 'applied'
		| 'recruiter_contacted'
		| 'phone_screen'
		| 'interview'
		| 'offer'
		| 'rejected'
		| 'withdrawn'
		| 'accepted';
	note: string | null;
	event_start_time: string;
	event_est_end_time?: string;
	created_at: string;
}

interface CompanyDetail {
	company_id: number;
	name: string;
	headquarters_location: string | null;
	employees_count: number | null;
	website: string | null;
}

interface Note {
	note_id: number;
	application_id: number;
	note_content?: string;
}

export interface File {
	file_id: number;
	application_id: number;
	filename: string;
}
