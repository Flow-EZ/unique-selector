/**
 * Recursively combinate items.
 * @param result - Array to store the results
 * @param items - Array of items to combine
 * @param data - Temporary array for building combinations
 * @param start - Starting index
 * @param end - Ending index
 * @param index - Current index
 * @param k - Number of items to combine
 */
const kCombinations = (
  result: string[],
  items: string[],
  data: string[],
  start: number,
  end: number,
  index: number,
  k: number
): void => {
  if (index === k) {
    result.push(data.slice(0, index).join(''));
    return;
  }

  for (let i = start; i <= end && end - i + 1 >= k - index; ++i) {
    data[index] = items[i];
    kCombinations(result, items, data, i + 1, end, index + 1, k);
  }
};

/**
 * Returns all the possible selector combinations
 * @param items - Array of selector items
 * @param k - Maximum number of items to combine
 * @returns Array of combined selectors
 */
const getCombinations = (items: string[], k: number): string[] => {
  const result: string[] = [];
  const n = items.length;
  const data: string[] = [];

  for (let l = 1; l <= k; ++l) {
    kCombinations(result, items, data, 0, n - 1, 0, l);
  }

  return result;
};

export { getCombinations };
