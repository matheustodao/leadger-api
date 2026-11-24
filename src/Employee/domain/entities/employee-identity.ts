import { UUID } from "@core/value-objects/uuid.js";

interface IEmployeeIdentityProps {
  id: UUID
  email: string
  password: string
  employeeId: UUID
}

interface EmployeeIdentityCreateInput extends Pick<IEmployeeIdentityProps, 'email' | 'password'> {
  employeeId: string
}

interface EmployeeIdentityRestoreInput extends Omit<EmployeeIdentityCreateInput, 'id'> {
  id: string
}

interface EmployeeIdentitySnapshot {
  id: string
  email: string
  employeeId: string
  password: string
}


export class EmployeeIdentity {
  private constructor(private props: IEmployeeIdentityProps) {}

  static create(input: EmployeeIdentityCreateInput): EmployeeIdentity {
    return new EmployeeIdentity({
      email: input.email,
      employeeId: UUID.restore(input.employeeId),
      password: input.password,
      id: UUID.generate(),
    })
  }

  static restore(input: EmployeeIdentityRestoreInput): EmployeeIdentity {
    return new EmployeeIdentity({
      email: input.email,
      employeeId: UUID.restore(input.employeeId),
      password: input.password,
      id: UUID.restore(input.id),
    })
  }

  toSnapshot(): EmployeeIdentitySnapshot {
    return {
      email: this.props.email,
      id: this.props.id.toString(),
      employeeId: this.props.employeeId.toString(),
      password: this.props.password,
    }
  }

  setPassword(password: string) {
    this.props.password = password;
  }

  setEmployeeId(employeeId: string) {
    this.props.employeeId = UUID.restore(employeeId);
  }

  hasPassword(): boolean {
    return Boolean(this.props.password)
  }

  hasEmployeeId(): boolean {
    return Boolean(this.props.employeeId)
  }

  getEmail(): string {
    return this.props.email
  }

  getId(): string {
    return this.props.id.toString()
  }
}
