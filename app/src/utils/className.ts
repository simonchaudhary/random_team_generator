import clsx from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines Tailwind classes intelligently using clsx and tailwind-merge.
 * @param inputs - Class names and conditions.
 * @returns A merged class string.
 */
export function classNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
