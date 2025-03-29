import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { ShiftType } from '../entities/ShiftType'

export class CreateShiftDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  departmentId: string

  @IsNotEmpty()
  @IsEnum(ShiftType)
  type: ShiftType
}
