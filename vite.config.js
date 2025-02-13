import { defineConfig } from "vite";
import pugPlugin from "vite-plugin-pug";

const options = { pretty: true };

export default defineConfig({
	plugins: [pugPlugin(options)],
	server: {
		watch: {
			usePolling: true,
		},
		port: 3000,
	},
});

