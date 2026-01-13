# Linear Search

## Introduction

Linear search is the simplest search algorithm. It sequentially checks each element in a collection until it finds a match or exhausts the list.

> **Key insight:** No assumptions about the data. Works on unsorted arrays. Just walk through one by one.

---

## Big O

| Case | Time Complexity |
|------|-----------------|
| Best | O(1) — found at first position |
| Average | O(N/2) → O(N) |
| Worst | O(N) — found at last position or not found |

**Space Complexity:** O(1) — no extra memory needed.

---

## How It Works

1. Start at the first element
2. Compare current element to target
3. If match → return (found)
4. If no match → move to next element
5. Repeat until end of array
6. If exhausted → return (not found)

```
[3, 7, 2, 9, 5]  target: 9

 ↓
[3, 7, 2, 9, 5]  3 === 9? No
    ↓
[3, 7, 2, 9, 5]  7 === 9? No
       ↓
[3, 7, 2, 9, 5]  2 === 9? No
          ↓
[3, 7, 2, 9, 5]  9 === 9? Yes → return true
```

---

## Implementation

```typescript
function linearSearch(array: number[], target: number): boolean {
  for (let index = 0; index < array.length; index++) {
    if (array[index] === target) {
      return true;
    }
  }
  return false;
}
```

### Returning the Index

Often you want the position, not just a boolean:

```typescript
function linearSearchIndex(array: number[], target: number): number {
  for (let index = 0; index < array.length; index++) {
    if (array[index] === target) {
      return index;
    }
  }
  return -1; // not found
}
```

---

## When to Use

**Use linear search when:**
- Array is small
- Array is unsorted
- You only need to search once
- Simplicity matters more than performance

**Don't use when:**
- Array is sorted (use binary search instead)
- Searching frequently on large datasets

---

## Source Code

| File | Description |
|------|-------------|
| [`packages/algos/src/linear-search.ts`](../../packages/algos/src/linear-search.ts) | Implementation |
| [`packages/algos/test/linear-search.test.ts`](../../packages/algos/test/linear-search.test.ts) | Tests |

---

## Summary

| Aspect | Value |
|--------|-------|
| Time | O(N) |
| Space | O(1) |
| Requires sorted? | No |
| Simple? | Yes |
