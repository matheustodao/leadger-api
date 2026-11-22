import { Employee } from "@employee/domain/entities/employee";
import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class EmployeeRepository {
  abstract save(employee: Employee): Promise<Employee>
  abstract list(): Promise<Employee[]>
}
