import { clsx, type ClassValue } from "clsx"
import moment from "moment"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function updatedTime(updatedTime: string) {
  return moment(updatedTime).fromNow()
}

export function debounce(func: Function, delay: number) {
  let timeOutId: NodeJS.Timeout | null = null

  return function (...arg: any[]) {
    if(timeOutId) clearTimeout(timeOutId)

    timeOutId = setTimeout(() => {
      func(...arg)
    }, delay)
  }
}