# Binary Search

## Introduction

Binary search is a fast search algorithm that works on **sorted arrays**. It repeatedly divides the search space in half until it finds the target or exhausts the possibilities.

> **Key insight:** If the array is sorted, we can eliminate half the remaining elements with each comparison.

---

## Big O

| Case | Time Complexity |
|------|-----------------|
| Best | O(1) — found at middle position |
| Average | O(log N) |
| Worst | O(log N) — target at edge or not found |

**Space Complexity:** O(1) — iterative version uses no extra memory.

---

## How It Works

1. Start with the full array (low = 0, high = length - 1)
2. Find the middle element
3. If middle === target → return (found)
4. If middle < target → search right half (low = mid + 1)
5. If middle > target → search left half (high = mid - 1)
6. Repeat until low > high
7. If low > high → return (not found)

```
[1, 3, 5, 7, 9, 11, 13]  target: 9

low=0, high=6, mid=3
[1, 3, 5, 7, 9, 11, 13]
          ↑
          7 < 9 → search right

low=4, high=6, mid=5
[1, 3, 5, 7, 9, 11, 13]
                ↑
               11 > 9 → search left

low=4, high=4, mid=4
[1, 3, 5, 7, 9, 11, 13]
             ↑
             9 === 9 → found!
```

---

## Implementation

### Calculating the Middle

```typescript
const mid = Math.floor((low + high) / 2);
```

This finds the index halfway between `low` and `high`:

| low | high | (low + high) / 2 | mid |
|-----|------|------------------|-----|
| 0 | 6 | 3.0 | 3 |
| 4 | 6 | 5.0 | 5 |
| 4 | 4 | 4.0 | 4 |
| 0 | 1 | 0.5 | 0 |

We use `Math.floor` to round down since array indices must be integers.

> **Note:** In some languages, `(low + high)` can overflow for large arrays. A safer alternative is `low + Math.floor((high - low) / 2)`. In JavaScript this isn't an issue since numbers are floats.

### Full Implementation

```typescript
function binarySearch(array: number[], target: number): boolean {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (array[mid] === target) {
      return true;
    } else if (array[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return false;
}
```

### Returning the Index

Often you want the position, not just a boolean:

```typescript
function binarySearchIndex(array: number[], target: number): number {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (array[mid] === target) {
      return mid;
    } else if (array[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1; // not found
}
```

---

## When to Use

**Use binary search when:**
- Array is sorted
- Array is large
- You need to search multiple times
- O(log N) performance matters

**Don't use when:**
- Array is unsorted (use linear search or sort first)
- Array is small (linear search may be faster due to simplicity)
- Data changes frequently (maintaining sorted order is costly)

---

## Linear Search vs Binary Search

| Aspect | Linear Search | Binary Search |
|--------|---------------|---------------|
| Time | O(N) | O(log N) |
| Requires sorted? | No | Yes |
| 1,000 elements | ~1,000 comparisons | ~10 comparisons |
| 1,000,000 elements | ~1,000,000 comparisons | ~20 comparisons |

---

## Summary

| Aspect | Value |
|--------|-------|
| Time | O(log N) |
| Space | O(1) |
| Requires sorted? | Yes |
| Simple? | Moderate |
