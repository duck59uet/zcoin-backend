import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class GetOrdersByAdminDto {
  @ApiProperty({
    description: 'userAddress',
    type: 'string',
  })
  @IsDate()
  userAddress: string;

  @ApiProperty({
    description: 'startTime',
    type: 'string',
    format: 'date-time',
  })
  @IsDate()
  startTime?: Date;

  @ApiProperty({
    description: 'endTime',
    type: 'string',
    format: 'date-time',
  })
  @IsDate()
  endTime?: Date;
}
