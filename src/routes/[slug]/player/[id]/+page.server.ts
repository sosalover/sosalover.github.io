import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params }) => {
	const { standings, matches } = await parent();
	const index = standings.findIndex((p) => p.id === params.id);
	if (index === -1) error(404, 'Not Found');
	const history = matches.filter((m) => m.winnerId === params.id || m.loserId === params.id);

	// Won–lost record against each opponent.
	const h2h = new Map<string, { id: string; name: string; wins: number; losses: number }>();
	for (const m of history) {
		const won = m.winnerId === params.id;
		const oppId = won ? m.loserId : m.winnerId;
		let row = h2h.get(oppId);
		if (!row) {
			const name = standings.find((p) => p.id === oppId)?.name ?? '?';
			row = { id: oppId, name, wins: 0, losses: 0 };
			h2h.set(oppId, row);
		}
		if (won) row.wins++;
		else row.losses++;
	}

	return {
		player: standings[index],
		rank: index + 1,
		history,
		headToHead: [...h2h.values()].sort(
			(a, b) => b.wins + b.losses - (a.wins + a.losses) || a.name.localeCompare(b.name)
		)
	};
};
