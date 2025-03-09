import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// This utility function helps combine Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

