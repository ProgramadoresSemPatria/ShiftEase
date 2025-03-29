import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ShiftsService } from './shifts.service'
import { CreateShiftDto } from './dto/create-shift.dto'
import { UpdateShiftDto } from './dto/update-shift.dto'
import { NecessaryRole } from '@shared/decorators/roles.decorator'
import { Role } from '@modules/users/roles/entities/Role'

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @NecessaryRole(Role.MANAGER, Role.ADMIN)
  @Post()
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftsService.create(createShiftDto)
  }

  @Get()
  findAll() {
    return this.shiftsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shiftsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShiftDto: UpdateShiftDto) {
    return this.shiftsService.update(+id, updateShiftDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shiftsService.remove(+id)
  }
}
