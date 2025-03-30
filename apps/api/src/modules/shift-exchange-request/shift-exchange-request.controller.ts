import { Body, Controller, Post } from '@nestjs/common'
import { ActiveUserId } from '@shared/decorators/ActiveUserId'
import { CreateShiftExchangeRequestDto } from './dto/create-shit-exchange-request.dto'
import { ShiftExchangeRequestService } from './shift-exchange-request.service'

@Controller('shift-exchange-request')
export class ShiftExchangeRequestController {
  constructor(
    private readonly shiftExchangeRequestService: ShiftExchangeRequestService,
  ) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createShiftExchangeRequestDto: CreateShiftExchangeRequestDto,
  ) {
    return this.shiftExchangeRequestService.create(
      createShiftExchangeRequestDto,
      userId,
    )
  }
}
