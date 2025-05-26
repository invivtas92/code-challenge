export abstract class CacheService {
  protected cache: Map<string, { data: unknown, createdAt: number}>;
  protected staleTime: number;

  constructor(staleTime = 300000) {
    this.staleTime = staleTime;
    this.cache = new Map<string, { data: unknown, createdAt: number}>();
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  abstract get<T>(key: string): T | null;
  abstract set(key: string, value: unknown): void;
  abstract delete(key: string): void;
}