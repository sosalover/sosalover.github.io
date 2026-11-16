import type { Match, Player } from './store';

export const START_RATING = 1000;
export const K = 32;

export type RatedMatch = Match & {
	/** Ratings at the start of the match's day, which is what the match was scored against. */
	winnerBefore: number;
	loserBefore: number;
	/** Ratings once all of that day's matches were applied. */
	winnerAfter: number;
	loserAfter: number;
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
 * Replays history one day at a time. Every match on a day is scored against
 * the ratings everyone had at the start of that day, and the changes are
 * applied together, so the order matches were played (or logged) within a day
 * makes no difference. Days themselves are applied in date order, so a
 * back-dated match slots into the right place and later days are recomputed.
 */
export function computeLadder(players: Player[], matches: Match[]) {
	const ratings = new Map(players.map((p) => [p.id, START_RATING]));
	const record = new Map(players.map((p) => [p.id, { wins: 0, losses: 0 }]));
	const rated: RatedMatch[] = [];

	const days = new Map<string, Match[]>();
	for (const m of sortMatches(matches)) {
		if (!ratings.has(m.winnerId) || !ratings.has(m.loserId)) continue;
		days.set(m.date, [...(days.get(m.date) ?? []), m]);
	}

	for (const dayMatches of days.values()) {
		const start = new Map(ratings);
		const scored = dayMatches.map((m) => {
			const w = start.get(m.winnerId)!;
			const l = start.get(m.loserId)!;
			const expectedWin = 1 / (1 + 10 ** ((l - w) / 400));
			return { m, w, l, delta: Math.round(K * (1 - expectedWin)) };
		});
		for (const { m, delta } of scored) {
			ratings.set(m.winnerId, ratings.get(m.winnerId)! + delta);
			ratings.set(m.loserId, ratings.get(m.loserId)! - delta);
			record.get(m.winnerId)!.wins++;
			record.get(m.loserId)!.losses++;
		}
		for (const { m, w, l, delta } of scored) {
			rated.push({
				...m,
				winnerBefore: w,
				loserBefore: l,
				winnerAfter: ratings.get(m.winnerId)!,
				loserAfter: ratings.get(m.loserId)!,
				delta
			});
		}
	}

	const standings: Standing[] = players
		.map((p) => ({ ...p, rating: ratings.get(p.id)!, ...record.get(p.id)! }))
		.sort((a, b) => b.rating - a.rating || b.wins - a.wins || a.name.localeCompare(b.name));

	return { standings, matches: rated.reverse() }; // newest first
}

export type DayOpponent = {
	id: string;
	won: boolean;
	score: string | null;
	delta: number; // signed, for this player
};

/** One point per day a player played: their end-of-day rating and what happened that day. */
export type DayPoint = {
	date: string; // YYYY-MM-DD
	rating: number;
	wins: number;
	losses: number;
	net: number;
	opponents: DayOpponent[];
};

/**
 * A player's rating history, one point per day played, oldest first. `matches`
 * is computeLadder's output; all of a day's matches are applied together, so
 * every match that day carries the same end-of-day rating.
 */
export function dailyHistory(playerId: string, matches: RatedMatch[]): DayPoint[] {
	const days: DayPoint[] = [];
	for (const m of [...matches].reverse()) {
		const won = m.winnerId === playerId;
		if (!won && m.loserId !== playerId) continue;
		let day = days.at(-1);
		if (day?.date !== m.date) {
			day = { date: m.date, rating: 0, wins: 0, losses: 0, net: 0, opponents: [] };
			days.push(day);
		}
		day.rating = won ? m.winnerAfter : m.loserAfter;
		day.net = day.rating - (won ? m.winnerBefore : m.loserBefore);
		if (won) day.wins++;
		else day.losses++;
		day.opponents.push({
			id: won ? m.loserId : m.winnerId,
			won,
			score: m.score,
			delta: won ? m.delta : -m.delta
		});
	}
	return days;
}
