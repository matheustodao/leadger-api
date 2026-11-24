import { PrismaService } from "@core/prisma/prisma.service.js";
import { Injectable } from "@nestjs/common";
import { Employee } from "@employee/domain/entities/employee.js";
import { EmployeeMapper } from "@employee/infra/mappers/employee.mapper.js";
import { EmployeeRepository } from "@employee/domain/repositories/employee.repository.js";
import { EmployeeIdentity } from "@employee/domain/entities/employee-identity.js";
import { EmployeeIdentityMapper } from "@employee/infra/mappers/employee-identity.mapper.js";
import { IEmployeeWithIdentity } from "@employee/domain/read-models/employee-with-identity.js";
import { Prisma } from "@core/prisma/generated/prisma/client.js";

@Injectable()
export class EmployeeRepositoryImpl implements EmployeeRepository {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async list(): Promise<IEmployeeWithIdentity[]> {
    const raws: EmployeeRow[] = await this.prisma.employee.findMany({
      include: {
        employeeIdentity: {
          omit: {
            employeeId: true,
            passwordHash: true,
          }
        }
      }
    })

    return raws.map(this.toEmployeeWithIdentity)
  }

  async saveWithIdentity(employee: Employee, identity: EmployeeIdentity): Promise<IEmployeeWithIdentity> {
    const employeePersistence = EmployeeMapper.toPersistence(employee)
    const identityPersistence = EmployeeIdentityMapper.toPersistence(identity)

    await this.prisma.$transaction(async (tx) => {
      await tx.employee.upsert({
        create: {
          ...employeePersistence,
        },
        update: {
          name: employeePersistence?.name
        },
        where: {
          id: employeePersistence.id,
        }
      })

      await tx.employeeIdentity.upsert({
        create: {
          ...identityPersistence,
        },
        update: {
          email: identityPersistence?.email,
          passwordHash: identityPersistence?.passwordHash,
        },
        where: {
          id: identityPersistence.id,
          AND: {
            employeeId: employeePersistence.id
          }
        }
      })
    })

    return this.toEmployeeWithIdentity({
      employeeIdentity: { email: identity.getEmail(), id: identity.getId() },
      id: employee.getId(),
      name: employee.getName(),
      role: employee.getRole(),
    });
  }

  private toEmployeeWithIdentity(row: EmployeeRow): IEmployeeWithIdentity {
    return {
      email: row?.employeeIdentity?.email ?? '',
      identityId: row?.employeeIdentity?.id ?? '',
      id: row.id,
      name: row.name,
      role: row.role,
    }
  }
}

type EmployeeRow = Prisma.EmployeeGetPayload<{
  select: { id: true, name: true, role: true, employeeIdentity: { select: { id: true, email: true } } }
}>
