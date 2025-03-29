import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateShiftDto } from '../dto/create-shift.dto'
import { UpdateShiftDto } from '../dto/update-shift.dto'
import { ShiftsRepository } from '@shared/database/repositories/shifts.repositories'
import { FindUniqueDepartment } from '@modules/departments/services/findUniqueDepartmet.service'
import { FindShiftService } from './findShift.service'

@Injectable()
export class ShiftsService {
  constructor(
    private readonly shiftsRepo: ShiftsRepository,
    private readonly findShiftService: FindShiftService,
    private readonly findUniqueDepartmet: FindUniqueDepartment,
  ) {}

  async create(createShiftDto: CreateShiftDto) {
    const { departmentCode, type } = createShiftDto

    const departmentExists = await this.findUniqueDepartmet.find(
      undefined,
      departmentCode,
    )

    if (!departmentExists) throw new NotFoundException('Department not found')

    const shift = this.shiftsRepo.create({
      data: {
        department_id: departmentExists.id,
        type,
      },
      include: {
        department: true,
      },
    })

    return shift
  }

  findAll(departmentId?: string) {
    return this.shiftsRepo.findMany({
      where: departmentId ? { department_id: departmentId } : undefined,
      include: {
        department: true,
      },
    })
  }

  async findOne(id: string) {
    const shift = await this.findShiftService.find(id)
    if (!shift) throw new NotFoundException('Shift not found')

    return shift
  }

  async update(id: string, updateShiftDto: UpdateShiftDto) {
    await this.findOne(id)

    return this.shiftsRepo.update({
      where: { id },
      data: { type: updateShiftDto.type },
      include: {
        department: true,
      },
    })
  }

  remove(id: string) {
    return `This action removes a #${id} shift`
  }
}
