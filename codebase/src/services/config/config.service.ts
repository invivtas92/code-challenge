import { ConfigService } from "./config.service.abstract";
import { zodValidator } from "@infra/zodValidator/zodValidator.service";
import { envSchema, EnvSchema, EnvVariables } from "./envSchema";
import { Validator } from "../validator/validator.service.abstract";

class ConfigServiceImpl implements ConfigService {
  #envSchema: unknown;
  #validator: Validator;

  constructor(envSchema: EnvSchema, validator: Validator) {
    this.#envSchema = envSchema;
    this.#validator = validator;
  }

  getEnv(): EnvVariables {
    return this.#validator.parse(this.#envSchema, import.meta.env as EnvVariables);
  }
};

/**
 * TODO: Introduce DI Container later to manage and inject dependencies, for now import 
 * zodValidator instance and use it to create and export an instance of
 * ConfigServiceImpl to be imported and used throughout the codebase
 */

const configService = new ConfigServiceImpl(envSchema, zodValidator);
export { ConfigServiceImpl, configService };

