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

  updateUserRole(userId: string, role: Role) {
    return this.usersRepo.update({
      data: { role },
      where: { id: userId },
      select: { name: true, role: true },
    })
  }
}
