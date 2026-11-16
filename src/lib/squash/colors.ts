/** A player's chart colour from their slot (join order). Past eight players, a neutral line. */
export const seriesColor = (slot: number) =>
	slot >= 0 && slot < 8 ? `var(--s${slot + 1})` : 'var(--ink-soft)';
