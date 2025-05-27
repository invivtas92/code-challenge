import { afterEach, describe, expect, it, vi } from 'vitest';
import { CacheService } from './cache.service.abstract';
import { CacheServiceImpl } from './cache.service';

describe('CacheService', () => {
  const setup: () => { 
    cacheService: CacheService,
    testValue: string,
    testKey: string,
    staleTime: number,
  } = () => {
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
  };

  afterEach(() => {
    vi.useRealTimers(); // resets Date.* and new Date()
  });
  
  it('should return null when no data with key is set', () => {
    const { cacheService, testKey } = setup();
    expect(cacheService.get(testKey)).toEqual(null);
  });

  it('should return null when cached data is stale', () => {
    const { cacheService, testKey, testValue, staleTime } = setup();
  
    cacheService.set(testKey, testValue);
  
    vi.setSystemTime(Date.now() + staleTime); // making the cache data stale by moving date now forward
    
    expect(cacheService.get(testKey)).toEqual(null);
  });
  
  it('should return data when data with same key is stored and is not yet stale', () => {
    const { cacheService, testKey, testValue } = setup();
  
    cacheService.set(testKey, testValue);
    
    expect(cacheService.get(testKey)).toEqual(testValue);
  });
})

