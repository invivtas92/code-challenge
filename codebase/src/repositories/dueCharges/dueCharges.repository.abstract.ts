import { GetDueChargesDTO } from "./dtos/getDueCharges.dto";

export abstract class DueChargesRepository {
  abstract getDueCharges(): Promise<GetDueChargesDTO>
};
