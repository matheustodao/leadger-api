import { CreateEmployeeCommand } from "@employee/application/commands/employee-create.command.js";
import { CreateEmployeeUseCase } from "@employee/application/usecases/create-employee.js";
import { ListEmployeesUseCase } from "@employee/application/usecases/list-employees.js";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { ResponseEmployeeDTO } from "../dto/employee-response.dto.js";
import { CreateEmployeeDTO } from "../dto/employee-create.dto.js";
import { IEmployeeWithIdentity } from "@employee/domain/read-models/employee-with-identity.js";
import { toResponseEmployeeDTO } from "../presenters/to-response-employee-dto.js";

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly create_employee_usecase: CreateEmployeeUseCase,
    private readonly list_employees_usecase: ListEmployeesUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateEmployeeDTO): Promise<ResponseEmployeeDTO> {
    const response = await this.create_employee_usecase.execute(dto)

    return toResponseEmployeeDTO(response)
  }

  @Get()
  async findAll(): Promise<ResponseEmployeeDTO[]> {
    const employees = await this.list_employees_usecase.execute()

    return employees.map(toResponseEmployeeDTO)
  }
}
