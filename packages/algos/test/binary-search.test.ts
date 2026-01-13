import { describe, expect, test } from "bun:test";
import { binarySearch } from "../src/binary-search";

describe("binary-search", () => {
  describe("binarySearch", () => {
    test("returns true when target is found", () => {
      expect(binarySearch([1, 2, 3, 4, 5], 3)).toBe(true);
    });

    test("returns false when target is not found", () => {
      expect(binarySearch([1, 2, 3, 4, 5], 6)).toBe(false);
    });

    test("returns false for empty array", () => {
      expect(binarySearch([], 1)).toBe(false);
    });

    test("finds target at first position", () => {
      expect(binarySearch([1, 2, 3], 1)).toBe(true);
    });

    test("finds target at last position", () => {
      expect(binarySearch([1, 2, 3], 3)).toBe(true);
    });

    test("finds target at middle position", () => {
      expect(binarySearch([1, 2, 3, 4, 5], 3)).toBe(true);
    });

    test("returns false when target is less than all elements", () => {
      expect(binarySearch([2, 3, 4], 1)).toBe(false);
    });

    test("returns false when target is greater than all elements", () => {
      expect(binarySearch([1, 2, 3], 5)).toBe(false);
    });

    test("works with single element array - found", () => {
      expect(binarySearch([5], 5)).toBe(true);
    });

    test("works with single element array - not found", () => {
      expect(binarySearch([5], 3)).toBe(false);
    });
  });
});
