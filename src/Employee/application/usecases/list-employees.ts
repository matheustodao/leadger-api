import { Injectable } from "@nestjs/common";
import { EmployeeRepository } from "@employee/domain/repositories/employee.repository.js";

@Injectable()
export class ListEmployeesUseCase {
  constructor(
    private readonly employee_repository: EmployeeRepository
  ) {}
  async execute() {
    const raws = await this.employee_repository.list()

    return raws;
  }
}
