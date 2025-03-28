import { Injectable } from '@nestjs/common'
import { UsersRepository } from '@shared/database/repositories/users.repositories'
import { Role } from './roles/entities/Role'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  getUserById(userId: string) {
    return this.usersRepo.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
      },
    })
  }

  async findUserSchedules(userId: string) {
    return this.usersRepo.findUnique({
      where: { id: userId },
      select: {
        schedules: {
          select: {
            name: true,
            start_date: true,
            end_date: true,
            schedule_shifts: {
              select: {
                day_week: true,
                date: true,
                shift: {
                  select: {
                    type: true,
                  },
                },
              },
            },
          },
        },
      },
    })
  }

  updateUserRole(userId: string, role: Role) {
    return this.usersRepo.update({
      data: { role },
      where: { id: userId },
      select: { name: true, role: true },
    })
  }
}
