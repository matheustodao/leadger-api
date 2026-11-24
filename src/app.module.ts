import { PrismaModule } from '@core/prisma/prisma.module.js';
import { EmployeeModule } from './employee.module.js';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, EmployeeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
