import { afterEach, describe, expect, it, vi } from "vitest";
import { SimpleWorkerServiceImpl, simpleWorkerService } from "./simpleWorker.service";
import { WorkerCmdSignatures } from "@services/worker/workerRunner.service.interface";

describe('SimpleWorkerServiceImpl', () => { 
  const setup: () => {
    testSimpleWorkerService: SimpleWorkerServiceImpl<WorkerCmdSignatures>,
  } = () => {
    return {
      testSimpleWorkerService: simpleWorkerService,
    };
  };

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should ask the worker to execute runAddMultiple and return promise which resolves to correct result', async () => {
    const { testSimpleWorkerService } = setup();
    const args: [number, number, number] = [1, 5, 2];
    const sum = args.reduce((acc, curr) => acc + curr, 0);
  
    const res = await testSimpleWorkerService.exec({
      methodName: 'runAddMultiple',
      args
    });

    expect(res).toEqual(sum);
  });

  it('should ask the worker to execute runAddMultiple and return promise which resolves to correct result', async () => {
    const { testSimpleWorkerService } = setup();
    const sum = 1 + 2 + 3;
    vi.useFakeTimers();
  
    const promise = testSimpleWorkerService.exec({
      methodName: 'runSumAsync',
      args: [{ count: 3 }]
    });

    vi.advanceTimersToNextTimer();

    const res = await promise;
    expect(res).toEqual(sum);
  });
});