import { error } from '@sveltejs/kit';
import { isLadderSlug, isUnlocked, passcodeRequired } from '$lib/server/squash/auth';
import { getStore } from '$lib/server/squash/store';
import { computeLadder } from '$lib/server/squash/elo';
import type { LayoutServerLoad } from './$types';

// The rest of the site is prerendered; the ladder is live data.
export const prerender = false;

export const load: LayoutServerLoad = async ({ params, cookies, setHeaders }) => {
	if (!isLadderSlug(params.slug)) error(404, 'Not Found');

	setHeaders({
		'X-Robots-Tag': 'noindex, nofollow, noarchive',
		'Referrer-Policy': 'no-referrer',
		'Cache-Control': 'private, no-store'
	});

	const base = `/${params.slug}`;
	const store = getStore();
	if (!store) {
		return {
			base,
			configured: false,
			unlocked: false,
			passcodeRequired: false,
			standings: [],
			matches: []
		};
	}

	const [players, matches] = await Promise.all([store.players(), store.matches()]);
	const ladder = computeLadder(players, matches);
	const unlocked = isUnlocked(cookies);

	return {
		base,
		configured: true,
		unlocked,
		passcodeRequired: passcodeRequired(),
		...ladder
	};
};
