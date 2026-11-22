import { EnumEmployeeRole, type EnumEmployeeRoleType } from "../enum/role.js";
export type { EnumEmployeeRoleType } from "../enum/role.js";

export class EmployeeRole {
  private constructor(private role: EnumEmployeeRole) {}

  static create(role: EnumEmployeeRoleType) {
    return new EmployeeRole(EnumEmployeeRole[role])
  }

  isWithdraw(): boolean {
    return this.role === EnumEmployeeRole.WITHDRAWAL
  }

  isAdmin(): boolean {
    return this.role === EnumEmployeeRole.ADMIN
  }

  isDeposit(): boolean {
    return this.role === EnumEmployeeRole.DEPOSIT
  }

  toString(): EnumEmployeeRoleType {
    return this.role
  }
}
