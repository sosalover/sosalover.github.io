import { createHash, timingSafeEqual } from 'node:crypto';
import type { Cookies } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

// The ladder lives at a secret path. Only its hash is in this (public) repo;
// the path itself is known to Thomas. Unknown slugs 404 like any other page.
const SLUG_SHA256 = '9f0b2ca5c947e0300d5a7839cf63fde90e4f223b02d06794be20d5f4e9d58118';

const COOKIE = 'squash_auth';

const sha256 = (s: string) => createHash('sha256').update(s).digest();

export function isLadderSlug(slug: string) {
	return timingSafeEqual(sha256(slug), Buffer.from(SLUG_SHA256, 'hex'));
}

function passcode(): string | null {
	return env.SQUASH_PASSCODE || (dev ? 'dev' : null);
}

/** Token stored in the cookie: changes when the passcode changes, so rotating it logs everyone out. */
function token(code: string) {
	return sha256(`squash-ladder:${code}`).toString('hex');
}

export const passcodeConfigured = () => passcode() !== null;

export function checkPasscode(attempt: string) {
	const code = passcode();
	return code !== null && timingSafeEqual(sha256(attempt), sha256(code));
}

export function isUnlocked(cookies: Cookies) {
	const code = passcode();
	const value = cookies.get(COOKIE);
	return code !== null && !!value && value === token(code);
}

export function unlock(cookies: Cookies, path: string) {
	cookies.set(COOKIE, token(passcode()!), {
		path,
		httpOnly: true,
		sameSite: 'strict',
		secure: !dev,
		maxAge: 60 * 60 * 24 * 365
	});
}

export function lock(cookies: Cookies, path: string) {
	cookies.delete(COOKIE, { path });
}
