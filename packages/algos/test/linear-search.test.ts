import { describe, expect, test } from "bun:test"
import { linearSearch } from "../src/linear-search"

describe("linear-search", () => {
  describe("linearSearch", () => {
    test("returns true when target is found", () => {
      expect(linearSearch([1, 2, 3, 4, 5], 3)).toBe(true)
    })

    test("returns false when target is not found", () => {
      expect(linearSearch([1, 2, 3, 4, 5], 6)).toBe(false)
    })

    test("returns false for empty array", () => {
      expect(linearSearch([], 1)).toBe(false)
    })

    test("finds target at first position", () => {
      expect(linearSearch([1, 2, 3], 1)).toBe(true)
    })

    test("finds target at last position", () => {
      expect(linearSearch([1, 2, 3], 3)).toBe(true)
    })
  })
})
