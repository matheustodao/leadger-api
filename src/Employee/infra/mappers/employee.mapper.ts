import { Employee as EmployeePrisma } from "@core/prisma/generated/prisma/client.js";
import { Employee } from "@employee/domain/entities/employee.js";

export class EmployeeMapper {
  static toPersistence(employee: Employee): EmployeePrisma {
    const snapshot = employee.toSnapshot();

    return {
      id: snapshot.id,
      name: snapshot.name,
      role: snapshot.role
    }
  }

  static toDomain(raw: EmployeePrisma): Employee {
    return Employee.restore({
      id: raw.id,
      name: raw.name,
      role: raw.role
    })
  }
}
