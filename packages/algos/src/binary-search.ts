function binarySearch(array: number[], target: number): boolean {
  let lo: number = 0
  let high: number = array.length - 1

  while (lo <= high) {
    const mid = Math.floor(lo + (high - lo) / 2)
    const midValue = array[mid]

    if (midValue === undefined) {
      return false
    }

    if (midValue === target) {
      return true
    } else if (midValue < target) {
      lo = mid + 1
    } else {
      high = mid - 1
    }
  }
  return false
}

export { binarySearch }
