export interface ApplicationSummary {
	application_id: number;
	job_title: string;
	applied_at: string;
	status_name: string;
	salary_max: number;
	salary_min: number;
	location: string;
	company_name: string;
}

export interface ApplicationDetail {
	application_id: number;
	job_title: string;
	platform: string;
	job_url?: string;
	salary_min?: number;
	salary_max?: number;
	created_at: string;
	modified_at: string;

	status_name: string;

	company: CompanyDetail;

	events: ApplicationEvent[];
	notes: Note[];
	files: File[];
}

interface ApplicationEvent {
	event_id: number;
	application_id: number;
	event_type: string;
	note?: string;
	event_start_time: string;
	event_est_end_time?: string;
	created_at: string;
}

interface CompanyDetail {
	company_id: number;
	name: string;
	headquarters_location?: string;
	employees_count?: number;
}

interface Note {
	note_id: number;
	application_id: number;
	note_content?: string;
}

interface File {
	file_id: number;
	application_id: number;
	filename: string;
}
