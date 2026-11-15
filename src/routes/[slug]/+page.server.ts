import { fail } from '@sveltejs/kit';
import { randomUUID } from 'node:crypto';
import { checkPasscode, isLadderSlug, isUnlocked, lock, unlock } from '$lib/server/squash/auth';
import { getStore } from '$lib/server/squash/store';
import type { Actions } from './$types';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function guard(slug: string) {
	if (!isLadderSlug(slug)) return fail(404, { error: 'Not found' });
	return null;
}

export const actions: Actions = {
	unlock: async ({ params, request, cookies }) => {
		const bad = guard(params.slug);
		if (bad) return bad;
		const code = String((await request.formData()).get('passcode') ?? '');
		if (!checkPasscode(code)) return fail(401, { form: 'unlock', error: 'Wrong passcode.' });
		unlock(cookies, `/${params.slug}`);
		return { form: 'unlock', ok: 'Unlocked on this device.' };
	},

	lock: async ({ params, cookies }) => {
		const bad = guard(params.slug);
		if (bad) return bad;
		lock(cookies, `/${params.slug}`);
		return { form: 'lock' };
	},

	addPlayer: async ({ params, request, cookies }) => {
		const bad = guard(params.slug);
		if (bad) return bad;
		if (!isUnlocked(cookies))
			return fail(401, { form: 'player', error: 'Enter the passcode first.' });
		const store = getStore();
		if (!store) return fail(503, { form: 'player', error: 'Storage is not set up yet.' });

		const name = String((await request.formData()).get('name') ?? '')
			.trim()
			.replace(/\s+/g, ' ');
		if (!name) return fail(400, { form: 'player', error: 'Enter a name.', name });
		if (name.length > 40)
			return fail(400, {
				form: 'player',
				error: 'Keep names under 40 characters.',
				name
			});

		const players = await store.players();
		if (players.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
			return fail(400, {
				form: 'player',
				error: `${name} is already on the ladder.`,
				name
			});
		}
		await store.addPlayer({ id: randomUUID(), name, createdAt: Date.now() });
		return { form: 'player', ok: `Added ${name}.` };
	},

	logMatch: async ({ params, request, cookies }) => {
		const bad = guard(params.slug);
		if (bad) return bad;
		if (!isUnlocked(cookies))
			return fail(401, { form: 'match', error: 'Enter the passcode first.' });
		const store = getStore();
		if (!store) return fail(503, { form: 'match', error: 'Storage is not set up yet.' });

		const data = await request.formData();
		const winnerId = String(data.get('winner') ?? '');
		const loserId = String(data.get('loser') ?? '');
		const score =
			String(data.get('score') ?? '')
				.trim()
				.slice(0, 40) || null;
		// A blank date means today, in the logger's own timezone (sent by the page) or UTC.
		const today = String(data.get('today') ?? '');
		let date = String(data.get('date') ?? '').trim();
		if (!date) date = DATE_RE.test(today) ? today : new Date().toISOString().slice(0, 10);

		const players = await store.players();
		const ids = new Set(players.map((p) => p.id));
		if (!ids.has(winnerId) || !ids.has(loserId)) {
			return fail(400, { form: 'match', error: 'Pick a winner and a loser.' });
		}
		if (winnerId === loserId) {
			return fail(400, {
				form: 'match',
				error: 'Winner and loser must be different players.'
			});
		}
		if (!DATE_RE.test(date) || Number.isNaN(Date.parse(date))) {
			return fail(400, {
				form: 'match',
				error: 'That date doesn’t look right.'
			});
		}
		const tomorrow = new Date(Date.now() + 36 * 3600 * 1000).toISOString().slice(0, 10);
		if (date > tomorrow) return fail(400, { form: 'match', error: 'That date is in the future.' });

		await store.addMatch({
			id: randomUUID(),
			winnerId,
			loserId,
			score,
			date,
			createdAt: Date.now()
		});
		const name = (id: string) => players.find((p) => p.id === id)!.name;
		return {
			form: 'match',
			ok: `Logged: ${name(winnerId)} beat ${name(loserId)}.`
		};
	}
};
