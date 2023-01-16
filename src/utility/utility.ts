import { SHA256, enc } from 'crypto-js';

export function toThousand(num: number) {
  const numStr: string = num.toString().split('.')[0];
  const arr: string[] = [];

  let { length } = numStr;
  while (true) {
    arr.unshift(numStr.substring(Math.max(length - 3, 0), length));
    length -= 3;
    if (Math.max(length, 0) === 0) {
      break;
    }
  }

  return arr.join(',');
}

export function numberExpress(num: number): number {
  return Number((num / 100000000).toFixed(2));
}

export function numberFixed(num: number, point: number): number {
  return Number(num.toFixed(point));
}

export function shareExpress(num: number): number {
  return Number((num / 1000).toFixed(0));
}

export function encryptoPassword(value: string): string {
  const hash = SHA256(value).toString(enc.Hex);
  return hash;
}
