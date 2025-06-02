import { MessageReqData, MessageResData, WorkerCmdSignatures, WorkerRunner } from "@services/worker/workerRunner.service.interface";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class WorkerRunnerImpl implements WorkerRunner {
  #workerContext: DedicatedWorkerGlobalScope;

  constructor(context: DedicatedWorkerGlobalScope) {
    this.#workerContext = context;
  }

  async runSumAsync({ count }: { count: number; }): Promise<number> {
    await sleep(5000);
    let sum = 0;
    for (let i = 1; i <= count; i++) {
      sum += i
    };
    return sum;
  }

  runAddMultiple(num1: number, num2: number, num3: number): number {
    return num1 + num2 + num3;
  }

  messageHandler = async (message: MessageEvent<MessageReqData<WorkerCmdSignatures>>) => {
    const { args, id, method } = message.data;
    console.log("Worker received message: ", message.data);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
      const result = await this[method](...args as [any, any, any]);
      const response: MessageResData = {
        id,
        result
      };
      this.#workerContext.postMessage(response);
    } catch (error) {
      const response: MessageResData = {
        id,
        error: error as Error
      };
    
      this.#workerContext.postMessage(response);
    }
  }

  init() {
    this.#workerContext.onmessage = this.messageHandler;
  }
}

export { WorkerRunnerImpl };