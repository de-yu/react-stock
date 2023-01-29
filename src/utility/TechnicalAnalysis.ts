import { sum } from 'lodash-es';

export function calculateMA(dayCount: number, data: number[]) {
  const result = Array(dayCount).fill('-')

  const first = data.slice(0, dayCount);

  for (let i = dayCount; i < data.length; i += 1) {
    first.shift();
    first.push(data[i]);
    result.push((sum(first) / dayCount).toFixed(2));
  }

  return result;
}