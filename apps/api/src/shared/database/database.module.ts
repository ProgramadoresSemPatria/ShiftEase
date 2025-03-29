import { Global, Module } from '@nestjs/common'

import { PrismaService } from './prisma.service'
import { UsersRepository } from './repositories/users.repositories'
import { DepartmentsRepository } from './repositories/departments.repositories'
import { ShiftsRepository } from './repositories/shifts.repositories'

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    DepartmentsRepository,
    ShiftsRepository,
  ],
  exports: [UsersRepository, DepartmentsRepository, ShiftsRepository],
})
export class DatabaseModule {}
