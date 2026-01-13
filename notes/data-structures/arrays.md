# Arrays

## Introduction

An array is a **contiguous block of memory** where elements are stored sequentially. This is one of the most fundamental data structures in computer science—and one of the most misunderstood in JavaScript.

> **Key insight:** In most languages, an array is a fixed-size, contiguous memory allocation. JavaScript's `Array` is actually more like a dynamic list with array-like syntax.

---

## Arrays vs Lists

Understanding the difference is crucial:

| Feature | True Array | List (Dynamic Array) |
|---------|------------|---------------------|
| Memory | Contiguous, fixed | Can grow/shrink |
| Size | Fixed at creation | Dynamic |
| Access | O(1) direct indexing | O(1) direct indexing |
| Insert at end | N/A (fixed size) | O(1) amortized |
| Insert at middle | O(N) shift required | O(N) shift required |
| Delete | O(N) shift required | O(N) shift required |

**JavaScript's `Array`** behaves like a dynamic list—it can grow, shrink, and hold mixed types. Under the hood, V8 (and other engines) optimize it when possible, but it's not a true contiguous array.

**For true arrays in JavaScript**, we use `ArrayBuffer` and typed arrays.

---

## Bits, Bytes, and Memory

Before diving into ArrayBuffer, let's cover the fundamentals:

### Bit vs Byte

| Unit | Size | Description |
|------|------|-------------|
| **Bit** | 1 bit | Single binary digit (0 or 1) |
| **Byte** | 8 bits | Standard unit of memory |

### Common Data Type Sizes

| Type | Size | Range |
|------|------|-------|
| `Int8` | 1 byte (8 bits) | -128 to 127 |
| `Uint8` | 1 byte (8 bits) | 0 to 255 |
| `Int16` | 2 bytes (16 bits) | -32,768 to 32,767 |
| `Uint16` | 2 bytes (16 bits) | 0 to 65,535 |
| `Int32` | 4 bytes (32 bits) | -2.1B to 2.1B |
| `Uint32` | 4 bytes (32 bits) | 0 to 4.2B |
| `Float32` | 4 bytes (32 bits) | ~7 decimal digits precision |
| `Float64` | 8 bytes (64 bits) | ~15 decimal digits precision |

---

## ArrayBuffer: True Contiguous Memory

An `ArrayBuffer` is a **fixed-length, contiguous piece of raw memory** in JavaScript. You cannot read or write to it directly—you need a **view**.

```typescript
// Create a buffer of 16 bytes
const buffer = new ArrayBuffer(16);

console.log(buffer.byteLength); // 16
```

Think of `ArrayBuffer` as a chunk of memory. It's just bytes—no interpretation of what those bytes mean.

---

## Typed Arrays: Views into Memory

Typed arrays provide a **view** into an `ArrayBuffer`, interpreting the raw bytes as specific data types.

### Creating Views

```typescript
// Create a 16-byte buffer
const buffer = new ArrayBuffer(16);

// Different views into the SAME memory
const uint8View = new Uint8Array(buffer);   // 16 elements (1 byte each)
const uint16View = new Uint16Array(buffer); // 8 elements (2 bytes each)
const uint32View = new Uint32Array(buffer); // 4 elements (4 bytes each)
const float64View = new Float64Array(buffer); // 2 elements (8 bytes each)

console.log(uint8View.length);   // 16
console.log(uint16View.length);  // 8
console.log(uint32View.length);  // 4
console.log(float64View.length); // 2
```

### How Views Share Memory

This is where it gets interesting—**all views point to the same underlying memory**:

```typescript
const buffer = new ArrayBuffer(4);
const uint8View = new Uint8Array(buffer);
const uint32View = new Uint32Array(buffer);

// Set value using 32-bit view
uint32View[0] = 0x12345678;

// Read the same memory as individual bytes
console.log(uint8View[0].toString(16)); // 78 (lowest byte)
console.log(uint8View[1].toString(16)); // 56
console.log(uint8View[2].toString(16)); // 34
console.log(uint8View[3].toString(16)); // 12 (highest byte)
```

