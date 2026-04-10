import { FirestoreTimestamp } from "@/types/shopping-list";

export function formatRelativeTime(timestamp: FirestoreTimestamp): string {
  if (!timestamp) return "N/A";

  const date = new Date(timestamp._seconds * 1000);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "agora";
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `há ${diffInMinutes}m`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `há ${diffInHours}h`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "ontem";
  if (diffInDays < 7) return `há ${diffInDays} dias`;
  
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}
