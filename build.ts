import { build } from "esbuild";

await build({
	entryPoints: ["src/server.ts"],
	bundle: true,
	platform: "node",
	outdir: "build",
	target: "node22.14",
	format: "esm",
	packages: "external",
});