> **Note:** This demonstrates little-endian byte order, which is how most systems store multi-byte values (least significant byte first).

---

## Offset and Length: Partial Views

You can create views that only see a **portion** of the buffer:

```typescript
const buffer = new ArrayBuffer(16);

// View starting at byte 4, covering 8 bytes
const partialView = new Uint8Array(buffer, 4, 8);

console.log(partialView.byteOffset); // 4
console.log(partialView.length);     // 8
```

### Calculating Offsets

When working with typed arrays, the offset must be aligned to the element size:

```typescript
const buffer = new ArrayBuffer(16);

// For Uint16 (2 bytes), offset must be multiple of 2
const uint16View = new Uint16Array(buffer, 2, 4); // OK: offset=2

// For Uint32 (4 bytes), offset must be multiple of 4
const uint32View = new Uint32Array(buffer, 4, 2); // OK: offset=4

// For Float64 (8 bytes), offset must be multiple of 8
const float64View = new Float64Array(buffer, 8, 1); // OK: offset=8
```

### Address Calculation

To access element `i` in a typed array:

```
address = baseAddress + (index × bytesPerElement)
```

```typescript
const buffer = new ArrayBuffer(16);
const int32View = new Int32Array(buffer);

// Element 0: byte 0  (0 + 0 × 4)
// Element 1: byte 4  (0 + 1 × 4)
// Element 2: byte 8  (0 + 2 × 4)
// Element 3: byte 12 (0 + 3 × 4)

int32View[2] = 42; // Writes to bytes 8-11
```

---

## Big O: Why Array Access is O(1)

This is the key insight that makes arrays powerful:

> **We know the width (bytes per element) and we know the offset. Therefore, accessing any element is O(1).**

### The Math

```
memoryAddress = baseAddress + (index × bytesPerElement)
```

That's it. One multiplication, one addition. No matter if you're accessing element 0 or element 1,000,000—it's the same calculation.

### Example: Int32Array Access

```typescript
const buffer = new ArrayBuffer(20); // 20 bytes
const arr = new Int32Array(buffer); // 5 elements × 4 bytes each

// To access arr[3]:
// address = base + (3 × 4) = base + 12
// Jump directly to byte 12, read 4 bytes. Done.
```

| Index | Calculation | Byte Offset |
|-------|-------------|-------------|
| `arr[0]` | 0 + (0 × 4) | 0 |
| `arr[1]` | 0 + (1 × 4) | 4 |
| `arr[2]` | 0 + (2 × 4) | 8 |
| `arr[3]` | 0 + (3 × 4) | 12 |
| `arr[4]` | 0 + (4 × 4) | 16 |

### Why This Matters

Compare to a linked list where you must traverse from the head:
- Array access `arr[1000]`: O(1) — one calculation
- Linked list access `list[1000]`: O(N) — traverse 1000 nodes

