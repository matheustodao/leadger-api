export enum EnumEmployeeRole {
  WITHDRAWAL = 'WITHDRAWAL',
  DEPOSIT = 'DEPOSIT',
  ADMIN = 'ADMIN'
}

export type EnumEmployeeRoleType = keyof typeof EnumEmployeeRole
