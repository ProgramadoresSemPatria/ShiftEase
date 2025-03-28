import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { DepartmentsRepository } from '@shared/database/repositories/departments.repositories'
import { CreateDepartmentDto } from './dto/create-department.dto'
import { UpdateDepartmentDto } from './dto/update-department.dto'

@Injectable()
export class DepartmentsService {
  constructor(private readonly departmentsRepo: DepartmentsRepository) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const { code, name } = createDepartmentDto

    const departmentExists = await this.findUniqueDepartment(undefined, code)
    if (departmentExists)
      throw new ConflictException("This department already exist's")

    const department = await this.departmentsRepo.create({
      data: { code, name },
      select: {
        name: true,
        code: true,
      },
    })

    return department
  }

  async findAll() {
    return this.departmentsRepo.findMany({})
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    const { code, name } = updateDepartmentDto

    const departmentExists = await this.findUniqueDepartment(id)
    if (!departmentExists) throw new NotFoundException('Department not found')

    if (code) {
      const codeExists = await this.findUniqueDepartment(undefined, code)

      if (codeExists && codeExists.id !== id)
        throw new ConflictException("This department already exist's")
    }

    const department = await this.departmentsRepo.update({
      data: { code, name },
      where: { id },
      select: {
        name: true,
        code: true,
      },
    })

    return department
  }

  async remove(id: string) {
    const departmentExists = await this.findUniqueDepartment(id)
    if (!departmentExists) throw new NotFoundException('Department not found')

    await this.departmentsRepo.delete({ where: { id } })

    return
  }

  async findUniqueDepartment(id?: string, code?: string) {
    return this.departmentsRepo.findUnique({
      where: { id, code },
    })
  }
}
