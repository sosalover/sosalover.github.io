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
};

const PLAYERS = 'squash:players';
const MATCHES = 'squash:matches';

interface Store {
	players(): Promise<Player[]>;
	matches(): Promise<Match[]>;
	addPlayer(p: Player): Promise<void>;
	addMatch(m: Match): Promise<void>;
	addMatches(ms: Match[]): Promise<void>;
}

class RedisStore implements Store {
	constructor(private r: Redis) {}
	async players() {
		const h = await this.r.hgetall<Record<string, Player>>(PLAYERS);
		return h ? Object.values(h) : [];
	}
	async matches() {
		return (await this.r.lrange<Match>(MATCHES, 0, -1)) ?? [];
	}
	async addPlayer(p: Player) {
		await this.r.hset(PLAYERS, { [p.id]: p });
	}
	async addMatch(m: Match) {
		await this.r.rpush(MATCHES, m);
	}
	async addMatches(ms: Match[]) {
		if (ms.length) await this.r.rpush(MATCHES, ...ms);
	}
}

// Dev-only fallback so the app runs locally without a Redis store.
class MemoryStore implements Store {
	p = new Map<string, Player>();
	m: Match[] = [];
	async players() {
		return [...this.p.values()];
	}
	async matches() {
		return [...this.m];
	}
	async addPlayer(p: Player) {
		this.p.set(p.id, p);
	}
	async addMatch(m: Match) {
		this.m.push(m);
	}
	async addMatches(ms: Match[]) {
		this.m.push(...ms);
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
