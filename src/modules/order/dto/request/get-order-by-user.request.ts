import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class GetOrderHistoryPathParamsDto {
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
