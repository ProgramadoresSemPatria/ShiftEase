import { RoleGuard } from '@modules/users/roles/role.guard'
import { UsersModule } from '@modules/users/users.module'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { DatabaseModule } from '@shared/database/database.module'
import { AuthGuard } from './modules/auth/auth.guard'
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [AuthModule, DatabaseModule, UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
