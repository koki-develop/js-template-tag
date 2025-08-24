import { describe, expect, it } from "vitest";
import { ts } from "./ts.js";

describe("ts", () => {
	it("should execute TypeScript code with type annotations", () => {
		const result = ts`
			const x: number = 10;
			const y: number = 20;
			x + y
		`;
		expect(result).toBe(30);
	});

	it("should support interface definitions and objects", () => {
		const result = ts`
			interface Person {
				name: string;
				age: number;
			}
			const person: Person = {
				name: "Bob",
				age: 25
			};
			person
		`;
		expect(result).toEqual({ name: "Bob", age: 25 });
	});

	it("should support generic functions", () => {
		const result = ts`
			function identity<T>(value: T): T {
				return value;
			}
			identity<string>("Hello TypeScript")
		`;
		expect(result).toBe("Hello TypeScript");
	});

	it("should support arrow functions", () => {
		const result = ts`
			const add = (a: number, b: number): number => a + b;
			add(15, 25)
		`;
		expect(result).toBe(40);
	});

	it("should support optional chaining", () => {
		const result = ts`
			const obj = {
				foo: {
					bar: {
						baz: 123
					}
				}
			};
			obj?.foo?.bar?.baz
		`;
		expect(result).toBe(123);
	});

	it("should support nullish coalescing operator", () => {
		const result = ts`
			const value = null;
			value ?? "default"
		`;
		expect(result).toBe("default");
	});

	it("should interpolate template variables", () => {
		const x = "100";
		const y = "50";
		const result = ts`${x} - ${y}`;
		expect(result).toBe(50);
	});

	it("should support type inference with type arguments", () => {
		const result = ts<string[]>`
			const arr: string[] = ["a", "b", "c"];
			arr
		`;
		expect(result).toEqual(["a", "b", "c"]);
	});

	it("should support enum definitions", () => {
		const result = ts`
			enum Color {
				Red = 1,
				Green = 2,
				Blue = 3
			}
			Color.Green
		`;
		expect(result).toBe(2);
	});

	it("should support tuple types", () => {
		const result = ts`
			const tuple: [string, number, boolean] = ["hello", 42, true];
			tuple
		`;
		expect(result).toEqual(["hello", 42, true]);
	});

	it("should support template literal types", () => {
		const prefix = "'user_'";
		const id = "123";
		const result = ts<string>`
			type UserId = \`user_\${string}\`;
			const userId: UserId = ${prefix} + ${id};
			userId
		`;
		expect(result).toBe("user_123");
	});

	it("should support async/await", async () => {
		const result = ts`
			(async () => {
				const promise = new Promise<number>((resolve) => {
					resolve(100);
				});
				return await promise;
			})()
		`;
		await expect(result).resolves.toBe(100);
	});
});
