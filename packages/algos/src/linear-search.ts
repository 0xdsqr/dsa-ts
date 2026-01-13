function linearSearch(array: number[], target: number): boolean {
  for (let index = 0; index < array.length; index++) {
    if (array[index] === target) {
      return true
    }
  }
  return false
}

export { linearSearch }
