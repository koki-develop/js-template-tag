// biome-ignore lint/suspicious/noExplicitAny: ignore
export function js<T = any>(
	strings: TemplateStringsArray,
	...values: string[]
): T {
	const program = strings.reduce(
		(acc, str, i) => acc + str + (values[i] ?? ""),
		"",
	);
	// biome-ignore lint/security/noGlobalEval: ignore
	return eval(program);
}
