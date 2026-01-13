# Big O Time Complexity

## Introduction

Big O notation is a way to categorize your algorithm's time or memory requirements based on input size. It is not meant to be an exact measurement—it won't tell you how many CPU cycles an operation takes. Instead, it generalizes the **growth rate** of your algorithm.

> **In plain terms:** As your input grows, how fast does your computation or memory grow?

---

## Why Do We Use It?

Big O helps us make informed decisions about which data structures and algorithms to use. Knowing how they perform at scale can greatly help create optimal, efficient programs.

When someone says "O(N)", they mean the algorithm grows **linearly** based on the input size.

---

## Key Concepts

### 1. Growth is Relative to Input

The "N" in Big O represents the size of your input. As N increases, we measure how the algorithm's performance scales.

### 2. Constants Are Dropped

We always simplify by removing constants:
- `O(2N)` → `O(N)`
- `O(100N)` → `O(N)`
- `O(N/2)` → `O(N)`

This makes sense because Big O describes the **upper bound** (the growth rate). At large scales, constants become irrelevant compared to the dominant term.

### 3. Worst Case Analysis

In interviews (and often in practice), we consider the **worst case** scenario. Even if an algorithm can terminate early in some cases, we analyze what happens when it doesn't.

---

## Common Complexity Classes

| Notation | Name | Description | Example |
|----------|------|-------------|---------|
| `O(1)` | Constant | Performance doesn't change with input size | Array index access, hash table lookup |
| `O(log N)` | Logarithmic | Halves the problem space each step | Binary search |
| `O(N)` | Linear | Scales directly with input size | Simple loop through array |
| `O(N log N)` | Linearithmic | Efficient sorting territory | Quicksort, Mergesort |
| `O(N²)` | Quadratic | Nested iterations over input | Bubble sort, nested loops |
| `O(2^N)` | Exponential | Doubles with each input addition | Recursive Fibonacci, power set |
| `O(N!)` | Factorial | Grows astronomically fast | Generating all permutations |

> For a visual reference, see the [Big O Complexity Chart](https://www.bigocheatsheet.com/).

---

## Examples

### O(N) — Linear Time

The simplest trick for estimating complexity: **look for loops**.

```typescript
function sumCharCodes(n: string): number {
  let sum = 0;
  for (let i = 0; i < n.length; ++i) {
    sum += n.charCodeAt(i);
  }
  return sum;
}
```

One loop through the input → `O(N)`

Even with **two sequential loops**, the complexity is still `O(N)` (technically `O(2N)`, but we drop the constant):

```typescript
function sumCharCodesTwice(n: string): number {
  let sum = 0;
  for (let i = 0; i < n.length; ++i) {
    sum += n.charCodeAt(i);
  }
  for (let i = 0; i < n.length; ++i) {
    sum += n.charCodeAt(i);
  }
  return sum;
}
```

### O(N²) — Quadratic Time

Nested loops over the same input:

```typescript
function sumAllPairs(n: string): number {
  let sum = 0;
  for (let i = 0; i < n.length; ++i) {
    for (let j = 0; j < n.length; ++j) {
      sum += n.charCodeAt(i) + n.charCodeAt(j);
    }
  }
  return sum;
}
```

Two nested loops → `O(N²)`

### O(log N) — Logarithmic Time

Classic example: binary search. Each step eliminates half the remaining elements.

```typescript
function binarySearch(arr: number[], target: number): number {
  let low = 0;
  let high = arr.length - 1;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}
```

### O(N log N) — Linearithmic Time

Efficient sorting algorithms like Quicksort and Mergesort operate at this complexity.

---

## Practical vs Theoretical

Just because `O(N)` is theoretically faster than `O(N²)` doesn't mean it's **always** faster in practice for small inputs.

| N | O(10N) | O(N²) |
|---|--------|-------|
| 1 | 10 | 1 |
| 5 | 50 | 25 |
| 100 | 1,000 | 10,000 |
| 10,000 | 100,000 | 100,000,000 |

For small inputs, an `O(N²)` algorithm might outperform an `O(N)` algorithm with a large constant factor. This is why algorithms like insertion sort are sometimes preferred for small datasets despite being `O(N²)`.

---

## A Note on Memory

In the real world, memory growth is not computationally free. In garbage-collected languages like JavaScript and Go, you pay additional penalties:
- Memory can be kept around longer than needed
- The heap grows faster
- Garbage collection can cause complete halts in your program

However, when analyzing algorithms theoretically, we typically focus on time complexity unless space is explicitly considered.

---

## Space Complexity: The Final Frontier

We won't focus heavily on space complexity in this course, but here's the general idea:

Space complexity measures how much **additional memory** your algorithm needs relative to the input size.

```typescript
// O(N) time + O(N) space — creates a new array
function double(arr: number[]): number[] {
  return arr.map(x => x * 2);
}

// O(N) time + O(1) space — modifies in place
function doubleInPlace(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * 2;
  }
}
```

---

## Further Resources

For deeper dives into Big O notation:
- [Big O Cheat Sheet](https://www.bigocheatsheet.com/)
- [Wikipedia: Big O Notation](https://en.wikipedia.org/wiki/Big_O_notation)
- [Khan Academy: Asymptotic Notation](https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/big-o-notation)

This course focuses on **actively analyzing running times** through hands-on examples rather than theoretical deep dives.
