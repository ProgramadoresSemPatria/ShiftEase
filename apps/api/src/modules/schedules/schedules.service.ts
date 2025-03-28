import { Injectable } from '@nestjs/common'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'

@Injectable()
export class SchedulesService {
  create(createScheduleDto: CreateScheduleDto) {
    const { name, user_id, start_date, end_date } = createScheduleDto
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
