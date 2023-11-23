import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeDifference(dateString: string): string {
  const dateObject = new Date(dateString);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - dateObject.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    if (hoursDifference === 0) {
      const minutesDifference = Math.floor(timeDifference / (1000 * 60));
      return `${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''} ago`;
    } else {
      return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
    }
  } else if (daysDifference === 1) {
    return '1 day ago';
  } else {
    return `${daysDifference} days ago`;
  }
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};