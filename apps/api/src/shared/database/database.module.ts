import { Global, Module } from '@nestjs/common'

import { PrismaService } from './prisma.service'
import { UsersRepository } from './repositories/users.repositories'
import { DepartmentsRepository } from './repositories/departments.repositories'

@Global()
@Module({
  providers: [PrismaService, UsersRepository, DepartmentsRepository],
  exports: [UsersRepository, DepartmentsRepository],
})
export class DatabaseModule {}
