import { IEmployeeWithIdentity } from "@employee/domain/read-models/employee-with-identity.js";
import { ResponseEmployeeDTO } from "../dto/employee-response.dto.js";

export function toResponseEmployeeDTO(row: IEmployeeWithIdentity): ResponseEmployeeDTO {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    email: row.email,
    identityId: row.identityId,
  }
}
