import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common'

import { ActiveUserId } from '@shared/decorators/ActiveUserId'
import { NecessaryRole } from '@shared/decorators/roles.decorator'
import { UpdateUserRoleDto } from './dto/update-user-role.dto'
import { Role } from './roles/entities/Role'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  me(@ActiveUserId() userId: string) {
    return this.usersService.getUserById(userId)
  }

  @NecessaryRole(Role.ADMIN)
  @Put('/update-user-role/:userId')
  updateUserRole(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.usersService.updateUserRole(userId, updateUserRoleDto.role)
  }
}
