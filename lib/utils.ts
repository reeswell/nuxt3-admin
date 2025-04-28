export function filterEmptyProperties<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value != null && value !== '') {
      acc[key as keyof T] = value
    }
    return acc
  }, {} as Partial<T>)
}
