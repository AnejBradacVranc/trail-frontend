import type { ApplicationStatus } from './applicationStatuses';
import type { Platform } from './platforms';

export interface FormFieldData {
	applicationStatuses: {
		keyValue: Map<string, string>;
		iterable: ApplicationStatus[];
	};
	platforms: {
		keyValue: Map<string, string>;
		iterable: Platform[];
	};
}
