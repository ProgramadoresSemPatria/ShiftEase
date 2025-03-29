import { Module } from '@nestjs/common'
import { ShiftsService } from './shifts.service'
import { ShiftsController } from './shifts.controller'
import { DepartmentsModule } from '@modules/departments/departments.module'

@Module({
  imports: [DepartmentsModule],
  controllers: [ShiftsController],
  providers: [ShiftsService],
})
export class ShiftsModule {}
