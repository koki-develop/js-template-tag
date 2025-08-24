import { describe, expect, it } from "vitest";
import { js } from "./js.js";

describe("js", () => {
	it("should execute basic numeric calculations", () => {
		const result = js`1 + 1`;
		expect(result).toBe(2);
	});

	it("should concatenate strings", () => {
		const result = js`"Hello, " + "World!"`;
		expect(result).toBe("Hello, World!");
	});

	it("should evaluate object literals", () => {
		const result = js`({ name: "Alice", age: 30 })`;
		expect(result).toEqual({ name: "Alice", age: 30 });
	});

	it("should evaluate array literals", () => {
		const result = js`[1, 2, 3, 4, 5]`;
		expect(result).toEqual([1, 2, 3, 4, 5]);
	});

	it("should define and execute functions", () => {
		const result = js`
			(function() {
				return 42;
			})()
		`;
		expect(result).toBe(42);
	});

	it("should interpolate template variables", () => {
		const x = "10";
		const y = "20";
		const result = js`${x} + ${y}`;
		expect(result).toBe(30);
	});

	it("should interpolate multiple variables", () => {
		const a = "5";
		const b = "3";
		const c = "2";
		const result = js`${a} * ${b} + ${c}`;
		expect(result).toBe(17);
	});

	it("should support type inference with type arguments", () => {
		const result = js<number>`100 / 4`;
		expect(result).toBe(25);
		expect(typeof result).toBe("number");
	});

	it("should handle complex object manipulation", () => {
		const key = "dynamicKey";
		const value = "42";
		const result = js<{ dynamicKey: number }>`
			({
				${key}: ${value}
			})
		`;
		expect(result).toEqual({ dynamicKey: 42 });
	});

	it("should support array method chaining", () => {
		const numbers = "[1, 2, 3, 4, 5]";
		const result = js<number>`
			${numbers}
				.filter(n => n > 2)
				.map(n => n * 2)
				.reduce((sum, n) => sum + n, 0)
		`;
		expect(result).toBe(24);
	});
});
