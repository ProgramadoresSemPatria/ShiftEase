import { IsEnum, IsNotEmpty } from 'class-validator'
import { Role } from '../entities/Role'

export class UpdateUserRoleDto {
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role
}
