// Type guard predicate to filter out null and undefined
export function notNull<T>(value: T): value is NonNullable<T> {
  return value != null;
}