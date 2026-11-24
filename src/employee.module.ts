import { Module } from '@nestjs/common';
import { EmployeeController } from '@employee/presentation/controllers/employee.controller.js';
import { EmployeeRepositoryImpl } from '@employee/infra/persistence/repositories/employee.repository.js';
import { EmployeeRepository } from '@employee/domain/repositories/employee.repository.js';
import { CreateEmployeeUseCase } from '@employee/application/usecases/create-employee.js';
import { ListEmployeesUseCase } from '@employee/application/usecases/list-employees.js';
import { ServicesModule } from '@core/services/services.module.js';

@Module({
  imports: [ServicesModule],
  controllers: [EmployeeController],
  providers: [
    { provide: EmployeeRepository, useClass: EmployeeRepositoryImpl },
    CreateEmployeeUseCase,
    ListEmployeesUseCase,
  ],
})
export class EmployeeModule {}
