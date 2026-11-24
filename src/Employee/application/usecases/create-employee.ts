import { Injectable } from "@nestjs/common";
import { CreateEmployeeCommand, CreateEmployeeCommandProps } from "../commands/employee-create.command.js";
import { EmployeeRepository } from "@employee/domain/repositories/employee.repository.js";
import { PasswordHasher } from "@core/services/Hasher/password-hasher.abstract.js";

@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    private readonly employee_repository: EmployeeRepository,
    private readonly password_hasher: PasswordHasher,
  ) {}
  async execute(command: CreateEmployeeCommandProps) {
    const input = await CreateEmployeeCommand.restore(command)

    const employee = input.toEmployeeDomain();
    const passwordHash = await this.password_hasher.hash(input.password);

    const identity = input.toIdentityDomain(employee.getId(), passwordHash);

    return await this.employee_repository.saveWithIdentity(employee, identity);
  }
}
