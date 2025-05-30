import { WorkerRunnerImpl } from "./workerRunner.service";

const workerRunner = new WorkerRunnerImpl(self as DedicatedWorkerGlobalScope);
workerRunner.init();