import { CommandSignaturesType, MessageReqData, MessageResData, WorkerCmdSignatures } from "@/services/worker/workerRunner.service.interface";
import { ExecProps, SimpleWorkerService } from "@services/worker/simpleWorker.service.abstract";
import DedicatedWorker from './worker?worker';

type ResolveType = (value: unknown) => void;
type RejectType = (reason?: unknown) => void;

class SimpleWorkerServiceImpl<T extends CommandSignaturesType> extends SimpleWorkerService<T> {
  #taskId: number;
  #worker: Worker;
  #inflightPromiseCallbacks: Map<number, { resolve: ResolveType; reject: RejectType }>;
  
  constructor() {
    super();
    this.#taskId = 0;
    this.#worker = new DedicatedWorker();
    this.#inflightPromiseCallbacks = new Map();
    this.#worker.onmessage = this.messageHandler;
  }

  messageHandler = (message: MessageEvent<MessageResData<T[keyof T]['return']>>) => {
    const { id, result, error } = message.data;

    const promiseCbs = this.#inflightPromiseCallbacks.get(id);
    console.log('task ', id, 'completed with result: ', result, 'and error: ', error);
    if (promiseCbs) {
      this.#inflightPromiseCallbacks.delete(id);
      if (result) {
        promiseCbs.resolve(result);
      } else if (error) {
        promiseCbs.reject(error);
      }
    }
  }

  async exec<K extends keyof T>({ methodName, args }: ExecProps<K, T[K]["args"]>): Promise<T[K]["return"]> {
    const taskId = ++this.#taskId;
    let resolve: ResolveType = () => {
      throw new Error("Resolve function not initialized");
    };
    let reject: RejectType = () => {
      throw new Error("Reject function not initialized");
    };

    const promise = new Promise<T[K]["return"]>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    this.#inflightPromiseCallbacks.set(taskId, { resolve, reject });

    const reqMessage: MessageReqData<T> = {
      id: taskId,
      method: methodName as string,
      args: args ?? [],
    };
  
    this.#worker.postMessage(reqMessage);
    return promise;
  }
}

const simpleWorkerService = new SimpleWorkerServiceImpl<WorkerCmdSignatures>();
export { simpleWorkerService, SimpleWorkerServiceImpl };
