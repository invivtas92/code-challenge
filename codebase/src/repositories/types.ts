type QueryKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T as T[K] extends (...args: any[]) => unknown ? K : never]: unknown[]
}

export type { QueryKeys };