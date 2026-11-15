import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params }) => {
	const { standings, matches } = await parent();
	const index = standings.findIndex((p) => p.id === params.id);
	if (index === -1) error(404, 'Not Found');
	return {
		player: standings[index],
		rank: index + 1,
		history: matches.filter((m) => m.winnerId === params.id || m.loserId === params.id)
	};
};
