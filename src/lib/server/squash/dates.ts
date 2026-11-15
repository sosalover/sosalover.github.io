const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Reads the `date` field (blank means today: the logger's own date, sent by
 * the page as `today`, or UTC) and checks it. Returns the date or an error.
 */
export function readMatchDate(data: FormData): { date: string } | { error: string } {
	const today = String(data.get('today') ?? '');
	let date = String(data.get('date') ?? '').trim();
	if (!date) date = DATE_RE.test(today) ? today : new Date().toISOString().slice(0, 10);
	if (!DATE_RE.test(date) || Number.isNaN(Date.parse(date))) {
		return { error: 'That date doesn’t look right.' };
	}
	const tomorrow = new Date(Date.now() + 36 * 3600 * 1000).toISOString().slice(0, 10);
	if (date > tomorrow) return { error: 'That date is in the future.' };
	return { date };
}
