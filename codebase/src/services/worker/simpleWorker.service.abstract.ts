import { CommandSignaturesType } from "./workerRunner.service.interface";

// make args optional props if command does not take any Args (empty arr Args)
type ExecProps<MethodName, Args> = Args extends [] ? {
    methodName: MethodName,
    args?: undefined
  } : {
    methodName: MethodName,
    args: Args
  };

export abstract class SimpleWorkerService<T extends CommandSignaturesType> {
  abstract exec<K extends keyof T>({ methodName, args }: ExecProps<K, T[K]['args']>): Promise<T[K]['return']>;
};

export type { ExecProps };
