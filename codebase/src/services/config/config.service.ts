import { ConfigService } from "./config.service.abstract";
import { ZodValidator, zodValidator } from "@/services/validator/zodValidator.service";
import { envSchema, EnvSchema, EnvVariables } from "./envSchema";

class ConfigServiceImpl implements ConfigService {
  #envSchema: unknown;
  #validator: ZodValidator;

  constructor(envSchema: EnvSchema, validator: ZodValidator) {
    this.#envSchema = envSchema;
    this.#validator = validator;
  }

  getEnv(): EnvVariables {
    return this.#validator.parse(this.#envSchema, import.meta.env as EnvVariables);
  }
};

/**
 * TODO: Introduce DI Container later to manage and inject dependencies, for now create and export an
 * instance of ConfigServiceImpl to be imported and used throughout the codebase
 */

const configService = new ConfigServiceImpl(envSchema, zodValidator);
export { ConfigServiceImpl, configService };

