import { ShiftType } from '@modules/shifts/entities/ShiftType'
import { Role } from '@modules/users/roles/entities/Role'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { NecessaryRole } from '@shared/decorators/roles.decorator'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { SchedulesService } from './schedules.service'

@ApiBearerAuth()
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @NecessaryRole(Role.ADMIN)
  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto)
  }

  @NecessaryRole(Role.USER, Role.MANAGER)
  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('departmentId') departmentId?: string,
    @Query('shiftType') shiftType?: ShiftType,
    @Query('from') from?: Date,
    @Query('to') to?: Date,
  ) {
    return this.schedulesService.findAll({
      search,
      departmentId,
      shiftType,
      from,
      to,
    })
  }

  @NecessaryRole(Role.USER, Role.MANAGER)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.schedulesService.findOne(id)
  }

  @NecessaryRole(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.schedulesService.update(id, updateScheduleDto)
  }

  @NecessaryRole(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.schedulesService.remove(id)
  }
}
