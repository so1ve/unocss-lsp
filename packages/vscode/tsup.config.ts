import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		client: "src/index.ts",
		server: "./node_modules/unocss-lsp/bin/unocss-lsp.js",
	},
	format: ["cjs"],
	shims: false,
	dts: false,
	external: ["vscode"],
});
