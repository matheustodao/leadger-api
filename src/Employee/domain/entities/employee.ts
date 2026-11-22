import { EmployeeRole, type EnumEmployeeRoleType } from "@employee/domain/value-objects/employee-role"
import { UUID } from "../../../core/value-objects/uuid"

interface EmployeeProps {
  name: string
  id: UUID
  role: EmployeeRole
}

interface EmployeePropsSnapshot {
  name: string
  id: string
  role: EnumEmployeeRoleType
}

interface EmployeeCreateInput extends Pick<EmployeeProps, 'name'> {
  role: EnumEmployeeRoleType
}

interface EmployeeRestoreInput extends EmployeeCreateInput {
  id: string
}

export class Employee {
  private constructor(private props: EmployeeProps) {}

  static create(input: EmployeeCreateInput): Employee {
    return new Employee({
      id: UUID.generate(),
      name: input.name,
      role: EmployeeRole.create(input.role)
    })
  }

  static restore(raw: EmployeeRestoreInput): Employee {
    return new Employee({
      id: UUID.restore(raw.id),
      name: raw.name,
      role: EmployeeRole.create(raw.role)
    })
  }

  toSnapshot(): EmployeePropsSnapshot {
    return {
      ...this.props,
      id: this.props.id.toString(),
      role: this.props.role.toString()
    }
  }
}
