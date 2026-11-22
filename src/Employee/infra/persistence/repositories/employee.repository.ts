import { PrismaService } from "@core/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { EmployeeRepository } from "./employee.type";
import { Employee } from "@employee/domain/entities/employee";
import { EmployeeMapper } from "@employee/infra/mappers/employee.mapper";

@Injectable()
export class EmployeeRepositoryImpl implements EmployeeRepository {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async list(): Promise<Employee[]> {
    const raws = await this.prisma.employee.findMany()

    return raws.map(EmployeeMapper.toDomain)
  }

  async save(employee: Employee): Promise<Employee> {
    const data = EmployeeMapper.toPersistence(employee)

    await this.prisma.employee.upsert({
      create: {
        ...data,
      },
      update: {
        name: data.name
      },
      where: {
        id: data.id,
      }
    })

    return employee;
  }
}
