import { EnumEmployeeRole } from "@employee/domain/enum/role.js";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateEmployeeDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 2,
    minNumbers: 2,
    minSymbols: 2,
    minUppercase: 2,
  })
  @ApiProperty({
    example: 'StrongPass.#100'
  })
  @ApiProperty()
  password: string

  @IsNotEmpty()
  @IsEnum(EnumEmployeeRole)
  @ApiProperty({
    enum: EnumEmployeeRole,
    enumName: 'EmployeeRole'
  })
  role: EnumEmployeeRole
}
