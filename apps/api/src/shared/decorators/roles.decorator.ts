import { Role } from '@modules/users/roles/entities/Role'
import { SetMetadata } from '@nestjs/common'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
