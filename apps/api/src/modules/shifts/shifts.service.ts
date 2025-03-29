import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateShiftDto } from './dto/create-shift.dto'
import { UpdateShiftDto } from './dto/update-shift.dto'
import { ShiftsRepository } from '@shared/database/repositories/shifts.repositories'
import { FindUniqueDepartment } from '@modules/departments/services/findUniqueDepartmet.service'

@Injectable()
export class ShiftsService {
  constructor(
    private readonly shiftsRepo: ShiftsRepository,
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

  findAll() {
    return `This action returns all shifts`
  }

  findOne(id: number) {
    return `This action returns a #${id} shift`
  }

  update(id: number, updateShiftDto: UpdateShiftDto) {
    return `This action updates a #${id} shift`
  }

  remove(id: number) {
    return `This action removes a #${id} shift`
  }
}
