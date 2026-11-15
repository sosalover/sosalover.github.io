import { Redis } from '@upstash/redis';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

export type Player = { id: string; name: string; createdAt: number };
export type Match = {
	id: string;
	winnerId: string;
	loserId: string;
	score: string | null;
	date: string; // YYYY-MM-DD
	createdAt: number;
	/** Set on matches logged together from the session grid, so the batch can be undone. */
	sessionId?: string;
	/** Soft delete: the ladder ignores the match, but it can be restored. */
	deletedAt?: number | null;
	editedAt?: number;
};

const PLAYERS = 'squash:players';
// Matches live in a hash (id → match) so one can be edited or deleted without
// rewriting the rest. LEGACY_MATCHES is the original list, migrated on first read.
const MATCHES = 'squash:match';
const LEGACY_MATCHES = 'squash:matches';

interface Store {
	players(): Promise<Player[]>;
	addPlayer(p: Player): Promise<void>;
	/** Every match, including soft-deleted ones. */
	matches(): Promise<Match[]>;
	/** Insert or replace matches by id. */
	putMatches(ms: Match[]): Promise<void>;
}

class RedisStore implements Store {
	constructor(private r: Redis) {}
	async players() {
		const h = await this.r.hgetall<Record<string, Player>>(PLAYERS);
		return h ? Object.values(h) : [];
	}
	async addPlayer(p: Player) {
		await this.r.hset(PLAYERS, { [p.id]: p });
	}
	async matches() {
		const legacy = (await this.r.lrange<Match>(LEGACY_MATCHES, 0, -1)) ?? [];
		if (legacy.length) {
			// HSETNX never overwrites a match that's already in the hash. Only once every
			// match is confirmed copied is the list moved aside (kept as a backup, not deleted).
			const p = this.r.pipeline();
			for (const m of legacy) p.hsetnx(MATCHES, m.id, m);
			await p.exec();
			const copied = new Set(await this.r.hkeys(MATCHES));
			if (legacy.every((m) => copied.has(m.id))) {
				// Two requests can migrate at once; whichever renames second finds no list. Fine.
				await this.r
					.rename(LEGACY_MATCHES, `${LEGACY_MATCHES}:backup:${Date.now()}`)
					.catch(() => {});
			}
		}
		const h = await this.r.hgetall<Record<string, Match>>(MATCHES);
		return h ? Object.values(h) : [];
	}
	async putMatches(ms: Match[]) {
		if (ms.length) await this.r.hset(MATCHES, Object.fromEntries(ms.map((m) => [m.id, m])));
	}
}

// Dev-only fallback so the app runs locally without a Redis store.
class MemoryStore implements Store {
	p = new Map<string, Player>();
	m = new Map<string, Match>();
	async players() {
		return [...this.p.values()];
	}
	async addPlayer(p: Player) {
		this.p.set(p.id, p);
	}
	async matches() {
		return [...this.m.values()].map((m) => ({ ...m }));
	}
	async putMatches(ms: Match[]) {
		for (const m of ms) this.m.set(m.id, { ...m });
	}
}

let store: Store | null = null;

/** Returns the store, or null if none is configured (production without Redis env vars). */
export function getStore(): Store | null {
	if (store) return store;
	// Vercel's Upstash integration sets KV_REST_API_*; a direct Upstash setup uses UPSTASH_REDIS_REST_*.
	const url = env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL;
	const token = env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN;
	if (url && token) store = new RedisStore(new Redis({ url, token }));
	else if (dev) store = new MemoryStore();
	return store;
}
