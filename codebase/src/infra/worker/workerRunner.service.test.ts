import { afterEach, describe, expect, it, Mock, vi } from "vitest";
import { WorkerRunnerImpl } from "./workerRunner.service";
import { MessageResData, MessageReqData, WorkerCmdSignatures } from "@services/worker/workerRunner.service.interface";

describe("WorkerRunnerService", () => {
  const setup: () => {
    workerRunnerService: WorkerRunnerImpl,
    postMessageFn: Mock,
  } = () => {
    const postMessageFn = vi.fn();
    const workerRunnerService = new WorkerRunnerImpl({
      postMessage: postMessageFn
    } as unknown as DedicatedWorkerGlobalScope);

    return {
      workerRunnerService,
      postMessageFn,
    }
  }

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should execute runSumAsync fn and return correct result', async () => {
    const { workerRunnerService } = setup();

    vi.useFakeTimers();

    const sum = 1 + 2 + 3 + 4 + 5;
    const promise = workerRunnerService.runSumAsync({ count: 5 });
    vi.advanceTimersToNextTimer();
    const res = await promise;

    expect(res).toEqual(sum);
  });

  it('should execute runAddMultiple fn and return correct result', () => {
    const { workerRunnerService } = setup();

    const sum = 1 + 2 + 3;
    const res = workerRunnerService.runAddMultiple(1, 2, 3);

    expect(res).toEqual(sum);
  });

  it('should correctly handle message and send correct response message', async () => {
    const { workerRunnerService, postMessageFn } = setup();
    vi.useFakeTimers();

    const taskId = 1;
    const args = { count: 3 };
    let promise: Promise<unknown> = workerRunnerService.runSumAsync(args);
    vi.advanceTimersToNextTimer();
    const res = await promise;

    const MessageReqData: MessageReqData<WorkerCmdSignatures> = {
      id: taskId,
      method: 'runSumAsync',
      args: [args]
    };

    const messageResData: MessageResData = {
      id: taskId,
      result: res
    };
    
    promise = workerRunnerService.messageHandler({
      data: MessageReqData
    } as MessageEvent<MessageReqData<WorkerCmdSignatures>>);
    vi.advanceTimersToNextTimer();
    await promise;

    expect(postMessageFn).toHaveBeenCalledOnce();
    expect(postMessageFn).toHaveBeenCalledWith(messageResData);
  });
});