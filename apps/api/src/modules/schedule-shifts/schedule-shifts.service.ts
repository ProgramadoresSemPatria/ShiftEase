import { Injectable } from '@nestjs/common'
import { ScheduleShiftRepository } from '@shared/database/repositories/schedule-shift.repositories'

@Injectable()
export class ScheduleShiftsService {
  constructor(private readonly scheduleShiftsRepo: ScheduleShiftRepository) {}

  async findFirst(id: string) {
    return this.scheduleShiftsRepo.findFirst({ where: { id } })
  }
}
