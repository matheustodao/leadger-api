import { EnumEmployeeRoleType } from "../enum/role.js";

export interface IEmployeeWithIdentity {
  name: string,
  email: string,
  role: EnumEmployeeRoleType,
  id: string,
  identityId: string
}
