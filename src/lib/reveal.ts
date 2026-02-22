export function reveal(node: HTMLElement) {
	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (!prefersReduced) {
		node.style.opacity = '0';
		node.style.transform = 'translateY(24px)';
		node.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
	}
	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.style.opacity = '1';
				node.style.transform = 'translateY(0)';
				observer.unobserve(node);
			}
		},
		{ threshold: 0.15 }
	);
	observer.observe(node);
	return { destroy() { observer.disconnect(); } };
}
