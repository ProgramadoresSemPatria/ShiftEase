import { BadRequestException, Injectable } from '@nestjs/common'
import { SchedulesRepository } from '@shared/database/repositories/schedules.repositories'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'

@Injectable()
export class SchedulesService {
  constructor(private readonly schedulesRepo: SchedulesRepository) {}

  create(createScheduleDto: CreateScheduleDto) {
    const { name, userId, startDate, endDate } = createScheduleDto

    if (new Date(startDate) >= new Date(endDate))
      throw new BadRequestException('Start date must be earlier then end date')

    return this.schedulesRepo.create({
      data: { name, user_id: userId, start_date: startDate, end_date: endDate },
    })
  }

  findAll() {
    return `This action returns all schedules`
  }

  findOne(id: string) {
    return `This action returns a #${id} schedule`
  }

  update(id: string, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`
  }

  remove(id: string) {
    return `This action removes a #${id} schedule`
  }
}
