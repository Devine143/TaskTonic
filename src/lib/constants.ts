export const PRIORITY_COLORS = {
  low: 'bg-blue-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500',
} as const;

export const PRIORITY_LABELS = {
  low: 'Low Priority',
  medium: 'Medium Priority',
  high: 'High Priority',
} as const;

export const DEFAULT_CATEGORIES = [
  { id: 'personal', name: 'Personal', color: '#4F46E5' },
  { id: 'work', name: 'Work', color: '#059669' },
  { id: 'shopping', name: 'Shopping', color: '#D97706' },
  { id: 'health', name: 'Health', color: '#DC2626' },
] as const;