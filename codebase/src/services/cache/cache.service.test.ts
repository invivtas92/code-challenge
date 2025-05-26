import { expect, test, vi } from 'vitest';
import { CacheService } from './cache.service.abstract';
import { CacheServiceImpl } from './cache.service';

interface TestFixtures {
  setup: () => { 
    cacheService: CacheService,
    testValue: string,
    testKey: string,
    staleTime: number,
  }
}

const CacheServiceTest = test.extend<TestFixtures>({
  setup: async ({}, vitestUse) => {
    await vitestUse(() => {
      const staleTime = 60000; // 1 minute
      const cacheService = new CacheServiceImpl(staleTime);
      const testKey = 'testKey';
      const testValue = 'testValue';

      return {
        testKey,
        testValue,
        cacheService,
        staleTime,
      };
    });

    // teardown
    vi.useRealTimers();
  }
});

CacheServiceTest('Returns null when no data with key is set', ({ setup }) => {
  const { cacheService, testKey } = setup();
  
  expect(cacheService.get(testKey)).toEqual(null);
});

CacheServiceTest('Returns data when data with same key is stored and is not yet stale', ({ setup }) => {
  const { cacheService, testKey, testValue } = setup();

  cacheService.set(testKey, testValue);
  
  expect(cacheService.get(testKey)).toEqual(testValue);
});

CacheServiceTest('Returns null when cached data is stale', ({ setup }) => {
  const { cacheService, testKey, testValue, staleTime } = setup();

  cacheService.set(testKey, testValue);

  vi.setSystemTime(Date.now() + staleTime); // making the cache data stale by moving time forward
  
  expect(cacheService.get(testKey)).toEqual(null);
});
