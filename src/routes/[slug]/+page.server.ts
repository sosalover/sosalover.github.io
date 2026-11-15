import { fail, redirect } from '@sveltejs/kit';
import { randomUUID } from 'node:crypto';
import { checkPasscode, isLadderSlug, isUnlocked, lock, unlock } from '$lib/server/squash/auth';
import { getStore, type Match } from '$lib/server/squash/store';
import { readMatchDate } from '$lib/server/squash/dates';
import type { Actions, PageServerLoad } from './$types';

/** `match:<id>` or `session:<sessionId>`: what a delete or undo removed, for the Undo banner. */
function matchesFor(target: string, all: Match[]) {
	const [kind, id] = target.split(':');
	if (kind === 'match') return all.filter((m) => m.id === id);
	if (kind === 'session') return all.filter((m) => m.sessionId === id);
	return [];
}

export const load: PageServerLoad = async ({ url }) => {
	const target = url.searchParams.get('deleted');
	const restored = Number(url.searchParams.get('restored')) || 0;
	const saved = url.searchParams.has('saved');
	const store = getStore();
	if (!target || !store) return { deleted: null, restored, saved };

	const [players, all] = await Promise.all([store.players(), store.matches()]);
	const gone = matchesFor(target, all).filter((m) => m.deletedAt);
	if (!gone.length) return { deleted: null, restored, saved };
	const name = (id: string) => players.find((p) => p.id === id)?.name ?? '?';
	const label =
		gone.length === 1
			? `${name(gone[0].winnerId)} beat ${name(gone[0].loserId)}`
			: `${gone.length} matches from the session on ${gone[0].date}`;
	return { deleted: { target, label }, restored, saved };
};

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

	restore: async ({ params, request, cookies }) => {
		const bad = guard(params.slug);
		if (bad) return bad;
		if (!isUnlocked(cookies)) return fail(401, { error: 'Enter the passcode first.' });
		const store = getStore();
		if (!store) return fail(503, { error: 'Storage is not set up yet.' });
		const target = String((await request.formData()).get('target') ?? '');
		const back = matchesFor(target, await store.matches()).filter((m) => m.deletedAt);
		await store.putMatches(back.map((m) => ({ ...m, deletedAt: null })));
		redirect(303, `/${params.slug}?restored=${back.length}`);
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
		const parsed = readMatchDate(data);

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
		if ('error' in parsed) return fail(400, { form: 'match', error: parsed.error });

		await store.putMatches([
			{ id: randomUUID(), winnerId, loserId, score, date: parsed.date, createdAt: Date.now() }
		]);
		const name = (id: string) => players.find((p) => p.id === id)!.name;
		return {
			form: 'match',
			ok: `Logged: ${name(winnerId)} beat ${name(loserId)}.`
		};
	}
};
