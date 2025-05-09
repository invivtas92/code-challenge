import { EnvVariables } from "./envSchema";

export abstract class ConfigService {
  abstract getEnv(): EnvVariables
}