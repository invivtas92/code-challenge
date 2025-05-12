import { GetDueChargesDTO } from "./dtos/getDueCharges.dto";
import { DueChargesRepository } from "./dueCharges.repository.abstract";

export class FakeDueChargesRepository extends DueChargesRepository {
  #getDueChargesRes: GetDueChargesDTO = [];
  
  get getDueChargesRes(): GetDueChargesDTO {
    return this.#getDueChargesRes;
  }
  
  set getDueChargesRes(getDueChargesRes: GetDueChargesDTO) {
    this.#getDueChargesRes = getDueChargesRes;
  }
  
  getDueCharges(): Promise<GetDueChargesDTO> {
    return new Promise(resolve => { 
      resolve(this.#getDueChargesRes); 
    });
  }
}