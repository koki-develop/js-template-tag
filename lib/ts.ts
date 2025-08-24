import swc from "@swc/core";

// biome-ignore lint/suspicious/noExplicitAny: ignore
export function ts<T = any>(
	strings: TemplateStringsArray,
	...values: string[]
): T {
	const program = strings.reduce(
		(acc, str, i) => acc + str + (values[i] ?? ""),
		"",
	);
	const transpiled = swc.transformSync(program, {
		jsc: {
			parser: { syntax: "typescript" },
		},
	});
	// biome-ignore lint/security/noGlobalEval: ignore
	return eval(transpiled.code);
}
