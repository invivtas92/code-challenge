type WorkerCmdSignatures = {
  [K in keyof WorkerRunner]: {
    args: Parameters<WorkerRunner[K]>;
    return: ReturnType<WorkerRunner[K]>;
  };
}

type CommandSignaturesType = Record<string, {
  args: unknown[]
  return: unknown
}>

interface MessageResData<T = unknown> {
  result?: Awaited<T>
  error?: Error
  id: number
}

interface MessageReqData<T extends CommandSignaturesType> {
  method: keyof T
  args: T[keyof T]['args']
  id: number
}


interface WorkerRunner {
  runSumAsync({ count }: { count: number }): Promise<number>;
  runAddMultiple(num1: number, num2: number, num3: number): number;
}

export type { WorkerRunner, WorkerCmdSignatures, CommandSignaturesType, MessageResData, MessageReqData };