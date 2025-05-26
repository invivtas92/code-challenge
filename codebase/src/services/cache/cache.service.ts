import { CacheService } from "./cache.service.abstract";

class CacheServiceImpl extends CacheService {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  get<T>(key: string): T | null {
    const data = this.cache.get(key);
    if (data === undefined) {
      console.log('cache miss', key);
      return null;
    }

    if ((Date.now() - this.staleTime) >= data.createdAt) {
      console.log('cache hit but stale', Date.now() - this.staleTime, data.createdAt, key);

      this.delete(key);
      return null;
    }

    console.log('cache hit', key);

    return data.data as T;
  }
  set(key: string, value: unknown): void {
    this.cache.set(key, { createdAt: Date.now(), data: value });
  }
  delete(key: string): void {
    this.cache.delete(key);
  }
};

const cacheService = new CacheServiceImpl(5000);  //5 sec stale time
export { cacheService, CacheServiceImpl };