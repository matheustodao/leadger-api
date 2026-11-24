import { EmployeeIdentity as EmployeeIdentityPrisma } from "@core/prisma/generated/prisma/client.js";
import { EmployeeIdentity } from "@employee/domain/entities/employee-identity.js";

export class EmployeeIdentityMapper {
  static toPersistence(employee: EmployeeIdentity): EmployeeIdentityPrisma {
    const snapshot = employee.toSnapshot();

    return {
      id: snapshot.id,
      email: snapshot.email,
      employeeId: snapshot.employeeId,
      passwordHash: snapshot.password,
    }
  }

  static toDomain(raw: EmployeeIdentityPrisma): EmployeeIdentity {
    return EmployeeIdentity.restore({
      id: raw.id,
      email: raw.email,
      employeeId: raw.employeeId,
      password: raw.passwordHash,
    })
  }
}
