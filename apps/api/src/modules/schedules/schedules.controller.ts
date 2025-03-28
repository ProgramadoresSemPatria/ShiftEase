import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { NecessaryRole } from '@shared/decorators/roles.decorator'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { SchedulesService } from './schedules.service'

@NecessaryRole(Role.MANAGER)
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.schedulesService.update(+id, updateScheduleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(+id)
  }
}
