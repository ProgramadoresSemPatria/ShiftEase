import { UsersService } from '@modules/users/users.service'
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ShiftExchangeRequestRepository } from '@shared/database/repositories/shift-exchange-requests.repositories'
import { CreateShiftExchangeRequestDto } from './dto/create-shit-exchange-request.dto'

@Injectable()
export class ShiftExchangeRequestService {
  constructor(
    private readonly shiftExchangeRequestRepo: ShiftExchangeRequestRepository,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createShiftExchangeRequestDto: CreateShiftExchangeRequestDto,
    userId: string,
  ) {
    const { receptorId, departmentId, originShiftId, destinationId, reason } =
      createShiftExchangeRequestDto

    const receptorIdExists = await this.usersService.getUserById(receptorId)
    if (!receptorIdExists)
      throw new NotFoundException('Receptor user not found')

    return this.shiftExchangeRequestRepo.create({
      data: {
        applicant_id: userId,
        receptor_id: receptorId,
        department_id: departmentId,
        origin_shift_id: originShiftId,
        destination_id: destinationId,
        reason,
      },
    })
  }

  async findByUser(userId: string) {
    return this.shiftExchangeRequestRepo.findMany({
      where: {
        OR: [{ applicant_id: userId }, { receptor_id: userId }],
      },
    })
  }

  async count(userId: string) {
    return this.shiftExchangeRequestRepo.count({
      where: {
        OR: [{ applicant_id: userId }, { receptor_id: userId }],
        status: { in: ['PENDING', 'APPROVED_RECEIVER'] },
      },
    })
  }

  async acceptRequestByReceptor(
    shiftExchangeRequestId: string,
    userId: string,
  ) {
    const requestExists = await this.shiftExchangeRequestRepo.findUnique({
      where: { id: shiftExchangeRequestId },
    })
    if (
      !requestExists ||
      requestExists.receptor_id !== userId ||
      requestExists.status !== 'PENDING'
    )
      throw new ForbiddenException("Can't accept this request")

    return this.shiftExchangeRequestRepo.update({
      data: { status: 'APPROVED_RECEIVER' },
      where: { id: shiftExchangeRequestId },
    })
  }

  async rejectRequestByReceptor(
    shiftExchangeRequestId: string,
    userId: string,
  ) {
    const requestExists = await this.shiftExchangeRequestRepo.findUnique({
      where: { id: shiftExchangeRequestId },
    })
    if (
      !requestExists ||
      requestExists.receptor_id !== userId ||
      requestExists.status !== 'PENDING'
    )
      throw new ForbiddenException("Can't reject this request")

    return this.shiftExchangeRequestRepo.update({
      data: { status: 'REJECTED' },
      where: { id: shiftExchangeRequestId },
    })
  }
}
