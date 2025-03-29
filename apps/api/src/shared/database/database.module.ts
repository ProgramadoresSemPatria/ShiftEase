import { Global, Module } from '@nestjs/common'

import { PrismaService } from './prisma.service'
import { DepartmentsRepository } from './repositories/departments.repositories'
import { SchedulesRepository } from './repositories/schedules.repositories'
import { ShiftsRepository } from './repositories/shifts.repositories'
import { UsersRepository } from './repositories/users.repositories'

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    DepartmentsRepository,
    SchedulesRepository,
    ShiftsRepository,
  ],
  exports: [
    UsersRepository,
    DepartmentsRepository,
    SchedulesRepository,
    ShiftsRepository,
  ],
})
export class DatabaseModule {}
