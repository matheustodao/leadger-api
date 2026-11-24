import { EnumEmployeeRoleType } from "@employee/domain/enum/role.js";

export class ResponseEmployeeDTO {
  id: string

  identityId: string

  name: string

  email: string

  role: EnumEmployeeRoleType
}
