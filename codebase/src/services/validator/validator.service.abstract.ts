interface SafeParseSuccess<T> {
  success: true
  data: T
};

type FieldErrors<T> = Partial<Record<keyof T, string[]>>;

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