This is why arrays excel at random access but struggle with insertions (you'd have to shift everything).

---

## Array Operations and Big O

Here are the fundamental operations you can perform on arrays:

| Operation | Big O | Description |
|-----------|-------|-------------|
| **Access** | O(1) | Get element at index |
| **Write** | O(1) | Set element at index |
| **Insert at end** | O(1)* | Add to end (amortized for dynamic arrays) |
| **Insert at start** | O(N) | Must shift all elements right |
| **Insert at middle** | O(N) | Must shift elements after insertion point |
| **Delete at end** | O(1) | Remove from end |
| **Delete at start** | O(N) | Must shift all elements left |
| **Delete at middle** | O(N) | Must shift elements after deletion point |
| **Search (unsorted)** | O(N) | Must check each element |
| **Search (sorted)** | O(log N) | Binary search |

*\*Amortized O(1) means occasional O(N) resizes, but averages to O(1) over many operations.*

### Access — O(1)

Direct memory address calculation:

```typescript
const arr = new Int32Array([10, 20, 30, 40, 50]);

// O(1) - direct calculation: baseAddress + (index × 4)
const value = arr[2]; // 30
```

### Write — O(1)

Same as access, just writing instead of reading:

```typescript
const arr = new Int32Array(5);

// O(1) - direct memory write
arr[2] = 42;
```

### Insert at End — O(1)

For JavaScript arrays (lists), pushing is amortized O(1):

```typescript
const arr: number[] = [1, 2, 3];

// O(1) amortized - may occasionally resize
arr.push(4);
```

### Insert at Start/Middle — O(N)

Requires shifting elements:

```typescript
const arr: number[] = [1, 2, 3, 4, 5];

// O(N) - must shift all elements right
arr.unshift(0); // [0, 1, 2, 3, 4, 5]

// O(N) - must shift elements after index 2
arr.splice(2, 0, 99); // [0, 1, 99, 2, 3, 4, 5]
```

### Delete — O(N)

Requires shifting elements to fill the gap:

```typescript
const arr: number[] = [1, 2, 3, 4, 5];

// O(N) - must shift all elements left
arr.shift(); // [2, 3, 4, 5]

// O(1) - no shifting needed
arr.pop(); // [2, 3, 4]

// O(N) - must shift elements after deletion
arr.splice(1, 1); // [2, 4]
```

---

## JavaScript Array vs True Array

| JavaScript `Array` | `TypedArray` (true array) |
|--------------------|---------------------------|
| Dynamic size | Fixed size |
| Mixed types allowed | Single type only |
| Sparse (can have holes) | Dense (contiguous) |
| Methods: push, pop, splice, etc. | Limited methods |
| Slower for numeric work | Optimized for numeric work |

### When to Use Each

**Use JavaScript `Array` when:**
- You need dynamic sizing
- You're storing mixed types
- You need array methods (map, filter, reduce)

**Use `TypedArray` when:**
- Working with binary data
- Performance-critical numeric computations
- Interfacing with WebGL, WebAudio, or binary protocols
- You need guaranteed memory layout

---

## DataView: Flexible Binary Access

For more control over byte order and mixed types, use `DataView`:

```typescript
const buffer = new ArrayBuffer(12);
const view = new DataView(buffer);

// Write different types at specific byte offsets
view.setUint8(0, 255);           // 1 byte at offset 0
view.setUint16(1, 65535, true);  // 2 bytes at offset 1 (little-endian)
view.setFloat32(4, 3.14, true);  // 4 bytes at offset 4 (little-endian)
view.setUint32(8, 12345, false); // 4 bytes at offset 8 (big-endian)

// Read them back
console.log(view.getUint8(0));         // 255
console.log(view.getUint16(1, true));  // 65535
console.log(view.getFloat32(4, true)); // 3.14...
console.log(view.getUint32(8, false)); // 12345
```

---

## Practical Example: Working with Binary Data

Here's a complete example of creating and manipulating a typed array:

```typescript
// Create a buffer for 5 32-bit integers
const buffer = new ArrayBuffer(5 * 4); // 20 bytes
const arr = new Int32Array(buffer);

// Fill with values
for (let i = 0; i < arr.length; i++) {
  arr[i] = (i + 1) * 10;
}

console.log(arr); // Int32Array(5) [10, 20, 30, 40, 50]

// Access is O(1)
console.log(arr[2]); // 30

// Get the underlying buffer info
console.log(arr.buffer.byteLength); // 20
console.log(arr.byteOffset);        // 0
console.log(arr.BYTES_PER_ELEMENT); // 4
```

---

## Summary

| Concept | Key Takeaway |
|---------|--------------|
| **Array** | Contiguous memory, fixed size, O(1) access |
| **List** | Dynamic size, O(1) amortized append |
| **ArrayBuffer** | Raw memory allocation in JavaScript |
| **TypedArray** | View into ArrayBuffer with specific type |
| **Offset** | Byte position where view starts |
| **Big O** | Access O(1), Insert/Delete O(N) except at end |

Understanding these fundamentals will help you make better decisions about data structures and write more performant code.

---

## Further Resources

- [MDN: ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
- [MDN: TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
- [MDN: DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
