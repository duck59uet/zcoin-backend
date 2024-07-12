import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class GetOrderHistoryPathParamsDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  startTime?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  endTime?: number;
}
