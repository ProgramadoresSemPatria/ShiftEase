import { Global, Module } from '@nestjs/common'

import { PrismaService } from './prisma.service'
import { DepartmentsRepository } from './repositories/departments.repositories'
import { SchedulesRepository } from './repositories/schedules.repositories'
import { UsersRepository } from './repositories/users.repositories'

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    DepartmentsRepository,
    SchedulesRepository,
  ],
  exports: [UsersRepository, DepartmentsRepository, SchedulesRepository],
})
export class DatabaseModule {}
