import { Injectable } from '@nestjs/common'
import { ScheduleShiftRepository } from '@shared/database/repositories/schedule-shift.repositories'

@Injectable()
export class ScheduleShiftsService {
  constructor(private readonly scheduleShiftsRepo: ScheduleShiftRepository) {}

  async findFirst(id: string) {
    return this.scheduleShiftsRepo.findFirst({ where: { id } })
  }

  async swapScheduleShift(originId: string, destinationId: string) {
    return this.scheduleShiftsRepo.update({
      where: { id: originId },
      data: { shift_id: destinationId },
    })
  }
}
