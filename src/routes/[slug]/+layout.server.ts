import { error } from '@sveltejs/kit';
import { isLadderSlug, isUnlocked, passcodeRequired } from '$lib/server/squash/auth';
import { getStore } from '$lib/server/squash/store';
import { computeLadder, dailyHistory, type DayPoint } from '$lib/server/squash/elo';
import type { LayoutServerLoad } from './$types';

// The rest of the site is prerendered; the ladder is live data.
export const prerender = false;

export const load: LayoutServerLoad = async ({ params, cookies, setHeaders }) => {
	if (!isLadderSlug(params.slug)) error(404, 'Not Found');

	setHeaders({
		'X-Robots-Tag': 'noindex, nofollow, noarchive',
		'Referrer-Policy': 'same-origin',
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
			matches: [],
			ratingDays: {} as Record<string, DayPoint[]>
		};
	}

	const [players, matches] = await Promise.all([store.players(), store.matches()]);
	const ladder = computeLadder(
		players,
		matches.filter((m) => !m.deletedAt)
	);
	const unlocked = isUnlocked(cookies);

	// Chart colour slot per player, by when they joined, so a player keeps their colour
	// whatever their rank. There are eight colours; later players get a neutral line.
	const joined = [...players].sort((a, b) => a.createdAt - b.createdAt).map((p) => p.id);
	const standings = ladder.standings.map((s) => ({ ...s, slot: joined.indexOf(s.id) }));
	const ratingDays = Object.fromEntries(
		players.map((p) => [p.id, dailyHistory(p.id, ladder.matches)])
	);

	return {
		base,
		configured: true,
		unlocked,
		passcodeRequired: passcodeRequired(),
		standings,
		matches: ladder.matches,
		ratingDays
	};
};
