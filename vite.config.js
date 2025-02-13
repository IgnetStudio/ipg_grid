import { defineConfig } from "vite";
import { resolve } from "path";

import pugPlugin from "vite-plugin-pug";

const options = { pretty: true };

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				folio: resolve(__dirname, "folio.html"),
				404: resolve(__dirname, "404.html"),
			},
		},
	},
	plugins: [pugPlugin(options)],
	server: {
		watch: {
			usePolling: true,
		},
		port: 3000,
	},
});

