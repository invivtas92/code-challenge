interface SafeParseSuccess<T> {
  success: true
  data: T
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AllKeys<T> = T extends any ? keyof T : never;
type FieldErrors<T> = Partial<Record<AllKeys<T>, string[]>>;

interface SafeParseError<T> {
  success: false
  error: string
  fieldErrors: FieldErrors<T>
};

abstract class Validator {
  abstract parse<T>(schema: unknown, data: T): T;
  abstract safeParse<T>(schema: unknown, data: T): SafeParseSuccess<T> | SafeParseError<T>; 
};

export { Validator };
export type { SafeParseError, SafeParseSuccess, FieldErrors };