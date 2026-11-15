import { error, fail, redirect } from '@sveltejs/kit';
import { isLadderSlug, isUnlocked } from '$lib/server/squash/auth';
import { getStore } from '$lib/server/squash/store';
import { readMatchDate } from '$lib/server/squash/dates';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params }) => {
	const { matches } = await parent();
	const match = matches.find((m) => m.id === params.id);
	if (!match) error(404, 'Not Found');
	return { match };
};

async function findLive(id: string) {
	const store = getStore();
	if (!store) return { error: fail(503, { error: 'Storage is not set up yet.' }) };
	const match = (await store.matches()).find((m) => m.id === id && !m.deletedAt);
	if (!match) return { error: fail(404, { error: 'That match has been deleted.' }) };
	return { store, match };
}

export const actions: Actions = {
	save: async ({ params, request, cookies }) => {
		if (!isLadderSlug(params.slug)) return fail(404, { error: 'Not found' });
		if (!isUnlocked(cookies)) return fail(401, { error: 'Enter the passcode first.' });
		const found = await findLive(params.id);
		if (found.error) return found.error;
		const { store, match } = found;

		const data = await request.formData();
		const winnerId = String(data.get('winner') ?? '');
		const loserId = String(data.get('loser') ?? '');
		const score =
			String(data.get('score') ?? '')
				.trim()
				.slice(0, 40) || null;
		const parsed = readMatchDate(data);
		if ('error' in parsed) return fail(400, { error: parsed.error });

		const ids = new Set((await store.players()).map((p) => p.id));
		if (!ids.has(winnerId) || !ids.has(loserId)) {
			return fail(400, { error: 'Pick a winner and a loser.' });
		}
		if (winnerId === loserId) {
			return fail(400, { error: 'Winner and loser must be different players.' });
		}

		await store.putMatches([
			{ ...match, winnerId, loserId, score, date: parsed.date, editedAt: Date.now() }
		]);
		redirect(303, `/${params.slug}?saved=1`);
	},

	delete: async ({ params, cookies }) => {
		if (!isLadderSlug(params.slug)) return fail(404, { error: 'Not found' });
		if (!isUnlocked(cookies)) return fail(401, { error: 'Enter the passcode first.' });
		const found = await findLive(params.id);
		if (found.error) return found.error;
		await found.store.putMatches([{ ...found.match, deletedAt: Date.now() }]);
		redirect(303, `/${params.slug}?deleted=match:${params.id}`);
	}
};
