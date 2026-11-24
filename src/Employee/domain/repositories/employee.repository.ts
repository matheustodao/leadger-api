import { Employee } from "@employee/domain/entities/employee.js";
import { EmployeeIdentity } from "../entities/employee-identity.js";
import { IEmployeeWithIdentity } from "../read-models/employee-with-identity.js";

export abstract class EmployeeRepository {
  abstract saveWithIdentity(employee: Employee, identity: EmployeeIdentity): Promise<IEmployeeWithIdentity>
  abstract list(): Promise<IEmployeeWithIdentity[]>
}
