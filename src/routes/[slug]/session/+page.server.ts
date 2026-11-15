import { fail, redirect } from '@sveltejs/kit';
import { randomUUID } from 'node:crypto';
import { isLadderSlug, isUnlocked } from '$lib/server/squash/auth';
import { getStore, type Match } from '$lib/server/squash/store';
import { readMatchDate } from '$lib/server/squash/dates';
import type { Actions, PageServerLoad } from './$types';

/** The most recent session that still has live matches, for the Undo button. */
export const load: PageServerLoad = async () => {
	const store = getStore();
	if (!store) return { lastSession: null };
	const live = (await store.matches()).filter((m) => m.sessionId && !m.deletedAt);
	if (!live.length) return { lastSession: null };
	const latest = live.reduce((a, b) => (b.createdAt > a.createdAt ? b : a));
	const count = live.filter((m) => m.sessionId === latest.sessionId).length;
	return { lastSession: { id: latest.sessionId!, date: latest.date, count } };
};

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
		const parsed = readMatchDate(data);
		if ('error' in parsed) return fail(400, { error: parsed.error });
		const { date } = parsed;

		const ids = new Set((await store.players()).map((p) => p.id));
		const now = Date.now();
		const sessionId = randomUUID();
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
					createdAt: now + matches.length,
					sessionId
				});
			}
		}
		if (matches.length === 0) return fail(400, { error: 'The grid is empty.' });
		if (matches.length > MAX_TOTAL)
			return fail(400, { error: 'That’s too many matches for one session.' });

		await store.putMatches(matches);
		return {
			ok: `Logged ${matches.length} match${matches.length === 1 ? '' : 'es'} for ${date}.`,
			date
		};
	},

	undo: async ({ params, request, cookies }) => {
		if (!isLadderSlug(params.slug)) return fail(404, { error: 'Not found' });
		if (!isUnlocked(cookies)) return fail(401, { error: 'Enter the passcode first.' });
		const store = getStore();
		if (!store) return fail(503, { error: 'Storage is not set up yet.' });
		const sessionId = String((await request.formData()).get('session') ?? '');
		const now = Date.now();
		const hit = (await store.matches()).filter((m) => m.sessionId === sessionId && !m.deletedAt);
		if (!hit.length) return fail(400, { error: 'That session is already gone.' });
		await store.putMatches(hit.map((m) => ({ ...m, deletedAt: now })));
		redirect(303, `/${params.slug}?deleted=session:${sessionId}`);
	}
};
