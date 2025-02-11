import pugPlugin from "vite-plugin-pug";

export default {
    plugins: [pugPlugin()],
    server: {
        port: 3000,
    },
    build: {
        outDir: "vite",
    },
};
