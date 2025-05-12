import { ZodType } from 'zod';
import { SafeParseError, SafeParseSuccess, Validator } from '@services/validator/validator.service.abstract';

class ZodValidator implements Validator {
  parse<T>(schema: unknown, data: T): T {
    return (schema as ZodType<T>).parse(data);
  }

  safeParse<T>(schema: unknown, data: T): SafeParseSuccess<T> | SafeParseError<T> {
    const result = (schema as ZodType<T>).safeParse(data);
    if (result.success) {
      const { success, data: parsedData } = result;
      return {
        success,
        data: parsedData,
      }
    } else {
      const { success, error } = result; 

      return {
        success,
        error: error.message,
        fieldErrors: error.flatten().fieldErrors
      }
    }
  }
};

/**
 * TODO: Introduce DI Container later to manage and inject dependencies, for now export an instance of ZodValidator
 * to be used throughout the codebase
 */ 

const zodValidator = new ZodValidator();
export { ZodValidator, zodValidator };