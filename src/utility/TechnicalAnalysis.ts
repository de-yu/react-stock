import { sum, last } from 'lodash-es';

interface BooleanPassageType
{
  upper: number;
  lower: number;
}

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

// export function calculateStandardDeviation(dayCount: number, data: number[]): BooleanPassageType {
//   const average = Array(dayCount).fill('-');
//   const upper = Array(dayCount).fill('-');
//   const lower = Array(dayCount).fill('-');
//   const first: number[] = data.slice(0, dayCount);

//   for (let i = dayCount; i < data.length; i += 1) {
//     first.shift();
//     first.push(data[i]);
//     average.push(sum(first) / dayCount);

//     let deviationTemp = 0;
//     _.forEach(first, (point: number) => {
//       deviationTemp += (last(average) - point) * (last(average) - point);
//     });
//     deviationTemp = Math.sqrt(deviationTemp / dayCount);
//     upper.push((last(average) + 2 * deviationTemp).toFixed(2));
//     lower.push((last(average) - 2 * deviationTemp).toFixed(2));
//   }

//   return {
//     upper,
//     lower,
//   };
// }
