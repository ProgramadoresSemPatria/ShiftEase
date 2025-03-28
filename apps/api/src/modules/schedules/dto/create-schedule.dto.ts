import { IsDate, IsNotEmpty, IsString } from 'class-validator'

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  user_id: string

  @IsNotEmpty()
  @IsDate()
  start_date: Date

  @IsNotEmpty()
  @IsDate()
  end_date: Date
}
