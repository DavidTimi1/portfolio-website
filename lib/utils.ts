import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Reading time calculator based on word count
export function getReadingTime(content: string): string {
  const cleanContent = content.replace(/[#*`_\[\]()\-]/g, ''); // strip markdown syntax
  const words = cleanContent.trim().split(/\s+/).filter(Boolean).length;
  const time = Math.ceil(words / 200); // 200 WPM
  return `${time} min read`;
}