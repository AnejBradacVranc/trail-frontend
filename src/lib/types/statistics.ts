export interface StatisticSummary {
	name: string;
	value: number | null;
	unit: string | null;
	delta: number | null;
	period: string;
	trend: 'new' | 'up' | 'down' | 'flat' | null;
	summary_text: string | null;
}
