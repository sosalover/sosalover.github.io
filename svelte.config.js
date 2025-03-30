import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        appDir: 'app', // Required as the default is _app
        adapter: adapter()
    },
    preprocess: vitePreprocess()
};
export default config;