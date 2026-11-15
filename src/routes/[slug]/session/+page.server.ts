import { fail } from '@sveltejs/kit';
import { randomUUID } from 'node:crypto';
import { isLadderSlug, isUnlocked } from '$lib/server/squash/auth';
import { getStore, type Match } from '$lib/server/squash/store';
import type { Actions } from './$types';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_PER_PAIR = 30;
const MAX_TOTAL = 300;

export const actions: Actions = {
	// Each grid cell arrives as `beat:<winnerId>:<loserId>` = how many times the winner beat the loser.
	save: async ({ params, request, cookies }) => {
		if (!isLadderSlug(params.slug)) return fail(404, { error: 'Not found' });
		if (!isUnlocked(cookies))
			return fail(401, { error: 'Enter the passcode on the ladder page first.' });
		const store = getStore();
		if (!store) return fail(503, { error: 'Storage is not set up yet.' });

		const data = await request.formData();
		const today = String(data.get('today') ?? '');
		let date = String(data.get('date') ?? '').trim();
		if (!date) date = DATE_RE.test(today) ? today : new Date().toISOString().slice(0, 10);
		if (!DATE_RE.test(date) || Number.isNaN(Date.parse(date))) {
			return fail(400, { error: 'That date doesn’t look right.' });
		}
		const tomorrow = new Date(Date.now() + 36 * 3600 * 1000).toISOString().slice(0, 10);
		if (date > tomorrow) return fail(400, { error: 'That date is in the future.' });

		const ids = new Set((await store.players()).map((p) => p.id));
		const now = Date.now();
		const matches: Match[] = [];
		for (const [key, value] of data) {
			if (!key.startsWith('beat:')) continue;
			const [, winnerId, loserId] = key.split(':');
			const count = Number(value);
			if (!count) continue;
			if (!ids.has(winnerId) || !ids.has(loserId) || winnerId === loserId) {
				return fail(400, { error: 'That grid has a player who isn’t on the ladder.' });
			}
			if (!Number.isInteger(count) || count < 0 || count > MAX_PER_PAIR) {
				return fail(400, { error: `Each cell must be between 0 and ${MAX_PER_PAIR}.` });
			}
			for (let i = 0; i < count; i++) {
				matches.push({
					id: randomUUID(),
					winnerId,
					loserId,
					score: null,
					date,
					createdAt: now + matches.length
				});
			}
		}
		if (matches.length === 0) return fail(400, { error: 'The grid is empty.' });
		if (matches.length > MAX_TOTAL)
			return fail(400, { error: 'That’s too many matches for one session.' });

		await store.addMatches(matches);
		return {
			ok: `Logged ${matches.length} match${matches.length === 1 ? '' : 'es'} for ${date}.`,
			date
		};
	}
};
