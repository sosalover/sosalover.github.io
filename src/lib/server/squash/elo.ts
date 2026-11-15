import type { Match, Player } from './store';

export const START_RATING = 1000;
export const K = 32;

export type RatedMatch = Match & {
	winnerBefore: number;
	loserBefore: number;
	delta: number; // points the winner gained (and the loser lost)
};

export type Standing = Player & {
	rating: number;
	wins: number;
	losses: number;
};

/** Chronological order: by match date, then by when it was logged. */
export function sortMatches(matches: Match[]) {
	return [...matches].sort((a, b) =>
		a.date === b.date ? a.createdAt - b.createdAt : a.date < b.date ? -1 : 1
	);
}

/**
 * Replays every match in order, so a back-dated match slots into the right
 * place and everyone's rating after it is recomputed.
 */
export function computeLadder(players: Player[], matches: Match[]) {
	const ratings = new Map(players.map((p) => [p.id, START_RATING]));
	const record = new Map(players.map((p) => [p.id, { wins: 0, losses: 0 }]));
	const rated: RatedMatch[] = [];

	for (const m of sortMatches(matches)) {
		const w = ratings.get(m.winnerId);
		const l = ratings.get(m.loserId);
		if (w === undefined || l === undefined) continue;
		const expectedWin = 1 / (1 + 10 ** ((l - w) / 400));
		const delta = Math.round(K * (1 - expectedWin));
		ratings.set(m.winnerId, w + delta);
		ratings.set(m.loserId, l - delta);
		record.get(m.winnerId)!.wins++;
		record.get(m.loserId)!.losses++;
		rated.push({ ...m, winnerBefore: w, loserBefore: l, delta });
	}

	const standings: Standing[] = players
		.map((p) => ({ ...p, rating: ratings.get(p.id)!, ...record.get(p.id)! }))
		.sort((a, b) => b.rating - a.rating || b.wins - a.wins || a.name.localeCompare(b.name));

	return { standings, matches: rated.reverse() }; // newest first
}
