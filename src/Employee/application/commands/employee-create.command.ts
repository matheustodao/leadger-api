import { EnumEmployeeRole } from "@employee/domain/enum/role.js";
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { Command } from "@core/command.js";
import { Employee } from "@employee/domain/entities/employee.js";
import { ClassProps } from "@core/types.js";
import { EmployeeIdentity } from "@employee/domain/entities/employee-identity.js";

export class CreateEmployeeCommand extends Command {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 2,
    minNumbers: 2,
    minSymbols: 2,
    minUppercase: 2,
  })
  password: string

  @IsNotEmpty()
  @IsEnum(EnumEmployeeRole)
  role: EnumEmployeeRole

  toEmployeeDomain(): Employee {
    return Employee.create({
      name: this.name,
      role: this.role
    })
  }

  toIdentityDomain(employeeId: string, password: string): EmployeeIdentity {
    return EmployeeIdentity.create({
      email: this.email,
      employeeId: employeeId,
      password,
    })
  }
}

export type CreateEmployeeCommandProps = ClassProps<CreateEmployeeCommand>

